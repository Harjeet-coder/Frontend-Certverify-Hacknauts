import { Navbar } from '@/components/layout/Navbar';
import { HelpPopup } from '@/components/shared/HelpPopup';
import { Button } from '@/components/ui/button';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import './Portfolio.css';

const Portfolio = () => {
  const certificates = [
    { id: '1', name: 'Web Development Certificate', date: '2024-01-15', points: 10 },
    { id: '2', name: 'Data Science Workshop', date: '2024-01-10', points: 15 },
    { id: '3', name: 'Cloud Computing Certification', date: '2023-12-20', points: 20 },
  ];

  const student = {
    name: "John Doe",
    rollNo: "CS2021001",
    department: "Computer Science",
  };

  const verifiedCount = certificates.length;
  const valuePoints = certificates.reduce((sum, cert) => sum + cert.points, 0);

  const downloadPDF = () => {
    const doc = new jsPDF("p", "mm", "a4");

    // TITLE
    doc.setFontSize(22);
    doc.setFont("helvetica", "bold");
    doc.text("CERTVERIFY — Student Portfolio Report", 14, 20);

    // Divider Line
    doc.setLineWidth(0.5);
    doc.line(14, 25, 195, 25);

    // Student Info Section
    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    doc.text(`Name: ${student.name}`, 14, 40);
    doc.text(`Roll No: ${student.rollNo}`, 14, 48);
    doc.text(`Department: ${student.department}`, 14, 56);

    // Stats
    doc.setFont("helvetica", "bold");
    doc.text("Portfolio Summary", 14, 75);

    doc.setFont("helvetica", "normal");
    doc.text(`Verified Certificates: ${verifiedCount}`, 14, 85);
    doc.text(`Total Value Points: ${valuePoints}`, 14, 93);

    // Certificates Table
    const tableData = certificates.map(cert => [
      cert.name,
      cert.date,
      cert.points,
    ]);

    autoTable(doc, {
      startY: 110,
      head: [["Certificate Name", "Date", "Points"]],
      body: tableData,
      theme: "grid",
      headStyles: {
        fillColor: [41, 128, 185], // blue header
        textColor: 255,
        fontStyle: "bold",
      },
      bodyStyles: {
        fillColor: [240, 240, 240],
      },
      alternateRowStyles: {
        fillColor: [255, 255, 255],
      },
      margin: { left: 14, right: 14 },
    });

    // Footer
    doc.setFontSize(10);
    doc.text("Generated via CertVerify System", 14, 290);

    doc.save(`${student.name}_Portfolio.pdf`);
  };

  return (
    <>
      <Navbar />
      <div className="portfolio-page">
        <div className="portfolio-container">
          <div className="portfolio-header">
            <div className="portfolio-info">
              <h1>{student.name}</h1>
              <p>Roll No: {student.rollNo}</p>
              <p>Department: {student.department}</p>
            </div>
            
            <div className="portfolio-stats">
              <div className="portfolio-stat-card">
                <div className="portfolio-stat-value">{verifiedCount}</div>
                <div className="portfolio-stat-label">Verified Certificates</div>
              </div>
              <div className="portfolio-stat-card">
                <div className="portfolio-stat-value-1">{valuePoints}</div>
                <div className="portfolio-stat-label">Value Points</div>
              </div>
            </div>
            
            <Button style={{ marginTop: '1.5rem' }} onClick={downloadPDF}>
              Download Portfolio PDF
            </Button>
          </div>
          
          <div className="portfolio-certificates">
            <h2>Verified Certificates</h2>
            <div className="certificate-grid">
              {certificates.map((cert) => (
                <div key={cert.id} className="certificate-item">
                  <h3>{cert.name}</h3>
                  <p>Date: {cert.date}</p>
                  <p>Points: {cert.points}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <HelpPopup />
    </>
  );
};

export default Portfolio;
