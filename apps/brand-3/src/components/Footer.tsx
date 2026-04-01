import Image from "next/image";

const services = [
  { label: "Underwater Inspection", href: "#services" },
  { label: "Hull Cleaning", href: "#services" },
  { label: "Salvage Operations", href: "#services" },
  { label: "Underwater Welding", href: "#services" },
  { label: "Marine Construction", href: "#services" },
  { label: "ROV Services", href: "#services" },
];

const company = [
  { label: "About Us", href: "#about" },
  { label: "Our Team", href: "#why-us" },
  { label: "Safety Record", href: "#why-us" },
  { label: "Certifications", href: "#about" },
  { label: "Careers", href: "#contact" },
];

export default function Footer() {
  return (
    <footer className="bg-espresso px-6 py-16 md:px-12 lg:px-20">
      <div className="mx-auto max-w-6xl">
        {/* Main Grid */}
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4">
          {/* Col 1: Logo & Tagline */}
          <div>
            <div className="flex items-center gap-3">
              <Image
                src="/images/logo-icon.png"
                alt="Oceantech logo"
                width={48}
                height={48}
              />
              <div>
                <span className="block font-display text-cream">
                  OCEANTECH
                </span>
                <span className="block font-heading font-semibold text-rust">
                  OFFSHORE
                </span>
              </div>
            </div>
            <p className="mt-4 font-body text-xs text-cream/50 md:text-cream/40">
              Been in the water since before most companies were on paper.
            </p>
          </div>

          {/* Col 2: Services */}
          <div>
            <h4 className="mb-4 font-body text-xs font-medium uppercase tracking-wide text-cream/70">
              Services
            </h4>
            <ul className="space-y-2">
              {services.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="font-body text-sm text-cream/60 md:text-cream/50 transition-colors hover:text-rust"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Company */}
          <div>
            <h4 className="mb-4 font-body text-xs font-medium uppercase tracking-wide text-cream/70">
              Company
            </h4>
            <ul className="space-y-2">
              {company.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="font-body text-sm text-cream/60 md:text-cream/50 transition-colors hover:text-rust"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Contact */}
          <div>
            <h4 className="mb-4 font-body text-xs font-medium uppercase tracking-wide text-cream/70">
              Contact
            </h4>
            <ul className="space-y-2 font-body text-sm text-cream/60 md:text-cream/50">
              <li>+63 (32) 495-1981</li>
              <li>crew@oceantech.ph</li>
              <li>
                Maribago, Lapu-Lapu City
                <br />
                Cebu, Philippines 6015
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 border-t border-rust pt-8">
          <div className="flex flex-col items-center gap-2 text-center">
            <p className="font-body text-xs text-cream/30">
              &copy; 2026 Oceantech Offshore Diving Services.
            </p>
            <p className="font-heading text-sm italic text-cream/20">
              Recreational diving since 1981. Commercial diving since 2016.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
