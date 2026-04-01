import Image from "next/image";

const services = [
  { label: "Underwater Welding", href: "#services" },
  { label: "Hull Cleaning", href: "#services" },
  { label: "Pier Cleanup", href: "#services" },
  { label: "NDT Inspection", href: "#services" },
  { label: "Salvage Support", href: "#services" },
];

const company = [
  { label: "About Us", href: "#about" },
  { label: "Our Process", href: "#process" },
  { label: "Why Oceantech", href: "#why" },
  { label: "Careers", href: "#careers" },
  { label: "Safety Policy", href: "#safety" },
];

export default function Footer() {
  return (
    <footer className="bg-charcoal pt-16 pb-8 px-6 md:px-12 lg:px-24">
      <div className="mx-auto max-w-7xl">
        {/* Main grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Column 1: Logo & Tagline */}
          <div>
            <div className="flex flex-row items-center gap-2">
              <Image
                src="/images/logo-icon.png"
                alt="Oceantech logo"
                width={48}
                height={48}
              />
              <div>
                <span className="font-heading font-bold text-2xl text-white tracking-wide">OCEANTECH</span>{" "}
                <span className="font-heading font-medium text-2xl text-orange">OFFSHORE</span>
              </div>
            </div>
            <p className="font-body text-sm text-white/50 mt-3">
              Deep work, done well.
            </p>
          </div>

          {/* Column 2: Services */}
          <div>
            <h4 className="font-heading font-semibold text-sm uppercase tracking-wide text-white mb-4">
              Services
            </h4>
            <ul className="space-y-2">
              {services.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className="font-body text-sm text-white/50 hover:text-orange transition"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Company */}
          <div>
            <h4 className="font-heading font-semibold text-sm uppercase tracking-wide text-white mb-4">
              Company
            </h4>
            <ul className="space-y-2">
              {company.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className="font-body text-sm text-white/50 hover:text-orange transition"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact */}
          <div>
            <h4 className="font-heading font-semibold text-sm uppercase tracking-wide text-white mb-4">
              Contact
            </h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="tel:18005550199"
                  className="font-body text-sm text-white/50 hover:text-orange transition"
                >
                  1-800-555-0199
                </a>
              </li>
              <li>
                <a
                  href="mailto:info@oceantechdiving.com"
                  className="font-body text-sm text-white/50 hover:text-orange transition"
                >
                  info@oceantechdiving.com
                </a>
              </li>
              <li>
                <span className="font-body text-sm text-white/50">
                  Maribago, Lapu-Lapu City,
                  <br />
                  Cebu, Philippines
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-copper pt-8">
          <p className="font-body text-sm text-white/50 text-center">
            &copy; 2026 Oceantech Offshore Diving Services. All rights reserved.
          </p>
          <p className="font-heritage italic text-white/30 text-sm text-center mt-3">
            Recreational diving since 1981. Commercial diving since 2016.
          </p>
        </div>
      </div>
    </footer>
  );
}
