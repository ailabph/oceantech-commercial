import Image from "next/image";

export default function CTA() {
  return (
    <section id="contact" className="relative py-32 px-6 md:px-12 lg:px-24">
      {/* Background image */}
      <Image
        src="/images/cta-background.png"
        alt=""
        fill
        className="object-cover"
        priority={false}
      />

      {/* Dark teal overlay */}
      <div
        className="absolute inset-0 bg-teal/70"
        aria-hidden="true"
      />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-2xl text-center">
        <h2 className="font-heading font-bold text-4xl text-white mb-6">
          Let&apos;s talk about your next project.
        </h2>

        <p className="font-body text-lg text-white/80 mb-10">
          Whether you need a quote, want to discuss a scope of work, or just
          have a question about what&apos;s possible underwater — reach out.
          We&apos;re straightforward people, and we&apos;re happy to talk
          through what you need.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
          <a
            href="#quote"
            className="bg-orange text-white px-8 py-4 font-heading font-semibold transition-colors hover:bg-orange-dark"
          >
            Request a Quote
          </a>
          <a
            href="tel:18005550199"
            className="border-2 border-white text-white px-8 py-4 font-heading font-semibold transition-colors hover:bg-white/10"
          >
            Call Our Team
          </a>
        </div>

        {/* Heritage line */}
        <p className="font-heritage italic text-copper">Est. 1981</p>
      </div>
    </section>
  );
}
