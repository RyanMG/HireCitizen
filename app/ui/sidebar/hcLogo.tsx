import Link from 'next/link';
import Image from 'next/image';

export default function HireCitizenLogo() {
  return (
    <Link
      href={"/"}
    >
      <div className="flex flex-row items-center gap-1">
        <Image
          src="/1SCU-logo.png"
          width={50}
          height={50}
          alt="1 scu box"
        />
        <div className="text-white text-2xl font-bold">HireCitizen</div>
      </div>
    </Link>
  );
}
