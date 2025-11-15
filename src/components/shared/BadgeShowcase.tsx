import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Award } from 'lucide-react';
import { cn } from '@/lib/utils';

interface BadgeShowcaseProps {
  verifiedCount: number;
}

export const BadgeShowcase = ({ verifiedCount }: BadgeShowcaseProps) => {
  const badges = [
    { name: 'Bronze', required: 5, color: 'text-amber-700', bgColor: 'bg-amber-100', achieved: verifiedCount >= 5 },
    { name: 'Silver', required: 10, color: 'text-gray-600', bgColor: 'bg-gray-100', achieved: verifiedCount >= 10 },
    { name: 'Gold', required: 20, color: 'text-yellow-600', bgColor: 'bg-yellow-100', achieved: verifiedCount >= 20 },
  ];

  return (
    <Card className="shadow-sm">
      <CardHeader>
        <CardTitle className="text-lg">Badge Showcase</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 gap-4">
          {badges.map((badge) => (
            <div
              key={badge.name}
              className={cn(
                'flex flex-col items-center p-4 rounded-lg border-2 transition-all',
                badge.achieved ? 'border-primary bg-primary/5' : 'border-border bg-card opacity-50'
              )}
            >
              <Award className={cn('w-8 h-8 mb-2', badge.achieved ? 'text-primary' : 'text-muted-foreground')} />
              <p className="font-semibold text-sm text-foreground">{badge.name}</p>
              <p className="text-xs text-muted-foreground mt-1">{badge.required} verified</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
