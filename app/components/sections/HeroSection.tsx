import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Pin, ArrowRight, Zap } from "lucide-react";
import Link from "next/link";
import { getApiCardPricing } from '@/lib/pricing';
import FloatingBackground from "@/components/ui/FloatingBackground";
import { getApiIcon } from '@/lib/iconResolver';
import { IdTokenClaims } from "@logto/next";

// Color gradients for different API types - 优化为更柔和的配色方案，为高频分类添加独特颜色
const apiGradients: { [key: string]: { gradient: string; bgGradient: string } } = {
  'temp-mail': {
    gradient: "from-blue-500/80 to-cyan-500/80",
    bgGradient: "from-blue-500/8 to-cyan-500/8"
  },
  'exchange-rate': {
    gradient: "from-emerald-500/80 to-green-500/80",
    bgGradient: "from-emerald-500/8 to-green-500/8"
  },
  'tts': {
    gradient: "from-purple-500/80 to-pink-500/80", 
    bgGradient: "from-purple-500/8 to-pink-500/8"
  },
  'aqi': {
    gradient: "from-orange-500/80 to-red-500/80",
    bgGradient: "from-orange-500/8 to-red-500/8"
  },
  // 为QR Code API添加专用颜色
  'qr-code': {
    gradient: "from-violet-500/80 to-purple-600/80",
    bgGradient: "from-violet-500/8 to-purple-600/8"
  },
  // 为手机归属地API添加专用颜色
  'phone-specs': {
    gradient: "from-teal-500/80 to-cyan-600/80",
    bgGradient: "from-teal-500/8 to-cyan-600/8"
  },
  // 为其他常见API类型添加颜色
  'weather': {
    gradient: "from-sky-500/80 to-blue-500/80",
    bgGradient: "from-sky-500/8 to-blue-500/8"
  },
  'sms': {
    gradient: "from-rose-500/80 to-pink-500/80",
    bgGradient: "from-rose-500/8 to-pink-500/8"
  },
  'ip-location': {
    gradient: "from-amber-500/80 to-orange-500/80",
    bgGradient: "from-amber-500/8 to-orange-500/8"
  },
  'logistics': {
    gradient: "from-emerald-500/80 to-green-600/80",
    bgGradient: "from-emerald-500/8 to-green-600/8"
  },
  // AI相关使用粉红色系
  'ai': {
    gradient: "from-rose-500/80 to-pink-500/80",
    bgGradient: "from-rose-500/8 to-pink-500/8"
  },
  'ai-ml': {
    gradient: "from-rose-500/80 to-pink-500/80",
    bgGradient: "from-rose-500/8 to-pink-500/8"
  },
  'ai-models': {
    gradient: "from-fuchsia-500/80 to-rose-500/80",
    bgGradient: "from-fuchsia-500/8 to-rose-500/8"
  },
  'machine-learning': {
    gradient: "from-pink-500/80 to-fuchsia-500/80",
    bgGradient: "from-pink-500/8 to-fuchsia-500/8"
  },
  // Web工具使用亮绿色
  'web-tool': {
    gradient: "from-lime-500/80 to-green-500/80",
    bgGradient: "from-lime-500/8 to-green-500/8"
  },
  'web-tools': {
    gradient: "from-lime-500/80 to-green-500/80",
    bgGradient: "from-lime-500/8 to-green-500/8"
  },
  'tool': {
    gradient: "from-lime-500/80 to-green-500/80",
    bgGradient: "from-lime-500/8 to-green-500/8"
  },
  'tools': {
    gradient: "from-lime-500/80 to-green-500/80",
    bgGradient: "from-lime-500/8 to-green-500/8"
  },
  // 图像处理使用青蓝色
  'image': {
    gradient: "from-cyan-500/80 to-teal-500/80",
    bgGradient: "from-cyan-500/8 to-teal-500/8"
  },
  'image-processing': {
    gradient: "from-cyan-500/80 to-teal-500/80",
    bgGradient: "from-cyan-500/8 to-teal-500/8"
  },
  'photo': {
    gradient: "from-cyan-500/80 to-teal-500/80",
    bgGradient: "from-cyan-500/8 to-teal-500/8"
  },
  'media': {
    gradient: "from-cyan-500/80 to-teal-500/80",
    bgGradient: "from-cyan-500/8 to-teal-500/8"
  },
  // 更新默认配置，使用品牌色
  default: {
    gradient: "from-[#07AAFF]/80 to-blue-500/80",
    bgGradient: "from-[#07AAFF]/8 to-blue-500/8"
  }
};

