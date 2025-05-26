import React, { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Paperclip, X, FileText } from "lucide-react";
import { UploadedFile } from "@/types/justice-bot";
import { v4 as uuidv4 } from "@/lib/uuid";

interface FileUploadProps {
  onFilesSelected: (files: UploadedFile[]) => void;
  selectedFiles: UploadedFile[];
  onFileRemove: (fileId: string) => void;
}

export function FileUpload({
  onFilesSelected,
  selectedFiles,
  onFileRemove,
}: FileUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const newFiles: UploadedFile[] = Array.from(event.target.files).map(
        (file) => ({
          id: uuidv4(),
          name: file.name,
          size: file.size,
          type: file.type,
          url: URL.createObjectURL(file),
        }),
      );

      onFilesSelected(newFiles);

      // Reset the input value so the same file can be selected again
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault();
    setIsDragging(false);

    if (event.dataTransfer.files && event.dataTransfer.files.length > 0) {
      const newFiles: UploadedFile[] = Array.from(event.dataTransfer.files).map(
        (file) => ({
          id: uuidv4(),
          name: file.name,
          size: file.size,
          type: file.type,
          url: URL.createObjectURL(file),
        }),
      );

      onFilesSelected(newFiles);
    }
  };

  return (
    <div className="w-full">
      <input
        ref={fileInputRef}
        type="file"
        className="hidden"
        multiple
        onChange={handleFileChange}
        accept=".pdf,.doc,.docx,.txt,.rtf,.jpg,.jpeg,.png"
      />

      <div
        className={cn(
          "relative rounded-md transition-colors",
          isDragging && "bg-muted",
        )}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={() => fileInputRef.current?.click()}
          className="h-8 w-8"
        >
          <Paperclip className="h-4 w-4" />
          <span className="sr-only">Attach files</span>
        </Button>
      </div>

      {selectedFiles.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-2">
          {selectedFiles.map((file) => (
            <div
              key={file.id}
              className="flex items-center gap-2 rounded-md border bg-background px-3 py-1.5 text-sm"
            >
              <FileText className="h-4 w-4 text-muted-foreground" />
              <span className="truncate max-w-[140px]">{file.name}</span>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => onFileRemove(file.id)}
                className="h-5 w-5 rounded-full p-0 text-muted-foreground hover:text-foreground"
              >
                <X className="h-3 w-3" />
                <span className="sr-only">Remove {file.name}</span>
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
