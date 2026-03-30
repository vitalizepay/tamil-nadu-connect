import founderImg from "@/assets/founder.png";

const FounderSection = () => (
  <section className="py-20 gradient-hero">
    <div className="container mx-auto px-4">
      <h2 className="text-3xl md:text-4xl font-black text-center text-primary-foreground mb-4">நிறுவனர் & தலைவர்</h2>
      <div className="w-24 h-1 bg-mjmk-cyan mx-auto mb-10 rounded-full" />

      <div className="max-w-3xl mx-auto flex flex-col md:flex-row items-center gap-8">
        <div className="w-48 h-48 md:w-64 md:h-64 shrink-0 rounded-2xl border-4 border-mjmk-cyan shadow-strong overflow-hidden">
          <img src={founderImg} alt="எஸ்.இப்ராஹீம்பாதுஷா" className="w-full h-full object-cover" />
        </div>
        <div className="text-center md:text-left">
          <h3 className="text-2xl md:text-3xl font-black text-primary-foreground mb-2">எஸ்.இப்ராஹீம்பாதுஷா</h3>
          <p className="text-mjmk-cyan font-bold text-lg mb-4">நிறுவனர் & தலைவர் – MJMK</p>
          <p className="text-primary-foreground/80 text-lg leading-relaxed mb-4">
            மக்கள் ஜனநாயக முன்னேற்ற கழகத்தின் நிறுவனர் மற்றும் தலைவர். தமிழ்நாடு மக்களின் உரிமைக்காகவும் நீதிக்காகவும் 7+ ஆண்டுகளாக போராடும் தலைவர்.
          </p>
          <p className="text-primary-foreground/80 text-base leading-relaxed mb-6">
            A dedicated Tamil Nadu political leader fighting for justice & equality. A powerful voice for the common people, standing against oppression and corporate exploitation.
          </p>
          <p className="text-2xl font-black text-mjmk-cyan italic">
            "மக்களின் உரிமைக்காக போராடும் தலைவர்"
          </p>
        </div>
      </div>
    </div>
  </section>
);

export default FounderSection;
