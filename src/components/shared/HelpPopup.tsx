import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { HelpCircle } from 'lucide-react';

export const HelpPopup = () => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button 
          size="icon"
          className="fixed bottom-6 right-6 rounded-full shadow-lg z-50 w-12 h-12"
        >
          <HelpCircle className="w-5 h-5" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>How to Upload Certificates</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 mt-4">
          <div>
            <h4 className="font-semibold text-sm mb-2">Step 1: Navigate to Dashboard</h4>
            <p className="text-sm text-muted-foreground">Go to your student dashboard from the sidebar.</p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">Step 2: Upload Certificate</h4>
            <p className="text-sm text-muted-foreground">
              Click on the upload area or drag and drop your certificate file (PDF or image format).
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">Step 3: Wait for Verification</h4>
            <p className="text-sm text-muted-foreground">
              Faculty will review and verify your certificate. You'll see the status in your certificates table.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">Step 4: View Portfolio</h4>
            <p className="text-sm text-muted-foreground">
              Once verified, your certificate will appear in your portfolio and contribute to your value points.
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
