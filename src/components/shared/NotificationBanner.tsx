import { X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface NotificationBannerProps {
  message: string;
  type?: 'info' | 'success' | 'error';
  visible: boolean;
  onClose: () => void;
}

export const NotificationBanner = ({ message, type = 'info', visible, onClose }: NotificationBannerProps) => {
  if (!visible) return null;

  const bgColor = {
    info: 'bg-primary',
    success: 'bg-success',
    error: 'bg-destructive',
  }[type];

  return (
    <div className={cn('fixed top-16 left-0 right-0 z-40 py-3 px-4 text-white', bgColor)}>
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <p className="text-sm font-medium">{message}</p>
        <button onClick={onClose} className="hover:opacity-80 transition-opacity">
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
