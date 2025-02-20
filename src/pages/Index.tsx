
import React, { useState } from 'react';
import { DocumentPreview } from '../components/DocumentPreview';
import { ChatInterface } from '../components/ChatInterface';
import { format } from 'date-fns';
import { Calendar } from 'lucide-react';

interface CalendarEvent {
  company: string;
  event: string;
  time: string;
  date: Date;
}

const Index = () => {
  const [documents, setDocuments] = useState<string>('');
  const [highlights, setHighlights] = useState<string[]>([]);
  const [messages, setMessages] = useState<Array<{ role: 'user' | 'assistant'; content: string }>>([]);

  // Mock calendar events - in a real app, this would come from an API
  const [events] = useState<CalendarEvent[]>([
    {
      company: 'Microsoft',
      event: 'Q3 2024 Earnings Report',
      time: '22:00',
      date: new Date(),
    },
    {
      company: 'Apple',
      event: 'Product Launch',
      time: '19:00',
      date: new Date(Date.now() + 86400000), // Tomorrow
    }
  ]);

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

        <div className="flex justify-center gap-8 relative">
          <div className="w-full max-w-2xl">
            <div className="bg-card rounded-lg shadow-sm mb-6">
              <div className="p-4 border-b">
                <div className="flex items-center gap-2 text-primary">
                  <Calendar className="h-5 w-5" />
                  <h2 className="font-semibold">Important Events Today</h2>
                </div>
                <div className="mt-3 space-y-2">
                  {events
                    .filter(event => format(event.date, 'yyyy-MM-dd') === format(new Date(), 'yyyy-MM-dd'))
                    .map((event, index) => (
                      <div key={index} className="flex items-center justify-between bg-muted/50 rounded-lg p-3">
                        <div>
                          <span className="font-medium">{event.company}</span>
                          <p className="text-sm text-muted-foreground">{event.event}</p>
                        </div>
                        <span className="text-sm font-medium">{event.time}</span>
                      </div>
                    ))}
                </div>
              </div>
            </div>
            <div className="bg-card rounded-lg shadow-sm h-[600px] flex flex-col">
              <ChatInterface
                messages={messages}
                onSendMessage={handleSendMessage}
                onFileUpload={handleFileUpload}
              />
            </div>
          </div>
          
          {documents && (
            <div className="fixed right-8 top-[140px] w-[400px] max-h-[calc(100vh-180px)] overflow-y-auto animate-fade-in">
              <DocumentPreview content={documents} highlights={highlights} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;
