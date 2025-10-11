import { useState } from "react";
import { Upload, Trash2 } from "lucide-react";
import { Button } from "./ui/button";

const FileUpload: React.FC = () => {
  const [files, setFiles] = useState<File[]>([]);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []);
    if (selectedFiles.length > 0) {
      setFiles((prevFiles)=>{
        const newFiles=selectedFiles.filter((file)=> !prevFiles.some((f)=> f.name === file.name && f.size === file.size));
        return [...prevFiles,...newFiles]
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

      <div className="bg-gray-800 p-6 rounded-2xl shadow-2xl w-96 text-center">
        <label
            htmlFor="upload"
            className="flex flex-col items-center justify-center border-2 border-dashed border-gray-500 rounded-xl py-10 cursor-pointer hover:bg-gray-700 transition">
        
          
            <Upload className="text-gray-300 mb-3" size={40} />
            <p className="text-gray-200 font-medium">Upload Files</p>
            <input
              id="upload"
              type="file"
              multiple
              className="hidden"
              onChange={handleFile}
            />
          </label>
          <div className="flex items-center justify-center my-4">
            <div className="h-[1px] w-20 bg-gray-600"></div>
            <span className="mx-3 text-gray-400 text-sm">or</span>
            <div className="h-[1px] w-20 bg-gray-600"></div>
          </div>
          
          <div className="mb-4">
            <label htmlFor="select-files" className="flex items-center justify-center gap-2 bg-gray-600 hover:bg-gray-500 text-white py-2 px-4 rounded-full cursor-pointer transition">
              <Upload className="text-white" size={20}/>
              Select Files
            </label>
            <input id="select-files" type="file" multiple className="hidden" onChange={handleFile}/>
          </div>

         {files.length>0 && (
          <div className="space-y-3 mt-4">
            {files.map((file, index) => (
              <div
                key={index}
                className="flex items-center justify-between bg-gray-700 rounded-full px-4 py-3"
              >
                <span className="text-white truncate text-sm">{file.name}</span>
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
            <Button
              onClick={() => setFiles([])}
              className="w-full bg-gray-500 hover:bg-gray-400 text-white rounded-full mt-3"
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
