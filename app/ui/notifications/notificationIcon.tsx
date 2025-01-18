import clsx from "clsx";

interface INotificationIconProps {
  notificationsShown: boolean;
  closeNotificationsFn: () => void;
  hasNewNotifications: boolean;
}

export default function NotificationIcon({
  notificationsShown,
  closeNotificationsFn,
  hasNewNotifications
}: INotificationIconProps) {
  return (
    <div className={clsx(`bottom-6 right-5 z-50 h-[38px] w-[38px]`, {
      "hidden": notificationsShown,
      "fixed": !notificationsShown
    })} onClick={closeNotificationsFn}>

      <div className="absolute top-0 left-0 bg-dark-blue border-2 border-dark-blue rounded-full">
        <div className="border border-gray-300 rounded-full p-1">
          <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed">
            <path d="M160-200v-80h80v-280q0-83 50-147.5T420-792v-28q0-25 17.5-42.5T480-880q25 0 42.5 17.5T540-820v28q80 20 130 84.5T720-560v280h80v80H160Zm320-300Zm0 420q-33 0-56.5-23.5T400-160h160q0 33-23.5 56.5T480-80ZM320-280h320v-280q0-66-47-113t-113-47q-66 0-113 47t-47 113v280Z"/>
          </svg>
        </div>
      </div>

      <div className={clsx("absolute top-1 right-1 h-0 w-0 rounded-full p-1 bg-red-500 opacity-75 animate-ping", {
        "hidden": !hasNewNotifications
      })} />
      <div className={clsx("absolute top-1 right-1 h-0 w-0 rounded-full p-1 bg-red-700", {
        "hidden": !hasNewNotifications
      })} />

    </div>
  );
}
