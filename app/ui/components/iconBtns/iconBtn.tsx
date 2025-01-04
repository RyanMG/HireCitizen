'use client'

import { ReactElement, useState } from "react";
import { toggleJobBookmark, toggleJobFlag } from "@lib/query/job/actions";

interface IIconButtonProps {
  type: "star" | "flag" | "bookmark";
  selected: boolean;
  jobId: string;
}

const StarIcon = ({selected}: {selected: boolean}):ReactElement => {
  if (selected) {
    return (
      <path d="m233-120 65-281L80-590l288-25 112-265 112 265 288 25-218 189 65 281-247-149-247 149Z"/>
    )
  }

  return (
    <path d="m354-287 126-76 126 77-33-144 111-96-146-13-58-136-58 135-146 13 111 97-33 143ZM233-120l65-281L80-590l288-25 112-265 112 265 288 25-218 189 65 281-247-149-247 149Zm247-350Z"/>
  )
}

const FlagIcon = ({selected}: {selected: boolean}):ReactElement => {
  if (selected) {
    return (
      <path d="M320-240h60v-200h100l40 80h200v-240H600l-40-80H320v440ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Z"/>
    )
  }

  return (
    <path d="M320-240h60v-200h100l40 80h200v-240H600l-40-80H320v440Zm237-180-40-80H380v-120h143l40 80h97v120H557ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"/>
  )
}

const BookmarkIcon = ({selected}: {selected: boolean}):ReactElement => {
  if (selected) {
    return (
      <path d="M200-120v-640q0-33 23.5-56.5T280-840h400q33 0 56.5 23.5T760-760v640L480-240 200-120Z"/>
    )
  }

  return (
    <path d="M200-120v-640q0-33 23.5-56.5T280-840h400q33 0 56.5 23.5T760-760v640L480-240 200-120Zm80-122 200-86 200 86v-518H280v518Zm0-518h400-400Z"/>
  )
}

export default function IconButton({
  type,
  selected,
  jobId
}: IIconButtonProps) {
  const [isHovering, setIsHovering] = useState<boolean>(false);
  const [isSelected, setIsSelected] = useState<boolean>(selected);

  return (
    <button className="p-2" onClick={async (e) => {
      e.preventDefault();
      e.stopPropagation();
      let resp;
      switch (type) {
        case "star":
          break;
        case "flag":
          resp = await toggleJobFlag(jobId, !isSelected);
          break;
        case "bookmark":
          resp = await toggleJobBookmark(jobId, !isSelected);
          break;
      }
      if (resp && 'message' in resp) {
        console.log(resp.message);
        setIsSelected(!isSelected);
      }
      if (resp && 'error' in resp) {
        console.error(resp.error);
      }

    }}>
      <svg
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        className={isHovering || isSelected ? "fill-yellow-600" : "fill-white"} xmlns="http://www.w3.org/2000/svg" height="28px" viewBox="0 -960 960 960" width="28px"
      >
        {type === "star" && <StarIcon selected={isSelected} />}
        {type === "flag" && <FlagIcon selected={isSelected} />}
        {type === "bookmark" && <BookmarkIcon selected={isSelected} />}
      </svg>
    </button>
  )
}
