import { DivideIcon as LucideIcon } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface BenefitCardProps {
  benefit: {
    title: string;
    description: string;
    icon: typeof LucideIcon;
  };
}

export default function BenefitCard({ benefit }: BenefitCardProps) {
  const Icon = benefit.icon;
  
  return (
    <Card className="border-none shadow-none hover:bg-gray-50 transition-colors duration-300">
      <CardHeader className="pb-2">
        <div className="mb-3 text-gray-600">
          <Icon className="h-6 w-6" />
        </div>
        <CardTitle className="text-lg">{benefit.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-sm text-gray-600">{benefit.description}</CardDescription>
      </CardContent>
    </Card>
  );
}