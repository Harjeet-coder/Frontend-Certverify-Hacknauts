import { LucideIcon } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

export const FeatureCard = ({ icon: Icon, title, description }: FeatureCardProps) => {
  return (
    <Card
      className="
        bg-[#111B2E]/80
        border border-white/10
        rounded-xl
        backdrop-blur-md
        shadow-[0px_0px_18px_rgba(255,255,255,0.05)]
        hover:shadow-[0px_0px_25px_rgba(255,255,255,0.10)]
        transition-all duration-300
        p-6
      "
    >
      <CardHeader className="p-0 mb-3">
        <div className="w-12 h-12 rounded-lg bg-blue-500/10 flex items-center justify-center mb-5">
          <Icon className="w-6 h-6 text-blue-400" />
        </div>

        <CardTitle className="text-lg font-semibold text-white">
          {title}
        </CardTitle>
      </CardHeader>

      <CardContent className="p-0">
        <CardDescription className="text-[14px] text-gray-300 leading-relaxed">
          {description}
        </CardDescription>
      </CardContent>
    </Card>
  );
};

