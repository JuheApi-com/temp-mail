import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import rehypeRaw from 'rehype-raw';
import 'highlight.js/styles/github.css';

interface MarkdownRendererProps {
  content: string;
  className?: string;
}

const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content, className = '' }) => {
  return (
    <div className={`prose prose-gray max-w-none ${className}`}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeHighlight, rehypeRaw]}
        components={{
          // Custom styling for markdown elements
          h1: ({ node, ...props }) => (
            <h1 className="text-3xl font-bold text-gray-800 mb-6 mt-8 first:mt-0" {...props} />
          ),
          h2: ({ node, ...props }) => (
            <h2 className="text-2xl font-semibold text-gray-800 mb-4 mt-6 first:mt-0" {...props} />
          ),
          h3: ({ node, ...props }) => (
            <h3 className="text-xl font-semibold text-gray-800 mb-3 mt-5 first:mt-0" {...props} />
          ),
          h4: ({ node, ...props }) => (
            <h4 className="text-lg font-semibold text-gray-800 mb-2 mt-4 first:mt-0" {...props} />
          ),
          h5: ({ node, ...props }) => (
            <h5 className="text-base font-semibold text-gray-800 mb-2 mt-3 first:mt-0" {...props} />
          ),
          h6: ({ node, ...props }) => (
            <h6 className="text-sm font-semibold text-gray-800 mb-2 mt-3 first:mt-0" {...props} />
          ),
          p: ({ node, ...props }) => (
            <p className="text-gray-700 mb-4 leading-relaxed" {...props} />
          ),
          ul: ({ node, ...props }) => (
            <ul className="list-disc list-inside mb-4 space-y-2 text-gray-700" {...props} />
          ),
          ol: ({ node, ...props }) => (
            <ol className="list-decimal list-inside mb-4 space-y-2 text-gray-700" {...props} />
          ),
          li: ({ node, ...props }) => (
            <li className="text-gray-700" {...props} />
          ),
          code: ({ node, className, children, ...props }: any) => {
            const match = /language-(\w+)/.exec(className || '');
            const isInline = !match;
            return isInline ? (
              <code className="bg-gray-100 text-gray-800 px-1 py-0.5 rounded text-sm font-mono" {...props}>
                {children}
              </code>
            ) : (
              <code className="block bg-gray-100 text-gray-800 p-4 rounded-lg text-sm font-mono overflow-x-auto" {...props}>
                {children}
              </code>
            );
          },
          pre: ({ node, ...props }) => (
            <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto mb-4" {...props} />
          ),
          blockquote: ({ node, ...props }) => (
            <blockquote className="border-l-4 border-blue-500 pl-4 italic text-gray-600 mb-4" {...props} />
          ),
          table: ({ node, ...props }) => (
            <div className="overflow-x-auto mb-4">
              <table className="min-w-full border-collapse border border-gray-300" {...props} />
            </div>
          ),
          th: ({ node, ...props }) => (
            <th className="border border-gray-300 bg-gray-50 px-4 py-2 text-left font-semibold text-gray-800" {...props} />
          ),
          td: ({ node, ...props }) => (
            <td className="border border-gray-300 px-4 py-2 text-gray-700" {...props} />
          ),
          a: ({ node, ...props }) => (
            <a className="text-[#07AAFF] hover:text-[#0690D9] underline" {...props} />
          ),
          hr: ({ node, ...props }) => (
            <hr className="border-t border-gray-300 my-6" {...props} />
          ),
          strong: ({ node, ...props }) => (
            <strong className="font-semibold text-gray-800" {...props} />
          ),
          em: ({ node, ...props }) => (
            <em className="italic text-gray-700" {...props} />
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};

export default MarkdownRenderer; 