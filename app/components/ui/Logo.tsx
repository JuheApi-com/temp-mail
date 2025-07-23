import Link from "next/link";
import Image from "next/image";

interface LogoProps {
  variant?: "blue" | "white";
  className?: string;
}

export default function Logo({ variant = "blue", className = "" }: LogoProps) {
  // CSS filters for different variants
  const whiteFilter = "brightness(0) invert(1)"; // Convert to white
  const blueFilter = "none"; // Keep original blue color

  return (
    <Link href="/" className={`flex items-center ${className}`}>
      <Image
        src="/logo.svg"
        alt="JUHE API Marketplace"
        width={140}
        height={32}
        style={{ 
          filter: variant === "white" ? whiteFilter : blueFilter,
          height: "32px",
          width: "auto"
        }}
        priority
      />
    </Link>
  );
}