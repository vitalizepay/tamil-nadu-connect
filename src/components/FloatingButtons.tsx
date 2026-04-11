import { Facebook, Instagram, MessageCircle, Youtube } from "lucide-react";

const FloatingButtons = () => (
  <div className="fixed left-4 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-4">
    <a
      href="https://www.facebook.com/mjmkofficial/"
      target="_blank"
      rel="noopener noreferrer"
      className="w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center hover:scale-110 transition-transform"
      title="Facebook - MJMK Official"
    >
      <Facebook size={22} className="text-[#1877F2]" />
    </a>
    <a
      href="https://www.facebook.com/winstarsapparels/reels/"
      target="_blank"
      rel="noopener noreferrer"
      className="w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center hover:scale-110 transition-transform"
      title="Facebook - Reels"
    >
      <Facebook size={22} className="text-[#1877F2]" />
    </a>
    <span
      className="w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center"
      title="Instagram"
    >
      <Instagram size={22} className="text-[#E4405F]" />
    </span>
    <span
      className="w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center"
      title="WhatsApp"
    >
      <MessageCircle size={22} className="text-[#25D366]" />
    </span>
    <span
      className="w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center"
      title="YouTube"
    >
      <Youtube size={22} className="text-[#FF0000]" />
    </span>
  </div>
);

export default FloatingButtons;
