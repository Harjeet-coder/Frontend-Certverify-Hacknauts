import { Navbar } from '@/components/layout/Navbar';
import { UploadBox } from '@/components/shared/UploadBox';
import { RecentActivities } from '@/components/shared/RecentActivities';
import { BadgeShowcase } from '@/components/shared/BadgeShowcase';
import { SearchFilter } from '@/components/shared/SearchFilter';
import { CertificatePreviewModal } from '@/components/shared/CertificatePreviewModal';
import { HelpPopup } from '@/components/shared/HelpPopup';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import './Dashboard.css';

const StudentDashboard = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedCertificate, setSelectedCertificate] = useState<string | null>(null);
  
  const certificates = [
    { id: '1', name: 'Web Development Certificate', date: '2024-01-15', status: 'verified', file: 'https://via.placeholder.com/800x600?text=Certificate+1' },
    { id: '2', name: 'Data Science Certificate', date: '2024-01-20', status: 'pending', file: 'https://via.placeholder.com/800x600?text=Certificate+2' },
    { id: '3', name: 'Cloud Computing Certificate', date: '2024-02-01', status: 'rejected', file: 'https://via.placeholder.com/800x600?text=Certificate+3' },
  ];

  const filteredCertificates = certificates.filter(cert => {
    const matchesSearch = cert.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || cert.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const verifiedCount = certificates.filter(c => c.status === 'verified').length;
  const valuePoints = verifiedCount * 10;

  return (
    <>
      <Navbar />
      <div className="student-dashboard">
        <div className="dashboard-container">
          <div className="dashboard-header">
            <h1 className="dashboard-title">Student Dashboard</h1>
            <p className="dashboard-description">Manage your certificates and view your portfolio</p>
          </div>

          <div className="dashboard-grid">
            <div className="dashboard-section">
              <h2 className="dashboard-section-title">Upload Certificate</h2>
              <UploadBox />
            </div>

            <div className="dashboard-section">
              <h2 className="dashboard-section-title">Portfolio Summary</h2>
              <div className="portfolio-stats">
                <div className="portfolio-stat">
                  <div className="portfolio-stat-value">{verifiedCount}</div>
                  <div className="portfolio-stat-label">Verified Certificates</div>
                </div>
                <div className="portfolio-stat">
                  <div className="portfolio-stat-value">{valuePoints}</div>
                  <div className="portfolio-stat-label">Value Points</div>
                </div>
              </div>
              <Button className="w-full">Download Portfolio PDF</Button>
            </div>

            <div className="dashboard-section">
              <BadgeShowcase verifiedCount={verifiedCount} />
            </div>

            <div className="dashboard-section">
              <RecentActivities />
            </div>

            <div className="dashboard-section dashboard-full-width">
              <h2 className="dashboard-section-title">My Certificates</h2>
              <SearchFilter
                searchQuery={searchQuery}
                statusFilter={statusFilter}
                onSearchChange={setSearchQuery}
                onStatusFilterChange={setStatusFilter}
              />
              <table className="certificates-table">
                <thead>
                  <tr>
                    <th>Certificate Name</th>
                    <th>Uploaded Date</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredCertificates.map((cert) => (
                    <tr key={cert.id}>
                      <td>{cert.name}</td>
                      <td>{cert.date}</td>
                      <td>
                        <span className={`status-badge status-${cert.status}`}>
                          {cert.status.charAt(0).toUpperCase() + cert.status.slice(1)}
                        </span>
                      </td>
                      <td>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => setSelectedCertificate(cert.file)}
                        >
                          View
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
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

export default StudentDashboard;