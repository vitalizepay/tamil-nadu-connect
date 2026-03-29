import { useEffect, useRef, useState } from "react";

const stats = [
  { value: 7, suffix: "+", label: "Years of Service", tamilLabel: "ஆண்டுகள் சேவை" },
  { value: 1000, suffix: "+", label: "People Helped", tamilLabel: "மக்கள் உதவி" },
  { value: 500, suffix: "+", label: "Issues Resolved", tamilLabel: "பிரச்சினைகள் தீர்வு" },
];

const Counter = ({ target, suffix }: { target: number; suffix: string }) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const duration = 2000;
          const steps = 60;
          const increment = target / steps;
          let current = 0;
          const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
              setCount(target);
              clearInterval(timer);
            } else {
              setCount(Math.floor(current));
            }
          }, duration / steps);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return (
    <div ref={ref} className="text-5xl md:text-6xl font-black text-primary">
      {count.toLocaleString()}{suffix}
    </div>
  );
};

const AchievementsSection = () => (
  <section id="achievements" className="py-20 bg-background">
    <div className="container mx-auto px-4">
      <h2 className="text-3xl md:text-4xl font-black text-center text-foreground mb-4">எங்கள் சாதனைகள்</h2>
      <div className="w-24 h-1 bg-primary mx-auto mb-12 rounded-full" />

      <div className="grid sm:grid-cols-3 gap-8 max-w-4xl mx-auto">
        {stats.map((s, i) => (
          <div key={i} className="text-center p-8 rounded-xl shadow-card bg-muted">
            <Counter target={s.value} suffix={s.suffix} />
            <p className="text-lg font-bold text-foreground mt-3">{s.tamilLabel}</p>
            <p className="text-sm text-muted-foreground">{s.label}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default AchievementsSection;
