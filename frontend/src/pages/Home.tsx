
import HeroSection from '../components/HeroSection';

const Home = () => {
  return (
    <div className="min-h-screen">
      <HeroSection />
      
      {/* Additional sections can be added here */}
      <section className="py-16">
        <div className="container mx-auto px-4 text-center">
          <p className="text-slate-500">More content sections will be added here...</p>
        </div>
      </section>
    </div>
  );
};

export default Home;
