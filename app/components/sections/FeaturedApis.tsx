import { Card } from "@/components/ui/card";
import ApiCard from "@/components/ui/ApiCard";
import { CloudRain, MapPin, MessageSquare, Brain } from "lucide-react";

const featuredApis = [
  {
    title: "Weather API",
    description: "Real-time weather data for any location worldwide",
    icon: CloudRain,
    tags: ["Popular", "Free Tier"],
    color: "bg-blue-500",
  },
  {
    title: "SMS Verification",
    description: "Secure user verification via SMS messaging",
    icon: MessageSquare,
    tags: ["Enterprise", "High Volume"],
    color: "bg-blue-500",
  },
  {
    title: "IP Geolocation",
    description: "Accurate location data from IP addresses",
    icon: MapPin,
    tags: ["Trending"],
    color: "bg-blue-500",
  },
  {
    title: "AI Text Analysis",
    description: "Advanced NLP for sentiment and content analysis",
    icon: Brain,
    tags: ["New", "AI-Powered"],
    color: "bg-blue-500",
  },
];

export default function FeaturedApis() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-10">Featured APIs & Solutions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredApis.map((api, index) => (
            <ApiCard key={index} api={api} />
          ))}
        </div>
      </div>
    </section>
  );
}