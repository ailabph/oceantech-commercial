const reasons = [
  {
    title: "Safety Is Not Negotiable",
    description:
      "Every dive follows a safety management plan — no exceptions, no shortcuts.",
    icon: (
      <svg
        width="32"
        height="32"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-orange"
      >
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
  },
  {
    title: "Certified and Qualified",
    description:
      "Our divers hold recognized certifications and our founders were pioneer PADI instructors in the Philippines.",
    icon: (
      <svg
        width="32"
        height="32"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-orange"
      >
        <rect x="3" y="4" width="18" height="14" rx="2" />
        <path d="M7 12h10" />
        <path d="M7 16h6" />
        <circle cx="7.5" cy="8" r="1.5" />
      </svg>
    ),
  },
  {
    title: "Rapid Mobilization from Cebu",
    description:
      "Based in Lapu-Lapu City — shorter lead times and lower mobilization costs across the Visayas.",
    icon: (
      <svg
        width="32"
        height="32"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-orange"
      >
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    ),
  },
  {
    title: "The Right Tools for the Job",
    description:
      "Properly maintained diving systems, welding rigs, and inspection technology — because good gear makes good work.",
    icon: (
      <svg
        width="32"
        height="32"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-orange"
      >
        <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
      </svg>
    ),
  },
  {
    title: "Experienced Crew",
    description:
      "Our team has been diving commercially and recreationally for decades — experience gets the job done.",
    icon: (
      <svg
        width="32"
        height="32"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-orange"
      >
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
  {
    title: "Transparent Pricing",
    description:
      "We quote what the job costs — no hidden fees, no surprise line items.",
    icon: (
      <svg
        width="32"
        height="32"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-orange"
      >
        <line x1="12" y1="1" x2="12" y2="23" />
        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
      </svg>
    ),
  },
];

export default function WhyUs() {
  return (
    <section id="why-us" className="bg-teal py-24 px-6 md:px-12 lg:px-24">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-16 text-center">
          <p className="font-heading text-sm uppercase tracking-[0.2em] text-copper mb-4">
            Why Oceantech
          </p>
          <h2 className="font-heading font-bold text-4xl text-white">
            Six reasons to work with Oceantech.
          </h2>
        </div>

        {/* Reason cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reasons.map((reason) => (
            <div
              key={reason.title}
              className="bg-white/5 backdrop-blur border border-white/10 rounded-sm p-5 md:p-6"
            >
              {/* Icon */}
              <div className="mb-5">{reason.icon}</div>

              {/* Title */}
              <h3 className="font-heading font-semibold text-lg text-white mb-3">
                {reason.title}
              </h3>

              {/* Description */}
              <p className="font-body text-base text-white/70">
                {reason.description}
              </p>
            </div>
          ))}
        </div>

        {/* ── Meet the Crew mini-section ── */}
        <div className="mt-16 flex flex-col items-center">
          <p className="mb-6 font-heading text-sm uppercase tracking-[0.2em] text-copper">
            Meet the Crew
          </p>
          <div className="flex items-center gap-6">
            <img
              src="/images/actual/actual-photo-1.jpg"
              alt="Crew member portrait wearing blue DIVER helmet on boat"
              loading="lazy"
              className="h-16 w-16 rounded-full object-cover shadow-md ring-2 ring-copper/40"
            />
            <img
              src="/images/actual/actual-photo-13.jpg"
              alt="Intense close-up of diver wearing DIVER helmet"
              loading="lazy"
              className="h-16 w-16 rounded-full object-cover shadow-md ring-2 ring-copper/40"
            />
            <p className="font-body text-sm text-white/60 max-w-xs text-center">
              Real people, real experience — our divers in the field.
            </p>
            <img
              src="/images/actual/actual-photo-6.jpg"
              alt="Close-up crew member wearing DIVER helmet and CREW shirt"
              loading="lazy"
              className="h-16 w-16 rounded-full object-cover shadow-md ring-2 ring-copper/40"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
