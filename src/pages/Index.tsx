
import React, { useState } from 'react';
import { FileUpload } from '../components/FileUpload';
import { DocumentPreview } from '../components/DocumentPreview';
import { ChatInterface } from '../components/ChatInterface';

const Index = () => {
  const [documents, setDocuments] = useState<string>('');
  const [highlights, setHighlights] = useState<string[]>([]);
  const [messages, setMessages] = useState<Array<{ role: 'user' | 'assistant'; content: string }>>([]);

  const handleFileUpload = async (files: File[]) => {
    // For demo purposes, we'll just read the first file as text
    const file = files[0];
    const text = await file.text();
    setDocuments(text);
  };

  const handleSendMessage = (message: string) => {
    // Add user message
    setMessages(prev => [...prev, { role: 'user', content: message }]);
    
    // Simulate AI response
    setTimeout(() => {
      setMessages(prev => [
        ...prev,
        {
          role: 'assistant',
          content: "I've analyzed the document. Here's what I found...",
        },
      ]);
      
      // Simulate highlighting relevant parts
      const words = message.split(' ').filter(word => word.length > 4);
      setHighlights(words);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto py-8">
        <header className="mb-8">
          <h1 className="text-4xl font-bold tracking-tight">Document Analysis</h1>
          <p className="text-muted-foreground mt-2">
            Upload documents and ask questions about them
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-8">
            <FileUpload onFileUpload={handleFileUpload} />
            {documents && (
              <DocumentPreview content={documents} highlights={highlights} />
            )}
          </div>
          
          <div className="bg-card rounded-lg shadow-sm h-[600px] flex flex-col">
            <ChatInterface
              messages={messages}
              onSendMessage={handleSendMessage}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
