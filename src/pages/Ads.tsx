import { useEffect } from "react";
import { Link } from "react-router-dom";

const Ads = () => {
  useEffect(() => {
    // Load AdSense script
    const adsenseScript = document.createElement("script");
    adsenseScript.src =
      "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6592137877448044";
    adsenseScript.async = true;
    adsenseScript.crossOrigin = "anonymous";
    document.head.appendChild(adsenseScript);

    return () => {
      document.head.removeChild(adsenseScript);
    };
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-primary text-primary-foreground py-4 px-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">MJMK - Advertisements</h1>
        <Link to="/" className="text-sm underline hover:opacity-80">
          ← Back to Home
        </Link>
      </header>

      <main className="max-w-4xl mx-auto py-10 px-4 space-y-8">
        <section className="text-center">
          <h2 className="text-3xl font-bold text-foreground mb-2">Our Sponsors & Ads</h2>
          <p className="text-muted-foreground">Supporting MJMK's mission for social justice</p>
        </section>

        {/* Ad slots */}
        <div className="space-y-6">
          <div className="w-full min-h-[250px] bg-muted rounded-lg flex items-center justify-center border border-border">
            <ins
              className="adsbygoogle"
              style={{ display: "block" }}
              data-ad-client="ca-pub-6592137877448044"
              data-ad-slot="auto"
              data-ad-format="auto"
              data-full-width-responsive="true"
            />
          </div>

          <div className="w-full min-h-[250px] bg-muted rounded-lg flex items-center justify-center border border-border">
            <ins
              className="adsbygoogle"
              style={{ display: "block" }}
              data-ad-client="ca-pub-6592137877448044"
              data-ad-slot="auto"
              data-ad-format="auto"
              data-full-width-responsive="true"
            />
          </div>

          <div className="w-full min-h-[250px] bg-muted rounded-lg flex items-center justify-center border border-border">
            <ins
              className="adsbygoogle"
              style={{ display: "block" }}
              data-ad-client="ca-pub-6592137877448044"
              data-ad-slot="auto"
              data-ad-format="auto"
              data-full-width-responsive="true"
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Ads;
