import React, { useState } from "react";
import { ChatSidebar } from "@/components/justice-bot/ChatSidebar";
import { ChatArea } from "@/components/justice-bot/ChatArea";
import { ChatInput } from "@/components/justice-bot/ChatInput";
import { Chat, ChatMessage, UploadedFile } from "@/types/justice-bot";
import { v4 as uuidv4 } from "@/lib/uuid";
import { useMediaQuery } from "@/hooks/use-media-query";

export default function JusticeBot() {
  const [chats, setChats] = useState<Chat[]>([]);
  const [currentChatId, setCurrentChatId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const isMobile = useMediaQuery("(max-width: 768px)");

  // Get current chat messages
  const currentChat = chats.find((chat) => chat.id === currentChatId);
  const messages = currentChat?.messages || [];

  const handleNewChat = () => {
    const newChatId = uuidv4();
    const newChat: Chat = {
      id: newChatId,
      title: "New Chat",
      messages: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    setChats((prev) => [...prev, newChat]);
    setCurrentChatId(newChatId);
  };

  const handleChatSelect = (chatId: string) => {
    setCurrentChatId(chatId);
  };

  const handleSendMessage = async (content: string, files: UploadedFile[]) => {
    if (!currentChatId) {
      handleNewChat();
      return;
    }

    // Create user message
    const userMessage: ChatMessage = {
      id: uuidv4(),
      content,
      role: "user",
      timestamp: new Date(),
      files: files.length > 0 ? files : undefined,
    };

    // Update chats with user message
    setChats((prev) =>
      prev.map((chat) => {
        if (chat.id === currentChatId) {
          // Update chat title if it's the first message
          const isFirstMessage = chat.messages.length === 0;
          const newTitle = isFirstMessage
            ? content.slice(0, 30) + (content.length > 30 ? "..." : "")
            : chat.title;

          return {
            ...chat,
            title: newTitle,
            messages: [...chat.messages, userMessage],
            updatedAt: new Date(),
          };
        }
        return chat;
      }),
    );

    // Simulate bot response
    setIsLoading(true);

    // Wait for a short delay to simulate processing
    setTimeout(() => {
      // Create bot response
      const botMessage: ChatMessage = {
        id: uuidv4(),
        content:
          "Thank you for your question. As a Justice Bot, I'm here to assist with legal information. Please note that my responses are for informational purposes only and should not be considered legal advice. For specific legal concerns, I recommend consulting with a qualified attorney.",
        role: "bot",
        timestamp: new Date(),
      };

      // Update chats with bot response
      setChats((prev) =>
        prev.map((chat) => {
          if (chat.id === currentChatId) {
            return {
              ...chat,
              messages: [...chat.messages, botMessage],
              updatedAt: new Date(),
            };
          }
          return chat;
        }),
      );

      setIsLoading(false);
    }, 1500);
  };

  // If there are no chats, create a new one
  React.useEffect(() => {
    if (chats.length === 0) {
      handleNewChat();
    }
  }, [chats.length]);

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-background md:flex-row">
      <ChatSidebar
        chats={chats}
        currentChatId={currentChatId}
        onChatSelect={handleChatSelect}
        onNewChat={handleNewChat}
        isMobile={isMobile}
      />

      <div className="flex flex-1 flex-col overflow-hidden">
        <header className="flex h-14 items-center justify-between border-b px-4 md:h-16">
          <div className="flex items-center gap-2">
            {isMobile && (
              <ChatSidebar
                chats={chats}
                currentChatId={currentChatId}
                onChatSelect={handleChatSelect}
                onNewChat={handleNewChat}
                isMobile={true}
              />
            )}
            <h1 className="text-lg font-semibold">Justice Bot</h1>
          </div>
        </header>

        <main className="flex flex-1 flex-col overflow-hidden">
          <ChatArea
            messages={messages}
            isLoading={isLoading}
            className="flex-1"
          />

          <div className="border-t bg-background p-4">
            <div className="mx-auto max-w-3xl">
              <ChatInput onSubmit={handleSendMessage} isLoading={isLoading} />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
