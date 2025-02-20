
import React, { useState } from 'react';
import { DocumentPreview } from '../components/DocumentPreview';
import { ChatInterface } from '../components/ChatInterface';

const Index = () => {
  const [documents, setDocuments] = useState<string>('');
  const [highlights, setHighlights] = useState<string[]>([]);
  const [messages, setMessages] = useState<Array<{ role: 'user' | 'assistant'; content: string }>>([]);

  const handleFileUpload = async (files: File[]) => {
    const file = files[0];
    const text = await file.text();
    setDocuments(text);
  };

  const handleSendMessage = (message: string) => {
    setMessages(prev => [...prev, { role: 'user', content: message }]);
    
    setTimeout(() => {
      setMessages(prev => [
        ...prev,
        {
          role: 'assistant',
          content: "I've analyzed the document. Here's what I found...",
        },
      ]);
      
      const words = message.split(' ').filter(word => word.length > 4);
      setHighlights(words);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto py-8 max-w-5xl">
        <header className="mb-8 text-center">
          <h1 className="text-4xl font-bold tracking-tight">Document Analysis</h1>
          <p className="text-muted-foreground mt-2">
            Upload documents and ask questions about them
          </p>
        </header>

        <div className="flex flex-col items-center gap-8">
          <div className="w-full max-w-2xl">
            <div className="bg-card rounded-lg shadow-sm h-[600px] flex flex-col">
              <ChatInterface
                messages={messages}
                onSendMessage={handleSendMessage}
                onFileUpload={handleFileUpload}
              />
            </div>
          </div>
          
          <div className="w-full max-w-3xl">
            {documents && (
              <DocumentPreview content={documents} highlights={highlights} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
