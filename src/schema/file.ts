import { z } from 'zod';

export const receiveSchema = z.object({
	sharingCode: z.string().trim().min(1, 'Sharing code is required'),
});
