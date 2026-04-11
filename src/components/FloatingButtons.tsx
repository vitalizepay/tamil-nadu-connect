import { Facebook, MessageCircle, Phone, Twitter } from "lucide-react";

const FloatingButtons = () => (
  <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
    <a
      href="https://www.facebook.com/mjmkofficial/"
      target="_blank"
      rel="noopener noreferrer"
      className="w-14 h-14 rounded-full bg-[#1877F2] text-white flex items-center justify-center shadow-strong hover:scale-110 transition-transform"
      title="Facebook"
    >
      <Facebook size={24} />
    </a>
    <a
      href="https://x.com/MJMKforPEOPLE"
      target="_blank"
      rel="noopener noreferrer"
      className="w-14 h-14 rounded-full bg-foreground text-background flex items-center justify-center shadow-strong hover:scale-110 transition-transform"
      title="Twitter / X"
    >
      <Twitter size={24} />
    </a>
    <a
      href="tel:+91XXXXXXXXXX"
      className="w-14 h-14 rounded-full bg-accent text-accent-foreground flex items-center justify-center shadow-strong hover:scale-110 transition-transform"
      title="Call Now"
    >
      <Phone size={24} />
    </a>
    <a
      href="https://wa.me/91XXXXXXXXXX"
      target="_blank"
      rel="noopener noreferrer"
      className="w-14 h-14 rounded-full bg-secondary text-secondary-foreground flex items-center justify-center shadow-strong hover:scale-110 transition-transform"
      title="WhatsApp"
    >
      <MessageCircle size={24} />
    </a>
  </div>
);

export default FloatingButtons;
