import Image from "next/image";

export default function Footer() {
  const serviceLinks = [
    "Underwater Welding",
    "Hull Inspection",
    "Pipeline Repair",
    "NDT Services",
    "Salvage Operations",
    "Marine Construction",
  ];

  const companyLinks = [
    "About Us",
    "Our History",
    "Safety Standards",
    "Certifications",
    "Careers",
    "News",
  ];

  return (
    <footer className="bg-[#111111] border-t border-divider">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto py-16 px-6 md:px-12 lg:px-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Column 1: Logo & Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <Image
                src="/images/logo-icon.png"
                alt="Oceantech logo"
                width={48}
                height={48}
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
                <li key={link}>
                  <a
                    href="#"
                    className="font-body text-sm text-silver hover:text-gold transition"
                  >
                    {link}
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
                <li key={link}>
                  <a
                    href="#"
                    className="font-body text-sm text-silver hover:text-gold transition"
                  >
                    {link}
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
