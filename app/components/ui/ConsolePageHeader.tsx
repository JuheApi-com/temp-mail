import React from 'react';
import { LucideIcon } from 'lucide-react';

interface ConsolePageHeaderProps {
  icon: LucideIcon;
  title: string;
  subtitle: string;
  gradient?: string;
  children?: React.ReactNode;
}

export default function ConsolePageHeader({ 
  icon: Icon, 
  title, 
  subtitle, 
  gradient = "from-[#6681FC] to-[#25A0FC]",
  children 
}: ConsolePageHeaderProps) {
  return (
    <div className="bg-white/80 backdrop-blur-sm border border-[#BCD8FC]/30 rounded-xl shadow-lg p-4 relative overflow-hidden">
      {/* 标准化渐变顶部边框 */}
      <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${gradient}`} />
      
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-3 self-start sm:self-center">
          <div className={`w-8 h-8 bg-gradient-to-br ${gradient} rounded-lg flex items-center justify-center shadow-lg`}>
            <Icon className="w-4 h-4 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-[#39424D]">{title}</h1>
            <p className="text-sm text-[#39424D]/70">{subtitle}</p>
          </div>
        </div>
        
        {children && (
          <div className="z-10">
            {children}
          </div>
        )}
      </div>
    </div>
  );
}