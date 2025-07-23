"use client";

import React from "react";
import { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Dialog, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { cn } from '@/lib/utils';

interface SocialLoginDetectorProps {
  onLoginSuccess?: () => void;
  onLoginError?: (error: any) => void;
}

// Custom DialogContent without default close button
const CustomDialogContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <DialogPrimitive.Portal>
    <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
    <DialogPrimitive.Content
      ref={ref}
      className={cn(
        'fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] rounded-2xl',
        className
      )}
      {...props}
    >
      {children}
    </DialogPrimitive.Content>
  </DialogPrimitive.Portal>
));
CustomDialogContent.displayName = DialogPrimitive.Content.displayName;

export default function SocialLoginDetector({ 
  onLoginSuccess,
  onLoginError 
}: SocialLoginDetectorProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [showPrompt, setShowPrompt] = useState(false);
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    // Check if popup should be shown
    checkShouldShowPopup();
  }, []);

  const checkShouldShowPopup = async () => {
    try {
      // 1. Check if user is currently logged in
      const response = await fetch('/api/users');
      if (response.ok) {
        const userData = await response.json();
        if (userData.user && userData.user.id) {
          // User is currently logged in, don't show popup
          setIsLoading(false);
          return;
        }
      }
    } catch (error) {
      console.debug('Failed to check user login status:', error);
    }

    // 2. Check if user has previously logged in successfully in this browser
    const hasLoggedInBefore = localStorage.getItem('juheapi-has-logged-in');
    if (hasLoggedInBefore === 'true') {
      // User has logged in before in this browser, don't show popup
      setIsLoading(false);
      return;
    }

    // 3. Check if user has dismissed the prompt permanently
    const dismissed = localStorage.getItem('social-login-prompt-dismissed');
    if (dismissed === 'true') {
      // User has chosen "Don't show again", don't show popup
      setIsLoading(false);
      return;
    }

    // 4. Show popup after 10 seconds delay
    const timer = setTimeout(() => {
      setShowPrompt(true);
      setIsLoading(false);
    }, 10000);

    return () => clearTimeout(timer);
  };

  // Countdown timer for auto-close
  useEffect(() => {
    if (showPrompt && countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);

      return () => clearTimeout(timer);
    } else if (showPrompt && countdown === 0) {
      // Auto-close when countdown reaches 0
      setShowPrompt(false);
    }
  }, [showPrompt, countdown]);

  const handleGoogleLogin = async () => {
    setIsSigningIn(true);
    setShowPrompt(false);
    
    try {
      // Redirect to Logto Google login
      const redirectUrl = new URL('/api/auth/sign-in', window.location.origin);
      redirectUrl.searchParams.set('provider', 'google');
      
      // Add callback URL
      const currentPath = window.location.pathname + window.location.search;
      redirectUrl.searchParams.set('post_login_redirect_uri', currentPath);
      
      window.location.href = redirectUrl.toString();
    } catch (error) {
      console.error('Google login failed:', error);
      if (onLoginError) {
        onLoginError(error);
      }
      setIsSigningIn(false);
    }
  };

  const handleGitHubLogin = async () => {
    setIsSigningIn(true);
    setShowPrompt(false);
    
    try {
      // Redirect to Logto GitHub login
      const redirectUrl = new URL('/api/auth/sign-in', window.location.origin);
      redirectUrl.searchParams.set('provider', 'github');
      
      // Add callback URL
      const currentPath = window.location.pathname + window.location.search;
      redirectUrl.searchParams.set('post_login_redirect_uri', currentPath);
      
      window.location.href = redirectUrl.toString();
    } catch (error) {
      console.error('GitHub login failed:', error);
      if (onLoginError) {
        onLoginError(error);
      }
      setIsSigningIn(false);
    }
  };

  const handleDismiss = () => {
    setShowPrompt(false);
  };

  const handleDontShowAgain = () => {
    setShowPrompt(false);
    localStorage.setItem('social-login-prompt-dismissed', 'true');
  };

  // Don't show anything while loading
  if (isLoading) {
    return null;
  }

  // Only show popup if showPrompt is true
  return (
    <>
      {/* Social Login Prompt Popup */}
      <Dialog open={showPrompt} onOpenChange={setShowPrompt}>
        <CustomDialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Image
                  src="/logo.png"
                  alt="JuheAPI"
                  width={100}
                  height={25}
                  className="object-contain"
                />
                Quick Login
              </div>
              <div className="flex items-center gap-2 border border-gray-200 rounded-full px-3 py-1 bg-white">
                <span className="text-xs text-gray-500">{countdown}s</span>
                <button
                  onClick={handleDismiss}
                  className="text-gray-400 hover:text-gray-600 transition-colors text-sm font-medium focus:outline-none focus:ring-0"
                >
                  ×
                </button>
              </div>
            </DialogTitle>
            <DialogDescription>
              Sign in to JuheAPI platform with your preferred account
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="p-4 bg-blue-50 rounded-xl">
              <div className="flex items-center gap-3">
                <div className="flex-1 text-center">
                  <p className="font-medium text-gray-900">Choose Your Login Method</p>
                  <p className="text-sm text-gray-600">
                    Select Google or GitHub to quickly sign in
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <Button
                onClick={handleGoogleLogin}
                disabled={isSigningIn}
                className="w-full bg-white text-[#07AAFF] hover:bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-0"
              >
                {isSigningIn ? (
                  <div className="w-5 h-5 border-2 border-gray-300 border-t-[#07AAFF] rounded-full animate-spin"></div>
                ) : (
                                                <Image
                                src="/google-logo.png"
                                alt="Google"
                                width={20}
                                height={20}
                                className="mr-2"
                              />
                )}
                Sign in with Google
              </Button>

              <Button
                onClick={handleGitHubLogin}
                disabled={isSigningIn}
                className="w-full bg-gray-900 text-white hover:bg-gray-800 border border-gray-700 rounded-xl focus:outline-none focus:ring-0"
              >
                {isSigningIn ? (
                  <div className="w-5 h-5 border-2 border-gray-300 border-t-white rounded-full animate-spin"></div>
                ) : (
                  <svg 
                    className="w-5 h-5 mr-2" 
                    fill="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                )}
                Sign in with GitHub
              </Button>
              
              <div className="flex justify-between items-center text-sm">
                <button
                  onClick={handleDontShowAgain}
                  className="text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-0"
                >
                  Don&apos;t show again
                </button>
                <button
                  onClick={handleDismiss}
                  className="text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-0"
                >
                  Maybe later
                </button>
              </div>
            </div>
          </div>
        </CustomDialogContent>
      </Dialog>
    </>
  );
}