interface FeaturedAPI {
  id: number;
  name: string;
  slug: string;
  description: string;
  price: number;
  is_free: boolean;
  icon_url: string | null;
  featured: number;
  tags: string[];
  packages?: Array<{ price: number; requests_num: number; is_gift_for_new_user: boolean }>;
}

interface HeroSectionProps {
  featuredAPIs: FeaturedAPI[];
  session: IdTokenClaims | null;
}

export default function HeroSection({ featuredAPIs, session }: HeroSectionProps) {
  const getAPIIcon = (api: FeaturedAPI) => {
    return getApiIcon({ icon_url: api.icon_url, slug: api.slug });
  };

  const getAPIColors = (slug: string) => {
    return apiGradients[slug] || apiGradients.default;
  };

  const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text;
    return text.substr(0, maxLength).trim() + '...';
  };

  return (
    <section className="pb-32 px-4 relative overflow-hidden">
      <FloatingBackground variant="hero" />
      
      <div className="container mx-auto pt-32">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Column - Enhanced Hero Content */}
          <div className="text-left">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              <span className="bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
                Connect Smarter,
              </span>
              <br />
              <span className="bg-gradient-to-r from-blue-100 to-white bg-clip-text text-transparent">
                Beyond APIs.
              </span>
            </h1>
            <p className="text-lg md:text-xl mb-8 leading-relaxed opacity-90 max-w-2xl">
              Welcome to the premier API marketplace where innovation meets opportunity. 
              Our comprehensive ecosystem connects developers with cutting-edge APIs, 
              enabling rapid development and seamless integration for your business.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              {session ? (
                <Button
                  size="lg"
                  asChild
                  className="bg-white/90 backdrop-blur-sm text-[#07AAFF] hover:bg-white hover:scale-105 text-lg px-8 py-4 h-auto rounded-xl font-medium shadow-xl hover:shadow-2xl transition-all duration-300 group"
                >
                  <Link href="/console" className="flex items-center gap-2">
                    Go to Console
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
              ) : (
                <Button
                  size="lg"
                  className="bg-white/90 backdrop-blur-sm text-[#07AAFF] hover:bg-white hover:scale-105 text-lg px-8 py-4 h-auto rounded-xl font-medium shadow-xl hover:shadow-2xl transition-all duration-300 group"
                >
                  <a href="/api/auth/sign-in?mode=signUp&utm_source=hero&utm_medium=button&utm_campaign=trial" className="flex items-center gap-2">
                    Start Free Trial
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </a>
                </Button>
              )}
              <Link
                href="/api-catalog"
                className="text-white text-lg font-medium flex items-center hover:text-blue-100 transition-colors duration-300 group"
              >
                BROWSE APIs
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform ml-2" />
              </Link>
            </div>
            
            <div className="mt-12">
              <p className="text-sm font-medium text-white/70 mb-4">TRUSTED BY</p>
              <div className="flex flex-wrap gap-8 items-center justify-center sm:justify-start">
                {["SAMSUNG", "BMW", "AIRBUS", "PAYPAL", "XIAOMI", "DJI"].map((company, index) => (
                  <div key={index} className="text-white/50 hover:text-white/70 transition-colors duration-300 text-sm font-medium">
                    {company}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Featured APIs with Title */}
          <div className="relative">
            {/* Enhanced Glassmorphism Container for API Cards - optimized */}
            <div className="relative bg-white/10 backdrop-blur-sm border border-white/20 rounded-3xl pt-12 pb-8 px-8 shadow-xl hover:shadow-2xl transition-all duration-300">
              {/* Background glow effect - optimized */}
              <div className="absolute inset-0 bg-gradient-to-r from-white/8 to-white/15 rounded-3xl blur-md -z-10"></div>
              
              {/* Liquid glass background pattern */}
              <div className="absolute inset-0 opacity-30" style={{
                backgroundImage: `radial-gradient(circle at 30% 20%, rgba(255, 255, 255, 0.1) 0%, transparent 50%),
                                 radial-gradient(circle at 70% 80%, rgba(255, 255, 255, 0.15) 0%, transparent 50%)`
              }}></div>
              
              {/* Featured APIs Title - floating on top edge */}
              <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 z-20">
                <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-md border border-white/20 rounded-full px-5 py-2 shadow-lg">
                  <Pin className="w-5 h-4 text-blue-600" />
                  <span className="text-sm font-medium text-gray-800">Featured APIs</span>
                </div>
              </div>
              
              <div className="relative grid grid-cols-1 md:grid-cols-2 gap-6">
                {featuredAPIs.map((api, index) => {
                  const iconData = getAPIIcon(api);
                  const colors = getAPIColors(api.slug);
                  
                  // 检查标签类型
                  const isAlwaysFree = api.is_free || api.price === 0;
                  const hasFreeTrialPackage = !isAlwaysFree && api.packages?.some(pkg => pkg.is_gift_for_new_user === true);
                  
                  return (
                    <Link
                      key={index}
                      href={`/api-catalog/${api.slug}`}
                      className="block group"
                    >
                      <Card
                        className={`group relative border border-white/30 shadow-2xl hover:shadow-3xl bg-white/70 backdrop-blur-sm h-48 rounded-2xl cursor-pointer transition-transform,transition-shadow duration-500 hover:scale-105 hover:-translate-y-2`}
                        style={{ 
                          animationDelay: `${index * 150}ms`,
                        }}
                      >
                        {/* This new wrapper will handle the overflow clipping */}
                        <div className="relative w-full h-full overflow-hidden rounded-2xl">
                          {/* Gradient top border */}
                          <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${colors.gradient}`}></div>
                          
                          {/* Combined tags and price status display */}
                          <div className="absolute bottom-3 right-3 z-20 flex flex-row items-center gap-2">
                            {/* Tag Badges first in DOM */}
                            {api.tags?.filter(tag => {
                                const upperTag = tag.toUpperCase();
                                return !upperTag.includes('FREE') && !upperTag.includes('PAID') && !upperTag.includes('$');
                              }).slice(0, 2).map((tag, tagIndex) => (
                                <Badge 
                                  key={tagIndex}
                                  variant="secondary" 
                                  className="text-xs bg-blue-50 text-blue-600 border border-blue-300 hover:bg-blue-100 hover:border-blue-400 transition-colors"
                                >
                                  {tag}
                                </Badge>
                              ))}
                            
                            {/* Price Badge second in DOM */}
                            {isAlwaysFree ? (
                              <Badge className="text-xs bg-green-100 text-green-800 border border-green-300 font-medium hover:bg-green-200 hover:border-green-400 transition-colors">
                                Always Free
                              </Badge>
                            ) : hasFreeTrialPackage ? (
                              <Badge className="text-xs bg-blue-100 text-blue-800 border border-blue-300 font-medium hover:bg-blue-200 hover:border-blue-400 transition-colors">
                                Free Trial
                              </Badge>
                            ) : null}
                          </div>
                          
                          {/* Background gradient overlay */}
                          <div className={`absolute inset-0 bg-gradient-to-br ${colors.bgGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
                          
                          <CardHeader className="pb-3 relative z-10">
                            <div className="flex items-start gap-4 mb-3">
                              <div className={`p-3 rounded-xl bg-gradient-to-br ${colors.gradient} shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-transform,transition-transform-gpu duration-300 flex-shrink-0`}>
                                {React.createElement(iconData.icon, { className: "w-5 h-5 text-white" })}
                              </div>
                              <div className="flex-1 min-w-0">
                                <CardTitle className="text-lg font-bold text-gray-800 group-hover:text-gray-900 transition-colors">
                                  {api.name}
                                </CardTitle>
                              </div>
                            </div>
                          </CardHeader>
                          <CardContent className="pt-0 relative z-10 pb-12">
                            <CardDescription className="text-gray-600 text-sm leading-relaxed group-hover:text-gray-700 transition-colors line-clamp-2">
                              {truncateText(api.description, 80)}
                            </CardDescription>
                          </CardContent>
                          
                          {/* Hover glow effect */}
                          <div className={`absolute inset-0 bg-gradient-to-r ${colors.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500 rounded-lg`}></div>
                        </div>
                      </Card>
                    </Link>
                  );
                })}
              </div>
            </div>
            
            {/* Floating connection lines */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-px h-8 bg-gradient-to-b from-transparent via-white/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
          </div>
        </div>
      </div>
    </section>
  );
}