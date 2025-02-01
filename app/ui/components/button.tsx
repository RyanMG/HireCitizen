import Link from "next/link";

interface IButtonProps {
  label: string;
  theme?: "primary" | "secondary" | "destory";
  onClick?: () => void;
  href?: string;
  disabled?: boolean;
  type?: 'button' | 'submit';
  size?: "sm" | "md" | "lg";
}

const themeMap = {
  primary: "bg-blue hover:bg-light-blue text-white",
  primaryDisabled: "bg-blue opacity-50 cursor-not-allowed text-white",
  secondary: "bg-construction-yellow hover:bg-construction-yellow-light text-white",
  secondaryDisabled: "bg-construction-yellow opacity-50 cursor-not-allowed text-white",
  destory: "bg-red-900 hover:bg-red-800 text-white",
  destoryDisabled: "bg-red-900 opacity-50 cursor-not-allowed text-white"
}

export default function Button({
  label,
  theme = "primary",
  onClick,
  href,
  disabled = false,
  type = 'button',
  size = "md"
}: IButtonProps) {

  let buttonClass = "flex justify-center items-center bg-blue-500 w-full h-full rounded-lg";

  if (disabled) {
    buttonClass += ` ${themeMap[theme + 'Disabled' as keyof typeof themeMap]}`;
  } else {
    buttonClass += ` ${themeMap[theme]}`;
  }

  if (size === "sm") {
    buttonClass += " px-2 py-1";
  } else if (size === "md") {
    buttonClass += " px-4 py-0";
  } else if (size === "lg") {
    buttonClass += " px-6 py-2";
  }

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
