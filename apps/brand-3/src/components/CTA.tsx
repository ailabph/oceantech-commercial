import Image from "next/image";

export default function CTA() {
  return (
    <section id="contact" className="relative overflow-hidden px-6 py-32">
      {/* Background Image */}
      <Image
        src="/images/cta-background.png"
        alt=""
        fill
        className="object-cover"
        priority={false}
      />

      {/* Warm Espresso Overlay */}
      <div className="absolute inset-0 bg-espresso/[0.65]" />

      {/* Content */}
      <div className="relative z-10 mx-auto flex max-w-2xl flex-col items-center text-center">
        <h2 className="font-display text-3xl md:text-4xl text-cream">
          Got a job that needs doing underwater?
        </h2>

        <p className="mt-6 font-body text-lg text-cream/80">
          We&apos;re not hard to reach and we don&apos;t make you jump through
          hoops. Tell us what&apos;s going on — we&apos;ll tell you how we can
          help.
        </p>

        {/* Buttons */}
        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
          <a
            href="#"
            className="w-full sm:w-auto rounded-sm bg-rust px-8 py-4 font-body font-medium text-cream transition-colors hover:bg-rust-dark"
          >
            Talk to the Crew
          </a>
          <a
            href="#"
            className="w-full sm:w-auto rounded-sm border-2 border-cream/50 px-8 py-4 font-body font-medium text-cream transition-colors hover:border-cream hover:bg-cream/10"
          >
            Get a Straight Quote
          </a>
        </div>

        {/* Heritage */}
        <p className="mt-12 font-heading italic text-sand/60">Est. 1981</p>
      </div>
    </section>
  );
}
