"use client";

import { DivideIcon as LucideIcon } from "lucide-react";
import { Card, CardHeader, CardContent } from "./card";
import Link from "next/link";

interface CategoryProps {
  category: {
    title: string;
    description: string;
    icon: typeof LucideIcon;
    apiCount: number;
    slug?: string;
  };
}

export default function CategoryCard({ category }: CategoryProps) {
  const Icon = category.icon;
  
  const CardContentComponent = (
    <Card className="group border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col h-full hover:border-blue-200 cursor-pointer">
      <CardHeader className="p-6 pb-4">
        <div className="flex items-center mb-2">
          <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center mr-3 group-hover:bg-blue-100 transition-colors">
            <Icon className="w-5 h-5 text-[#07AAFF]" />
          </div>
          <h3 className="text-lg font-bold text-gray-800 group-hover:text-blue-700 transition-colors">
            {category.title}
          </h3>
        </div>
      </CardHeader>
      <CardContent className="px-6 pb-6 pt-0 flex flex-col flex-grow">
        <p className="text-gray-600 text-sm leading-relaxed mb-auto">
          {category.description}
        </p>
        <div className="mt-4 pt-4 border-t border-gray-100 flex items-center text-xs text-gray-500">
          <span className="font-medium">{category.apiCount}</span> 
          <span className="ml-1">APIs available</span>
        </div>
      </CardContent>
    </Card>
  );

  // If slug is provided, wrap with Link for navigation
  if (category.slug) {
    return (
      <Link href={`/api-catalog?category=${category.slug}`} className="block">
        {CardContentComponent}
      </Link>
    );
  }

  // Otherwise, return the card without link
  return CardContentComponent;
}