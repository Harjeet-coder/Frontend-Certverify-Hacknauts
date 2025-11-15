import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Award } from 'lucide-react';
import { cn } from '@/lib/utils';

interface BadgeShowcaseProps {
  verifiedCount: number;
}

export const BadgeShowcase = ({ verifiedCount }: BadgeShowcaseProps) => {
  const badges = [
    {
      name: 'Bronze',
      required: 5,
      color: '#CD7F32',    // Metallic bronze
      achieved: verifiedCount >= 5
    },
    {
      name: 'Silver',
      required: 10,
      color: '#C0C0C0',    // Metallic silver
      achieved: verifiedCount >= 10
    },
    {
      name: 'Gold',
      required: 20,
      color: '#FFD700',    // Metallic gold
      achieved: verifiedCount >= 20
    },
  ];

  return (
    <Card
      className="
        bg-white/[0.12]
        border border-white/20 
        backdrop-blur-md
        rounded-xl
        shadow-[0_0_25px_rgba(255,255,255,0.14)]
        transition-all
      "
    >
      <CardHeader>
        <CardTitle className="text-lg text-white">
          Badge Showcase
        </CardTitle>
      </CardHeader>

      <CardContent>
        <div className="grid grid-cols-3 gap-4">

          {badges.map((badge) => (
            <div
              key={badge.name}
              className="
                flex flex-col items-center p-4 rounded-xl
                bg-[#111E34]
                border border-[#1F2A3A]
                shadow-sm
              "
            >
              {/* Award Icon */}
              <Award
                className="w-7 h-7 mb-2"
                style={{
                  color: badge.achieved ? badge.color : "#7E8CA0", // soft grey for not achieved
                }}
              />

              {/* Badge Title */}
              <p
                className="font-semibold text-base"
                style={{
                  color: badge.achieved ? badge.color : "white",
                }}
              >
                {badge.name}
              </p>

              {/* Verified Count */}
              <p className="text-xs text-gray-300 mt-1">
                {badge.required} verified
              </p>
            </div>
          ))}

        </div>
      </CardContent>
    </Card>
  );
};
