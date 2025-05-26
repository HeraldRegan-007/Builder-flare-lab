import React from "react";
import { Chat } from "@/types/justice-bot";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { PlusCircle, MessageSquare } from "lucide-react";
import { format } from "date-fns";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

interface ChatSidebarProps {
  chats: Chat[];
  currentChatId: string | null;
  onChatSelect: (chatId: string) => void;
  onNewChat: () => void;
  className?: string;
  isMobile?: boolean;
}

export function ChatSidebar({
  chats,
  currentChatId,
  onChatSelect,
  onNewChat,
  className,
  isMobile = false,
}: ChatSidebarProps) {
  const sortedChats = [...chats].sort(
    (a, b) => b.updatedAt.getTime() - a.updatedAt.getTime(),
  );

  const SidebarContent = (
    <div className="flex h-full flex-col gap-2">
      <div className="px-4 py-4">
        <h2 className="mb-2 px-2 text-lg font-semibold">Chats</h2>
        <Button
          onClick={onNewChat}
          className="w-full justify-start gap-2"
          variant="outline"
        >
          <PlusCircle className="h-4 w-4" />
          New Chat
        </Button>
      </div>
      <ScrollArea className="flex-1 px-4">
        <div className="space-y-2 pb-4">
          {sortedChats.length > 0 ? (
            sortedChats.map((chat) => (
              <button
                key={chat.id}
                onClick={() => onChatSelect(chat.id)}
                className={cn(
                  "flex w-full flex-col items-start gap-1 rounded-md border px-4 py-3 text-left text-sm transition-colors hover:bg-accent",
                  currentChatId === chat.id && "bg-accent",
                )}
              >
                <div className="flex w-full items-center justify-between">
                  <span className="font-medium line-clamp-1">{chat.title}</span>
                  <span className="text-xs text-muted-foreground">
                    {format(chat.updatedAt, "MMM d")}
                  </span>
                </div>
                <span className="line-clamp-1 text-xs text-muted-foreground">
                  {chat.messages.length} messages
                </span>
              </button>
            ))
          ) : (
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <MessageSquare className="h-12 w-12 text-muted-foreground opacity-50" />
              <h3 className="mt-4 text-lg font-semibold">No chats yet</h3>
              <p className="mb-4 mt-2 text-sm text-muted-foreground">
                Start a new chat to begin a conversation with the Justice Bot.
              </p>
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  );

  if (isMobile) {
    return (
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="md:hidden">
            <MessageSquare className="h-5 w-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="p-0 pt-10">
          {SidebarContent}
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <div
      className={cn(
        "hidden border-r bg-background md:flex md:w-80 md:flex-col",
        className,
      )}
    >
      {SidebarContent}
    </div>
  );
}
