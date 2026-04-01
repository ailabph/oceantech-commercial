import Image from "next/image";

const stats = [
  { value: "45+", label: "Years in the water" },
  { value: "24/7", label: "Emergency response ready" },
  { value: "Cebu-based", label: "Rapid mobilization across the Visayas" },
];

export default function Hero() {
  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-charcoal">
      {/* Background image */}
      <Image
        src="/images/hero.png"
        alt="Commercial diver performing underwater welding operations"
        fill
        priority
        className="object-cover object-center"
        sizes="100vw"
        quality={90}
      />

      {/* Gradient overlay — teal-to-dark, from bottom-left */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to top right, rgba(10, 77, 104, 0.85) 0%, rgba(10, 77, 104, 0.6) 35%, rgba(45, 52, 54, 0.4) 60%, rgba(45, 52, 54, 0.15) 100%)",
        }}
      />

      {/* Content grid — asymmetric left-heavy */}
      <div className="relative z-10 flex min-h-screen flex-col justify-between px-6 py-12 sm:px-10 lg:px-20 xl:px-28">
        {/* Main content area — pushed left, not centered */}
        <div className="mt-auto mb-auto flex max-w-3xl flex-col gap-8 pt-24 lg:pt-32">
          {/* Copper heritage line */}
          <div className="h-[2px] w-16 bg-copper" />

          {/* Overline */}
          <p className="font-heading text-sm font-semibold uppercase tracking-[0.2em] text-copper">
            Commercial Diving Services
          </p>

          {/* Headline */}
          <h1 className="max-w-2xl font-heading text-4xl font-bold leading-[1.1] text-white sm:text-5xl lg:text-6xl">
            Commercial diving built on 45&nbsp;years of ocean experience.
          </h1>

          {/* Subheadline */}
          <p className="max-w-xl font-body text-lg leading-relaxed text-white/80">
            From Cebu&rsquo;s waters to yours — underwater welding, inspection,
            hull maintenance, and structural repair delivered by a crew
            that&rsquo;s been diving since 1981.
          </p>

          {/* CTAs */}
          <div className="flex flex-col gap-4 pt-2 sm:flex-row sm:items-center">
            <a
              href="#quote"
              className="inline-flex items-center justify-center rounded-sm bg-orange px-8 py-4 font-heading text-base font-semibold text-white transition-colors hover:bg-orange-dark"
            >
              Request a Project Quote
            </a>
            <a
              href="#contact"
              className="inline-flex items-center justify-center rounded-sm border-2 border-white px-8 py-4 font-heading text-base font-semibold text-white transition-colors hover:bg-white/10"
            >
              Talk to Our Team
            </a>
          </div>
        </div>

        {/* Bottom bar — stats + heritage callout */}
        <div className="mt-16 flex flex-col gap-8 border-t border-white/10 pt-8 lg:mt-20 lg:flex-row lg:items-end lg:justify-between">
          {/* Stats row */}
          <div className="flex flex-wrap gap-10 lg:gap-16">
            {stats.map((stat) => (
              <div key={stat.value} className="flex flex-col gap-1">
                <span className="font-heading text-3xl font-bold text-orange lg:text-4xl">
                  {stat.value}
                </span>
                <span className="max-w-48 font-body text-sm text-white/70">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>

          {/* Heritage callout */}
          <p className="font-heritage text-base italic text-copper lg:text-lg">
            Est. 1981
          </p>
        </div>
      </div>
    </section>
  );
}
