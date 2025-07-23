"use client";

import { Button } from "@/components/ui/button";
import { Mail } from "lucide-react";
import { useContact } from "@/hooks/useContact";

interface ContactButtonProps {
  type: 'sales' | 'support' | 'billing' | 'technical';
  context?: {
    apiName?: string;
    apiSlug?: string;
    orderNo?: string;
    description?: string;
    amount?: string;
  };
  children: React.ReactNode;
  className?: string;
  size?: "default" | "sm" | "lg" | "icon";
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
}

export default function ContactButton({ 
  type, 
  context, 
  children, 
  className = "",
  size = "default",
  variant = "default"
}: ContactButtonProps) {
  const { openEmailWithTemplate } = useContact();

  const handleClick = () => {
    openEmailWithTemplate(type, context);
  };

  return (
    <Button 
      size={size}
      variant={variant}
      className={`cursor-pointer ${className}`}
      onClick={handleClick}
    >
      {children}
    </Button>
  );
} 