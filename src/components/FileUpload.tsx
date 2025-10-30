import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Upload, Trash2, Copy } from 'lucide-react';
import { Loader2 } from 'lucide-react';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const FileUpload: React.FC = () => {
	const [files, setFiles] = useState<File[]>([]);
	const [shareCode, setShareCode] = useState<string>('');
	const [expiresIn, setExpiresIn] = useState<string>('');
	const [isUploading, setIsUploading] = useState<boolean>(false);
	const navigate = useNavigate();
	useEffect(() => {
		const params = new URLSearchParams(location.search);
		const status = params.get('status');

		if (status === 'success_register') {
			setTimeout(() => {
				toast.success('Successfully Registered!');
			}, 100);
			console.log('Success');
			navigate('/', { replace: true }); // Clears ?error= from URL
		} else if (status === 'success_login') {
			setTimeout(() => {
				toast.success('Successfully Logged-in!');
			}, 100);
			console.log('Success');
		}
	}, [location.search, navigate]);

	const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
		const selectedFiles = Array.from(e.target.files || []);
		if (selectedFiles.length > 0) {
			setFiles((prevFiles) => {
				const newFiles = selectedFiles.filter(
					(file) => !prevFiles.some((f) => f.name === file.name && f.size === file.size)
				);
				return [...prevFiles, ...newFiles];
			});
		}
		e.target.value = '';
	};

	const handleRemove = (index: number) => {
		setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
	};

	const handleUpload = async () => {
		try {
			setIsUploading(true);
			const formData = new FormData();
			files.forEach((file) => formData.append('files', file));
			const response = await axios.post(
				`${import.meta.env.VITE_API_BASE_URL}/api/v1/files/`,
				formData
			);
			setShareCode(response?.data?.data?.shareLink?.split('share/')?.[1]);
			setExpiresIn(response?.data?.data?.expiresIn);
			toast.success('Files uploaded successfully');
			setFiles([]);
		} catch (error) {
			console.error(error);
			toast.error('Failed to upload files');
		} finally {
			setIsUploading(false);
		}
	};

	return (
		<div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 to-gray-700">
			<header className="mb-8 text-center">
				<h1 className="text-3xl font-bold mb-2 text-white">Upload The Files</h1>
				<p className="text-gray-400 max-w-md mx-auto">
					Easily upload and manage your files. You can select multiple files or remove
					them anytime before uploading.
				</p>
			</header>
			<div className="bg-gray-800 p-6 rounded-2xl shadow-2xl w-full max-w-md text-center">
				<label
					htmlFor="upload"
					className="flex flex-col items-center justify-center border-2 border-dashed border-gray-500 rounded-xl py-10 cursor-pointer hover:bg-gray-700 transition"
				>
					<Upload className="text-gray-300 mb-3" size={40} />
					<p className="text-gray-200 font-medium">Upload Files</p>
					<Input
						id="upload"
						type="file"
						multiple
						className="hidden"
						onChange={handleFile}
					/>
				</label>
				{files.length > 0 && (
					<div className="w-full px-4 space-y-3 mt-3 max-h-[350px]">
						<div className="w-full flex flex-col items-center gap-3 overflow-y-auto max-h-[310px] py-2 px-1 scroll-smooth">
							{files.map((file, index) => (
								<div
									key={index}
									className="w-full flex items-center justify-between bg-gray-700 rounded-full px-4 py-2"
								>
									<span title={file.name} className="text-white truncate text-sm">
										{file.name}
									</span>
									<Button
										variant="ghost"
										size="icon"
										className="bg-gray-600 hover:bg-gray-500 rounded-full"
										onClick={() => handleRemove(index)}
									>
										<Trash2 className="text-white" size={20} />
									</Button>
								</div>
							))}
						</div>
						<Button
							onClick={handleUpload}
							className="w-full bg-gray-500 hover:bg-gray-400 text-white rounded-full cursor-pointer"
							disabled={isUploading}
						>
							{isUploading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
							{isUploading ? 'Uploading...' : 'Upload selected files'}
						</Button>
						<Button
							onClick={() => setFiles([])}
							className="w-full bg-gray-500 hover:bg-gray-400 text-white rounded-full cursor-pointer"
						>
							Clear All
						</Button>
					</div>
				)}
			</div>
			{shareCode && (
				<motion.div
					initial={{ opacity: 0, y: -10 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.3, ease: 'easeOut' }}
					className="w-full max-w-md mx-auto mt-6 p-5 bg-gray-800 rounded-2xl shadow-xl border border-gray-600"
				>
					<h2 className="text-2xl font-semibold text-white mb-2 text-center">
						Share Your Files
					</h2>
					<p className="text-gray-400 text-base mb-4 text-center">
						Copy this code and share it with anyone you want. The code expires in{' '}
						{expiresIn}.
					</p>

					<div className="flex items-center justify-between bg-gray-700 rounded-lg px-4 py-3 mb-3">
						<span title={shareCode} className="text-white truncate text-base">
							{shareCode}
						</span>
						<Button
							variant="ghost"
							size="icon"
							className="bg-gray-600 hover:bg-gray-500 rounded-full cursor-pointer"
							onClick={() => {
								navigator.clipboard.writeText(shareCode);
								toast.success('Code copied to clipboard');
							}}
						>
							<Copy className="text-white" size={20} />
						</Button>
					</div>
				</motion.div>
			)}
		</div>
	);
};
export default FileUpload;
