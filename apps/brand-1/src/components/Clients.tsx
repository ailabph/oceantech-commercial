import Image from "next/image";

const clients = [
  { src: "/logos/clients/2go.png", alt: "2GO Group" },
  { src: "/logos/clients/supercat.png", alt: "SuperCat" },
  { src: "/logos/clients/oceanjet.png", alt: "OceanJet" },
  { src: "/logos/clients/trans-asia.png", alt: "Trans-Asia Shipping Lines" },
  { src: "/logos/clients/lite-ferries.png", alt: "Lite Ferries" },
  { src: "/logos/clients/cokaliong.png", alt: "Cokaliong Shipping Lines" },
  { src: "/logos/clients/fastcat.png", alt: "FastCat" },
  { src: "/logos/clients/starlite.png", alt: "Starlite Ferries" },
  { src: "/logos/clients/weesam.png", alt: "Weesam Express" },
  { src: "/logos/clients/span-asia.png", alt: "Philippine Span Asia" },
  { src: "/logos/clients/cpa.png", alt: "Cebu Port Authority" },
  { src: "/logos/clients/opascor.png", alt: "OPASCOR" },
  { src: "/logos/clients/holcim.png", alt: "Holcim Philippines" },
] as const;

export default function Clients() {
  return (
    <section className="bg-white py-8 md:py-12 px-6 md:px-12 lg:px-24">
      <div className="mx-auto max-w-7xl">
        <p className="font-heading text-xs uppercase tracking-[0.2em] text-charcoal/40 text-center mb-8">
          Trusted by the Philippines&apos; top shipping lines
        </p>

        <div className="flex flex-wrap justify-center items-center gap-x-6 gap-y-4 md:gap-x-8 md:gap-y-6">
          {clients.map((client) => (
            <div
              key={client.alt}
              className="grayscale hover:grayscale-0 opacity-50 hover:opacity-100 transition-all duration-300"
            >
              <Image
                src={client.src}
                alt={client.alt}
                width={0}
                height={0}
                sizes="100vw"
                className="h-7 md:h-10 w-auto"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
