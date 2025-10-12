import { z } from 'zod';

export const receiveSchema = z.object({
	sharingLink: z.string().trim().min(1, 'Sharing link is required'),
});
