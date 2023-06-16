import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ContactCardNew from "./contact-card";

export default function MessageMobileDrawer(props: any) {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleToggleDrawer = () => {
    setIsOpen(!isOpen);
  };

  const handleCloseDrawer = () => {
    setIsOpen(false);
  };

  const handleOverlayClick = () => {
    handleCloseDrawer();
  };

  const handleNavigateBack = () => {
    navigate(-1); // Navigates back one step in the history
  };
  return (
    <div className="relative">
      {/* Toggle button */}
      <button className=" text-black" onClick={handleToggleDrawer}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5"
          />
        </svg>
      </button>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed z-10 inset-0 bg-black opacity-50"
          onClick={handleOverlayClick}
        />
      )}

      {/* Drawer */}
      <div
        className={`fixed z-20 right-0 top-0 h-screen w-64 bg-white shadow-lg transition-transform duration-300 transform ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Close button */}
        <button
          className="absolute top-2 right-2 p-2 rounded-full text-black"
          onClick={handleCloseDrawer}
        >
          X
        </button>

        {/* Drawer content */}
        <div className="p-4 text-black">
          <h2 className="text-xl font-semibold mb-4">Chats</h2>
          <div className="flex justify-start flex-col">
            <div className="mt-8 space-y-4">
              {props.contactLoading ? (
                <>loading</>
              ) : props.contactList.length === 0 ? (
                <div className="px-4 py-2 text-[black] text-center">
                  <p>You do not have a chats</p>
                </div>
              ) : (
                props.contactList.map((_d: any, i: number) => (
                  <ContactCardNew
                    key={i}
                    onClick={() => {
                      props.setShow(!props.show);
                      props.setCurrent(_d);
                      setIsOpen(!isOpen);
                    }}
                    current={_d}
                    thisCurrent={props.current}
                  />
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
