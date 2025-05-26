import React, { useEffect, useRef } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChatMessage } from "./ChatMessage";
import { ChatMessage as ChatMessageType } from "@/types/justice-bot";
import { cn } from "@/lib/utils";

interface ChatAreaProps {
  messages: ChatMessageType[];
  isLoading?: boolean;
  className?: string;
}

export function ChatArea({
  messages,
  isLoading = false,
  className,
}: ChatAreaProps) {
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to the bottom when new messages are added
  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className={cn("flex flex-col h-full", className)}>
      {messages.length === 0 ? (
        <div className="flex flex-1 flex-col items-center justify-center gap-2 p-8 text-center">
          <div className="rounded-full bg-primary/10 p-3">
            <div className="h-10 w-10 rounded-full border-4 border-muted-foreground/30 border-t-primary animate-spin" />
          </div>
          <h3 className="text-xl font-semibold">Justice Bot</h3>
          <p className="max-w-md text-muted-foreground">
            Ask legal questions and get guidance from our AI assistant. Upload
            documents for additional context.
          </p>
        </div>
      ) : (
        <ScrollArea ref={scrollAreaRef} className="flex-1">
          <div className="flex flex-col divide-y">
            {messages.map((message) => (
              <ChatMessage key={message.id} message={message} />
            ))}
          </div>

          {isLoading && (
            <div className="flex items-center justify-center p-4">
              <div className="h-6 w-6 rounded-full border-2 border-muted-foreground/30 border-t-primary animate-spin" />
            </div>
          )}
        </ScrollArea>
      )}
    </div>
  );
}
