'use client';

import clsx from "clsx";
import { useRouter } from 'next/navigation'
import { useEffect, useState } from "react";
import CloseIcon from "./iconBtns/closeIcon";

interface INotificationSnackbar {
  type: 'success' |'error' | 'warning' | 'info';
  messages: string | string[];
  timeout?: number;
  redirectTo?: string;
}

export default function NotificationSnackbar({
  type,
  messages,
  timeout = 2000,
  redirectTo
}: INotificationSnackbar) {
  const router = useRouter()

  const messagesList = Array.isArray(messages) ? messages : [messages];
  const [open, setOpen] = useState(true);
  const [waiting, setWaiting] = useState<boolean>(true);

  const timeoutId = setTimeout(() => {
    setWaiting(false);
  }, timeout);

  useEffect(() => {
    if (redirectTo && !waiting) {
      router.push(redirectTo);
    }
    if (!waiting) {
      setOpen(false);
    }

    return () => {
      clearTimeout(timeoutId);
    }
  }, [timeoutId, redirectTo, waiting]);

  return open ? (
    <div className="absolute left-1/2 -translate-x-1/2 bottom-6 z-50">
      <div className={clsx("flex flex-row items-center justify-center border border-white rounded-md p-4 shadow-md",
        {
          'bg-dark-blue': type === 'success',
          'bg-red-900': type === 'error',
          'bg-yellow-900': type === 'warning',
          'bg-light-blue': type === 'info',
        }
      )}>
        <div className="flex flex-col flex-1 items-start">
          {messagesList.map((message, index) => (
            <p key={index} className="text-gray-200">{message}</p>
          ))}
        </div>
        <CloseIcon onClickFn={() => {
          setOpen(false)
          clearTimeout(timeoutId)
        }} />
      </div>
    </div>

  ) : null;
}
