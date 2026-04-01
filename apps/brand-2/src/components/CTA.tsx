import Image from "next/image";

export default function CTA() {
  return (
    <section id="contact" className="relative py-32 px-6 md:px-12 lg:px-20">
      {/* Background Image */}
      <Image
        src="/images/actual/actual-photo-7.jpg"
        alt="Water-level port infrastructure with boats and scaffolding"
        fill
        loading="lazy"
        className="object-cover brightness-75"
      />

      {/* Heavy Navy Overlay */}
      <div className="absolute inset-0 bg-navy/80" />

      {/* Crew inset photo */}
      <Image
        src="/images/actual/actual-photo-21.jpg"
        alt="Two crew members in life vests preparing for dive operations"
        width={192}
        height={128}
        loading="lazy"
        className="absolute bottom-6 right-6 w-48 h-32 object-cover border border-gold/20 brightness-75 hidden lg:block z-10"
      />

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
