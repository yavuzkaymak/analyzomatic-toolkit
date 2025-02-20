
import React, { useState } from 'react';
import { Send } from 'lucide-react';

interface ChatInterfaceProps {
  onSendMessage: (message: string) => void;
  messages: Array<{
    role: 'user' | 'assistant';
    content: string;
  }>;
}

export const ChatInterface: React.FC<ChatInterfaceProps> = ({ onSendMessage, messages }) => {
  const [input, setInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      onSendMessage(input);
      setInput('');
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${
              message.role === 'user' ? 'justify-end' : 'justify-start'
            }`}
          >
            <div
              className={`rounded-lg px-4 py-2 max-w-[80%] ${
                message.role === 'user'
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted'
              }`}
            >
              {message.content}
            </div>
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="border-t p-4">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about the document..."
            className="flex-1 rounded-lg border bg-background px-3 py-2 text-sm"
          />
          <button
            type="submit"
            className="rounded-lg bg-primary px-3 py-2 text-primary-foreground"
          >
            <Send className="h-4 w-4" />
          </button>
        </div>
      </form>
    </div>
  );
};
