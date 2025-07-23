import React from 'react';
import { cn } from '../../../lib/utils';

interface ConsoleLayoutProps {
  children: React.ReactNode;
  className?: string;
  spacing?: 'compact' | 'normal' | 'relaxed';
}

export default function ConsoleLayout({ 
  children, 
  className = "",
  spacing = 'normal'
}: ConsoleLayoutProps) {
  const spacingClasses = {
    compact: 'space-y-2',
    normal: 'space-y-3', 
    relaxed: 'space-y-4'
  };

  return (
    <div className={cn(
      spacingClasses[spacing],
      className
    )}>
      {children}
    </div>
  );
}