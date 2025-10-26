import type { receiveSchema } from '@/schema/file';
import { z } from 'zod';

export interface File {
	name: string;
	size: string;
	index: number;
}

export type ReceiveInput = z.infer<typeof receiveSchema>;
