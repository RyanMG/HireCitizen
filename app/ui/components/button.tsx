import Link from "next/link";

interface IButtonProps {
  label: string;
  theme?: "primary" | "secondary" | "destory";
  onClick?: () => void;
  href?: string;
  disabled?: boolean;
}

const themeMap = {
  primary: "bg-blue hover:bg-light-blue text-white",
  secondary: "bg-construction-yellow hover:bg-construction-yellow-light",
  destory: "bg-red-900 hover:bg-red-800 text-white"
}

export default function Button({ label, theme = "primary", onClick, href, disabled = false }: IButtonProps) {
  const buttonClass = `flex justify-center items-center bg-blue-500 px-4 py-1 rounded-lg ${themeMap[theme]}`;
  if (onClick) {
    return (
      <button className={buttonClass} disabled={disabled} onClick={onClick}>
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
    <button className={buttonClass} type="submit" disabled={disabled}>
      <p className="text-white">{label}</p>
    </button>
  );
}
