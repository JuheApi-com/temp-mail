import React from 'react';
import { Button, ButtonProps } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface GradientButtonProps extends Omit<ButtonProps, 'variant'> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  gradientDirection?: 'r' | 'l' | 'br' | 'bl';
  reverseOnHover?: boolean;
}

const gradientStyles = {
  primary: {
    base: 'from-[#6681FC] to-[#25A0FC]',
    reverse: 'from-[#25A0FC] to-[#6681FC]'
  },
  secondary: {
    base: 'from-blue-500 to-cyan-500',
    reverse: 'from-cyan-500 to-blue-500'
  }
};

export const GradientButton: React.FC<GradientButtonProps> = ({
  children,
  className,
  variant = 'primary',
  gradientDirection = 'r',
  reverseOnHover = true,
  disabled,
  ...props
}) => {
  const getGradientClasses = () => {
    if (variant === 'outline') {
      return cn(
        'border-2 border-[#BCD8FC] bg-white/70 text-[#39424D]',
        'hover:bg-white hover:border-[#6681FC] hover:text-[#6681FC]',
        'transition-all duration-300'
      );
    }

    if (variant === 'ghost') {
      return cn(
        'text-[#6681FC] bg-transparent',
        'hover:text-[#25A0FC] hover:bg-white/50',
        'transition-all duration-300'
      );
    }

    const gradientStyle = gradientStyles[variant === 'secondary' ? 'secondary' : 'primary'];
    const baseGradient = `bg-gradient-to-${gradientDirection} ${gradientStyle.base}`;
    const hoverGradient = reverseOnHover ? `hover:bg-gradient-to-${gradientDirection} ${gradientStyle.reverse}` : '';

    return cn(
      baseGradient,
      hoverGradient,
      'text-white shadow-lg hover:shadow-xl transition-all duration-300',
      disabled && 'opacity-50 cursor-not-allowed'
    );
  };

  return (
    <Button
      className={cn(
        getGradientClasses(),
        className
      )}
      disabled={disabled}
      {...props}
    >
      {children}
    </Button>
  );
};

export default GradientButton;