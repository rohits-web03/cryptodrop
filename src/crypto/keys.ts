import {
	RSA_ALGORITHM,
	KDF_ALGORITHM,
	arrayBufferToBase64,
	base64ToArrayBuffer,
} from './primitives';

// USER IDENTITY GENERATION
export const generateUserKeyPair = async () => {
	// Generates the RSA Public/Private Keypair
	// Extractable = true because we need to save it to DB (Encrypted)
	return await window.crypto.subtle.generateKey(RSA_ALGORITHM, true, [
		'encrypt',
		'decrypt',
		'wrapKey',
		'unwrapKey',
	]);
};

// PASSWORD DERIVATION (The Vault Logic)
export const deriveMasterKey = async (password: string, salt: string) => {
	const encoder = new TextEncoder();

	// Import password as raw key material
	const keyMaterial = await window.crypto.subtle.importKey(
		'raw',
		encoder.encode(password),
		{ name: 'PBKDF2' },
		false,
		['deriveBits', 'deriveKey']
	);

	// Derive the actual AES-GCM Key (The "Key Encryption Key")
	return await window.crypto.subtle.deriveKey(
		{
			...KDF_ALGORITHM,
			salt: encoder.encode(salt),
		},
		keyMaterial,
		{ name: 'AES-GCM', length: 256 },
		true,
		['encrypt', 'decrypt', 'wrapKey', 'unwrapKey']
	);
};

// Export key for storage
export const exportKey = async (key: CryptoKey, format: 'raw' | 'pkcs8' | 'spki' | 'jwk') => {
	const exported = await window.crypto.subtle.exportKey(format, key);
	return format === 'jwk' ? exported : arrayBufferToBase64(exported as ArrayBuffer);
};

export const importKey = async (
	keyData: JsonWebKey | ArrayBuffer,
	format: 'raw' | 'pkcs8' | 'spki' | 'jwk',
	algorithm: AlgorithmIdentifier | RsaHashedImportParams | EcKeyImportParams,
	extractable: boolean,
	usages: KeyUsage[]
) => {
	// Handle JWK (JSON Object)
	if (format === 'jwk') {
		return await window.crypto.subtle.importKey(
			'jwk',
			keyData as JsonWebKey,
			algorithm,
			extractable,
			usages
		);
	}

	// Handle Binary Formats (ArrayBuffer)
	return await window.crypto.subtle.importKey(
		format,
		keyData as BufferSource,
		algorithm,
		extractable,
		usages
	);
};

// Wrap private key for storage (using the master key)
export const wrapPrivateKey = async (privateKey: CryptoKey, wrappingKey: CryptoKey) => {
	const iv = window.crypto.getRandomValues(new Uint8Array(12));

	const wrappedKey = await window.crypto.subtle.wrapKey(
		'pkcs8', // Standard Private Key Format
		privateKey,
		wrappingKey,
		{ name: 'AES-GCM', iv: iv }
	);

	return {
		encryptedKey: arrayBufferToBase64(wrappedKey),
		iv: arrayBufferToBase64(iv.buffer),
	};
};

// Unwrap private key from storage (using the master key)
export const unwrapPrivateKey = async (
	encryptedPrivateKeyJSON: string,
	wrappingKey: CryptoKey
): Promise<CryptoKey> => {
	const { encryptedKey, iv } = JSON.parse(encryptedPrivateKeyJSON);

	const encryptedBytes = base64ToArrayBuffer(encryptedKey);
	const ivBytes = base64ToArrayBuffer(iv);
	return await window.crypto.subtle.unwrapKey(
		'pkcs8',
		encryptedBytes,
		wrappingKey,
		{
			name: 'AES-GCM',
			iv: ivBytes,
		},
		RSA_ALGORITHM,
		true,
		['decrypt', 'unwrapKey']
	);
};

// Wrap the AES Session Key using a Recipient's Public Key (RSA-OAEP)
export const wrapSessionKeyForRecipient = async (
	sessionKey: CryptoKey,
	recipientPublicKey: CryptoKey
): Promise<string> => {
	const wrappedKeyBuffer = await window.crypto.subtle.wrapKey(
		'raw',
		sessionKey,
		recipientPublicKey,
		RSA_ALGORITHM
	);

	return arrayBufferToBase64(wrappedKeyBuffer);
};

/* 
    Derive an Authentication Hash from the Master Key
    We send THIS to the server as the "password", so the server never sees the real password.
*/
export const deriveAuthToken = async (masterKey: CryptoKey) => {
	const encoder = new TextEncoder();

	// Export Master Key to raw bytes so we can hash it
	const rawKey = await window.crypto.subtle.exportKey('raw', masterKey);

	// Append a static tag so this hash is mathematically distinct from the encryption key
	const context = encoder.encode('AUTH_VERIFIER');
	const data = new Uint8Array(rawKey.byteLength + context.byteLength);
	data.set(new Uint8Array(rawKey));
	data.set(context, rawKey.byteLength);

	// Hash it
	const hashBuffer = await window.crypto.subtle.digest('SHA-256', data);

	// Return as hex string (easier for backend to handle as a password string)
	return Array.from(new Uint8Array(hashBuffer))
		.map((b) => b.toString(16).padStart(2, '0'))
		.join('');
};
