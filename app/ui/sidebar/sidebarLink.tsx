"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import clsx from "clsx";

interface ISideBarLinkProps {
  link?: string;
  text: string;
  children: React.ReactNode;
}

export default function SideBarLink({link, text, children}:ISideBarLinkProps): React.ReactNode {
  const pathname = usePathname();
  const linkRoot = link?.split('?')[0];

  const textStyling = clsx(
    "group-hover:text-gray-300 text-md",
    {
      "text-white": pathname === linkRoot,
      "text-gray-500": pathname !== linkRoot
    }
  );

  return (
    <div className="flex flex-row items-center my-2 gap-1 group">
      <svg
        className={clsx(
          "group-hover:fill-gray-300",
          {
            "fill-white": pathname === linkRoot,
            "fill-gray-500": pathname !== linkRoot
          }
        )}
        xmlns="http://www.w3.org/2000/svg"
        height="22px"
        viewBox="0 -960 960 960"
        width="22px"
      >
        {children}
      </svg>

      {link &&
        <Link
          className={textStyling}
          href={link}
        >
         {text}
        </Link>
      }

      {!link &&
        <div className={textStyling}>
          {text}
        </div>
      }

    </div>
  );
}
