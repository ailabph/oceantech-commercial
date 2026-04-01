import Image from "next/image";

export default function LogoPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white gap-6">
      <Image
        src="/images/logo-icon.png"
        alt="Oceantech Offshore logo"
        width={120}
        height={120}
      />
      <div className="text-center">
        <h1 className="font-heading text-4xl font-bold tracking-widest text-teal">
          OCEANTECH <span className="text-orange">OFFSHORE</span>
        </h1>
      </div>
    </div>
  );
}
