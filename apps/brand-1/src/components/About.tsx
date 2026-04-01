import Image from "next/image";

export default function About() {
  return (
    <section id="about" className="bg-offwhite py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Asymmetric 2-column layout: 55% text / 45% image */}
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[55%_45%] lg:gap-16">
          {/* ── Left column: text ── */}
          <div className="order-last lg:order-first flex flex-col gap-6">
            {/* Overline */}
            <p className="font-heading text-sm uppercase tracking-[0.2em] text-copper">
              About Us
            </p>

            {/* Headline + copper underline */}
            <div className="mb-2">
              <h2 className="font-heading text-4xl font-bold text-teal">
                New company. Old hands.
              </h2>
              {/* Copper underline accent — 64px */}
              <div className="mt-3 h-[3px] w-16 rounded-sm bg-gradient-to-r from-copper to-copper-light" />
            </div>

            {/* Body paragraphs */}
            <p className="font-body leading-relaxed text-charcoal">
              Oceantech was founded in 2016, but our roots go back to 1981. The
              family behind this company&nbsp;&mdash; operators of a PADI dive
              shop at Costabella Resort&nbsp;&mdash; were pioneer PADI
              instructors in the Philippines. We&rsquo;re a family business
              based at Costabella Resort in Maribago, Lapu-Lapu City, with
              over 45&nbsp;years in the water.
            </p>

            <p className="font-body leading-relaxed text-charcoal">
              We built Oceantech to do things the right way. No shortcuts on
              safety, no guesswork on execution&nbsp;&mdash; just experienced
              divers, proper equipment, and honest work.
            </p>

            <p className="font-body leading-relaxed text-charcoal">
              Our clients include 2GO, OceanJet, Trans-Asia, Lite Ferries,
              Cokaliong, SuperCat, FastCat, Starlite, Weesam Express, Philippine
              Span Asia, Cebu Port Authority, OPASCOR, and Holcim. Most of our
              work comes through word of mouth.
            </p>

            {/* Heritage callout */}
            <blockquote className="mt-2 border-l-2 border-copper pl-4 font-heritage italic text-copper text-base lg:text-lg">
              Recreational diving since 1981. Commercial diving since 2016.
            </blockquote>

            {/* PADI Pioneer badge */}
            <div className="mt-2 inline-flex w-fit items-center gap-2 rounded-sm bg-teal/10 px-4 py-2.5">
              {/* Small dive-flag / badge icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5 shrink-0 text-teal"
              >
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 22 12 18.56 5.82 22 7 14.14l-5-4.87 6.91-1.01L12 2z" />
              </svg>
              <span className="font-heading text-xs font-semibold uppercase tracking-wide text-teal">
                Pioneer PADI Instructors in the Philippines
              </span>
            </div>
          </div>

          {/* ── Right column: image ── */}
          <div className="order-first lg:order-last relative aspect-[4/5] w-full overflow-hidden rounded-sm shadow-md lg:aspect-[3/4]">
            <Image
              src="/images/about.png"
              alt="Oceantech Offshore Diving Services team preparing for an underwater operation"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 45vw"
              quality={85}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
