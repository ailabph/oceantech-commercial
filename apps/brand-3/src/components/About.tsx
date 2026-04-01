import Image from "next/image";

export default function About() {
  return (
    <section id="about" className="bg-cream py-20">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-[55%_45%] gap-12 items-start">
          {/* Text Column */}
          <div>
            <p className="font-body text-xs uppercase tracking-[0.15em] text-rust mb-4">
              Our Story
            </p>

            <h2 className="font-display text-4xl text-green leading-tight mb-4">
              This isn&apos;t a company story. It&apos;s a diving story.
            </h2>

            {/* Rust underline accent */}
            <div className="w-[48px] h-[2px] bg-rust mb-8" />

            <div className="space-y-5 font-body text-base text-espresso/80 leading-relaxed">
              <p>
                It started in 1981 in Maribago — a small stretch of coast on
                Lapu-Lapu City&apos;s eastern shore, where the Cebu Strait runs
                deep and the current teaches you respect fast. The founders were
                pioneer PADI instructors in the Philippines — they built a dive
                shop at Costabella Resort on Mactan and helped set the standard
                for an entire country. This has always been a family
                operation — the knowledge, the discipline, the deep respect for
                the water passed down through generations.
              </p>

              <p>
                That went on for 35 years. Thirty-five years of salt water, sun,
                and solving problems at depth before Oceantech became an actual
                company in 2016. The transition to commercial diving
                wasn&apos;t a reinvention — it was just putting a name to what
                the crew had been building toward for decades.
              </p>

              <p>
                2GO. OceanJet. Trans-Asia. Lite Ferries. Cokaliong. SuperCat.
                FastCat. Starlite. Weesam. Span Asia. Cebu Port Authority.
                OPASCOR. Holcim Philippines. They found us because somebody they
                trusted told them we do good work. Word of mouth, one hull at a
                time.
              </p>
            </div>

            {/* Pull Quote */}
            <blockquote className="mt-8 font-heading italic text-green border-l-4 border-rust pl-4 lg:pl-6 text-base lg:text-lg leading-relaxed">
              &ldquo;We didn&apos;t start this company because we saw a market
              opportunity. We started it because we&apos;d already been doing
              the work for 35 years and figured it was time to make it
              official.&rdquo;
            </blockquote>

            {/* PADI Badge */}
            <div className="mt-8 inline-block bg-green/10 text-green font-body text-sm font-medium px-4 py-2 rounded-sm">
              Pioneer PADI Instructors in the Philippines
            </div>
          </div>

          {/* Image Column */}
          <div className="relative order-first lg:order-last">
            <Image
              src="/images/actual/actual-photo-9.jpg"
              alt="Three Oceantech divers on a boat wearing blue helmets during bridge construction work"
              width={640}
              height={800}
              className="w-full h-auto rounded-sm shadow-lg"
            />
          </div>
        </div>

        {/* Documentary Photo Gallery */}
        <div className="mt-16">
          <p className="font-heading italic text-green/60 text-sm mb-4">
            The crew. The work. The water.
          </p>
          <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-9 gap-2">
            <img
              src="/images/actual/actual-photo-1.jpg"
              alt="Crew member portrait wearing blue DIVER helmet"
              loading="lazy"
              className="aspect-square object-cover rounded-sm saturate-[0.85] brightness-95"
            />
            <img
              src="/images/actual/actual-photo-2.jpg"
              alt="Crew member selfie, smiling near the pier with DIVER helmet"
              loading="lazy"
              className="aspect-square object-cover rounded-sm saturate-[0.85] brightness-95"
            />
            <img
              src="/images/actual/actual-photo-14.jpg"
              alt="Smiling female crew member in the water"
              loading="lazy"
              className="aspect-square object-cover rounded-sm saturate-[0.85] brightness-95"
            />
            <img
              src="/images/actual/actual-photo-4.jpg"
              alt="Two divers in wetsuits at pier site with safety signs"
              loading="lazy"
              className="aspect-square object-cover rounded-sm saturate-[0.85] brightness-95"
            />
            <img
              src="/images/actual/actual-photo-16.jpg"
              alt="Candid crew downtime moment on site"
              loading="lazy"
              className="aspect-square object-cover rounded-sm saturate-[0.85] brightness-95"
            />
            <img
              src="/images/actual/actual-photo-10.jpg"
              alt="Dive platform with scuba tanks, diver prepping equipment"
              loading="lazy"
              className="aspect-square object-cover rounded-sm saturate-[0.85] brightness-95"
            />
            <img
              src="/images/actual/actual-photo-21.jpg"
              alt="Two crew members working under bridge structure"
              loading="lazy"
              className="aspect-square object-cover rounded-sm saturate-[0.85] brightness-95"
            />
            <img
              src="/images/actual/actual-photo-5.jpg"
              alt="Vessel WEST OCEAN 17, diver entering the water"
              loading="lazy"
              className="aspect-square object-cover rounded-sm saturate-[0.85] brightness-95"
            />
            <img
              src="/images/actual/actual-photo-18.jpg"
              alt="Diver working at piling underwater"
              loading="lazy"
              className="aspect-square object-cover rounded-sm saturate-[0.85] brightness-95"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
