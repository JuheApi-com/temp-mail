import React from 'react';
import { cn } from '@/lib/utils';

interface ConsoleCardProps {
  children: React.ReactNode;
  className?: string;
  gradient?: string;
  hover?: boolean;
}

export default function ConsoleCard({ 
  children, 
  className = "",
  gradient = "from-[#6681FC] to-[#25A0FC]",
  hover = true
}: ConsoleCardProps) {
  return (
    <div className={cn(
      "bg-white/80 backdrop-blur-sm border border-[#BCD8FC]/30 rounded-2xl shadow-lg relative overflow-hidden",
      hover && "hover:shadow-xl transition-all duration-300",
      className
    )}>
      {/* 标准化渐变顶部边框 */}
      <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${gradient}`} />
      
      {children}
    </div>
  );
}