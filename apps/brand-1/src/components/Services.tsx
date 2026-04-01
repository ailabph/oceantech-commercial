import Image from "next/image";

/* ------------------------------------------------------------------ */
/*  Service data                                                       */
/* ------------------------------------------------------------------ */

interface Service {
  title: string;
  subtitle: string;
  description: string;
  image?: string;
  icon?: React.ReactNode;
}

const WrenchIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="h-8 w-8 text-teal"
  >
    <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
  </svg>
);

const ShipIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="h-8 w-8 text-teal"
  >
    <path d="M2 21c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1 .6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1" />
    <path d="M19.38 20A11.6 11.6 0 0 0 21 14l-9-4-9 4c0 2.9.94 5.34 2.81 7.76" />
    <path d="M19 13V7a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v6" />
    <path d="M12 1v4" />
  </svg>
);

const ClipboardIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="h-8 w-8 text-teal"
  >
    <rect x="8" y="2" width="8" height="4" rx="1" ry="1" />
    <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
    <path d="M12 11h4" />
    <path d="M12 16h4" />
    <path d="M8 11h.01" />
    <path d="M8 16h.01" />
  </svg>
);

const ScissorsIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="h-8 w-8 text-teal"
  >
    <circle cx="6" cy="6" r="3" />
    <circle cx="6" cy="18" r="3" />
    <line x1="20" y1="4" x2="8.12" y2="15.88" />
    <line x1="14.47" y1="14.48" x2="20" y2="20" />
    <line x1="8.12" y1="8.12" x2="12" y2="12" />
  </svg>
);

const services: Service[] = [
  {
    title: "Underwater Welding",
    subtitle: "Reliable welds in demanding conditions.",
    description:
      "Certified wet and habitat welding on hulls, pipelines, and submerged structures \u2014 on code and on schedule.",
    image: "/images/service-welding.png",
  },
  {
    title: "Hull Cleaning",
    subtitle: "Keeping your vessel efficient and seaworthy.",
    description:
      "Thorough marine growth removal that restores hydrodynamic performance and extends coating life.",
    image: "/images/service-hull.png",
  },
  {
    title: "Pier & Wharf Cleanup",
    subtitle: "Maintaining the structures your operations depend on.",
    description:
      "Debris removal, marine growth clearing, and underwater structural assessments for waterfront facilities.",
    icon: <WrenchIcon />,
  },
  {
    title: "Ship & Vessel Maintenance",
    subtitle: "Keeping fleets operational without dry dock delays.",
    description:
      "Propeller polishing, anode replacement, valve servicing, and general underwater maintenance \u2014 without dry dock delays.",
    icon: <ShipIcon />,
  },
  {
    title: "Underwater Cutting",
    subtitle: "Precision cutting where access is limited to divers.",
    description:
      "Oxy-arc and thermic cutting on submerged steel, concrete, and mixed structures for salvage, decommissioning, or clearing.",
    icon: <ScissorsIcon />,
  },
  {
    title: "Survey & NDT Inspection",
    subtitle: "Clear reporting on what\u2019s happening below the waterline.",
    description:
      "Ultrasonic thickness measurements, visual inspections, and CCTV documentation for an accurate structural picture.",
    image: "/images/service-inspection.png",
  },
];

/* ------------------------------------------------------------------ */
/*  Image card (dark overlay + white text)                             */
/* ------------------------------------------------------------------ */

function ImageCard({
  service,
  className,
}: {
  service: Service;
  className?: string;
}) {
  return (
    <a
      href="#contact"
      className={`group relative flex flex-col justify-end overflow-hidden rounded-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl ${className ?? ""}`}
    >
      {/* Background image */}
      <Image
        src={service.image!}
        alt={service.title}
        fill
        className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        sizes="(max-width: 768px) 100vw, 50vw"
        quality={80}
      />

      {/* Dark teal overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-teal-dark/90 via-teal/60 to-teal/25 transition-opacity duration-300 group-hover:from-teal-dark/95" />

      {/* Content */}
      <div className="relative z-10 flex flex-col gap-2 p-6 lg:p-8">
        <h3 className="font-heading text-xl font-bold text-white lg:text-2xl">
          {service.title}
        </h3>
        <p className="font-body text-sm leading-relaxed text-white/80">
          {service.subtitle}
        </p>
        <span className="mt-2 inline-flex items-center gap-1 font-heading text-sm font-semibold text-orange transition-colors group-hover:text-orange-light">
          Learn More
          <span aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-1">&rarr;</span>
        </span>
      </div>
    </a>
  );
}

/* ------------------------------------------------------------------ */
/*  Text card (offwhite bg + teal left border + icon)                  */
/* ------------------------------------------------------------------ */

function TextCard({ service }: { service: Service }) {
  return (
    <a
      href="#contact"
      className="group flex flex-col gap-4 rounded-sm border-l-4 border-teal bg-offwhite p-6 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg lg:p-8"
    >
      {/* Icon */}
      {service.icon && (
        <div className="mb-1">{service.icon}</div>
      )}

      <h3 className="font-heading text-lg font-bold text-teal">
        {service.title}
      </h3>

      <p className="font-body text-sm leading-relaxed text-charcoal/70">
        {service.subtitle}
      </p>

      <p className="font-body text-sm leading-relaxed text-charcoal">
        {service.description}
      </p>

      <span className="mt-auto inline-flex items-center gap-1 pt-2 font-heading text-sm font-semibold text-orange transition-colors group-hover:text-orange-dark">
        Learn More
        <span aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-1">&rarr;</span>
      </span>
    </a>
  );
}

/* ------------------------------------------------------------------ */
/*  Services section                                                   */
/* ------------------------------------------------------------------ */

export default function Services() {
  return (
    <section id="services" className="bg-white py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <div className="mb-14 max-w-2xl">
          <p className="font-heading text-sm uppercase tracking-[0.2em] text-copper">
            What We Do
          </p>
          <h2 className="mt-4 font-heading text-4xl font-bold text-teal">
            What we do below the surface.
          </h2>
          <div className="mt-3 h-[3px] w-16 rounded-sm bg-gradient-to-r from-copper to-copper-light" />
          <p className="mt-6 font-body leading-relaxed text-charcoal">
            We handle the full range of commercial diving work&nbsp;&mdash; from
            routine hull cleaning to complex underwater welding and structural
            repair. Every job gets the same level of preparation, the same
            safety standards, and the same crew discipline.
          </p>
        </div>

        {/* ── Bento grid ── */}
        {/*
          Layout (desktop):
          ┌──────────────────┬──────────┐
          │  Welding (2-col)  │  Hull    │
          │                   │          │
          ├─────────┬────────┴──────────┤
          │  Pier   │  Maintenance      │
          ├─────────┼───────────────────┤
          │ Cutting │  Inspection (img) │
          └─────────┴───────────────────┘
        */}
        <div className="grid auto-rows-[minmax(280px,auto)] grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {/* Row 1: Welding spans 2 cols, Hull 1 col */}
          <ImageCard
            service={services[0]}
            className="min-h-[320px] md:col-span-2 lg:col-span-2"
          />
          <ImageCard
            service={services[1]}
            className="min-h-[320px]"
          />

          {/* Row 2: Pier (text) + Maintenance (text) + Cutting (text) */}
          <TextCard service={services[2]} />
          <TextCard service={services[3]} />
          <TextCard service={services[4]} />

          {/* Row 3: Inspection spans full width as image card */}
          <ImageCard
            service={services[5]}
            className="min-h-[280px] md:col-span-2 lg:col-span-3"
          />
        </div>
      </div>
    </section>
  );
}
