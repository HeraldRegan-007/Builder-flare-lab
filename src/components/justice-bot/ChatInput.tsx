import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { Send } from "lucide-react";
import { FileUpload } from "./FileUpload";
import { UploadedFile } from "@/types/justice-bot";

interface ChatInputProps {
  onSubmit: (message: string, files: UploadedFile[]) => void;
  isLoading?: boolean;
}

export function ChatInput({ onSubmit, isLoading = false }: ChatInputProps) {
  const [message, setMessage] = useState("");
  const [selectedFiles, setSelectedFiles] = useState<UploadedFile[]>([]);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (message.trim() || selectedFiles.length > 0) {
      onSubmit(message, selectedFiles);
      setMessage("");
      setSelectedFiles([]);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const handleFilesSelected = (files: UploadedFile[]) => {
    setSelectedFiles((prev) => [...prev, ...files]);
  };

  const handleFileRemove = (fileId: string) => {
    setSelectedFiles((prev) => prev.filter((file) => file.id !== fileId));
  };

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [message]);

  // Focus textarea on component mount
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  }, []);

  return (
    <form onSubmit={handleSubmit} className="relative">
      <div className="relative flex max-h-60 w-full grow flex-col overflow-hidden rounded-md border bg-background px-3 py-2 focus-within:ring-1 focus-within:ring-ring">
        <Textarea
          ref={textareaRef}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask the Justice Bot..."
          className="min-h-[60px] w-full resize-none border-0 bg-transparent p-0 focus-visible:ring-0 focus-visible:ring-offset-0"
          disabled={isLoading}
        />

        <div className="flex items-center justify-between pt-2">
          <FileUpload
            onFilesSelected={handleFilesSelected}
            selectedFiles={selectedFiles}
            onFileRemove={handleFileRemove}
          />
          <Button
            type="submit"
            size="icon"
            disabled={
              isLoading || (!message.trim() && selectedFiles.length === 0)
            }
            className={cn("h-8 w-8", isLoading && "opacity-50")}
          >
            <Send className="h-4 w-4" />
            <span className="sr-only">Send message</span>
          </Button>
        </div>
      </div>
    </form>
  );
}
