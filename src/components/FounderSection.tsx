import founderImg from "@/assets/founder.png";
import vishnuImg from "@/assets/leader-vishnu.png";
import farookImg from "@/assets/leader-farook.png";
import akkimImg from "@/assets/leader-akkim.png";
import sabithaImg from "@/assets/leader-sabitha.png";
import vishnuLImg from "@/assets/leader-vishnu-l.png";
import prakashImg from "@/assets/leader-prakash.png";
import rahimImg from "@/assets/leader-rahim.png";
import senthilImg from "@/assets/leader-senthil.png";
import { useLanguage } from "@/contexts/LanguageContext";

const t = {
  ta: {
    title: "நிறுவனர் & தலைவர்",
    name: "எஸ்.இப்ராஹீம்பாதுஷா",
    role: "நிறுவனர் & தலைவர் – MJMK",
    desc: "மக்கள் ஜனநாயக முன்னேற்ற கழகத்தின் நிறுவனர் மற்றும் தலைவர். 2018 ஆம் ஆண்டு முதல் திருப்பூரில் சாதாரண மக்களின் உரிமைகளுக்காகவும், சட்டவிரோத கடன் வசூல்களுக்கு எதிராகவும், சமூக நீதிக்காகவும் தீவிரமாகப் போராடி வரும் தலைவர்.",
    quote: "\"மக்களின் உரிமைக்காக போராடும் தலைவர்\"",
    teamTitle: "கழக நிர்வாகிகள்",
    leaders: [
      { name: "கோ விஷ்ணு லட்சுமணன்", role: "கழகப் பொதுச் செயலாளர் மற்றும் கோவை மாநகர மாவட்ட செயலாளர்", img: vishnuImg },
      { name: "A.முகமது பாரூக்", role: "கழகத் தலைமை நிலைய செயலாளர்", img: farookImg },
      { name: "Akkim", role: "கழக அமைப்புச் செயலாளர்", img: akkimImg },
      { name: "V. சபிதா ராணி", role: "கழக கொள்கை பரப்புச் செயலாளர்", img: sabithaImg },
      { name: "G. விஷ்ணு லட்சுமணன்", role: "கழக அவைத் தலைவர்", img: vishnuLImg },
      { name: "கா.பிரகாஷ்", role: "கழக முதன்மை செயலாளர்", img: prakashImg },
      { name: "ஜா.ரஹீம்", role: "கழக ஒருங்கிணைப்பாளர்", img: rahimImg },
      { name: "S செந்தில்குமார்", role: "கழக மேற்கு மண்டல செயலாளர்", img: senthilImg },
    ],
  },
  en: {
    title: "Founder & President",
    name: "S. Ibrahim Badusha",
    role: "Founder-President – MJMK",
    desc: "Founder and President of Makkal Jananayaka Munnetra Kazhagam, headquartered in Tirupur. Since 2018, he has been actively fighting against illegal debt recovery practices, championing labor and consumer rights, and promoting communal harmony across Tamil Nadu.",
    quote: "\"A leader who fights for the rights of the people\"",
    teamTitle: "Party Office Bearers",
    leaders: [
      { name: "Ko. Vishnu Lakshmanan", role: "General Secretary & Coimbatore City District Secretary", img: vishnuImg },
      { name: "A. Muhammad Farook", role: "Headquarters Secretary", img: farookImg },
      { name: "Akkim", role: "Organization Secretary", img: akkimImg },
      { name: "V. Sabitha Rani", role: "Policy Propagation Secretary", img: sabithaImg },
      { name: "G. Vishnu Lakshmanan", role: "Party Speaker", img: vishnuLImg },
      { name: "Ka. Prakash", role: "Chief Secretary", img: prakashImg },
      { name: "Ja. Rahim", role: "Party Coordinator", img: rahimImg },
      { name: "S. Senthilkumar", role: "Western Zone Secretary", img: senthilImg },
    ],
  },
};

const FounderSection = () => {
  const { lang } = useLanguage();
  const c = t[lang];

  );
};

export default FounderSection;
