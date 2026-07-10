import Image from "next/image";

type LineContactLinkProps = {
  href: string;
  label?: string;
  lineId?: string;
  className?: string;
};

function LineLogo() {
  return (
    <span className="inline-flex h-10 w-10 items-center justify-center overflow-hidden rounded-xl shadow-[0_10px_24px_rgba(6,199,85,0.22)]">
      <Image
        src="/line-brand-icon.png"
        alt="LINE"
        width={40}
        height={40}
        className="h-10 w-10 object-cover"
      />
    </span>
  );
}

export default function LineContactLink({
  href,
  label = "LINE 客服",
  lineId = "@259pptsv",
  className = "",
}: Readonly<LineContactLinkProps>) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
    >
      <LineLogo />
      <span className="flex flex-col leading-tight">
        <span>{label}</span>
        <span className="text-[11px] font-medium opacity-80">ID: {lineId}</span>
      </span>
    </a>
  );
}
