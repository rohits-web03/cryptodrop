import { base64ToArrayBuffer } from './primitives';
import { AES_ALGORITHM } from './primitives';

// Unwrap the Session Key using User's Private Key
export const unwrapSessionKey = async (
	encryptedKeyBase64: string,
	privateKey: CryptoKey
): Promise<CryptoKey> => {
	const encryptedBytes = base64ToArrayBuffer(encryptedKeyBase64);

	// We decrypt the RSA wrapper to reveal the raw AES bits
	const rawKeyBuffer = await window.crypto.subtle.decrypt(
		{ name: 'RSA-OAEP' },
		privateKey,
		encryptedBytes
	);

	// Import those raw bits as a usable AES-GCM Key
	return await window.crypto.subtle.importKey('raw', rawKeyBuffer, AES_ALGORITHM, true, [
		'encrypt',
		'decrypt',
	]);
};
