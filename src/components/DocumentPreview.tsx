
import React from 'react';

interface DocumentPreviewProps {
  content: string;
  highlights: string[];
}

export const DocumentPreview: React.FC<DocumentPreviewProps> = ({ content, highlights }) => {
  const highlightText = (text: string) => {
    let highlightedContent = text;
    highlights.forEach((highlight) => {
      const regex = new RegExp(`(${highlight})`, 'gi');
      highlightedContent = highlightedContent.replace(regex, '<span class="highlighted-text">$1</span>');
    });
    return { __html: highlightedContent };
  };

  return (
    <div className="bg-card rounded-lg p-6 shadow-sm">
      <div 
        className="prose prose-sm max-w-none"
        dangerouslySetInnerHTML={highlightText(content)}
      />
    </div>
  );
};
