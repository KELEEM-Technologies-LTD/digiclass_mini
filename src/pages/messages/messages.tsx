import { Fragment, useContext, useEffect, useState } from "react";
import GeneralContext from "../../context/gen";
import { StorageBox } from "../../core/storage";
import { Link, useNavigate, useParams } from "react-router-dom";
import ContactCardNew from "./components/contact-card";
import { LinearProgress } from "@mui/material";
import baseService from "../../core/baseServices";
import urls from "../../core/base.url";
import MessagesScreen from "./message-screen";

export default function Messages() {
  const { corpid, setCorpId } = useContext(GeneralContext);
  const { corp_id } = useParams();
  useEffect(() => {
    if (StorageBox.retrieveUserData()?.corporate_id !== corp_id) {
      // console.log("Logout and ");
      StorageBox.clearStorage();
      window.location.href = `/sign-in/${corp_id}`;
    }
    if (corpid === "") {
      setCorpId(corp_id);
    }
  }, []);
  const navigate = useNavigate();

  const [show, setShow] = useState(true);

  const [contactLoading, setContactLoading] = useState(true);
  const [contactList, setContactList] = useState([]);
  const [current, setCurrent] = useState([]);

  const getContactList = async () => {
    setContactLoading(true);
    const user = StorageBox.retrieveUserData();
    // console.log(user?.user_id);
    try {
      const res: any = await baseService.get(
        urls.chatlist + `/${user?.user_id}`
      );
      //   console.log(res.data?.payload);
      setContactList(res.data?.payload);
      setContactLoading(false);
    } catch (error) {
      // console.log(error);
    }
  };

  useEffect(() => {
    getContactList();
  }, []);

  return (
    <Fragment>
      <div
        className="flex w-full h-full bg-[#f5f5f5]"
        style={{ overflow: "hidden" }}
      >
        <aside className="flex">
          <div className="flex flex-col items-center w-16 h-screen py-8 space-y-8 bg-white ">
            <Link
              to="#"
              className="p-1.5 text-primary-500 focus:outline-nones transition-colors duration-200 rounded-lg  hover:bg-primary-100"
              onClick={() => navigate(-1)}
            >
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
                  d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3"
                />
              </svg>
            </Link>
            <Link
              to="#"
              onClick={() => {
                setShow(true);
              }}
              className="p-1.5 text-primary-500 focus:outline-nones transition-colors duration-200 rounded-lg  hover:bg-primary-100"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.625 9.75a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 01.778-.332 48.294 48.294 0 005.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z"
                />
              </svg>
            </Link>
          </div>
          <div
            className={`h-screen py-8 overflow-y-auto bg-white border-l border-r sm:w-64 w-64  ${
              show ? "" : "hidden sm:block"
            }`}
          >
            <h2 className="px-5 text-lg font-medium text-primary-800">
              Messages
            </h2>
            <div className="mt-8 space-y-4">
              {contactLoading ? (
                <LinearProgress />
              ) : contactList.length === 0 ? (
                <div className="px-4 py-2 text-[black] text-center">
                  <p>You do not have a chats</p>
                </div>
              ) : (
                contactList.map((_d, i) => (
                  <ContactCardNew
                    key={i}
                    onClick={() => {
                      setShow(!show);
                      setCurrent(_d);
                    }}
                    current={_d}
                    thisCurrent={current}
                  />
                ))
              )}
            </div>
          </div>
        </aside>
        <div
          className={`flex-1 p:2 sm:p-6 justify-between flex flex-col h-screen ${
            show ? "hidden md:flex" : ""
          }`}
        >
          <MessagesScreen
            current={current}
            onClick={() => {
              setShow(true);
            }}
          />
        </div>
      </div>
    </Fragment>
  );
}
