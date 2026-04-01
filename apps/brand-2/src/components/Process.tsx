const phases = [
  {
    number: "01",
    title: "BRIEF",
    description:
      "Scope defined. Requirements locked. Deliverables, timeline, constraints established before equipment mobilization.",
  },
  {
    number: "02",
    title: "ASSESSMENT",
    description:
      "Site conditions evaluated. Water environment, structural context, hazards surveyed and documented. Dive plan built from data.",
  },
  {
    number: "03",
    title: "EXECUTION",
    description:
      "Crew deployed with task-specific equipment and clear protocols. Continuous surface-to-diver communication. Strict safety adherence.",
  },
  {
    number: "04",
    title: "REPORTING",
    description:
      "Full documentation — photography, video, measurements, findings, recommendations. Structured for technical review.",
  },
];

export default function Process() {
  return (
    <section id="process" className="bg-navy py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <div className="mb-16">
          <span className="font-heading text-xs uppercase tracking-[0.15em] text-gold">
            OPERATIONAL PROTOCOL
          </span>
          <h2 className="mt-4 font-display text-5xl uppercase text-white">
            FOUR PHASES. ZERO AMBIGUITY.
          </h2>
          <div className="mt-6 h-[1px] w-[48px] bg-gold" />
        </div>

        {/* Phases Grid */}
        <div className="relative grid grid-cols-1 gap-8 md:grid-cols-4 md:gap-0">
          {/* Gold connecting line (desktop) */}
          <div className="absolute left-[12.5%] right-[12.5%] top-[56px] hidden h-[1px] bg-gold md:block" />

          {phases.map((phase, index) => (
            <div
              key={phase.number}
              className="relative px-0 md:px-6"
            >
              {/* Large watermark number */}
              <span className="pointer-events-none select-none font-display text-7xl text-gold/15">
                {phase.number}
              </span>

              {/* Gold dot on connecting line (desktop) */}
              <div className="absolute left-1/2 top-[52px] hidden h-[9px] w-[9px] -translate-x-1/2 rounded-full bg-gold md:block" />

              {/* Phase content */}
              <div className="mt-4">
                <h3 className="font-heading text-lg font-semibold uppercase text-white">
                  {phase.title}
                </h3>
                <p className="mt-3 font-body text-sm text-silver">
                  {phase.description}
                </p>
              </div>

              {/* Gold connecting line (mobile) — between cards only */}
              {index < phases.length - 1 && (
                <div className="mx-auto mt-8 h-8 w-[1px] bg-gold md:hidden" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
