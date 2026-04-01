import Image from "next/image";

export default function CTA() {
  return (
    <section id="contact" className="relative py-32 px-6 md:px-12 lg:px-20">
      {/* Background Image */}
      <Image
        src="/images/cta-background.png"
        alt=""
        fill
        className="object-cover"
        priority={false}
      />

      {/* Navy Overlay */}
      <div className="absolute inset-0 bg-navy/80" />

      {/* Content */}
      <div className="relative z-10 max-w-2xl mx-auto text-center">
        <h2 className="font-display text-3xl md:text-4xl lg:text-5xl uppercase text-white mb-6">
          READY WHEN YOU ARE.
        </h2>
        <p className="font-body text-lg text-white/70 mb-10">
          Define the scope. We&apos;ll define the solution. Contact our
          operations team to discuss your project requirements.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
          <button className="w-full sm:w-auto bg-gold text-navy px-8 py-4 font-heading font-semibold uppercase rounded-none">
            Request a Scope Assessment
          </button>
          <button className="w-full sm:w-auto border border-white text-white px-8 py-4 font-heading font-semibold uppercase rounded-none">
            Contact Operations
          </button>
        </div>

        {/* Heritage */}
        <p className="font-heritage italic text-gold/50">Est. 1981</p>
      </div>
    </section>
  );
}
