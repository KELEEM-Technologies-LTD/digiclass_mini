import React, { useContext } from "react";
import GeneralContext from "../../context/gen";
import { useNavigate } from "react-router-dom";

export default function NotificationBadge() {
  const navigate = useNavigate();
  const { theme, corpid } = useContext(GeneralContext);
  return (
    <div
      onClick={() => navigate(`/account/${corpid}?tab=1`)}
      className="position-relative ml-1"
      style={{ cursor: "pointer" }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
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
          d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"
        />
      </svg>
      {/* <span
        style={{ fontSize: "11px", background: theme?.primary_color }}
        className="position-absolute top-0 start-0 translate-middle rounded-circle text-white px-1"
      >
        0
      </span> */}
    </div>
  );
}
