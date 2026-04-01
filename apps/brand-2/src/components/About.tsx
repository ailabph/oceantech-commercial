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
              src="/images/actual/actual-photo-4.jpg"
              alt="Two divers in wetsuits at pier site with safety signage"
              fill
              className="object-cover"
            />
            {/* Navy overlay at edges */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-navy/40 via-transparent to-navy/40" />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-navy/30 via-transparent to-navy/30" />
          </div>
        </div>

        {/* Photo Strip */}
        <div className="mt-12 flex gap-3">
          {[
            { src: "/images/actual/actual-photo-9.jpg", alt: "Three divers on boat with blue helmets during bridge construction" },
            { src: "/images/actual/actual-photo-8.jpg", alt: "Barge with crane and heavy marine equipment" },
            { src: "/images/actual/actual-photo-10.jpg", alt: "Dive platform with scuba tanks, diver prepping equipment" },
          ].map((photo) => (
            <div key={photo.src} className="relative h-32 w-auto flex-1 overflow-hidden">
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                className="object-cover brightness-90"
              />
              <div className="pointer-events-none absolute inset-0 bg-navy/30" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
