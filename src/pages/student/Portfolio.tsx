import { Navbar } from '@/components/layout/Navbar';
import { HelpPopup } from '@/components/shared/HelpPopup';
import { Button } from '@/components/ui/button';
import './Portfolio.css';

const Portfolio = () => {
  const certificates = [
    { id: '1', name: 'Web Development Certificate', date: '2024-01-15', points: 10 },
    { id: '2', name: 'Data Science Workshop', date: '2024-01-10', points: 15 },
    { id: '3', name: 'Cloud Computing Certification', date: '2023-12-20', points: 20 },
  ];

  const verifiedCount = certificates.length;
  const valuePoints = certificates.reduce((sum, cert) => sum + cert.points, 0);

  return (
    <>
      <Navbar />
      <div className="portfolio-page">
        <div className="portfolio-container">
          <div className="portfolio-header">
            <div className="portfolio-info">
              <h1>John Doe</h1>
              <p>Roll No: CS2021001</p>
              <p>Department: Computer Science</p>
            </div>
            
            <div className="portfolio-stats">
              <div className="portfolio-stat-card">
                <div className="portfolio-stat-value">{verifiedCount}</div>
                <div className="portfolio-stat-label">Verified Certificates</div>
              </div>
              <div className="portfolio-stat-card">
                <div className="portfolio-stat-value">{valuePoints}</div>
                <div className="portfolio-stat-label">Value Points</div>
              </div>
            </div>
            
            <Button style={{ marginTop: '1.5rem' }}>
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