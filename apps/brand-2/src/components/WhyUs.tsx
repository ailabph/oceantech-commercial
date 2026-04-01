export default function WhyUs() {
  const cards = [
    {
      title: "Safety as Operating Standard",
      description:
        "Every dive is governed by a non-negotiable safety management plan.",
      icon: (
        <svg
          width="32"
          height="32"
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M16 2L4 8V16C4 23.2 9.12 29.84 16 32C22.88 29.84 28 23.2 28 16V8L16 2ZM14 22L8 16L10.82 13.18L14 16.34L21.18 9.16L24 12L14 22Z"
            fill="currentColor"
          />
        </svg>
      ),
    },
    {
      title: "Certified to Industry Standards",
      description:
        "Pioneer PADI instructors in the Philippines — we document competency, not claim it.",
      icon: (
        <svg
          width="32"
          height="32"
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M16 2C8.28 2 2 8.28 2 16C2 23.72 8.28 30 16 30C23.72 30 30 23.72 30 16C30 8.28 23.72 2 16 2ZM16 6L19.6 13.28L27.6 14.44L21.8 20.08L23.2 28.04L16 24.24L8.8 28.04L10.2 20.08L4.4 14.44L12.4 13.28L16 6Z"
            fill="currentColor"
          />
        </svg>
      ),
    },
    {
      title: "Rapid Deployment Capability",
      description:
        "Based in Cebu — fast mobilization across the Visayas and the broader Philippine archipelago.",
      icon: (
        <svg
          width="32"
          height="32"
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M16 2C11.58 2 8 5.58 8 10C8 16.5 16 26 16 26C16 26 24 16.5 24 10C24 5.58 20.42 2 16 2ZM16 13C14.34 13 13 11.66 13 10C13 8.34 14.34 7 16 7C17.66 7 19 8.34 19 10C19 11.66 17.66 13 16 13Z"
            fill="currentColor"
          />
          <path
            d="M16 28C11 28 4 29 4 32H28C28 29 21 28 16 28Z"
            fill="currentColor"
          />
        </svg>
      ),
    },
    {
      title: "Purpose-Built Equipment",
      description:
        "Surface-supplied diving systems, coded welding rigs, and calibrated NDT instruments — maintained and ready.",
      icon: (
        <svg
          width="32"
          height="32"
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M5.34 24.66L2 28L4 30L7.34 26.66C8.6 27.52 10.12 28 11.74 28C13.88 28 15.82 27.12 17.22 25.72L11.74 20.24L6.28 14.78C4.88 16.18 4 18.12 4 20.26C4 21.88 4.48 23.4 5.34 24.66ZM25.72 6.28C22.78 3.34 18.16 3.08 14.92 5.48L20.24 10.8L10.8 20.24L5.48 14.92C3.08 18.16 3.34 22.78 6.28 25.72C9.22 28.66 13.84 28.92 17.08 26.52L26.52 17.08C28.92 13.84 28.66 9.22 25.72 6.28Z"
            fill="currentColor"
          />
        </svg>
      ),
    },
    {
      title: "Operators, Not Just Divers",
      description:
        "Decades of operational experience — they deliver on your job, not learn on it.",
      icon: (
        <svg
          width="32"
          height="32"
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M22 14C24.2 14 25.98 12.2 25.98 10C25.98 7.8 24.2 6 22 6C19.8 6 18 7.8 18 10C18 12.2 19.8 14 22 14ZM10 14C12.2 14 13.98 12.2 13.98 10C13.98 7.8 12.2 6 10 6C7.8 6 6 7.8 6 10C6 12.2 7.8 14 10 14ZM10 18C6.68 18 0 19.68 0 23V26H20V23C20 19.68 13.32 18 10 18ZM22 18C21.58 18 21.1 18.04 20.58 18.08C22.38 19.38 23.6 21.12 23.6 23V26H32V23C32 19.68 25.32 18 22 18Z"
            fill="currentColor"
          />
        </svg>
      ),
    },
    {
      title: "Transparent, Defensible Pricing",
      description:
        "Scope-based quotations with no hidden charges or ambiguous line items.",
      icon: (
        <svg
          width="32"
          height="32"
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M16 2C8.28 2 2 8.28 2 16C2 23.72 8.28 30 16 30C23.72 30 30 23.72 30 16C30 8.28 23.72 2 16 2ZM17.4 25.2V27.6H14.6V25.12C12.14 24.56 10.04 22.94 9.88 20.4H12.78C12.92 21.8 13.98 22.84 16 22.84C18.18 22.84 18.88 21.68 18.88 20.96C18.88 20.02 18.18 19.24 15.72 18.62C13 17.92 10.96 16.74 10.96 14.16C10.96 12.04 12.64 10.52 14.6 9.92V7.6H17.4V9.96C20.04 10.72 21.22 12.7 21.34 14.64H18.44C18.34 13.32 17.6 12.2 16 12.2C14.48 12.2 13.44 13.08 13.44 14.1C13.44 14.96 14.02 15.62 16.52 16.26C19.02 16.9 21.38 18.18 21.38 20.92C21.36 23.22 19.64 24.62 17.4 25.2Z"
            fill="currentColor"
          />
        </svg>
      ),
    },
  ];

  return (
    <section id="why-us" className="bg-[#111111] py-24 px-6 md:px-12 lg:px-20">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-16">
          <p className="font-heading text-xs uppercase tracking-[0.15em] text-gold mb-4">
            WHY OCEANTECH
          </p>
          <h2 className="font-display text-5xl uppercase text-white mb-6">
            SIX REASONS WE&apos;RE THE CALL YOU MAKE.
          </h2>
          <div className="w-12 h-[2px] bg-gold" />
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cards.map((card, index) => (
            <div
              key={index}
              className="bg-navy border border-divider hover:border-gold transition p-5 md:p-8"
            >
              <div className="text-gold mb-6">{card.icon}</div>
              <h3 className="font-heading font-semibold text-lg uppercase text-white mb-3">
                {card.title}
              </h3>
              <p className="font-body text-sm text-silver">
                {card.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
