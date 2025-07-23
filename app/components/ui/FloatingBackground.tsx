import React from 'react';

interface FloatingBackgroundProps {
  /**
   * Whether to include the large blur background elements
   * @default true
   */
  includeBlurElements?: boolean;
  /**
   * Whether to include the floating decorative bubbles
   * @default true
   */
  includeFloatingBubbles?: boolean;
  /**
   * Whether to include tiny sparkle-like elements
   * @default true
   */
  includeSparkles?: boolean;
  /**
   * Whether to include larger floating elements
   * @default true
   */
  includeLargerElements?: boolean;
  /**
   * Custom className for the container
   */
  className?: string;
  /**
   * Variant for different blur intensities
   * @default "default" - uses blur-3xl
   * "hero" - uses blur-lg for HeroSection
   */
  variant?: "default" | "hero";
}

/**
 * FloatingBackground component provides decorative floating elements and background blur effects
 * that are commonly used across hero sections and full-screen layouts.
 * 
 * This component eliminates code duplication by centralizing all floating background elements
 * used across the application.
 */
export default function FloatingBackground({
  includeBlurElements = true,
  includeFloatingBubbles = true,
  includeSparkles = true,
  includeLargerElements = true,
  className = "",
  variant = "default"
}: FloatingBackgroundProps) {
  // Get blur and opacity classes based on variant
  const blurClass = variant === "hero" ? "blur-lg" : "blur-3xl";
  const opacity1 = variant === "hero" ? "opacity-15" : "opacity-20";
  const opacity2 = variant === "hero" ? "opacity-10" : "opacity-15";

  return (
    <div className={`absolute inset-0 -z-10 ${className}`}>
      {/* Enhanced Background blur elements */}
      {includeBlurElements && (
        <>
          <div className={`absolute top-0 right-0 w-96 h-96 bg-purple-600 rounded-full filter ${blurClass} ${opacity1} -z-10`}></div>
          <div className={`absolute bottom-0 left-0 w-96 h-96 bg-blue-400 rounded-full filter ${blurClass} ${opacity1} -z-10`}></div>
          <div className={`absolute top-1/3 left-1/4 w-64 h-64 bg-cyan-400 rounded-full filter ${blurClass} ${opacity2} -z-10`}></div>
          <div className={`absolute bottom-1/4 right-1/3 w-48 h-48 bg-pink-400 rounded-full filter ${blurClass} ${opacity2} -z-10`}></div>
        </>
      )}
      
      {/* Floating decorative elements - small bubbles */}
      {includeFloatingBubbles && (
        <>
          <div className="absolute top-20 right-20 w-4 h-4 bg-white/20 rounded-full"></div>
          <div className="absolute top-40 right-40 w-2 h-2 bg-white/30 rounded-full"></div>
          <div className="absolute bottom-32 right-32 w-3 h-3 bg-white/25 rounded-full"></div>
          
          {/* Additional floating bubbles */}
          <div className="absolute top-32 left-16 w-3 h-3 bg-white/15 rounded-full"></div>
          <div className="absolute top-60 left-32 w-2 h-2 bg-white/25 rounded-full"></div>
          <div className="absolute top-80 right-16 w-5 h-5 bg-white/10 rounded-full"></div>
          <div className="absolute bottom-40 left-24 w-4 h-4 bg-white/20 rounded-full"></div>
          <div className="absolute bottom-60 right-48 w-2 h-2 bg-white/30 rounded-full"></div>
          <div className="absolute top-1/2 left-8 w-3 h-3 bg-white/15 rounded-full"></div>
          <div className="absolute top-1/3 right-8 w-2 h-2 bg-white/25 rounded-full"></div>
          <div className="absolute bottom-1/3 left-1/2 w-4 h-4 bg-white/10 rounded-full"></div>
          <div className="absolute top-1/4 left-1/3 w-2 h-2 bg-white/20 rounded-full"></div>
          <div className="absolute bottom-1/4 right-1/4 w-3 h-3 bg-white/15 rounded-full"></div>
        </>
      )}
      
      {/* Larger floating elements */}
      {includeLargerElements && (
        <>
          <div className="absolute top-16 left-1/2 w-6 h-6 bg-white/8 rounded-full"></div>
          <div className="absolute bottom-16 right-1/2 w-5 h-5 bg-white/12 rounded-full"></div>
        </>
      )}
      
      {/* Tiny sparkle-like elements */}
      {includeSparkles && (
        <>
          <div className="absolute top-24 right-1/3 w-1 h-1 bg-white/40 rounded-full"></div>
          <div className="absolute top-48 left-1/4 w-1 h-1 bg-white/35 rounded-full"></div>
          <div className="absolute bottom-24 left-1/3 w-1 h-1 bg-white/40 rounded-full"></div>
          <div className="absolute bottom-48 right-1/4 w-1 h-1 bg-white/35 rounded-full"></div>
        </>
      )}
    </div>
  );
} 