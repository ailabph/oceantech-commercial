import Image from "next/image";

const stats = [
  { value: "45+", label: "Years of diving operations" },
  { value: "100%", label: "Safety-first execution record" },
  { value: "24/7", label: "Mobilization-ready" },
];

export default function Hero() {
  return (
    <section className="relative min-h-screen bg-black flex flex-col">
      {/* ── Background Image ── */}
      <Image
        src="/images/hero.png"
        alt="Deep-sea commercial diving operations"
        fill
        priority
        className="object-cover object-center"
        sizes="100vw"
      />

      {/* ── Overlay: Navy-to-Black Diagonal Gradient ── */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(135deg, rgba(10,25,47,0.85) 0%, rgba(10,25,47,0.75) 40%, rgba(0,0,0,0.80) 100%)",
        }}
      />

      {/* ── Content ── */}
      <div className="relative z-10 flex-1 flex flex-col justify-center max-w-7xl w-full mx-auto px-6 lg:px-10 pt-28 pb-8">
        <div className="max-w-2xl">
          {/* Overline */}
          <div className="flex items-center gap-4 mb-6">
            <span className="block w-12 h-[2px] bg-gold" />
            <span className="font-heading uppercase tracking-[0.2em] text-gold text-xs">
              Commercial Diving Operations
            </span>
          </div>

          {/* Headline */}
          <h1 className="font-display text-6xl lg:text-7xl text-white uppercase tracking-tight leading-none mb-6">
            Engineered
            <br />
            for the Deep.
          </h1>

          {/* Subheadline */}
          <p className="font-body text-lg text-white/70 leading-relaxed max-w-xl mb-10">
            Underwater welding, structural repair, and marine services executed
            with the precision of 45 years in the water. Trusted by the
            Philippines&rsquo; top shipping lines.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap gap-4">
            <a
              href="#contact"
              className="bg-gold text-navy px-8 py-4 font-heading font-semibold uppercase text-sm tracking-wide transition-all duration-200 hover:bg-gold-dark hover:shadow-lg hover:shadow-gold/20"
            >
              Deploy Our Team
            </a>
            <a
              href="#contact"
              className="border border-white text-white px-8 py-4 font-heading font-semibold uppercase text-sm tracking-wide transition-all duration-200 hover:bg-white/10"
            >
              Request a Scope Assessment
            </a>
          </div>
        </div>

        {/* ── Est. Heritage Mark ── */}
        <div className="hidden lg:block absolute right-10 bottom-32">
          <span className="font-heritage italic text-gold/60 text-sm">
            Est. 1981
          </span>
        </div>
      </div>

      {/* ── Stats Bar ── */}
      <div className="relative z-10 border-t border-divider">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-8">
          <div className="grid grid-cols-3 gap-8">
            {stats.map((stat) => (
              <div key={stat.value} className="text-center lg:text-left">
                <span className="block font-display text-4xl text-gold mb-1">
                  {stat.value}
                </span>
                <span className="font-body text-xs text-silver uppercase tracking-wide">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
