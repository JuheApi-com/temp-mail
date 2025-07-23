import React from 'react';
import { cn } from '../../../lib/utils';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'enhanced' | 'subtle';
  gradientBorder?: 'primary' | 'blue' | 'green' | 'purple' | 'orange' | 'red' | 'none';
  hover?: boolean;
  onClick?: () => void;
}

const gradientBorderStyles = {
  primary: 'bg-gradient-to-r from-[#6681FC] to-[#25A0FC]',
  blue: 'bg-gradient-to-r from-blue-500 to-indigo-500',
  green: 'bg-gradient-to-r from-green-500 to-emerald-500',
  purple: 'bg-gradient-to-r from-purple-500 to-pink-500',
  orange: 'bg-gradient-to-r from-orange-500 to-red-500',
  red: 'bg-gradient-to-r from-red-500 to-pink-500',
  none: ''
};

const variantStyles = {
  default: 'bg-white/80 backdrop-blur-sm border border-[#BCD8FC]/30 shadow-lg',
  enhanced: 'bg-white/60 backdrop-blur-lg border border-[#BCD8FC]/30 shadow-lg',
  subtle: 'bg-white/90 backdrop-blur-sm border border-[#BCD8FC]/20 shadow-md'
};

export const GlassCard: React.FC<GlassCardProps> = ({
  children,
  className,
  variant = 'default',
  gradientBorder = 'none',
  hover = false,
  onClick
}) => {
  const baseClasses = cn(
    'rounded-2xl relative overflow-hidden transition-all duration-300',
    variantStyles[variant],
    hover && 'hover:shadow-xl',
    onClick && 'cursor-pointer',
    className
  );

  return (
    <div className={baseClasses} onClick={onClick}>
      {gradientBorder !== 'none' && (
        <div className={cn('absolute top-0 left-0 right-0 h-1', gradientBorderStyles[gradientBorder])} />
      )}
      {children}
    </div>
  );
};

export default GlassCard;