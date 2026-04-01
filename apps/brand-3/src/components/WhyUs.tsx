export default function WhyUs() {
  const cards = [
    {
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <polyline points="12 6 12 12 16 14" />
        </svg>
      ),
      title: "We've been in this water a long time.",
      description:
        "Since 1981 — our founders were pioneer PADI instructors in the Philippines, and the experience gets passed down.",
    },
    {
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        </svg>
      ),
      title: "Safety is the job, not a sidebar.",
      description:
        "Every dive has a plan, every plan has a safety protocol, and everyone goes home.",
    },
    {
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
        </svg>
      ),
      title: "We own our equipment.",
      description:
        "Our diving systems, welding rigs, and cutting gear are ours — maintained, checked, and ready to mobilize.",
    },
    {
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
          <circle cx="12" cy="12" r="3" />
        </svg>
      ),
      title: "We say what we find.",
      description:
        "You're paying us for the truth underwater, not the version that's easiest to hear.",
    },
    {
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
          <circle cx="12" cy="10" r="3" />
        </svg>
      ),
      title: "Cebu is home. We get there fast.",
      description:
        "Maribago puts us right on the water — we mobilize fast because we're already close.",
    },
    {
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <line x1="12" y1="1" x2="12" y2="23" />
          <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
        </svg>
      ),
      title: "The price is the price.",
      description:
        "We quote based on what it actually takes — no hidden fees, no surprises after we load the boat.",
    },
  ];

  return (
    <section id="why-us" className="bg-green px-6 py-24 md:px-12 lg:px-20">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-16">
          <span className="font-body text-xs uppercase tracking-[0.15em] text-sand">
            Why Us
          </span>
          <h2 className="mt-4 font-display text-4xl text-cream">
            Why people keep calling us back.
          </h2>
          <div className="mt-4 h-[2px] w-[48px] bg-rust" />
        </div>

        {/* The People Behind the Work */}
        <div className="mb-12 flex justify-center gap-4">
          <img
            src="/images/actual/actual-photo-1.jpg"
            alt="Crew member portrait with blue DIVER helmet"
            className="w-20 h-20 rounded-full object-cover border-2 border-cream/20"
          />
          <img
            src="/images/actual/actual-photo-2.jpg"
            alt="Crew member smiling near the pier"
            className="w-20 h-20 rounded-full object-cover border-2 border-cream/20"
          />
          <img
            src="/images/actual/actual-photo-6.jpg"
            alt="Close-up crew member with DIVER helmet and CREW shirt"
            className="w-20 h-20 rounded-full object-cover border-2 border-cream/20"
          />
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {cards.map((card, index) => (
            <div
              key={index}
              className="rounded-sm border border-cream/10 bg-cream/10 p-6 backdrop-blur-sm"
            >
              <div className="mb-4 text-rust">{card.icon}</div>
              <h3 className="mb-2 font-heading text-lg font-bold text-cream">
                {card.title}
              </h3>
              <p className="font-body text-sm text-cream/70">
                {card.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
