import Link from "next/link";

interface IButtonProps {
  label: string;
  theme?: "primary" | "secondary" | "destory";
  onClick?: () => void;
  href?: string;
  disabled?: boolean;
  type?: 'button' | 'submit';
}

const themeMap = {
  primary: "bg-blue hover:bg-light-blue text-white",
  primaryDisabled: "bg-blue opacity-50 cursor-not-allowed text-white",
  secondary: "bg-construction-yellow hover:bg-construction-yellow-light text-white",
  secondaryDisabled: "bg-construction-yellow opacity-50 cursor-not-allowed text-white",
  destory: "bg-red-900 hover:bg-red-800 text-white",
  destoryDisabled: "bg-red-900 opacity-50 cursor-not-allowed text-white"
}

export default function Button({ label, theme = "primary", onClick, href, disabled = false, type = 'button' }: IButtonProps) {
  const buttonClass = `flex justify-center items-center bg-blue-500 border border-gray-800 px-4 py-1 w-full rounded-lg ${disabled ? themeMap[theme + 'Disabled' as keyof typeof themeMap] : themeMap[theme]}`;
  if (onClick) {
    return (
      <button className={buttonClass} disabled={disabled ? true : false} onClick={onClick} type={type}>
        <p className="text-white">{label}</p>
      </button>
    )
  }

  if (href) {
    return (
      <Link
        className={disabled ? buttonClass + ' pointer-events-none' : buttonClass}
        href={href}
        aria-disabled={disabled}
        tabIndex={disabled ? -1 : undefined}
      >
        <p className="text-white">{label}</p>
      </Link>
    );
  }

  return (
    <button className={buttonClass} type={type} disabled={disabled}>
      <p className="text-white">{label}</p>
    </button>
  );
}
