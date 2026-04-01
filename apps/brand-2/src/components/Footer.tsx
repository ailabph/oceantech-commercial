import Image from "next/image";

export default function Footer() {
  const serviceLinks = [
    { label: "Underwater Welding", href: "#services" },
    { label: "Hull Inspection", href: "#services" },
    { label: "Pipeline Repair", href: "#services" },
    { label: "NDT Services", href: "#services" },
    { label: "Salvage Operations", href: "#services" },
    { label: "Marine Construction", href: "#services" },
  ];

  const companyLinks = [
    { label: "About Us", href: "#about" },
    { label: "Our History", href: "#about" },
    { label: "Safety Standards", href: "#why-us" },
    { label: "Certifications", href: "#why-us" },
    { label: "Careers", href: "#contact" },
    { label: "News", href: "#about" },
  ];

  return (
    <footer className="bg-[#111111] border-t border-divider">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto py-16 px-6 md:px-12 lg:px-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Column 1: Logo & Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <Image
                src="/images/logo-icon.png"
                alt="Oceantech Offshore logo"
                width={48}
                height={48}
                loading="lazy"
              />
              <div>
                <p className="font-display text-white leading-none">
                  OCEANTECH
                </p>
                <p className="font-heading text-gold leading-none">OFFSHORE</p>
              </div>
            </div>
            <p className="font-body text-xs text-silver">
              Precision at depth.
            </p>
          </div>

          {/* Column 2: Services */}
          <div>
            <h4 className="font-heading font-semibold text-xs uppercase tracking-[0.12em] text-white mb-6">
              SERVICES
            </h4>
            <ul className="space-y-3">
              {serviceLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="font-body text-sm text-silver hover:text-gold transition"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Company */}
          <div>
            <h4 className="font-heading font-semibold text-xs uppercase tracking-[0.12em] text-white mb-6">
              COMPANY
            </h4>
            <ul className="space-y-3">
              {companyLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="font-body text-sm text-silver hover:text-gold transition"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact */}
          <div>
            <h4 className="font-heading font-semibold text-xs uppercase tracking-[0.12em] text-white mb-6">
              CONTACT
            </h4>
            <ul className="space-y-3">
              <li className="font-body text-sm text-silver">
                +63 (32) XXX-XXXX
              </li>
              <li className="font-body text-sm text-silver">
                operations@oceantech.ph
              </li>
              <li className="font-body text-sm text-silver">
                Lapu-Lapu City, Cebu
                <br />
                Philippines 6015
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gold/20">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-body text-xs text-silver/50">
            &copy; 2026 Oceantech Offshore Diving Services.
          </p>
          <p className="font-heritage italic text-sm text-gold/30">
            Depth demands discipline.
          </p>
        </div>
      </div>
    </footer>
  );
}
