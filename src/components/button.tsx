interface IButtonProps {
  label: string;
  theme?: "primary" | "secondary" | "destory";
  onClick?: () => void;
}

const themeMap = {
  primary: "bg-construction-yellow hover:bg-construction-yellow-light",
  secondary: "bg-blue hover:bg-light-blue text-white",
  destory: "bg-red-900 hover:bg-red-800 text-white"
}

export default function Button({ label, theme = "primary", onClick }: IButtonProps) {
  return (
    <button className={`flex justify-center items-center bg-blue-500 pl-4 pr-4 pt-2 pb-2 rounded-lg ${themeMap[theme]}`} onClick={onClick}>
      <p className="text-white">{label}</p>
    </button>
  );
}
