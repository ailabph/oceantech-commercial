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
                deep and the current teaches you respect fast. Back then, it was
                recreational diving. Reef work. Taking people down and bringing
                them back up. The founders were the first PADI-certified
                instructors in the Philippines — pioneers who didn&apos;t just
                learn to dive, they helped set the standard for an entire
                country. This has always been a family operation — the knowledge,
                the discipline, the deep respect for the water passed down
                through generations.
              </p>

              <p>
                That went on for 35 years. Thirty-five years of salt water, sun,
                and solving problems at depth before Oceantech Offshore Diving
                Services became an actual company in 2016. The transition to
                commercial diving wasn&apos;t a reinvention. It was just putting
                a name to what the crew had been building toward for decades.
              </p>

              <p>
                We&apos;re still based in Maribago. The boats still go out from
                the same water. The difference now is the jobs are bigger, the
                stakes are higher, and the people calling us need things done
                right the first time.
              </p>

              <p>
                Somewhere along the way, the phone started ringing from bigger
                names. 2GO. OceanJet. Trans-Asia. Lite Ferries. Cokaliong.
                SuperCat. FastCat. Starlite. Weesam. Span Asia. The Cebu Port
                Authority. OPASCOR. Holcim Philippines. We didn&apos;t chase
                those contracts with a pitch deck — they found us because
                somebody they trusted told them we do good work. Word of mouth,
                one hull at a time.
              </p>
            </div>

            {/* Pull Quote */}
            <blockquote className="mt-8 font-heading italic text-green border-l-4 border-rust pl-6 text-lg leading-relaxed">
              &ldquo;We didn&apos;t start this company because we saw a market
              opportunity. We started it because we&apos;d already been doing
              the work for 35 years and figured it was time to make it
              official.&rdquo;
            </blockquote>

            {/* PADI Badge */}
            <div className="mt-8 inline-block bg-green/10 text-green font-body text-sm font-medium px-4 py-2 rounded-sm">
              First PADI Instructors in the Philippines
            </div>
          </div>

          {/* Image Column */}
          <div className="relative">
            <Image
              src="/images/about.png"
              alt="Oceantech Offshore Diving Services — heritage diving operations in Maribago, Cebu"
              width={640}
              height={800}
              className="w-full h-auto rounded-sm shadow-lg"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
