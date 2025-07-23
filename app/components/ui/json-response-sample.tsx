"use client";

import { useState, useEffect } from "react";
import { Copy, Check } from "lucide-react";
import { Button } from "./button";
import { cn } from "../../../lib/utils";

interface JsonResponseSampleProps {
  title?: string;
  sampleData: object;
  className?: string;
}

export default function JsonResponseSample({ 
  title = "Response Sample", 
  sampleData, 
  className 
}: JsonResponseSampleProps) {
  const [copied, setCopied] = useState(false);
  const [animatedLines, setAnimatedLines] = useState<number[]>([]);

  const jsonString = JSON.stringify(sampleData, null, 2);
  const lines = jsonString.split('\n');

  // 动画效果：逐行显示
  useEffect(() => {
    const timer = setInterval(() => {
      setAnimatedLines(prev => {
        if (prev.length < lines.length) {
          return [...prev, prev.length];
        }
        return prev;
      });
    }, 50);

    return () => clearInterval(timer);
  }, [lines.length]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(jsonString);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className={cn("bg-gray-900 rounded-xl border border-gray-700 overflow-hidden", className)}>
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-gray-800 border-b border-gray-700">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          </div>
          <span className="text-sm font-medium text-gray-300 ml-2">{title}</span>
        </div>
        <Button
          size="sm"
          variant="ghost"
          onClick={handleCopy}
          className="h-8 px-2 text-gray-400 hover:text-white hover:bg-gray-700"
        >
          {copied ? (
            <Check className="w-4 h-4" />
          ) : (
            <Copy className="w-4 h-4" />
          )}
        </Button>
      </div>

      {/* Code Content */}
      <div className="p-4 max-h-96 overflow-y-auto">
        <div className="text-sm font-mono">
          {lines.map((line, index) => (
            <div
              key={index}
              className={cn(
                "transition-opacity duration-100 flex items-start min-h-[1.25rem]",
                animatedLines.includes(index) ? "opacity-100" : "opacity-0"
              )}
            >
              <span className="text-gray-500 select-none mr-4 inline-block w-6 text-right flex-shrink-0 leading-5">
                {index + 1}
              </span>
              <span
                className="text-gray-100 flex-1 break-words whitespace-pre-wrap leading-5"
                dangerouslySetInnerHTML={{
                  __html: highlightJson(line)
                }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="px-4 py-2 bg-gray-800 border-t border-gray-700">
        <div className="flex items-center justify-between text-xs text-gray-400">
          <span>JSON</span>
          <span>{lines.length} lines</span>
        </div>
      </div>
    </div>
  );
}

// 简单的JSON语法高亮
function highlightJson(line: string): string {
  return line
    // 字符串值 (绿色)
    .replace(/"([^"]*)"(\s*:\s*)/g, '<span class="text-blue-300">"$1"</span>$2')
    // 字符串内容 (绿色)
    .replace(/:\s*"([^"]*)"/g, ': <span class="text-green-300">"$1"</span>')
    // 数字 (橙色)
    .replace(/:\s*(\d+\.?\d*)/g, ': <span class="text-orange-400">$1</span>')
    // 布尔值 (紫色)
    .replace(/:\s*(true|false)/g, ': <span class="text-purple-400">$1</span>')
    // null (红色)
    .replace(/:\s*(null)/g, ': <span class="text-red-400">$1</span>')
    // 大括号和方括号 (黄色)
    .replace(/([{}[\]])/g, '<span class="text-yellow-400">$1</span>')
    // 逗号 (灰色)
    .replace(/(,)/g, '<span class="text-gray-400">$1</span>');
} 