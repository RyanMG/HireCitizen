import BackElementIcon from "./backElementIcon";

interface IPageHeaderProps {
  title: string,
  showBackButton?: boolean,
  pageBackFn?: () => void
}

export default function PageHeader({
  title,
  showBackButton = false,
  pageBackFn
}: IPageHeaderProps) {
  return (
    <div className="flex flex-row justify-start items-center w-full border-b-2 border-gray-500 pb-2">
      {showBackButton && <BackElementIcon
        onClickFn={() => {
          if (pageBackFn) {
            pageBackFn();
          }
        }}
      />}
      <h1 className="text-2xl font-semibold">{title}</h1>
    </div>
  );
}
