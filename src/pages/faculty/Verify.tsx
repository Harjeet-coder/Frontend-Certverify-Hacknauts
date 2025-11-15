import { Navbar } from '@/components/layout/Navbar';
import { SearchFilter } from '@/components/shared/SearchFilter';
import { CertificatePreviewModal } from '@/components/shared/CertificatePreviewModal';
import { HelpPopup } from '@/components/shared/HelpPopup';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { toast } from 'sonner';
import './Verify.css';

const FacultyVerify = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedCertificate, setSelectedCertificate] = useState<string | null>(null);
  
  const certificates = [
    { id: '1', name: 'Web Development Certificate', studentName: 'John Doe', date: '2024-01-15', file: 'https://via.placeholder.com/800x600?text=Certificate+1' },
    { id: '2', name: 'Data Science Certificate', studentName: 'Jane Smith', date: '2024-01-20', file: 'https://via.placeholder.com/800x600?text=Certificate+2' },
    { id: '3', name: 'Cloud Computing Certificate', studentName: 'Mike Johnson', date: '2024-02-01', file: 'https://via.placeholder.com/800x600?text=Certificate+3' },
  ];

  const filteredCertificates = certificates.filter(cert => {
    const matchesSearch = cert.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         cert.studentName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  const handleApprove = (id: string) => {
    toast.success('Certificate approved successfully!');
  };

  const handleReject = (id: string) => {
    toast.error('Certificate rejected.');
  };

  return (
    <>
      <Navbar />
      <div className="faculty-verify">
        <div className="verify-container">
          <div className="verify-header">
            <h1 className="verify-title">Certificate Verification</h1>
            <p className="verify-description">Review and verify student certificates</p>
          </div>

          <div className="verify-card">
            <h2 className="verify-card-title">Pending Certificates</h2>
            
            <SearchFilter
              searchQuery={searchQuery}
              statusFilter={statusFilter}
              onSearchChange={setSearchQuery}
              onStatusFilterChange={setStatusFilter}
            />
            
            <table className="verify-table">
              <thead>
                <tr>
                  <th>Certificate Name</th>
                  <th>Student Name</th>
                  <th>Uploaded On</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredCertificates.map((cert) => (
                  <tr key={cert.id}>
                    <td>{cert.name}</td>
                    <td>{cert.studentName}</td>
                    <td>{cert.date}</td>
                    <td>
                      <div className="verify-actions">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => setSelectedCertificate(cert.file)}
                        >
                          View
                        </Button>
                        <Button 
                          size="sm"
                          className="bg-success hover:bg-success/90"
                          onClick={() => handleApprove(cert.id)}
                        >
                          Approve
                        </Button>
                        <Button 
                          variant="destructive"
                          size="sm"
                          onClick={() => handleReject(cert.id)}
                        >
                          Reject
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <HelpPopup />
      <CertificatePreviewModal
        isOpen={!!selectedCertificate}
        onClose={() => setSelectedCertificate(null)}
        certificateUrl={selectedCertificate || ''}
      />
    </>
  );
};

export default FacultyVerify;