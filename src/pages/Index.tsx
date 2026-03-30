import { LanguageProvider } from "@/contexts/LanguageContext";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import FounderSection from "@/components/FounderSection";
import ServicesSection from "@/components/ServicesSection";
import AchievementsSection from "@/components/AchievementsSection";
import GallerySection from "@/components/GallerySection";
import RegistrationForm from "@/components/RegistrationForm";
import ComplaintForm from "@/components/ComplaintForm";
import SocialSection from "@/components/SocialSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import FloatingButtons from "@/components/FloatingButtons";

const Index = () => (
  <LanguageProvider>
    <div className="min-h-screen">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <FounderSection />
      <ServicesSection />
      <AchievementsSection />
      <GallerySection />
      <RegistrationForm />
      <ComplaintForm />
      <SocialSection />
      <ContactSection />
      <Footer />
      <FloatingButtons />
    </div>
  </LanguageProvider>
);

export default Index;
