const clients = [
  { src: "/logos/clients/2go.png", alt: "2GO Group" },
  { src: "/logos/clients/supercat.png", alt: "SuperCat" },
  { src: "/logos/clients/oceanjet.png", alt: "OceanJet" },
  { src: "/logos/clients/trans-asia.png", alt: "Trans-Asia" },
  { src: "/logos/clients/lite-ferries.png", alt: "Lite Ferries" },
  { src: "/logos/clients/cokaliong.png", alt: "Cokaliong" },
  { src: "/logos/clients/fastcat.png", alt: "FastCat" },
  { src: "/logos/clients/starlite.png", alt: "Starlite" },
  { src: "/logos/clients/weesam.png", alt: "Weesam Express" },
  { src: "/logos/clients/span-asia.png", alt: "Philippine Span Asia" },
  { src: "/logos/clients/cpa.png", alt: "Cebu Port Authority" },
  { src: "/logos/clients/opascor.png", alt: "OPASCOR" },
  { src: "/logos/clients/holcim.png", alt: "Holcim Philippines" },
];

export default function Clients() {
  return (
    <section className="bg-[#111111] py-14 border-t border-b border-divider">
      <div className="mx-auto max-w-7xl px-6">
        <p className="font-heading text-xs uppercase tracking-[0.15em] text-silver text-center mb-8">
          Deployed by the operators who move the Philippines
        </p>

        <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-5">
          {clients.map((client) => (
            <div
              key={client.alt}
              className="brightness-0 invert opacity-30 hover:opacity-70 transition-all duration-300"
            >
              <img
                src={client.src}
                alt={client.alt}
                className="h-10 w-auto object-contain"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
