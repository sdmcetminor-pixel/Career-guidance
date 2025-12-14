"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Minus, Square } from "lucide-react";

type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
};

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const listRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // scroll to bottom when messages change
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, isLoading]);

  async function handleSubmit(e?: React.FormEvent) {
    e?.preventDefault();
    const text = input.trim();
    if (!text) return;

    const userMsg: Message = { id: Date.now().toString(), role: "user", content: text };
    const nextMessages = [...messages, userMsg];
    setMessages(nextMessages);
    setInput("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: nextMessages.map((m) => ({ role: m.role, content: m.content })),
        }),
      });

      if (!res.ok) throw new Error("API error");

      // expect { reply: string } or similar — adapt if your API differs
      const data = await res.json();
      const replyText = data?.reply ?? "Sorry, something went wrong.";

      const botMsg: Message = { id: (Date.now() + 1).toString(), role: "assistant", content: replyText };
      setMessages((s) => [...s, botMsg]);
    } catch (err) {
      const errMsg: Message = { id: (Date.now() + 2).toString(), role: "assistant", content: "Error: could not get response." };
      setMessages((s) => [...s, errMsg]);
    } finally {
      setIsLoading(false);
    }
  }

  if (isMinimized) {
    return (
      <Card className="fixed right-4 bottom-4 z-50 w-[320px] max-w-[calc(100vw-2rem)] rounded-xl overflow-hidden">
        <CardHeader className="px-4 py-3 flex flex-row items-center justify-between space-y-0">
          <div>
            <div className="text-base font-semibold">AI Career Chat</div>
            <div className="text-xs text-muted-foreground">Minimized</div>
          </div>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            aria-label="Maximize chat"
            onClick={() => setIsMinimized(false)}
          >
            <Square className="h-4 w-4" />
          </Button>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Card className="fixed right-4 bottom-4 z-50 flex flex-col w-[360px] max-w-[calc(100vw-2rem)] h-[70vh] rounded-xl overflow-hidden">
      <CardHeader className="px-4 py-3 border-b flex flex-row items-start justify-between space-y-0">
        <div>
          <div className="text-base font-semibold">AI Career Chat</div>
          <div className="text-xs text-muted-foreground">Ask about streams, careers, exams, courses.</div>
        </div>

        <Button
          type="button"
          variant="ghost"
          size="icon"
          aria-label="Minimize chat"
          onClick={() => setIsMinimized(true)}
        >
          <Minus className="h-4 w-4" />
        </Button>
      </CardHeader>

      {/* Chat messages */}
      <CardContent ref={listRef} className="flex-1 overflow-y-auto overflow-x-hidden space-y-3 p-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={cn(
              "p-3 rounded-lg max-w-[85%] whitespace-pre-wrap break-words",
              msg.role === "user"
                ? "bg-primary text-primary-foreground ml-auto"
                : "bg-muted text-foreground"
            )}
          >
            {msg.content}
          </div>
        ))}

        {isLoading && <div className="text-sm text-muted-foreground">AI is typing...</div>}
      </CardContent>

      {/* Input box */}
      <form onSubmit={handleSubmit} className="flex gap-2 p-3 border-t">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask about careers, skills, roadmap..."
          className="flex-1"
        />
        <Button type="submit" disabled={isLoading}>
          Send
        </Button>
      </form>
    </Card>
  );
}
