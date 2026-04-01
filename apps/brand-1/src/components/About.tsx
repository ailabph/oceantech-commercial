import Image from "next/image";

export default function About() {
  return (
    <section id="about" className="bg-offwhite py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Asymmetric 2-column layout: 55% text / 45% image */}
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[55%_45%] lg:gap-16">
          {/* ── Left column: text ── */}
          <div className="flex flex-col gap-6">
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
              Oceantech Commercial Diving was established in 2016, but our story
              starts much earlier. Our founders have been in the water since
              1981&nbsp;&mdash; first as recreational divers working
              Cebu&rsquo;s reefs, then as underwater professionals serving the
              maritime and construction industries across the Philippines.
              That&rsquo;s over 45&nbsp;years of reading currents, solving
              problems at depth, and bringing people home safe. In fact, the
              family behind Oceantech&nbsp;&mdash; the owners of Crispina
              Aquatics&nbsp;&mdash; were the first PADI-certified diving
              instructors in the Philippines, a distinction that speaks to the
              depth of our roots in this industry.
            </p>

            <p className="font-body leading-relaxed text-charcoal">
              When we formed Oceantech, the goal was straightforward: take
              everything we&rsquo;d learned in those years and build a
              commercial diving company that does things the right way. No
              shortcuts on safety. No guesswork on execution. Just experienced
              divers, proper equipment, and honest work&nbsp;&mdash; the kind of
              outfit we&rsquo;d want to hire if we were on the other side of the
              table.
            </p>

            <p className="font-body leading-relaxed text-charcoal">
              Based in Maribago, Lapu-Lapu City, we&rsquo;re proud to operate
              from the heart of the Central Visayas. Cebu&rsquo;s maritime
              heritage runs deep, and so does ours. This is a family business
              with deep roots in Cebu&rsquo;s diving community&nbsp;&mdash; and
              that personal connection to the water and the people who work on it
              is something no corporate outfit can replicate. We know these
              waters, we know this industry, and we show up ready to work.
            </p>

            {/* Heritage callout */}
            <blockquote className="mt-2 border-l-2 border-copper pl-4 font-heritage italic text-copper">
              Recreational diving since 1981. Commercial diving since 2016. The
              experience of a lifetime, working for you.
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
                First PADI Instructors in the Philippines
              </span>
            </div>
          </div>

          {/* ── Right column: image ── */}
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-sm shadow-md lg:aspect-[3/4]">
            <Image
              src="/images/about.png"
              alt="Oceantech Commercial Diving team preparing for an underwater operation"
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
