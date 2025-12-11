import { AES_ALGORITHM } from './primitives';

export const generateSessionKey = async () => {
	return await window.crypto.subtle.generateKey(AES_ALGORITHM, true, ['encrypt', 'decrypt']);
};

// ENCRYPT FILE
export const encryptFileWithSessionKey = async (file: File, key: CryptoKey) => {
	// Create UNIQUE IV for this specific file (Critical for security)
	const iv = window.crypto.getRandomValues(new Uint8Array(12));

	// Read File
	const fileBuffer = await file.arrayBuffer();

	// Encrypt using the passed Session Key
	const encryptedBuffer = await window.crypto.subtle.encrypt(
		{
			name: 'AES-GCM',
			iv: iv,
		},
		key,
		fileBuffer
	);

	// Pack IV + Ciphertext
	const combinedBuffer = new Uint8Array(iv.byteLength + encryptedBuffer.byteLength);
	combinedBuffer.set(iv);
	combinedBuffer.set(new Uint8Array(encryptedBuffer), iv.byteLength);

	const encryptedBlob = new Blob([combinedBuffer], { type: 'application/octet-stream' });

	return {
		encryptedBlob,
		originalName: file.name,
		originalType: file.type,
	};
};
