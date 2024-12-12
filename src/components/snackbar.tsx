'use client'

import { useState } from "react";
import CloseElementIcon from "./closeElementIcon";

interface ISnackbarProps {
  message: string;
  type: "error" | "success" | "info";
  allowDismiss?: boolean;
}

export default function Snackbar({
  message,
  type,
  allowDismiss = true
}: ISnackbarProps) {
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const typeMap = {
    error: "bg-red-900",
    success: "bg-green-500",
    info: "bg-blue-500"
  }

  return (
    <div className={`fixed bottom-5 left-0 w-full h-full flex items-end justify-center transition-all duration-300 ${isOpen ? "translate-y-0" : "translate-y-20"}`}>
      <div className={`rounded-xl p-4 ${typeMap[type]} text-white`}>
        <div className="flex flex-row items-center justify-between">
          <p className="text-lg text-white pl-2 pr-10">{message}</p>
          {allowDismiss && <CloseElementIcon onClickFn={() => setIsOpen(false)} iconFillColor="#e8eaed" />}
        </div>
      </div>

    </div>

  );
}
