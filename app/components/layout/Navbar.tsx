"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { Menu, X, ChevronDown, User, Settings, LogOut, ExternalLink } from "lucide-react";
import { throttle } from 'lodash';
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import Logo from "../ui/Logo";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isInitialized, setIsInitialized] = useState(false);
  const [showProductsRedDot, setShowProductsRedDot] = useState(true);
  const [showFreeApisRedDot, setShowFreeApisRedDot] = useState(true);

  // initial scroll position
  useEffect(() => {
    const initScrollPosition = () => {
      if (typeof window !== "undefined") {
        const currentScrollY = window.scrollY;
        setScrollY(currentScrollY);
        setLastScrollY(currentScrollY);
        setIsInitialized(true);
      }
    };

    initScrollPosition();
  }, []);

  useEffect(() => {
    if (!isInitialized) return;

    // Throttle the scroll handler to run at most every 100ms
    const handleScroll = throttle(() => {
      const currentScrollY = window.scrollY;
      setScrollY(currentScrollY);
      
      // Smart show/hide logic
      setLastScrollY((prevScrollY) => {
        if (currentScrollY < 100) {
          setIsVisible(true);
        } else if (currentScrollY < prevScrollY) {
          setIsVisible(true);
        } else if (currentScrollY > prevScrollY) {
          setIsVisible(false);
        }
        return currentScrollY;
      });
    }, 100);

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      handleScroll.cancel(); // Clean up the throttle
    };
  }, [isInitialized]);



  const handleSignOut = async () => {
    try {
      window.location.href = "/api/auth/sign-out";
    } catch (error) {
      console.error("Sign out failed:", error);
    }
  };

  const RedDot = () => (
    <div className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
  );

  const ProductMenu = () => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className="flex items-center gap-1 transition-colors duration-200 font-medium hover:scale-105 text-white hover:text-white/90 hover:drop-shadow-lg relative"
          onClick={() => {
            setShowProductsRedDot(false);
            setShowFreeApisRedDot(false);
          }}
        >
          Products
          <ChevronDown className="w-3 h-3" />
          {showProductsRedDot && <RedDot />}
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-48 bg-white/95 backdrop-blur-md border border-gray-200/50 shadow-lg">
        <DropdownMenuItem asChild>
          <a 
            href="https://everytext.juhedata.cloud" 
            target="_blank" 
            rel="noopener"
            className="flex items-center justify-between py-2 px-3 text-gray-700 hover:text-[#07AAFF] hover:bg-gray-50/80"
          >
            EveryText OCR
            <ExternalLink className="w-3 h-3" />
          </a>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <a 
            href="https://freeapis.juheapi.com" 
            target="_blank" 
            rel="noopener"
            className="flex items-center justify-between py-2 px-3 text-gray-700 hover:text-[#07AAFF] hover:bg-gray-50/80 relative"
            onClick={() => {
              setShowProductsRedDot(false);
              setShowFreeApisRedDot(false);
            }}
          >
            Free APIs
            <div className="flex items-center gap-1">
              {showFreeApisRedDot && <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>}
              <ExternalLink className="w-3 h-3" />
            </div>
          </a>
        </DropdownMenuItem>
        <DropdownMenuItem className="py-2 px-3 text-gray-400 cursor-default hover:bg-transparent">
          <div className="flex items-center justify-between w-full">
            <span>JuheMCP</span>
            <span className="text-xs text-gray-400">Coming Soon</span>
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );

  // prevent style jump when initializing
  if (!isInitialized) {
    return (
      <>
      <header className="fixed w-full z-50 bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl rounded-2xl opacity-0">
        <div className="container mx-auto px-4 py-2">
          <div className="flex items-center justify-between">
            <Logo variant="white" className="h-[28px]" />
            <div className="hidden md:flex items-center space-x-8">
              {/* placeholder space to prevent layout shift */}
            </div>
            <div className="hidden md:flex items-center space-x-6">
              {/* placeholder space to prevent layout shift */}
            </div>
          </div>
        </div>
      </header>
      </>
    );
  }

  return (
    <>
    <header
      className={`fixed w-full z-50 transition-all duration-200 ease-in-out relative overflow-hidden bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl rounded-2xl ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      {/* Floating decorative elements for navbar */}
      <>
        <div className="absolute top-2 right-16 w-2 h-2 bg-white/30 backdrop-blur-sm rounded-full shadow-sm"></div>
        <div className="absolute top-4 left-1/4 w-1 h-1 bg-white/40 backdrop-blur-sm rounded-full shadow-sm"></div>
        <div className="absolute bottom-2 right-1/3 w-2 h-2 bg-white/25 backdrop-blur-sm rounded-full shadow-sm"></div>
        <div className="absolute top-1 left-1/2 w-1 h-1 bg-white/35 backdrop-blur-sm rounded-full shadow-sm"></div>
        <div className="absolute top-3 right-1/4 w-1.5 h-1.5 bg-white/20 backdrop-blur-sm rounded-full shadow-sm"></div>
        <div className="absolute bottom-3 left-1/6 w-1 h-1 bg-white/30 backdrop-blur-sm rounded-full shadow-sm"></div>
      </>
      
      <div className="container mx-auto px-4 py-2 relative z-10">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Logo variant="white" className="h-[28px]" />

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              href="/" 
              className="transition-colors duration-200 font-medium hover:scale-105 text-white hover:text-white/90 hover:drop-shadow-lg"
            >
              Home
            </Link>
            <Link 
              href="https://freeapis.juheapi.com/apis" 
              className="transition-colors duration-200 font-medium hover:scale-105 text-white hover:text-white/90 hover:drop-shadow-lg"
            >
              Free APIs
            </Link>
            <Link 
              href="https://juheapi.com/api-catalog/temp-mail" 
              className="transition-colors duration-200 font-medium hover:scale-105 text-white hover:text-white/90 hover:drop-shadow-lg"
            >
              Temp Mail API
            </Link>
          </nav>

          <div className="hidden md:flex items-center space-x-6">
           
                <>
                  <Link 
                    href="https://juheapi.com/console" 
                    className="font-medium transition-colors duration-200 text-white hover:text-white/80"
                  >
                    Console
                  </Link>
                </>
            
          </div>

          {/* Mobile Menu Button */}
          <Button 
            variant="ghost" 
            size="sm" 
            className="md:hidden" 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? 
              <X className="w-5 h-5 text-white" /> : 
              <Menu className="w-5 h-5 text-white" />
            }
          </Button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 bg-white/95 backdrop-blur-md rounded-xl shadow-2xl border border-white/20">
            <nav className="flex flex-col space-y-4 mt-4 px-4">
              <Link href="/" className="text-gray-800 hover:text-[#07AAFF] transition-colors font-medium">
                Home
              </Link>
              <Link href="/api-catalog" className="text-gray-800 hover:text-[#07AAFF] transition-colors font-medium">
                API Catalog
              </Link>
              
              {/* Mobile Product Menu */}
              <div className="space-y-2">
                <div 
                  className="text-gray-800 font-medium relative flex items-center gap-2"
                  onClick={() => {
                    setShowProductsRedDot(false);
                    setShowFreeApisRedDot(false);
                  }}
                >
                  Products
                  {showProductsRedDot && <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>}
                </div>
                <div className="pl-4 space-y-2">
                  <a 
                    href="https://everytext.juhedata.cloud" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center justify-between text-gray-600 hover:text-[#07AAFF] transition-colors"
                  >
                    EveryText OCR
                    <ExternalLink className="w-3 h-3" />
                  </a>
                  <a 
                    href="https://freeapis.juheapi.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center justify-between text-gray-600 hover:text-[#07AAFF] transition-colors"
                    onClick={() => {
              setShowProductsRedDot(false);
              setShowFreeApisRedDot(false);
            }}
                  >
                    Free APIs
                    <div className="flex items-center gap-1">
                      {showFreeApisRedDot && <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>}
                      <ExternalLink className="w-3 h-3" />
                    </div>
                  </a>
                  <div className="flex items-center justify-between text-gray-400">
                    <span>JuheMCP</span>
                    <span className="text-xs text-gray-400">Coming Soon</span>
                  </div>
                </div>
              </div>
              
              <Link href="/docs" className="text-gray-800 hover:text-[#07AAFF] transition-colors font-medium">
                Documentation
              </Link>
              <Link href="/blog/whats-new" className="text-gray-800 hover:text-[#07AAFF] transition-colors font-medium">
                What&apos;s New
              </Link>
              <div className="flex flex-col space-y-2 pt-4 border-t border-gray-200">
                
                    <>
                      <Link href="/console" className="text-gray-800 hover:text-[#07AAFF] transition-colors font-medium">
                        Console
                      </Link>
                    </>
                
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
    </>
  );
}