'use client'

import backPathStack from "@utils/backPathStack";
import BackElementIcon from "@components/iconBtns/backIcon";
import { useRouter } from "next/navigation";

interface IPageHeaderProps {
  title: string,
  pageBackPath?: string
}

export default function PageHeader({
  title,
  pageBackPath
}: IPageHeaderProps) {
  const router = useRouter();

  if (pageBackPath) {
    backPathStack.push(pageBackPath);
  }

  return (
    <div className="flex flex-row justify-start items-center w-full border-b-2 border-gray-500 pb-2">
      {backPathStack.lastPath && <BackElementIcon
        onClickFn={() => {
          if (backPathStack.lastPath) {
            router.push(backPathStack.pop()!);
          } else {
            router.back();
          }
        }}
      />}
      <h1 className="text-2xl font-semibold text-white">{title}</h1>
    </div>
  );
}
