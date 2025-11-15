import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

interface CertificatePreviewModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  certificateName: string;
  certificateUrl?: string;
}

export const CertificatePreviewModal = ({ 
  open, 
  onOpenChange, 
  certificateName,
  certificateUrl 
}: CertificatePreviewModalProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>{certificateName}</DialogTitle>
        </DialogHeader>
        <div className="mt-4">
          {certificateUrl ? (
            <div className="bg-muted rounded-lg p-4 flex items-center justify-center min-h-[400px]">
              <img 
                src={certificateUrl} 
                alt={certificateName} 
                className="max-w-full max-h-[500px] object-contain rounded-lg"
              />
            </div>
          ) : (
            <div className="bg-muted rounded-lg p-8 flex items-center justify-center min-h-[400px]">
              <p className="text-muted-foreground">Certificate preview not available</p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
