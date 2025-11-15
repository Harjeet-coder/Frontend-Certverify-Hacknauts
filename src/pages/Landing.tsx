import { Button } from '@/components/ui/button';
import { FeatureCard } from '@/components/shared/FeatureCard';
import { FileCheck, Award, BarChart3 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '@/components/layout/Navbar';

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
            Academic Certificate<br />
            <span className="text-primary">Verification System</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Streamline certificate verification with automated validation, digital portfolios, and comprehensive analytics for educational institutions.
          </p>
          <div className="flex gap-4 justify-center">
            <Button size="lg" onClick={() => navigate('/login')}>
              Get Started
            </Button>
            <Button size="lg" variant="outline" onClick={() => navigate('/login')}>
              Sign In
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-secondary/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-foreground">
            Key Features
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard
              icon={FileCheck}
              title="Auto Certificate Verification"
              description="Instant verification of academic certificates using advanced validation algorithms and blockchain technology."
            />
            <FeatureCard
              icon={Award}
              title="Student Digital Portfolio"
              description="Comprehensive digital portfolio showcasing all verified certificates with value points and achievements."
            />
            <FeatureCard
              icon={BarChart3}
              title="Analytics Dashboard"
              description="Real-time insights into certificate submissions, verification rates, and department participation."
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-border">
        <div className="max-w-6xl mx-auto text-center text-muted-foreground">
          <p>© 2024 CertVerify. Academic Certificate Verification System.</p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
