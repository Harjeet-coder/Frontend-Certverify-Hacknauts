import { Navbar as Navbar_1 } from '@/components/layout/Navbar';
import { UploadBox } from '@/components/shared/UploadBox';
import { RecentActivities } from '@/components/shared/RecentActivities';
import { BadgeShowcase } from '@/components/shared/BadgeShowcase';
import { SearchFilter } from '@/components/shared/SearchFilter';
import { CertificatePreviewModal } from '@/components/shared/CertificatePreviewModal';
import { HelpPopup } from '@/components/shared/HelpPopup';
import { Button } from '@/components/ui/button';

import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";

import { useState } from 'react';
import './Dashboard.css';

const StudentDashboard = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedCertificate, setSelectedCertificate] = useState<string | null>(null);

  // Prevent double-download in Strict Mode
  const [isGenerating, setIsGenerating] = useState(false);

  const student = {
    name: "John Doe",
    rollNo: "CS2021001",
    department: "Computer Science",
  };

  const handleUpload = (file: File) => {
    console.log('File uploaded:', file);
  };

  const certificates = [
    { id: '1', name: 'Web Development Certificate', date: '2024-01-15', status: 'verified', points: 10, file: 'https://via.placeholder.com/800x600?text=Certificate+1' },
    { id: '2', name: 'Data Science Certificate', date: '2024-01-20', status: 'pending', points: 15, file: 'https://via.placeholder.com/800x600?text=Certificate+2' },
    { id: '3', name: 'Cloud Computing Certificate', date: '2024-02-01', status: 'rejected', points: 20, file: 'https://via.placeholder.com/800x600?text=Certificate+3' },
  ];

  const filteredCertificates = certificates.filter(cert => {
    const matchesSearch = cert.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || cert.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const verifiedCount = certificates.filter(c => c.status === 'verified').length;
  const valuePoints = certificates.reduce((sum, cert) => sum + (cert.points || 0), 0);

  /* ====================================
       PDF DOWNLOAD FUNCTION (1 TIME FIX)
  ==================================== */
  const downloadPDF = () => {
    if (isGenerating) return; // <--- Prevents double-trigger in StrictMode
    setIsGenerating(true);

    const doc = new jsPDF("p", "mm", "a4");

    // Title
    doc.setFontSize(22);
    doc.setFont("helvetica", "bold");
    doc.text("CERTVERIFY — Student Portfolio Report", 14, 20);

    doc.setLineWidth(0.5);
    doc.line(14, 25, 195, 25);

    // Student Details
    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    doc.text(`Name: ${student.name}`, 14, 40);
    doc.text(`Roll No: ${student.rollNo}`, 14, 48);
    doc.text(`Department: ${student.department}`, 14, 56);

    // Summary
    doc.setFont("helvetica", "bold");
    doc.text("Portfolio Summary", 14, 75);

    doc.setFont("helvetica", "normal");
    doc.text(`Verified Certificates: ${verifiedCount}`, 14, 85);
    doc.text(`Total Value Points: ${valuePoints}`, 14, 93);

    // Table Data
    const tableData = certificates.map(cert => [
      cert.name,
      cert.date,
      cert.points,
      cert.status.toUpperCase(),
    ]);

    autoTable(doc, {
      startY: 110,
      head: [["Certificate Name", "Date", "Points", "Status"]],
      body: tableData,
      theme: "grid",
      headStyles: {
        fillColor: [41, 128, 185],
        textColor: 255,
        fontStyle: "bold",
      },
      bodyStyles: {
        fillColor: [240, 240, 240]
      },
      alternateRowStyles: {
        fillColor: [255, 255, 255]
      },
      margin: { left: 14, right: 14 },
    });

    doc.save(`${student.name}_Portfolio.pdf`);

    // Allow next click after small delay
    setTimeout(() => setIsGenerating(false), 500);
  };

  return (
    <>
      <Navbar_1 />

      <div className="student-dashboard">
        <div className="dashboard-container">
          <div className="dashboard-header">

            {/* Upload Section */}
            <div className="dashboard-section">
              <h2 className="dashboard-section-title">Upload Certificate</h2>
              <UploadBox onUpload={handleUpload} />
            </div>

            <div className="dashboard-grid">

              {/* Portfolio Summary */}
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

                {/* PDF Button */}
                <Button
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                  onClick={downloadPDF}
                  disabled={isGenerating}
                >
                  {isGenerating ? "Generating..." : "Download Portfolio PDF"}
                </Button>
              </div>

              <div className="dashboard-section">
                <BadgeShowcase verifiedCount={verifiedCount} />
              </div>

              <div className="dashboard-section">
                <RecentActivities />
              </div>

              {/* Certificate Table */}
              <div className="dashboard-section dashboard-full-width">
                <h2 className="dashboard-section-title">My Certificates</h2>

                <SearchFilter
                  searchValue={searchQuery}
                  onSearchChange={setSearchQuery}
                  filterValue={statusFilter}
                  onFilterChange={setStatusFilter}
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
                    {filteredCertificates.map(cert => (
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
                            size="sm"
                            onClick={() => setSelectedCertificate(cert.file)}
                            className="bg-green-600 hover:bg-green-700 text-white"
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
      </div>

      <HelpPopup />

      <CertificatePreviewModal
        open={!!selectedCertificate}
        certificateUrl={selectedCertificate || ''}
        onOpenChange={(open: boolean) => !open && setSelectedCertificate(null)}
        certificateName={certificates.find(cert => cert.file === selectedCertificate)?.name || ''}
      />
    </>
  );
};

export default StudentDashboard;
