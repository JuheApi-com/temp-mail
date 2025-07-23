import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./card";
import { DivideIcon as LucideIcon } from "lucide-react";

interface ApiCardProps {
  api: {
    title: string;
    description: string;
    icon: typeof LucideIcon;
    tags: string[];
    color: string;
  };
}

export default function ApiCard({ api }: ApiCardProps) {
  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow duration-300 cursor-pointer">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">{api.title}</CardTitle>
        <CardDescription className="text-sm">{api.description}</CardDescription>
      </CardHeader>
      <CardFooter className="pt-2 flex flex-wrap gap-2">
        {api.tags.map((tag, index) => (
          <span
            key={index}
            className={`px-2 py-1 text-xs rounded ${
              tag === "Popular" || tag === "Trending" ? "bg-blue-100 text-blue-700" : 
              tag === "Enterprise" ? "bg-purple-100 text-purple-700" : 
              tag === "Free Tier" ? "bg-green-100 text-green-700" : 
              tag === "High Volume" ? "bg-orange-100 text-orange-700" : 
              tag === "New" ? "bg-cyan-100 text-cyan-700" : 
              tag === "AI-Powered" ? "bg-indigo-100 text-indigo-700" : 
              "bg-gray-100 text-gray-700"
            }`}
          >
            {tag}
          </span>
        ))}
      </CardFooter>
    </Card>
  );
}