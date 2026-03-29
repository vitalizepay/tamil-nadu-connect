import logo from "@/assets/mjmk-logo.png";

const FounderSection = () => (
  <section className="py-20 gradient-hero">
    <div className="container mx-auto px-4">
      <h2 className="text-3xl md:text-4xl font-black text-center text-primary-foreground mb-4">நிறுவனர்</h2>
      <div className="w-24 h-1 bg-mjmk-cyan mx-auto mb-10 rounded-full" />

      <div className="max-w-2xl mx-auto text-center">
        <div className="w-32 h-32 mx-auto mb-6 rounded-full border-4 border-mjmk-cyan bg-foreground/20 flex items-center justify-center overflow-hidden">
          <img src={logo} alt="MJMK" className="w-full h-full object-cover" />
        </div>
        <h3 className="text-2xl md:text-3xl font-black text-primary-foreground mb-2">Ibrahiem Bhathusha S</h3>
        <p className="text-mjmk-cyan font-bold text-lg mb-6">Founder & President – MJMK</p>
        <p className="text-primary-foreground/80 text-lg leading-relaxed mb-6">
          A dedicated Tamil Nadu political leader fighting for justice & equality. A powerful voice for the common people, standing against oppression and corporate exploitation.
        </p>
        <p className="text-2xl font-black text-mjmk-cyan italic">
          "மக்களின் உரிமைக்காக போராடும் தலைவர்"
        </p>
      </div>
    </div>
  </section>
);

export default FounderSection;
