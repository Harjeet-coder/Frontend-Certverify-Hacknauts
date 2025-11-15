import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, Upload, XCircle } from 'lucide-react';

interface Activity {
  id: string;
  type: 'upload' | 'approved' | 'rejected';
  message: string;
  time: string;
}

const activities: Activity[] = [
  { id: '1', type: 'approved', message: 'Certificate approved', time: '2 hours ago' },
  { id: '2', type: 'upload', message: 'Uploaded a certificate', time: '5 hours ago' },
  { id: '3', type: 'rejected', message: 'Certificate rejected', time: '1 day ago' },
];

export const RecentActivities = () => {
  const getIcon = (type: Activity['type']) => {
    switch (type) {
      case 'upload':
        return <Upload className="w-4 h-4 text-blue-400" />;

      case 'approved':
        return <CheckCircle className="w-4 h-4 text-green-400" />;

      case 'rejected':
        return <XCircle className="w-4 h-4 text-red-400" />;
    }
  };

  return (
    <Card
      className="
        bg-white/[0.12] 
        border border-white/20 
        backdrop-blur-md
        rounded-xl
        shadow-[0_0_20px_rgba(255,255,255,0.14)]
        transition-all
      "
    >
      <CardHeader>
        <CardTitle className="text-lg text-white">Recent Activities</CardTitle>
      </CardHeader>

      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => (
            <div
              key={activity.id}
              className="
                flex items-start gap-3 pb-4 
                border-b border-white/10 
                last:border-0 last:pb-0
              "
            >
              {/* Icon */}
              <div className="mt-1">{getIcon(activity.type)}</div>

              {/* Message */}
              <div className="flex-1">
                <p className="text-sm font-medium text-white">
                  {activity.message}
                </p>
                <p className="text-xs text-gray-300 mt-1">
                  {activity.time}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
