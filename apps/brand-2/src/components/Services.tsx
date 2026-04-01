import Image from "next/image";

const imageServices = [
  {
    title: "Underwater Welding",
    subtitle: "Structural integrity delivered at depth.",
    description:
      "Wet and habitat welding on hulls, pipelines, and offshore structures — coded to international standards.",
    image: "/images/service-welding.png",
    colSpan: "md:col-span-2",
  },
  {
    title: "Hull Cleaning",
    subtitle: "Performance recovery, executed in-water.",
    description:
      "Methodical removal of marine fouling to recover vessel speed and reduce fuel consumption.",
    image: "/images/service-hull.png",
    colSpan: "md:col-span-1",
  },
];

const textServices = [
  {
    title: "Pier & Wharf Cleanup",
    subtitle: "Maintaining the infrastructure the industry depends on.",
    description:
      "Debris removal, biofouling clearance, and underwater structural assessments on port infrastructure.",
    icon: (
      <svg
        width="32"
        height="32"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M4 28H28M8 28V16M16 28V12M24 28V16M4 16L16 6L28 16"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    title: "Ship & Vessel Maintenance",
    subtitle: "Operational continuity without dry dock dependency.",
    description:
      "Propeller polishing, anode replacement, sea chest clearing, valve servicing, and blanking — in-water.",
    icon: (
      <svg
        width="32"
        height="32"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M6 22L4 28H28L26 22M6 22H26M6 22V14L16 8L26 14V22M12 22V18H20V22"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    title: "Underwater Cutting",
    subtitle: "Controlled material removal in submerged environments.",
    description:
      "Oxy-arc, thermic lance, and hydraulic cutting on steel, concrete, and composite structures.",
    icon: (
      <svg
        width="32"
        height="32"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M8 4L4 8L20 24L24 28M24 4L28 8L12 24L8 28M16 12L20 16"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
];

const fullWidthService = {
  title: "Survey & NDT Inspection",
  subtitle: "Data-driven assessment of subsurface assets.",
  description:
    "Ultrasonic thickness measurement, cathodic potential surveys, visual and CCTV inspections.",
  image: "/images/service-inspection.png",
};

export default function Services() {
  return (
    <section id="services" className="bg-[#111111] py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <div className="mb-16">
          <span className="font-heading text-xs uppercase tracking-[0.15em] text-gold">
            CRITICAL SERVICES
          </span>
          <h2 className="mt-4 font-display text-5xl uppercase text-white">
            CRITICAL SERVICES. EXECUTED WITH PRECISION.
          </h2>
          <div className="mt-6 h-[1px] w-[48px] bg-gold" />
          <p className="mt-6 max-w-2xl font-body text-white/60">
            Every service we deliver operates under the same standard: plan it,
            brief it, execute it, document it. No ambiguity. No improvisation.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {/* Row 1: Image Cards */}
          {imageServices.map((service) => (
            <div
              key={service.title}
              className={`group relative overflow-hidden border border-transparent transition-all duration-300 hover:border-gold hover:-translate-y-1 ${service.colSpan}`}
            >
              <div className="relative aspect-[16/10] md:aspect-[16/10] w-full">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-cover"
                />
                {/* Dark navy overlay */}
                <div className="absolute inset-0 bg-navy/80" />
              </div>
              {/* Gold top border */}
              <div className="absolute inset-x-0 top-0 h-[3px] bg-gold" />
              {/* Content */}
              <div className="absolute inset-0 flex flex-col justify-end p-6">
                <h3 className="font-heading text-lg font-semibold uppercase text-white">
                  {service.title}
                </h3>
                <p className="mt-1 font-body text-sm text-silver">
                  {service.subtitle}
                </p>
                <p className="mt-3 font-body text-sm text-silver/70">
                  {service.description}
                </p>
                <a
                  href="#"
                  className="mt-4 inline-flex items-center font-heading text-xs uppercase tracking-[0.1em] text-gold transition-colors hover:text-white"
                >
                  Scope Assessment
                  <span className="ml-2">&rarr;</span>
                </a>
              </div>
            </div>
          ))}

          {/* Row 2: Text Cards */}
          {textServices.map((service) => (
            <div
              key={service.title}
              className="group relative border border-divider bg-navy-light transition-all duration-300 hover:border-gold hover:-translate-y-1"
            >
              {/* Gold left border */}
              <div className="absolute inset-y-0 left-0 w-[3px] bg-gold" />
              <div className="p-6 pl-8">
                <div className="text-gold">{service.icon}</div>
                <h3 className="mt-4 font-heading text-lg font-semibold uppercase text-white">
                  {service.title}
                </h3>
                <p className="mt-1 font-body text-sm text-silver">
                  {service.subtitle}
                </p>
                <p className="mt-3 font-body text-sm text-silver/70">
                  {service.description}
                </p>
              </div>
            </div>
          ))}

          {/* Row 3: Full Width Image Card */}
          <div className="group relative col-span-1 overflow-hidden border border-transparent transition-all duration-300 hover:border-gold hover:-translate-y-1 md:col-span-3">
            <div className="relative aspect-[21/7] w-full">
              <Image
                src={fullWidthService.image}
                alt={fullWidthService.title}
                fill
                className="object-cover"
              />
              {/* Dark navy overlay */}
              <div className="absolute inset-0 bg-navy/80" />
            </div>
            {/* Gold top border */}
            <div className="absolute inset-x-0 top-0 h-[3px] bg-gold" />
            {/* Content */}
            <div className="absolute inset-0 flex flex-col justify-end p-8">
              <h3 className="font-heading text-lg font-semibold uppercase text-white">
                {fullWidthService.title}
              </h3>
              <p className="mt-1 max-w-xl font-body text-sm text-silver">
                {fullWidthService.subtitle}
              </p>
              <p className="mt-3 max-w-xl font-body text-sm text-silver/70">
                {fullWidthService.description}
              </p>
              <a
                href="#"
                className="mt-4 inline-flex items-center font-heading text-xs uppercase tracking-[0.1em] text-gold transition-colors hover:text-white"
              >
                Scope Assessment
                <span className="ml-2">&rarr;</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
