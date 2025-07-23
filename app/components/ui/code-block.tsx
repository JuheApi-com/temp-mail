'use client';

import React from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Button } from './button';
import { Copy, Check } from 'lucide-react';
import { useState } from 'react';

interface CodeBlockProps {
  code: string;
  language: string;
  showLineNumbers?: boolean;
  className?: string;
}

export function CodeBlock({ 
  code, 
  language, 
  showLineNumbers = false, 
  className = '' 
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy code:', err);
    }
  };

  return (
    <div className={`relative group ${className}`}>
      <Button 
        size="sm" 
        variant="ghost"
        className="absolute top-3 right-3 z-10 text-gray-400 hover:text-white hover:bg-gray-700 h-8 w-8 p-0 transition-colors opacity-0 group-hover:opacity-100"
        onClick={handleCopy}
      >
        {copied ? (
          <Check className="w-4 h-4 text-green-400" />
        ) : (
          <Copy className="w-4 h-4" />
        )}
      </Button>
      <SyntaxHighlighter
        language={language}
        style={oneDark}
        showLineNumbers={showLineNumbers}
        customStyle={{
          margin: 0,
          borderRadius: '0px',
          fontSize: '14px',
          lineHeight: '1.5',
          minHeight: '120px',
          padding: '16px',
        }}
        codeTagProps={{
          style: {
            fontFamily: 'ui-monospace, SFMono-Regular, "SF Mono", Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
          }
        }}
      >
        {code}
      </SyntaxHighlighter>
    </div>
  );
} 