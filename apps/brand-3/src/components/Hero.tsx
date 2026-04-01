import Image from "next/image";

const stats = [
  {
    value: "Since 1981",
    label: "In the water — first as divers, now as the crew you call",
  },
  {
    value: "Cebu-based",
    label: "Maribago. We know these straits.",
  },
  {
    value: "24/7",
    label: "When something goes wrong underwater, it doesn't wait",
  },
];

export default function Hero() {
  return (
    <section className="relative min-h-screen bg-[#3C2415] overflow-hidden">
      {/* Background Image */}
      <Image
        src="/images/hero.png"
        alt="Commercial diving operations"
        fill
        priority
        className="object-cover"
        sizes="100vw"
      />

      {/* Warm Overlay — espresso-to-transparent from bottom-left */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to top right, rgba(60, 36, 21, 0.85) 0%, rgba(60, 36, 21, 0.55) 40%, rgba(60, 36, 21, 0.15) 70%, transparent 100%)",
        }}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col justify-center min-h-screen">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full pt-24 pb-8">
          <div className="max-w-3xl">
            {/* Overline */}
            <div className="flex items-center gap-4 mb-8">
              <span className="block w-12 h-[2px] bg-[#C1440E]" />
              <span className="font-body uppercase tracking-[0.15em] text-[#D4A574] text-sm">
                Commercial Diving — Cebu, Philippines
              </span>
            </div>

            {/* Headline */}
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-[#FAF3E8] leading-[1.1] mb-6">
              Some crews talk about the water. We work in it.
            </h1>

            {/* Subheadline */}
            <p className="font-body text-lg text-[#FAF3E8]/80 leading-relaxed max-w-2xl mb-10">
              Oceantech is a commercial diving outfit from Cebu — underwater
              welding, hull work, structural repair — built on 45 years of
              actually being in the ocean. The biggest shipping lines in the
              Philippines trust us with their vessels.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 mb-16">
              <a
                href="#contact"
                className="inline-flex items-center justify-center bg-[#C1440E] text-[#FAF3E8] px-8 py-4 rounded-sm font-body font-medium text-base transition-colors duration-300 hover:bg-[#A33A0C]"
              >
                Tell Us What You Need
              </a>
              <a
                href="#contact"
                className="inline-flex items-center justify-center border-2 border-[#FAF3E8]/50 text-[#FAF3E8] px-8 py-4 rounded-sm font-body font-medium text-base transition-colors duration-300 hover:bg-[#FAF3E8]/10"
              >
                Let&apos;s Talk About the Job
              </a>
            </div>

            {/* Est. badge */}
            <p className="font-heading italic text-[#D4A574]/60 text-base mb-8">
              Est. 1981
            </p>
          </div>
        </div>

        {/* Stats Bar */}
        <div className="relative z-10 border-t border-[#FAF3E8]/10 mt-auto">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 py-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
              {stats.map((stat) => (
                <div key={stat.value} className="flex flex-col gap-1">
                  <span className="font-display text-2xl text-[#C1440E]">
                    {stat.value}
                  </span>
                  <span className="font-body text-xs text-[#FAF3E8]/60 leading-relaxed">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
