import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import GeneralContext from "../../context/gen";
import { StorageBox } from "../../core/storage";
import baseService from "../../core/baseServices";
import urls from "../../core/base.url";

export default function MessageBadge() {
  const navigate = useNavigate();
  const { theme, corpid } = useContext(GeneralContext);
  const [count, setCount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);

  async function getChats() {
    const user = StorageBox.retrieveUserData();
    setLoading(true);
    try {
      const res: any = await baseService.get(
        urls.chatlist + `/${user?.user_id}`
      );
      const chatlist = res.data?.payload;
      const totalCount = chatlist.reduce(
        (total: number, chat: any) => total + chat.unread_count,
        0
      );
      setCount(totalCount);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getChats();
  }, []);

  return (
    <div
      onClick={() => navigate(`/messages/${corpid}`)}
      className="position-relative  ml-4"
      style={{ cursor: "pointer" }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        // className="w-6 h-6"
        style={{
          height: "30px",
          width: "30px",
          marginRight: "13px",
          color: "gray",
        }}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z"
        />
      </svg>
      <span
        style={{ fontSize: "11px", background: theme?.primary_color }}
        className="position-absolute top-0 start-0 translate-middle rounded-circle text-white px-1"
      >
        {count}
      </span>
    </div>
  );
}
