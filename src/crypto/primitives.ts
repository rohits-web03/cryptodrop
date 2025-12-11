/* 
    SYMMETRIC: AES-GCM (Authenticated Encryption)
    Used for: The heavy file payload 
*/
export const AES_ALGORITHM: AesKeyGenParams = {
	name: 'AES-GCM',
	length: 256,
};

/* 
    ASYMMETRIC: RSA-OAEP (IND-CCA2 Secure)
    Used for: Wrapping the AES key for recipient 
*/
export const RSA_ALGORITHM: RsaHashedKeyGenParams = {
	name: 'RSA-OAEP',
	modulusLength: 2048,
	publicExponent: new Uint8Array([1, 0, 1]), // 65537
	hash: 'SHA-256',
};

/* 
    KDF: PBKDF2 (Password Based Key Derivation)
    Used for: Converting password -> Encryption Key 
*/
export const KDF_ALGORITHM = {
	name: 'PBKDF2',
	hash: 'SHA-256',
	iterations: 100000, // NIST recommended minimum
};

// Convert ArrayBuffer to Base64 (for storage)
export const arrayBufferToBase64 = (buffer: ArrayBuffer): string => {
	const bytes = new Uint8Array(buffer);
	let binary = '';
	for (let i = 0; i < bytes.byteLength; i++) {
		binary += String.fromCharCode(bytes[i]);
	}
	return window.btoa(binary);
};

// Convert Base64 to ArrayBuffer (for retrieval)
export const base64ToArrayBuffer = (base64: string): ArrayBuffer => {
	const binaryString = window.atob(base64);
	const len = binaryString.length;
	const bytes = new Uint8Array(len);
	for (let i = 0; i < len; i++) {
		bytes[i] = binaryString.charCodeAt(i);
	}
	return bytes.buffer;
};
