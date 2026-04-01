const clients = [
  { name: "2GO", logo: "/logos/clients/2go.png" },
  { name: "SuperCat", logo: "/logos/clients/supercat.png" },
  { name: "OceanJet", logo: "/logos/clients/oceanjet.png" },
  { name: "Trans-Asia", logo: "/logos/clients/trans-asia.png" },
  { name: "Lite Ferries", logo: "/logos/clients/lite-ferries.png" },
  { name: "Cokaliong", logo: "/logos/clients/cokaliong.png" },
  { name: "FastCat", logo: "/logos/clients/fastcat.png" },
  { name: "Starlite", logo: "/logos/clients/starlite.png" },
  { name: "Weesam", logo: "/logos/clients/weesam.png" },
  { name: "Span Asia", logo: "/logos/clients/span-asia.png" },
  { name: "CPA", logo: "/logos/clients/cpa.png" },
  { name: "OPASCOR", logo: "/logos/clients/opascor.png" },
  { name: "Holcim", logo: "/logos/clients/holcim.png" },
];

export default function Clients() {
  return (
    <section className="bg-white border-t border-b border-sand/30 py-12">
      <div className="max-w-6xl mx-auto px-6">
        <p className="font-body text-xs uppercase tracking-[0.15em] text-espresso/40 text-center mb-10">
          The companies that move the Philippines trust us with their vessels
        </p>

        <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-5">
          {clients.map((client) => (
            <div
              key={client.name}
              className="grayscale opacity-40 hover:grayscale-0 hover:opacity-80 transition-all duration-300"
            >
              <img
                src={client.logo}
                alt={client.name}
                className="h-9 w-auto object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
