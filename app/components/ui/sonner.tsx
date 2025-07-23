'use client';

import { useTheme } from 'next-themes';
import { Toaster as Sonner } from 'sonner';

type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = 'system' } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps['theme']}
      className="toaster group"
      position="top-center"
      expand={true}
      richColors={true}
      toastOptions={{
        duration: 6000,
        classNames: {
          toast:
            'group toast group-[.toaster]:bg-card group-[.toaster]:text-foreground group-[.toaster]:shadow-xl group-[.toaster]:border-2',
          description: 'group-[.toast]:text-muted-foreground',
          actionButton:
            'group-[.toast]:bg-primary group-[.toast]:text-primary-foreground',
          cancelButton:
            'group-[.toast]:bg-muted group-[.toast]:text-muted-foreground',
          success: 'group-[.toaster]:!bg-card group-[.toaster]:!border-blue-500/80 group-[.toaster]:!text-foreground',
          error: 'group-[.toaster]:!bg-card group-[.toaster]:!border-destructive/80 group-[.toaster]:!text-foreground',
          warning: 'group-[.toaster]:!bg-card group-[.toaster]:!border-yellow-500/80 group-[.toaster]:!text-foreground',
          info: 'group-[.toaster]:!bg-card group-[.toaster]:!border-blue-500/80 group-[.toaster]:!text-foreground',
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
