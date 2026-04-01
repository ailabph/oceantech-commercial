const steps = [
  {
    number: "01",
    title: "You tell us what's going on.",
    description:
      "Call, email, whatever works — the obvious questions now save time later.",
  },
  {
    number: "02",
    title: "We go look at it.",
    description:
      "We build a dive plan from what we find, not from what we hope to find.",
  },
  {
    number: "03",
    title: "We do the work.",
    description:
      "Right equipment, right people, safety procedures that aren't optional.",
  },
  {
    number: "04",
    title: "You get the full picture.",
    description:
      "Photos, video, measurements, and honest recommendations — thorough because you'll need it.",
  },
];

export default function Process() {
  return (
    <section id="process" className="bg-cream py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-6">
        {/* Header */}
        <div className="mb-14">
          <span className="font-body text-xs uppercase tracking-[0.15em] text-rust">
            How It Works
          </span>
          <h2 className="mt-3 font-display text-4xl text-green">
            How a job works with us.
          </h2>
          <div className="mt-4 h-[3px] w-12 bg-rust" />
        </div>

        {/* Steps */}
        <div className="relative grid gap-10 md:grid-cols-4 md:gap-8">
          {/* Rust connecting line — hidden on mobile, visible on md+ */}
          <div
            className="pointer-events-none absolute top-14 left-[calc(12.5%+1rem)] hidden h-[2px] bg-rust md:block"
            style={{ width: "calc(75% - 2rem)" }}
          />

          {steps.map((step, index) => (
            <div key={step.number} className="relative">
              {/* Large background number */}
              <span className="font-display text-4xl md:text-6xl leading-none text-green/15">
                {step.number}
              </span>

              {/* Connecting dot on the line — desktop only */}
              {index > 0 && index < steps.length && (
                <div className="absolute top-[3.25rem] left-0 hidden h-3 w-3 -translate-x-1/2 rounded-full bg-rust md:block" />
              )}

              <h3 className="mt-3 font-heading text-lg font-bold text-espresso">
                {step.title}
              </h3>
              <p className="mt-2 font-body text-base leading-relaxed text-espresso/60">
                {step.description}
              </p>
            </div>
          ))}
        </div>

        {/* Between Dives — Candid Photo Strip */}
        <div className="flex gap-3 justify-center mt-8">
          <img
            src="/images/actual/actual-photo-16.jpg"
            alt="Crew resting on platform between dives"
            className="h-36 w-auto rounded-sm object-cover saturate-[0.85]"
          />
          <img
            src="/images/actual/actual-photo-15.jpg"
            alt="Crew members at water level"
            className="h-36 w-auto rounded-sm object-cover saturate-[0.85]"
          />
        </div>
        <p className="font-heading italic text-espresso/30 text-xs text-center mt-2">
          Between dives.
        </p>
      </div>
    </section>
  );
}
