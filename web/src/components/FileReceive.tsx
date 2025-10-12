import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Download, Eye, File, Trash2 } from 'lucide-react';
import React from 'react';
import { useState } from 'react';

interface ReceivedFile {
	name: string;
	size: string;
}

const FileReceive: React.FC = () => {
	const [receivedFiles, setreceivedFiles] = useState<ReceivedFile[]>([]);
	const [sharingLink, setSharingLink] = useState('');
	const handleDownload = (fileName: string) => {
		alert(`Downloading ${fileName}...`);
	};
	const handlePreview = (fileName: string) => {
		alert(`Previewing ${fileName}...`);
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
				<div className="mb-6 flex items-center gap-3">
					<Input
						type="text"
						placeholder="Enter Sharing Link"
						value={sharingLink}
						onChange={(e) => setSharingLink(e.target.value)}
						className="bg-gray-700 text-white border-none placeholder-gray-400 flex-1"
					/>
					<Button
						className="bg-blue-600 hover:bg-blue-500 text-white cursor-pointer"
						onClick={() => {
							if (!sharingLink.trim()) {
								alert('Please Enter a valid link');
								return;
							}
							setreceivedFiles([
								{ name: 'File1.pdf', size: '1MB' },
								{ name: 'File2.txt', size: '2KB' },
							]);
							alert(`Fetching Files from:${sharingLink}`);
						}}
					>
						Receive
					</Button>
				</div>
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
									<File className="text-gray-300" size={20} />
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
