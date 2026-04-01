import Image from "next/image";

export default function About() {
  return (
    <section id="about" className="bg-navy">
      <div className="mx-auto max-w-7xl px-6 py-20 lg:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-[55%_45%] gap-12 lg:gap-16 items-center">
          {/* Text Column */}
          <div>
            <p className="font-heading text-xs uppercase tracking-[0.15em] text-gold mb-4">
              About
            </p>

            <h2 className="font-display text-5xl uppercase text-white mb-4">
              Forged in the water. Proven under pressure.
            </h2>

            <div className="w-12 h-0.5 bg-gold mb-8" />

            <div className="space-y-5">
              <p className="font-body text-base text-white/70 leading-relaxed">
                Founded in 2016, Lapu-Lapu City, Cebu. We deliver commercial
                diving services across the Philippines — underwater welding,
                cutting, inspection, structural repair, and marine maintenance.
              </p>

              <p className="font-body text-base text-white/70 leading-relaxed">
                Our team has been diving since 1981 — 45 years of accumulated
                technical knowledge and performance in hostile environments. Our
                founders were pioneer PADI instructors in the Philippines. This
                is a family-built operation, and the discipline runs
                generational.
              </p>

              <p className="font-body text-base text-white/50 leading-relaxed">
                2GO Group, OceanJet, Trans-Asia, SuperCat, Lite Ferries,
                Cokaliong, FastCat, Starlite, Weesam Express, Philippine Span
                Asia, Cebu Port Authority, OPASCOR, and Holcim Philippines.
              </p>
            </div>

            <blockquote className="mt-8 border-l-2 border-gold pl-4">
              <p className="font-heritage italic text-gold">
                45 years of operational depth. Zero tolerance for anything less
                than precise.
              </p>
            </blockquote>
          </div>

          {/* Image Column */}
          <div className="relative h-[500px] lg:h-full min-h-[400px] order-first lg:order-last">
            <Image
              src="/images/about.png"
              alt="Oceantech Offshore Diving Services team at work"
              fill
              className="object-cover"
            />
            {/* Navy overlay at edges */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-navy/40 via-transparent to-navy/40" />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-navy/30 via-transparent to-navy/30" />
          </div>
        </div>
      </div>
    </section>
  );
}
