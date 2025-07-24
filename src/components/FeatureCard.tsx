import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

export const FeatureCard = ({ icon: Icon, title, description }: FeatureCardProps) => {
  return (
    <Card className="bg-gray-900/50 border-gray-700 backdrop-blur-sm hover:bg-gray-900/70 transition-all duration-300 cursor-pointer group">
      <CardContent className="p-6 text-center">
        <div className="flex justify-center mb-4">
          <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
            <Icon className="h-6 w-6 text-white" />
          </div>
        </div>
        <h4 className="text-xl font-semibold text-white mb-3">{title}</h4>
        <p className="text-gray-300 leading-relaxed">{description}</p>
      </CardContent>
    </Card>
  );
}; 