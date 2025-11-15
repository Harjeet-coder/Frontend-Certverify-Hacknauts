import { useState, useRef } from 'react';
import { Upload, File } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface UploadBoxProps {
  onUpload: (
    file: File,
    category: string,
    name: string,
    regNo: string,
    desc: string
  ) => void;
}

export const UploadBox = ({ onUpload }: UploadBoxProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const [category, setCategory] = useState("");
  const [studentName, setStudentName] = useState("");
  const [regNo, setRegNo] = useState("");
  const [description, setDescription] = useState("");

  const fileInputRef = useRef<HTMLInputElement>(null);

  const isFormValid =
    selectedFile && category && studentName && regNo && description;

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => setIsDragging(false);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) setSelectedFile(file);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setSelectedFile(file);
  };

  const handleUpload = () => {
    if (!isFormValid) return;

    onUpload(selectedFile!, category, studentName, regNo, description);

    setSelectedFile(null);
    setCategory("");
    setStudentName("");
    setRegNo("");
    setDescription("");

    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <Card
      className="
        bg-white/[0] 
        border border-white/20 
        backdrop-blur-xl 
        shadow-[0_0_25px_rgba(255,255,255,0.14)]
        hover:shadow-[0_0_35px_rgba(255,255,255,0.20)]
        transition-all duration-300
        rounded-xl
      "
    >
      <CardContent className="p-8 space-y-8">

        {/* CATEGORY SELECTION */}
        <div className="space-y-2 text-white">
          <p className="font-semibold">Select Category *</p>

          <div className="grid grid-cols-3 gap-3">
            {["Technical", "Non Technical", "Workshops"].map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={cn(
                  "px-4 py-2 rounded-lg text-sm font-medium transition-all border",

                  // SELECTED = BLUE
                  category === cat
                    ? "bg-blue-600 border-blue-400 text-white shadow-[0_0_12px_rgba(37,99,235,0.5)]"

                    // DEFAULT = RED
                    : "bg-red-600 border-red-500 text-white hover:bg-red-700"
                )}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* STUDENT DETAILS */}
        <div className="space-y-4">
          <input
            type="text"
            required
            placeholder="Student Name *"
            className="
              w-full p-3 rounded-lg
              bg-[#0D1628]
              border border-white/20
              text-white 
              placeholder-gray-400
              focus:border-blue-400 
              focus:ring-2 focus:ring-blue-500/30
              outline-none transition-all
            "
            value={studentName}
            onChange={(e) => setStudentName(e.target.value)}
          />

          <input
            type="text"
            required
            placeholder="Register Number *"
            className="
              w-full p-3 rounded-lg
              bg-[#0D1628]
              border border-white/20
              text-white 
              placeholder-gray-400
              focus:border-blue-400 
              focus:ring-2 focus:ring-blue-500/30
              outline-none transition-all
            "
            value={regNo}
            onChange={(e) => setRegNo(e.target.value)}
          />

          <textarea
            required
            placeholder="Short Description about the certificate *"
            className="
              w-full p-3 rounded-lg h-24
              bg-[#0D1628]
              border border-white/20
              text-white 
              placeholder-gray-400
              focus:border-blue-400 
              focus:ring-2 focus:ring-blue-500/30
              outline-none transition-all
            "
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        {/* FILE DROPZONE */}
        <div
          className={cn(
            "border-2 border-dashed rounded-lg p-10 text-center transition-all duration-300",
            "bg-white/[0.05] backdrop-blur-lg",
            isDragging
              ? "border-blue-400 bg-blue-500/10 shadow-[0_0_25px_rgba(0,123,255,0.35)]"
              : "border-white/30 hover:border-blue-400 hover:bg-white/[0.08]"
          )}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <input
            ref={fileInputRef}
            type="file"
            className="hidden"
            accept=".pdf,.jpg,.jpeg,.png"
            onChange={handleFileSelect}
          />

          {selectedFile ? (
            <div className="space-y-5">
              <File className="w-12 h-12 mx-auto text-blue-400" />

              <div>
                <p className="font-semibold text-white">{selectedFile.name}</p>
                <p className="text-sm text-gray-300">
                  {(selectedFile.size / 1024).toFixed(2)} KB
                </p>
              </div>

              <div className="flex gap-3 justify-center">
                <Button
                  onClick={handleUpload}
                  disabled={!isFormValid}
                  className={cn(
                    "bg-blue-500 hover:bg-blue-600 text-white px-6",
                    !isFormValid && "opacity-50 cursor-not-allowed"
                  )}
                >
                  <Upload className="w-4 h-4 mr-2" />
                  Upload & Verify
                </Button>

                <Button
                  variant="outline"
                  className="border-white/30 text-white hover:bg-white/10"
                  onClick={() => {
                    setSelectedFile(null);
                    if (fileInputRef.current) fileInputRef.current.value = "";
                  }}
                >
                  Cancel
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-5">
              <Upload className="w-12 h-12 mx-auto text-gray-300" />

              <p className="font-semibold text-white">
                Drag & drop your certificate here
              </p>

              <Button
                onClick={() => fileInputRef.current?.click()}
                className="bg-blue-500 hover:bg-blue-600 text-white px-6"
              >
                Choose File
              </Button>

              <p className="text-xs text-gray-400">
                Supported formats: PDF, JPG, PNG (Max 5MB)
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
