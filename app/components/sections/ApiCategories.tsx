import React from "react";
import { ArrowRight, Zap, TrendingUp, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getCategoryIcon } from '@/lib/iconResolver';

// Category colors for gradients - 基于实际分类slug的配色方案
const categoryColors: { [key: string]: string } = {
  // 实际分类slug配色
  weather: "from-sky-500/80 to-blue-500/80",
  communication: "from-emerald-500/80 to-green-500/80",
  fintech: "from-violet-500/80 to-purple-500/80",
  'ip-location': "from-amber-500/80 to-orange-500/80",
  language: "from-teal-500/80 to-cyan-500/80",
  identity: "from-red-500/80 to-rose-500/80",
  'ai-ml': "from-rose-500/80 to-pink-500/80", // AI-ML使用粉红色系
  shipping: "from-orange-500/80 to-yellow-500/80",
  'web-tool': "from-lime-500/80 to-green-500/80", // Web工具使用亮绿色
  image: "from-cyan-500/80 to-teal-500/80", // 图像处理使用青蓝色
  
  // 兼容旧的配色（备用）
  'location': "from-amber-500/80 to-orange-500/80",
  'maps': "from-amber-500/80 to-orange-500/80",
  translation: "from-teal-500/80 to-cyan-500/80",
  security: "from-red-500/80 to-rose-500/80",
  'ai-models': "from-fuchsia-500/80 to-rose-500/80",
  'ai': "from-rose-500/80 to-pink-500/80",
  'machine-learning': "from-pink-500/80 to-fuchsia-500/80",
  logistics: "from-orange-500/80 to-yellow-500/80",
  tracking: "from-orange-500/80 to-yellow-500/80",
  'web-tools': "from-lime-500/80 to-green-500/80",
  'tool': "from-lime-500/80 to-green-500/80",
  'tools': "from-lime-500/80 to-green-500/80",
  'image-processing': "from-cyan-500/80 to-teal-500/80",
  'photo': "from-cyan-500/80 to-teal-500/80",
  'media': "from-cyan-500/80 to-teal-500/80",
  default: "from-[#07AAFF]/80 to-blue-500/80"
};

interface Category {
  id: number;
  name: string;
  slug: string;
  description: string | null;
  icon: string | null;
  sort_order: number;
  apiCount: number;
}

interface ApiCategoriesProps {
  categories: Category[];
}

export default function ApiCategories({ categories }: ApiCategoriesProps) {
  return (
    <section className="py-20 relative">
      {/* Glassmorphism background */}
      <div className="absolute inset-0 bg-white/30 backdrop-blur-md"></div>
      
      {/* Floating liquid glass elements */}
      <div className="absolute top-10 right-10 w-32 h-32 bg-gradient-to-br from-blue-300/20 to-cyan-200/10 rounded-full filter blur-md opacity-60"></div>
      <div className="absolute bottom-20 left-16 w-24 h-24 bg-gradient-to-br from-purple-300/15 to-pink-200/10 rounded-full filter blur-md opacity-60"></div>
      <div className="absolute top-1/2 right-1/4 w-20 h-20 bg-gradient-to-br from-emerald-300/20 to-teal-200/10 rounded-full filter blur-md opacity-60"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="relative mb-16">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">
              Explore Our API Categories
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed max-w-3xl mx-auto">
              Discover the perfect APIs to power your applications and services with our comprehensive collection
            </p>
          </div>
          <div className="absolute top-0 right-0 hidden md:block">
            <Link href="/api-catalog" className="text-[#07AAFF] font-medium hover:text-blue-700 flex items-center transition-colors bg-white/50 backdrop-blur-md border border-white/30 rounded-full px-4 py-2 shadow-lg hover:shadow-xl">
              View All Categories
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </div>
          <div className="text-center mt-6 md:hidden">
            <Link href="/api-catalog" className="text-[#07AAFF] font-medium hover:text-blue-700 flex items-center justify-center transition-colors bg-white/50 backdrop-blur-md border border-white/30 rounded-full px-4 py-2 shadow-lg hover:shadow-xl mx-auto w-fit">
              View All Categories
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((category, index) => {
            // Get the appropriate icon and gradient for this category
            const IconComponent = getCategoryIcon(category.slug);
            const gradient = categoryColors[category.slug] || categoryColors.default;
            
            return (
              <div
                key={category.id}
                className="group animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <Link href={`/api-catalog?category=${category.slug}`}>
                  <div className="bg-white/95 border border-gray-200 rounded-2xl shadow hover:shadow-md transition-all duration-300 overflow-hidden flex flex-col h-full cursor-pointer hover:border-blue-200">
                    {/* Card Header with Gradient */}
                    <div className={`h-2 bg-gradient-to-r ${gradient}`}></div>
                    
                    <div className="p-6 flex flex-col flex-1">
                      <div className="flex items-center gap-3 mb-4">
                        <div className={`p-3 rounded-xl bg-gradient-to-br ${gradient} shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                          <IconComponent className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-lg font-bold text-gray-800 group-hover:text-blue-600 group-hover:scale-110 transition-all duration-300 origin-left">
                            {category.name}
                          </h3>
                        </div>
                      </div>
                      
                      <p className="text-gray-600 text-sm leading-relaxed mb-6 flex-1">
                        {category.description || `Explore ${category.name} APIs and services for your applications`}
                      </p>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${gradient}`}></div>
                          <span className="text-sm font-medium text-gray-700">
                            {category.apiCount} API{category.apiCount !== 1 ? 's' : ''}
                          </span>
                        </div>
                        <div className="flex items-center text-blue-600 group-hover:text-blue-700 font-medium transition-colors duration-200 group/link">
                          <span className="text-sm">Explore</span>
                          <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform duration-200" />
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>

        {/* Call to Action Section */}
        <div className="mt-16 text-center">
          <div className="bg-white/60 backdrop-blur-lg border border-white/40 rounded-2xl p-8 shadow-lg">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="p-2 bg-gradient-to-r from-[#07AAFF] to-purple-600 rounded-lg">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800">Ready to Get Started?</h3>
            </div>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Join thousands of developers who trust our APIs to power their applications. 
              Start with our free tier and scale as you grow.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                asChild
                className="bg-[#07AAFF] hover:bg-[#0690D9] text-white px-8 py-3 rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
              >
                <Link href="/api-catalog" className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4" />
                  Browse All APIs
                </Link>
              </Button>
              <Button 
                variant="outline"
                asChild
                className="border-2 border-[#07AAFF]/30 bg-white/70 hover:bg-white hover:border-[#07AAFF] text-gray-700 hover:text-[#07AAFF] px-8 py-3 rounded-xl transition-all duration-300"
              >
                <Link href="/docs" className="flex items-center gap-2">
                  <Package className="w-4 h-4" />
                  View Documentation
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}