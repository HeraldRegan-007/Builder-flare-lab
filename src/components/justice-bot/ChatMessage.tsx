import React from "react";
import { cn } from "@/lib/utils";
import { ChatMessage as ChatMessageType } from "@/types/justice-bot";
import { FileText } from "lucide-react";
import { format } from "date-fns";

interface ChatMessageProps {
  message: ChatMessageType;
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isBot = message.role === "bot";

  return (
    <div
      className={cn(
        "flex w-full items-start gap-4 px-4 py-6",
        isBot ? "bg-muted/50" : "bg-background",
      )}
    >
      <div
        className={cn(
          "flex h-8 w-8 shrink-0 select-none items-center justify-center rounded-md border shadow",
          isBot ? "bg-primary text-primary-foreground" : "bg-muted",
        )}
      >
        {isBot ? "AI" : "You"}
      </div>
      <div className="flex-1 space-y-2 overflow-hidden">
        <div className="flex items-center gap-2">
          <div className="font-semibold">{isBot ? "Justice Bot" : "You"}</div>
          <div className="text-xs text-muted-foreground">
            {format(message.timestamp, "h:mm a")}
          </div>
        </div>
        <div className="prose prose-sm max-w-none dark:prose-invert">
          {message.content}
        </div>

        {message.files && message.files.length > 0 && (
          <div className="mt-3">
            <div className="text-xs font-medium text-muted-foreground mb-2">
              Uploaded files:
            </div>
            <div className="flex flex-wrap gap-2">
              {message.files.map((file) => (
                <div
                  key={file.id}
                  className="flex items-center gap-2 rounded-md border px-3 py-1.5 text-sm"
                >
                  <FileText className="h-4 w-4" />
                  <span className="truncate max-w-[140px]">{file.name}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
