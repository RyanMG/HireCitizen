"use client";

import NotificationPopover from "./notificationPopover";
import NotificationIcon from "./notificationIcon";
import { NotificationProvider } from "@context/notificationProvider";

export default function NotificationSnipe() {

  return (
    <NotificationProvider>
      <div className="z-100">
        <NotificationIcon />
        <NotificationPopover />
      </div>
    </NotificationProvider>
  );
 }
