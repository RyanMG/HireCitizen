'use client'

import BackElementIcon from "@components/iconBtns/backIcon";
import { useRouter } from "next/navigation";

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
  const router = useRouter();

  return (
    <div className="flex flex-row justify-start items-center w-full border-b-2 border-gray-500 pb-2">
      {showBackButton && <BackElementIcon
        onClickFn={() => {
          if (pageBackFn) {
            pageBackFn();
          } else {
            router.back();
          }
        }}
      />}
      <h1 className="text-2xl font-semibold text-white">{title}</h1>
    </div>
  );
}
