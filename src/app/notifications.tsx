import CloseElementIcon from "@/components/closeElementIcon";
import { useState } from "react";

export default function NotificationSnipe() {
  const [notificationsShown, showNotifications] = useState<boolean>(false);
  const onNotificationClick = () => {
    showNotifications(!notificationsShown);
  };

  return (
    <>
      {/* Notification icon */}
      <div className={`fixed bottom-6 right-5 border-2 border-gray-300 rounded-full p-1 z-50 ${notificationsShown ? "hidden" : "flex"}`} onClick={onNotificationClick}>
        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed">
          <path d="M160-200v-80h80v-280q0-83 50-147.5T420-792v-28q0-25 17.5-42.5T480-880q25 0 42.5 17.5T540-820v28q80 20 130 84.5T720-560v280h80v80H160Zm320-300Zm0 420q-33 0-56.5-23.5T400-160h160q0 33-23.5 56.5T480-80ZM320-280h320v-280q0-66-47-113t-113-47q-66 0-113 47t-47 113v280Z"/>
        </svg>
      </div>

      {/* Notification pop over */}
      <div className={`transition ease-in-out duration-300 ${notificationsShown ? "translate-x-0" : "translate-x-64"}`}>
        <div className={`w-60 bg-light-blue absolute bottom-5 right-2 top-5 rounded-xl p-4`}>

          <div className="flex flex-row justify-between border-b-2 border-gray-300 pb-2">
            <div className="text-white text-lg font-bold">Notifications</div>
            <CloseElementIcon onClickFn={onNotificationClick} iconFillColor="#e8eaed" />
          </div>

        </div>
      </div>

    </>
  );
 }
