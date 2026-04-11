import galleryMeeting from "@/assets/gallery-meeting.jpg";
import galleryService from "@/assets/gallery-service.jpg";
import galleryCampaign from "@/assets/gallery-campaign.jpg";
import galleryEvent1 from "@/assets/gallery-event1.jpg";
import galleryEvent2 from "@/assets/gallery-event2.jpg";
import galleryFlag from "@/assets/gallery-flag.jpg";
import galleryRally from "@/assets/gallery-rally.jpg";
import galleryHonor from "@/assets/gallery-honor.jpg";
import galleryNews from "@/assets/gallery-news.jpg";
import galleryTeam from "@/assets/gallery-team.jpg";

import { useLanguage } from "@/contexts/LanguageContext";

const t = {
  ta: {
    title: "தொகுப்பு",
    images: [
      { src: galleryMeeting, label: "தலைவர்கள் சந்திப்பு" },
      { src: galleryService, label: "மக்கள் சேவை" },
      { src: galleryCampaign, label: "சிறப்பு நிகழ்வு" },
      { src: galleryEvent1, label: "அரசியல் கூட்டம்" },
      { src: galleryEvent2, label: "பிரச்சாரம்" },
      { src: galleryFlag, label: "கழகக் கொடி" },
      { src: galleryRally, label: "பேரணி" },
      { src: galleryHonor, label: "பாராட்டு விழா" },
      { src: galleryNews, label: "செய்தி ஊடகம்" },
      { src: galleryTeam, label: "அணி நடவடிக்கை" },
      
    ],
  },
  en: {
    title: "Gallery",
    images: [
      { src: galleryMeeting, label: "Leaders Meeting" },
      { src: galleryService, label: "Public Service" },
      { src: galleryCampaign, label: "Special Event" },
      { src: galleryEvent1, label: "Political Meeting" },
      { src: galleryEvent2, label: "Campaign Rally" },
      { src: galleryFlag, label: "Party Flag" },
      { src: galleryRally, label: "Rally March" },
      { src: galleryHonor, label: "Felicitation" },
      { src: galleryNews, label: "News Coverage" },
      { src: galleryTeam, label: "Team Activity" },
      
    ],
  },
};

const GallerySection = () => {
  const { lang } = useLanguage();
  const c = t[lang];

  return (
    <section id="gallery" className="py-20 bg-muted">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-black text-center text-foreground mb-4">{c.title}</h2>
        <div className="w-24 h-1 bg-primary mx-auto mb-12 rounded-full" />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {c.images.map((img, i) => (
            <div key={i} className="group relative overflow-hidden rounded-2xl shadow-card hover:shadow-strong transition-shadow duration-300">
              <img src={img.src} alt={img.label} loading="lazy" width={800} height={600} className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-6">
                <p className="text-primary-foreground font-bold text-lg drop-shadow-lg">{img.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GallerySection;
