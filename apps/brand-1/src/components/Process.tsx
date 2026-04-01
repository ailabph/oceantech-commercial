const steps = [
  {
    number: "01",
    title: "Project Brief",
    description:
      "You tell us what you need. We listen, ask the right questions, and scope the job.",
  },
  {
    number: "02",
    title: "Site Assessment",
    description:
      "Before anyone goes in the water, we evaluate the site. Water conditions, structural context, access points, safety considerations.",
  },
  {
    number: "03",
    title: "Execution",
    description:
      "Our crew mobilizes with the right equipment and the right people. Safety protocols are followed on every dive, every time.",
  },
  {
    number: "04",
    title: "Reporting",
    description:
      "When the work is done, you get a complete report — photos, video, measurements, and findings.",
  },
];

export default function Process() {
  return (
    <section id="process" className="bg-cream py-24 px-6 md:px-12 lg:px-24">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-16 text-center">
          <p className="font-heading text-sm uppercase tracking-[0.2em] text-copper mb-4">
            How It Works
          </p>
          <h2 className="font-heading font-bold text-4xl text-teal">
            How we work.
          </h2>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-0">
          {steps.map((step, index) => (
            <div key={step.number} className="relative flex flex-col">
              {/* Connecting line — visible on lg between steps */}
              {index < steps.length - 1 && (
                <div
                  className="hidden lg:block absolute top-12 left-1/2 w-full h-px bg-copper"
                  aria-hidden="true"
                />
              )}

              <div className="relative z-10 flex flex-col items-center text-center lg:px-6">
                {/* Watermark number */}
                <span className="font-heading text-6xl font-bold text-copper/20 leading-none select-none">
                  {step.number}
                </span>

                {/* Title */}
                <h3 className="font-heading font-semibold text-xl text-charcoal mt-4 mb-3">
                  {step.title}
                </h3>

                {/* Description */}
                <p className="font-body text-base text-charcoal/70 max-w-xs">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
