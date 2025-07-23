import Link from "next/link";
import { Twitter, Youtube, Mail, MessageCircle } from "lucide-react";
import Logo from "../ui/Logo";

export default function Footer() {
  return (
    <footer className="bg-white text-gray-800 py-16 px-4 border-t border-gray-100">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Column 1 - Company Info */}
          <div>
            <Logo variant="blue" className="mb-6 h-8" />
            <p className="text-gray-500 text-sm mb-6 leading-relaxed max-w-xs">
            Accelerate development, innovate faster, and transform your business with our comprehensive API ecosystem.
            </p>
            <div className="flex space-x-4">
              <Link href="https://x.com/juheapi" className="text-gray-400 hover:text-[#07AAFF] transition-colors">
                <Twitter size={18} />
              </Link>
              <Link href="https://www.reddit.com/r/juheapi/" className="text-gray-400 hover:text-[#07AAFF] transition-colors">
                <MessageCircle size={18} />
              </Link>
              <Link href="https://www.youtube.com/@JuheAPI" className="text-gray-400 hover:text-[#07AAFF] transition-colors">
                <Youtube size={18} />
              </Link>
              <Link href="mailto:hello@juheapi.com" className="text-gray-400 hover:text-[#07AAFF] transition-colors">
                <Mail size={18} />
              </Link>
            </div>
          </div>

          {/* Column 4 - JUHE API VS */}
          <div>
            <h3 className="font-semibold mb-5 text-gray-800">JUHE API VS</h3>
            <ul className="space-y-3 text-sm text-gray-500">
              <li><Link href="/blog/juhe-api-vs-rapidapi" className="hover:text-[#07AAFF] transition-colors">vs. RapidAPI</Link></li>
              <li><Link href="/blog/juhe-api-vs-apilayer" className="hover:text-[#07AAFF] transition-colors">vs. API Layer</Link></li>
            </ul>
          </div>

          {/* Column 2 - For Developers */}
          <div>
            <h3 className="font-semibold mb-5 text-gray-800">For Developers</h3>
            <ul className="space-y-3 text-sm text-gray-500">
              <li><Link href="/console" className="hover:text-[#07AAFF] transition-colors">Console</Link></li>
              <li><Link href="/docs" className="hover:text-[#07AAFF] transition-colors">Documentation</Link></li>
              <li><Link href="/contact" className="hover:text-[#07AAFF] transition-colors">Contact Support</Link></li>
              <li><Link href="/freetrial/tempmail" className="hover:text-[#07AAFF] transition-colors">Temp Mail Demo</Link></li>
            </ul>
          </div>

          {/* Column 3 - Marketplace */}
          <div>
            <h3 className="font-semibold mb-5 text-gray-800">Product</h3>
            <ul className="space-y-3 text-sm text-gray-500">
              <li><Link href="/api-catalog" className="hover:text-[#07AAFF] transition-colors">Browse APIs</Link></li>
              <li><Link href="/contact" className="hover:text-[#07AAFF] transition-colors">Suggest an API</Link></li>
              <li><Link href="https://everytext.juhedata.cloud/" className="hover:text-[#07AAFF] transition-colors">EveryText OCR</Link></li>
              <li><Link href="/api-catalog/sms" className="hover:text-[#07AAFF] transition-colors">Global SMS Messaging</Link></li>
              <li><Link href="/api-catalog/global-flight" className="hover:text-[#07AAFF] transition-colors">Global Flight API</Link></li>
              <li><Link href="/api-catalog/text-to-speech" className="hover:text-[#07AAFF] transition-colors">Text to Speech API</Link></li>
              <li><Link href="/api-catalog/temp-mail" className="hover:text-[#07AAFF] transition-colors">Temp Mail API</Link></li>
            </ul>
          </div>



          {/* Column 4 - Company */}
          <div>
            <h3 className="font-semibold mb-5 text-gray-800">Company</h3>
            <ul className="space-y-3 text-sm text-gray-500">
              <li><Link href="/blog" className="hover:text-[#07AAFF] transition-colors">Blog</Link></li>
              <li><Link href="/docs/about" className="hover:text-[#07AAFF] transition-colors">About Us</Link></li>
              <li><Link href="/docs/terms-of-service" className="hover:text-[#07AAFF] transition-colors">Terms of Service</Link></li>
              <li><Link href="/docs/privacy-policy" className="hover:text-[#07AAFF] transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center text-gray-500 text-xs border-t border-gray-100 pt-6">
          Copyright © {new Date().getFullYear()} - All rights reserved
        </div>
      </div>
    </footer>
  );
}