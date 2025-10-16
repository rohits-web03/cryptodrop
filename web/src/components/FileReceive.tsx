import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { formatFileSize } from '@/lib/utils';
import { receiveSchema } from '@/schema/file';
import { type File, type ReceiveInput } from '@/types/file';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { Download, File as FileIcon, Loader2 } from 'lucide-react';
import React from 'react';
import { useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

const FileReceive: React.FC = () => {
	const [receivedFiles, setreceivedFiles] = useState<File[]>([]);
	const shareCode = useRef<string>('');
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors, isSubmitting },
	} = useForm<ReceiveInput>({
		resolver: zodResolver(receiveSchema),
		defaultValues: { sharingCode: '' },
	});

	const onSubmit = async ({ sharingCode }: ReceiveInput) => {
		try {
			shareCode.current = sharingCode;
			const response = await axios.get(
				`${import.meta.env.VITE_API_BASE_URL}/api/v1/share/${sharingCode}`
			);
			setreceivedFiles(response?.data?.data?.files);
			reset();
			toast.success('Files received successfully');
		} catch (error: unknown) {
			if (axios.isAxiosError(error)) {
				console.error(error.response?.data?.message);
				toast.error(error.response?.data?.message || 'Failed to download file');
			} else {
				console.error(error);
				toast.error('An unexpected error occurred');
			}
		}
	};

	const handleDownload = async (index: number) => {
		try {
			const response = await axios.get(
				`${import.meta.env.VITE_API_BASE_URL}/api/v1/share/${shareCode.current}/download/${index}`,
				{
					responseType: 'blob',
				}
			);

			const contentDisposition = response.headers['content-disposition'];
			let filename = 'file';

			if (contentDisposition) {
				const match = contentDisposition.match(/filename="(.+)"/);
				if (match?.[1]) filename = match[1];
			}

			const url = window.URL.createObjectURL(new Blob([response.data]));
			const a = document.createElement('a');
			a.href = url;
			a.download = filename;
			document.body.appendChild(a);
			a.click();
			a.remove();
			window.URL.revokeObjectURL(url);
		} catch (error: unknown) {
			if (axios.isAxiosError(error)) {
				console.error(error.response?.data?.message);
				toast.error(error.response?.data?.message || 'Failed to download file');
			} else {
				console.error(error);
				toast.error('An unexpected error occurred');
			}
		}
	};

	return (
		<div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 to-gray-700 text-gray-200 px-4">
			<header className="mb-8 text-center">
				<h1 className="text-3xl font-bold mb-2 text-white">Receive Files</h1>
				<p className="text-gray-400 max-w-md mx-auto">
					View,Download or Delete Files Shared with You.Can preview documents or remove
					them after download.
				</p>
			</header>

			<div className="bg-gray-800 p-6 rounded-2xl shadow-2xl w-full max-w-md text-center">
				<form onSubmit={handleSubmit(onSubmit)} className="mb-6 flex flex-col gap-2">
					<div className="flex items-center gap-3">
						<Input
							type="text"
							placeholder="Enter sharing code"
							{...register('sharingCode')}
							className="bg-gray-700 text-white border-none placeholder-gray-400 flex-1"
						/>
						<Button
							className="bg-blue-600 hover:bg-blue-500 text-white cursor-pointer"
							type="submit"
							disabled={isSubmitting}
						>
							{isSubmitting ? (
								<Loader2 className="mr-2 h-4 w-4 animate-spin" />
							) : null}
							{isSubmitting ? 'Receiving...' : 'Receive'}
						</Button>
					</div>
					{errors.sharingCode && (
						<p className="text-sm text-red-500 text-left mt-1">
							{errors.sharingCode.message}
						</p>
					)}
				</form>
				{Array.isArray(receivedFiles) && receivedFiles.length === 0 ? (
					<p className="text-gray-400 italic">No Files Received Yet.</p>
				) : (
					<div className="space-y-4 max-h-[350px] overflow-y-auto">
						{receivedFiles.map((file, index) => (
							<div
								key={index}
								className="flex items-center justify-between bg-gray-700 rounded-xl px-4 py-3"
							>
								<div className="flex items-center space-x-3">
									<FileIcon className="text-gray-300" size={20} />
									<div className="text-left">
										<p className="text-white text-sm font-medium truncate">
											{file.name}
										</p>
										<p className="text-xs text-gray-400">
											{formatFileSize(Number(file.size))}
										</p>
									</div>
								</div>
								<div className="flex items-center gap-2">
									<Button
										variant="ghost"
										size="icon"
										className="bg-green-600 hover:bg-green-500 rounded-full cursor-pointer"
										onClick={() => handleDownload(index)}
										title="Download"
									>
										<Download className="text-white" size={18} />
									</Button>
								</div>
							</div>
						))}
					</div>
				)}
			</div>
		</div>
	);
};
export default FileReceive;
