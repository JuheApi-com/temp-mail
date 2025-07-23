"use client";

import { Button } from "@/components/ui/button";
import { Star, Quote, ArrowRight, Users, TrendingUp, Zap } from "lucide-react";
import Link from "next/link";

// 客户评价数据
const testimonials = [
  {
    name: "David Kim",
    role: "Lead Developer",
    avatar: "DK",
    content: "The Global Tracking API has revolutionized our logistics platform. Real-time package tracking across multiple carriers with just one integration - it's exactly what we needed.",
    rating: 5,
    gradient: "from-amber-500 to-orange-500"
  },
  {
    name: "Maria Santos",
    role: "CTO",
    avatar: "MS",
    content: "We integrated the Currency Exchange API and IP Geolocation API for our international payment platform. The accuracy and speed are outstanding, reducing our processing time by 70%.",
    rating: 5,
    gradient: "from-purple-500 to-pink-500"
  },
  {
    name: "Alex Chen",
    role: "Product Manager",
    avatar: "AC",
    content: "The Weather API provides incredibly detailed forecasts and historical data. Our users love the precision, and the SMS API helps us send timely weather alerts seamlessly.",
    rating: 5,
    gradient: "from-blue-500 to-cyan-500"
  }
];

export default function CallToAction() {
  return (
    <section className="py-12 px-4 relative">
      {/* Glassmorphism background with gradient - optimized */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#07AAFF]/90 to-purple-600/90 backdrop-blur-sm"></div>
      
      {/* Floating liquid glass elements - optimized */}
      <div className="absolute top-12 left-8 w-32 h-32 bg-white/10 rounded-full filter blur-md opacity-70"></div>
      <div className="absolute top-32 right-12 w-24 h-24 bg-white/15 rounded-full filter blur-md opacity-70"></div>
      <div className="absolute bottom-20 left-1/4 w-28 h-28 bg-white/8 rounded-full filter blur-md opacity-70"></div>
      <div className="absolute top-1/4 right-1/3 w-20 h-20 bg-white/20 rounded-full filter blur-md opacity-70"></div>
      <div className="absolute bottom-32 right-16 w-36 h-36 bg-white/6 rounded-full filter blur-lg opacity-60"></div>
      <div className="absolute top-16 left-1/3 w-24 h-24 bg-white/12 rounded-full filter blur-md opacity-70"></div>
      <div className="absolute bottom-16 left-12 w-20 h-20 bg-white/18 rounded-full filter blur-md opacity-70"></div>
      <div className="absolute top-1/2 right-8 w-28 h-28 bg-white/10 rounded-full filter blur-md opacity-70"></div>
      
      {/* Floating glass particles */}
      <div className="absolute top-24 right-1/4 w-3 h-3 bg-white/25 backdrop-blur-sm rounded-full "></div>
      <div className="absolute bottom-40 left-1/2 w-4 h-4 bg-white/20 backdrop-blur-sm rounded-full "></div>
      <div className="absolute top-40 left-16 w-2 h-2 bg-white/30 backdrop-blur-sm rounded-full "></div>
      <div className="absolute bottom-24 right-1/3 w-3 h-3 bg-white/22 backdrop-blur-sm rounded-full "></div>
      
      {/* Mesh gradient overlay */}
      <div className="absolute inset-0 opacity-20" style={{
        backgroundImage: `radial-gradient(circle at 20% 30%, rgba(255, 255, 255, 0.1) 0%, transparent 50%),
                         radial-gradient(circle at 80% 70%, rgba(255, 255, 255, 0.15) 0%, transparent 50%),
                         radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.05) 0%, transparent 50%)`
      }}></div>
      
      <div className="container mx-auto relative z-10">
        {/* Customer Testimonials Section */}
        <div className="mb-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-lg border border-white/20 rounded-full px-4 py-2 mb-4 shadow-lg">
              <Users className="w-4 h-4 text-white" />
              <span className="text-white font-medium text-sm">Trusted by Developers Worldwide</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
              Start Building with Our Customers
            </h2>
            <p className="text-lg text-white/90 max-w-2xl mx-auto leading-relaxed">
              Join thousands of developers who have accelerated their projects with our APIs
            </p>
          </div>

          {/* Testimonials Grid */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {testimonials.map((testimonial, index) => (
              <div 
                key={index} 
                className="bg-white/15 backdrop-blur-sm border border-white/20 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 hover:bg-white/20 group flex flex-col h-full"
               >
                 {/* Testimonial Content */}
                 <div className="flex-1 mb-4">
                   <div className="flex items-start gap-3">
                     <Quote className="w-5 h-5 text-white/60 group-hover:text-white/80 transition-colors flex-shrink-0 mt-0.5" />
                     <p className="text-white/90 text-sm leading-relaxed group-hover:text-white transition-colors">
                       {testimonial.content}
                     </p>
                   </div>
                 </div>
                 
                 {/* Customer Info Section */}
                 <div className="border-t border-white/10 pt-3">
                   <div className="flex items-center justify-between">
                     <div className="flex items-center gap-3">
                       <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${testimonial.gradient} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}>
                         <span className="text-white font-bold text-sm">{testimonial.avatar}</span>
                       </div>
                       <div>
                         <div className="text-white font-semibold text-sm mb-0.5">{testimonial.name}</div>
                         <div className="text-white/70 text-xs">{testimonial.role}</div>
                       </div>
                     </div>
                     
                     {/* Rating Stars */}
                     <div className="flex gap-0.5">
                       {[...Array(testimonial.rating)].map((_, i) => (
                         <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                       ))}
                     </div>
                   </div>
                 </div>
              </div>
            ))}
          </div>
        </div>

        {/* Main CTA Content */}
        <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-3xl p-8 shadow-xl">
          <div className="text-center">
            <h3 className="text-2xl md:text-3xl font-bold mb-4 text-white">
              Ready to Join Them?
            </h3>
            <p className="text-lg mb-6 max-w-2xl mx-auto leading-relaxed text-white/90">
              Start your free trial today and experience the power of seamless API integration
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                                 className="bg-white/90 backdrop-blur-md text-[#07AAFF] hover:bg-white hover:scale-105 text-base px-6 py-4 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 transform border border-white/30 group"
              >
                <a href="/api/auth/sign-in?mode=signUp&utm_source=cta&utm_medium=button&utm_campaign=trial" className="flex items-center gap-2">
                  <Zap className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                  Start Free Trial
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="bg-white/20 backdrop-blur-md border-2 border-white/30 text-white hover:bg-white/30 hover:border-white/50 text-base px-6 py-4 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl group"
              >
                <Link href="/api-catalog" className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  Browse APIs
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}