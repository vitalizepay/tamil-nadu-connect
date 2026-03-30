import partyBanner from "@/assets/party-banner.png";

const HeroSection = () => {
  const scrollTo = (id: string) => {
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 gradient-hero" />

      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto animate-fade-in-up mt-16 md:mt-24">
        

        {/* Party Banner */}
        <div className="mb-6 rounded-xl overflow-hidden shadow-strong max-w-3xl mx-auto">
          <img src={partyBanner} alt="MJMK - மக்கள் ஜனநாயக முன்னேற்ற கழகம்" className="w-full h-auto" />
        </div>
        
        <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-primary-foreground leading-tight mb-4">
          மக்கள் ஜனநாயக முன்னேற்ற கழகம்
        </h1>
        <p className="text-xl md:text-2xl font-bold text-mjmk-cyan mb-2">MAKKAL JANANAYAKA MUNNETRA KAZHAGAM</p>
        <p className="text-lg md:text-xl text-primary-foreground/90 mb-8">
          7+ ஆண்டுகளாக மக்கள் சேவையில்
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
          <button
            onClick={() => scrollTo("#register")}
            className="gradient-red-btn text-primary-foreground font-bold text-lg px-8 py-4 rounded-lg shadow-strong hover:scale-105 transition-transform animate-pulse-glow"
          >
            இணைந்திடுங்கள்
          </button>
          <button
            onClick={() => scrollTo("#complaint")}
            className="bg-secondary text-secondary-foreground font-bold text-lg px-8 py-4 rounded-lg hover:scale-105 transition-transform"
          >
            உதவி பெறுங்கள்
          </button>
        </div>
      </div>

      {/* Ticker */}
      <div className="absolute bottom-0 left-0 right-0 bg-foreground/80 py-3 overflow-hidden">
        <div className="animate-ticker whitespace-nowrap text-primary-foreground font-bold text-lg">
          ★ மக்களுக்காக &nbsp;•&nbsp; நீதிக்காக &nbsp;•&nbsp; நியாயத்திற்காக &nbsp;★&nbsp; மக்கள் சேவை &nbsp;•&nbsp; மனித உரிமை &nbsp;•&nbsp; நியாயம் &nbsp;★&nbsp; மக்களுக்காக &nbsp;•&nbsp; நீதிக்காக &nbsp;•&nbsp; நியாயத்திற்காக ★
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
