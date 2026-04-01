const imageServices = [
  {
    title: "Underwater Welding",
    description:
      "Steel doesn't care that it's submerged — it still needs to hold. Our divers run wet welds and habitat welds on hulls, pipelines, and structural steel.",
    image: "/images/service-welding.png",
  },
  {
    title: "Hull Cleaning",
    description:
      "Marine growth is a tax on every vessel that sits in the water. We scrape it, blast it, and get your hull back to where it should be.",
    image: "/images/service-hull.png",
  },
  {
    title: "Survey & NDT Inspection",
    description:
      "Sometimes you don't need a repair — you need to know what's going on down there. We run the checks and give you the real picture.",
    image: "/images/service-inspection.png",
  },
];

const textServices = [
  {
    title: "Structural Repair",
    description:
      "Piers crack. Pilings corrode. Things underwater break in ways nobody planned for. We go down, assess the damage, and fix it.",
    icon: (
      <svg
        className="w-8 h-8 text-rust"
        viewBox="0 0 32 32"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M6 26L16 6l10 20H6z" />
        <path d="M16 18v-4" />
        <circle cx="16" cy="22" r="1" fill="currentColor" />
      </svg>
    ),
  },
  {
    title: "Pier & Wharf Cleanup",
    description:
      "Port infrastructure collects debris, growth, and damage constantly. We clear it out, clean it up, and tell you what we found.",
    icon: (
      <svg
        className="w-8 h-8 text-rust"
        viewBox="0 0 32 32"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="4" y="20" width="24" height="6" rx="1" />
        <path d="M8 20V10M16 20V8M24 20V12" />
        <path d="M4 26h24" />
      </svg>
    ),
  },
  {
    title: "Ship & Vessel Maintenance",
    description:
      "Propeller polishing, anode swaps, valve work — the in-water maintenance that keeps a vessel running between dry dock visits.",
    icon: (
      <svg
        className="w-8 h-8 text-rust"
        viewBox="0 0 32 32"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="16" cy="16" r="6" />
        <path d="M16 4v4M16 24v4M4 16h4M24 16h4" />
        <path d="M7.8 7.8l2.8 2.8M21.4 21.4l2.8 2.8M7.8 24.2l2.8-2.8M21.4 10.6l2.8-2.8" />
      </svg>
    ),
  },
];

export default function Services() {
  return (
    <section id="services" className="bg-white py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-6">
        {/* Header */}
        <div className="mb-14">
          <span className="font-body text-xs uppercase tracking-[0.15em] text-rust">
            What We Do
          </span>
          <h2 className="mt-3 font-display text-4xl text-green">
            Here&rsquo;s what we actually do.
          </h2>
          <div className="mt-4 h-[3px] w-12 bg-rust" />
          <p className="mt-6 max-w-2xl font-body text-base leading-relaxed text-espresso/70">
            No fancy categories. No marketing names for simple things. This is
            the work — the stuff our divers gear up for, get wet for, and get
            done.
          </p>
        </div>

        {/* Row 1 — Welding (2 col) + Hull (1 col) */}
        <div className="grid gap-6 md:grid-cols-3">
          {/* Welding — spans 2 columns */}
          <div className="group relative col-span-1 md:col-span-2 overflow-hidden rounded-sm transition hover:-translate-y-1 hover:shadow-md">
            <div className="relative aspect-[16/9] w-full">
              <img
                src={imageServices[0].image}
                alt={imageServices[0].title}
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-espresso/60" />
              <div className="absolute inset-0 flex flex-col justify-end p-8">
                <h3 className="font-heading text-xl font-bold text-cream">
                  {imageServices[0].title}
                </h3>
                <p className="mt-2 max-w-md font-body text-sm leading-relaxed text-cream/80">
                  {imageServices[0].description}
                </p>
                <span className="mt-4 inline-block font-body text-sm font-medium text-rust">
                  Learn More &rarr;
                </span>
              </div>
            </div>
          </div>

          {/* Hull Cleaning — 1 column */}
          <div className="group relative col-span-1 overflow-hidden rounded-sm transition hover:-translate-y-1 hover:shadow-md">
            <div className="relative aspect-[9/16] md:aspect-auto md:h-full w-full">
              <img
                src={imageServices[1].image}
                alt={imageServices[1].title}
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-espresso/60" />
              <div className="absolute inset-0 flex flex-col justify-end p-8">
                <h3 className="font-heading text-xl font-bold text-cream">
                  {imageServices[1].title}
                </h3>
                <p className="mt-2 font-body text-sm leading-relaxed text-cream/80">
                  {imageServices[1].description}
                </p>
                <span className="mt-4 inline-block font-body text-sm font-medium text-rust">
                  Learn More &rarr;
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Row 2 — 3 text cards */}
        <div className="mt-6 grid gap-6 md:grid-cols-3">
          {textServices.map((service) => (
            <div
              key={service.title}
              className="group rounded-sm border-l-4 border-green bg-cream p-6 transition hover:-translate-y-1 hover:shadow-md"
            >
              <div className="mb-4">{service.icon}</div>
              <h3 className="font-heading text-lg font-bold text-green">
                {service.title}
              </h3>
              <p className="mt-2 font-body text-sm leading-relaxed text-espresso/70">
                {service.description}
              </p>
            </div>
          ))}
        </div>

        {/* Row 3 — Survey & NDT (full width) */}
        <div className="mt-6">
          <div className="group relative overflow-hidden rounded-sm transition hover:-translate-y-1 hover:shadow-md">
            <div className="relative aspect-[21/9] w-full">
              <img
                src={imageServices[2].image}
                alt={imageServices[2].title}
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-espresso/60" />
              <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-12">
                <h3 className="font-heading text-2xl font-bold text-cream">
                  {imageServices[2].title}
                </h3>
                <p className="mt-2 max-w-lg font-body text-base leading-relaxed text-cream/80">
                  {imageServices[2].description}
                </p>
                <span className="mt-4 inline-block font-body text-sm font-medium text-rust">
                  Learn More &rarr;
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
