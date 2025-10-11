import { useState } from "react";
import { Upload, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const FileUpload: React.FC = () => {
  const [files, setFiles] = useState<File[]>([]);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []);
    if (selectedFiles.length > 0) {
      setFiles((prevFiles) => {
        const newFiles = selectedFiles.filter((file) => !prevFiles.some((f) => f.name === file.name && f.size === file.size));
        return [...prevFiles, ...newFiles]
      });
    }
    e.target.value = "";
  };

  const handleRemove = (index: number) => {
    setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 to-gray-700">
      <header className="mb-8 text-center">
        <h1 className="text-3xl font-bold mb-2 text-white">Upload The Files</h1>
        <p className="text-gray-400 max-w-md mx-auto">
          Easily upload and manage your files. You can select multiple files or
          remove them anytime before uploading.
        </p>
      </header>
      <div className="bg-gray-800 p-6 rounded-2xl shadow-2xl w-full max-w-md text-center">
        <label
          htmlFor="upload"
          className="flex flex-col items-center justify-center border-2 border-dashed border-gray-500 rounded-xl py-10 cursor-pointer hover:bg-gray-700 transition">
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
                  <span title={file.name} className="text-white truncate text-sm">{file.name}</span>
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
              onClick={() => setFiles([])}
              className="w-full bg-gray-500 hover:bg-gray-400 text-white rounded-full cursor-pointer"
            >
              Clear All
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};
export default FileUpload;
