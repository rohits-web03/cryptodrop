import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { receiveSchema } from '@/schema/file';
import { type File, type ReceiveInput } from '@/types/file';
import { zodResolver } from '@hookform/resolvers/zod';
import { Download, Eye, File as FileIcon, Trash2 } from 'lucide-react';
import React from 'react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

const FileReceive: React.FC = () => {
	const [receivedFiles, setreceivedFiles] = useState<File[]>([]);
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
		reset,
	} = useForm<ReceiveInput>({
		resolver: zodResolver(receiveSchema),
		defaultValues: { sharingLink: '' },
	});

	const onSubmit = ({ sharingLink }: ReceiveInput) => {
		const promise = () => new Promise<void>((resolve) => setTimeout(() => resolve(), 2000));
		toast.promise(promise, {
			loading: `Fetching files from: ${sharingLink}`,
			success: () => {
				setreceivedFiles([
					{ name: 'File1.pdf', size: '1MB' },
					{ name: 'File2.txt', size: '2KB' },
				]);
				reset();
				return `Files received successfully!`;
			},
			error: 'Failed to receive files',
		});
	};

	const handleDownload = (fileName: string) => {
		toast.info(`Downloading ${fileName}...`);
	};

	const handlePreview = (fileName: string) => {
		toast.info(`Previewing ${fileName}...`);
	};

	const handleRemove = (index: number) => {
		setreceivedFiles((prev) => prev.filter((_, i) => i !== index));
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
							placeholder="Enter Sharing Link"
							{...register('sharingLink')}
							className="bg-gray-700 text-white border-none placeholder-gray-400 flex-1"
						/>
						<Button
							className="bg-blue-600 hover:bg-blue-500 text-white cursor-pointer"
							type="submit"
							disabled={isSubmitting}
						>
							{isSubmitting ? 'Receiving...' : 'Receive'}
						</Button>
					</div>
					{errors.sharingLink && (
						<p className="text-sm text-red-500 text-left mt-1">
							{errors.sharingLink.message}
						</p>
					)}
				</form>
				{receivedFiles.length === 0 ? (
					<p className="text-gray-400 italic">No Files Received Yet.</p>
				) : (
					<div className="space-y-4">
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
										<p className="text-xs text-gray-400">{file.size}</p>
									</div>
								</div>
								<div className="flex items-center gap-2">
									<Button
										variant="ghost"
										size="icon"
										className="bg-gray-600 hover:bg-gray-500 rounded-full cursor-pointer"
										onClick={() => handlePreview(file.name)}
										title="Preview"
									>
										<Eye className="text-white" size={18} />
									</Button>
									<Button
										variant="ghost"
										size="icon"
										className="bg-green-600 hover:bg-green-500 rounded-full cursor-pointer"
										onClick={() => handleDownload(file.name)}
										title="Download"
									>
										<Download className="text-white" size={18} />
									</Button>
									<Button
										variant="ghost"
										size="icon"
										className="bg-red-600 hover:bg-red-500 rounded-full cursor-pointer"
										onClick={() => handleRemove(index)}
										title="Delete"
									>
										<Trash2 className="text-white" size={18} />
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
