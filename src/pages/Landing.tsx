import { Button } from '@/components/ui/button';
import { FeatureCard } from '@/components/shared/FeatureCard';
import { FileCheck, Award, BarChart3 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '@/components/layout/Navbar';

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#0A1A3A] text-white">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-10 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-extrabold leading-tight mb-6 text-white">
            Academic Certificate<br />
            <span className="text-blue-400 drop-shadow-md">
              Verification System
            </span>
          </h1>

          <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto leading-relaxed">
            A modern platform to verify academic certificates with automation,
            digital profiles, and smart analytics built for institutions.
          </p>

          <div className="flex justify-center gap-4">
            <Button
              size="lg"
              variant="default"
              className="
                bg-blue-500 
                hover:bg-blue-600 
                text-white 
                font-bold 
                text-[25px]
                px-10 py-8
                rounded-xl
                shadow-lg
              "
              onClick={() => navigate('/login')}
            >
              Sign In
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="pt-10 pb-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-14 text-white">
            Key Features
          </h2>

          <div className="grid md:grid-cols-3 gap-10 px-4 md:px-0">
            <div
              className="
                bg-white/[0.10] 
                border border-white/20 
                rounded-xl p-8 
                backdrop-blur-md 
                shadow-[0_0_25px_rgba(255,255,255,0.14)]
                hover:shadow-[0_0_35px_rgba(255,255,255,0.20)]
                transition-all duration-300
              "
            >
              <FeatureCard
                icon={FileCheck}
                title="Auto Certificate Verification"
                description="Instant verification using advanced validation algorithms and secure blockchain mapping."
              />
            </div>

            <div
              className="
                bg-white/[0.10] 
                border border-white/20 
                rounded-xl p-8 
                backdrop-blur-md 
                shadow-[0_0_25px_rgba(255,255,255,0.14)]
                hover:shadow-[0_0_35px_rgba(255,255,255,0.20)]
                transition-all duration-300
              "
            >
              <FeatureCard
                icon={Award}
                title="Digital Student Portfolio"
                description="All verified certificates compiled into a structured profile with points and achievements."
              />
            </div>

            <div
              className="
                bg-white/[0.10] 
                border border-white/20 
                rounded-xl p-8 
                backdrop-blur-md 
                shadow-[0_0_25px_rgba(255,255,255,0.14)]
                hover:shadow-[0_0_35px_rgba(255,255,255,0.20)]
                transition-all duration-300
              "
            >
              <FeatureCard
                icon={BarChart3}
                title="Analytics Dashboard"
                description="Powerful insights into certificate submission trends, verification progress, and student activity."
              />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-white/10 mt-10">
        <div className="max-w-6xl mx-auto text-center text-gray-300">
          <p>© 2024 CertVerify. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
