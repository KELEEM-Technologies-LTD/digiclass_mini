import React, { useContext, useEffect, useState } from "react";
import GeneralContext from "../../context/gen";
import NotificationBadge from "./notification_badge";
import moment from "moment";
import { formatTimeAgo } from "../helpers";

export default function NotificationDrawer(props: any) {
  const { read, unread, openNotification, pop } = useContext(GeneralContext);
  const [notifications, setNotifications] = useState<any>([]);

  useEffect(() => {
    setNotifications([...read, ...unread]);
    // console.log(read);
  }, [read, unread]);

  return (
    <div>
      <NotificationBadge />
      {pop ? (
        <div
          className="w-full  absolute z-10 right-0 h-screen overflow-x-hidden transform translate-x-0 transition ease-in-out duration-700"
          id="notification"
          //   style={{
          //     scrollbarWidth: "thin",
          //     scrollbarColor: "transparent",
          //   }}
        >
          <div
            className="2xl:w-4/12 bg-gray-50 h-screen overflow-y-auto p-8 absolute right-0"
            style={{
              scrollbarWidth: "thin",
              scrollbarColor: "transparent",
            }}
          >
            <div className="flex items-center justify-between">
              <p className="text-lg font-semibold leading-6 text-gray-800">
                Notifications
              </p>
              <div
                className="cursor-pointer"
                onClick={() => openNotification()}
              >
                <svg
                  width={24}
                  height={24}
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M18 6L6 18"
                    stroke="#4B5563"
                    strokeWidth="1.25"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M6 6L18 18"
                    stroke="#4B5563"
                    strokeWidth="1.25"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>
            {/* notifications */}
            {notifications.map((ntf_: any, idx_: any) => (
              <div
                key={idx_}
                className="w-full p-3 mt-4 bg-white rounded hover:shadow flex"
              >
                <div className="w-8 h-8 border rounded-full border-gray-200 flex items-center justify-center">
                  <svg
                    width={16}
                    height={16}
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M4.30325 12.6667L1.33325 15V2.66667C1.33325 2.48986 1.40349 2.32029 1.52851 2.19526C1.65354 2.07024 1.82311 2 1.99992 2H13.9999C14.1767 2 14.3463 2.07024 14.4713 2.19526C14.5963 2.32029 14.6666 2.48986 14.6666 2.66667V12C14.6666 12.1768 14.5963 12.3464 14.4713 12.4714C14.3463 12.5964 14.1767 12.6667 13.9999 12.6667H4.30325ZM5.33325 6.66667V8H10.6666V6.66667H5.33325Z"
                      fill="#4338CA"
                    />
                  </svg>
                </div>
                <div className="pl-3">
                  <p className="text-sm leading-none">{ntf_.message}</p>
                  <p className="text-xs flex leading-3 pt-1 text-gray-500">
                    {/* {moment(ntf_.date).format("hh:mm:ss a")} */}
                    {formatTimeAgo(ntf_.date)}
                  </p>
                </div>
              </div>
            ))}
            <div className="flex items-center justiyf-between">
              <hr className="w-full" />
              <p className="text-sm flex flex-shrink-0 leading-normal px-3 py-16 text-gray-500">
                Thats all for now :)
              </p>
              <hr className="w-full" />
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
