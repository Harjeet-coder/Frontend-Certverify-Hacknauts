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
        return <Upload className="w-4 h-4 text-primary" />;
      case 'approved':
        return <CheckCircle className="w-4 h-4 text-success" />;
      case 'rejected':
        return <XCircle className="w-4 h-4 text-destructive" />;
    }
  };

  return (
    <Card className="shadow-sm">
      <CardHeader>
        <CardTitle className="text-lg">Recent Activities</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {activities.map((activity) => (
            <div key={activity.id} className="flex items-start gap-3 pb-3 border-b border-border last:border-0 last:pb-0">
              <div className="mt-0.5">{getIcon(activity.type)}</div>
              <div className="flex-1">
                <p className="text-sm font-medium text-foreground">{activity.message}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
