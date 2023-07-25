import { Avatar, CircularProgress } from "@mui/material";
import { Fragment, useEffect, useState } from "react";
import { displayWarning } from "../../components/alert";
import urls from "../../core/base.url";
import baseService from "../../core/baseServices";
import { StorageBox } from "../../core/storage";
import { Left, Right } from "./components/message-pills";

export default function MessagesScreen(props: {
  current: any;
  onClick: () => void;
}) {
  const { current, onClick } = props;
  const [loading, setLoading] = useState<boolean>(false);
  const [me, setMe] = useState<string>("");
  const [chats, setchats] = useState<any>([]);

  const chat_id = current?.user_id;

  useEffect(() => {
    const makeRead = async () => {
      try {
        await baseService.put(
          urls.conversations + `/${current?.user_id}/${my_user.user_id}/read`,
          {}
        );
      } catch (error) {}
    };
    makeRead();

    getChats();

    const intervalId = setInterval(() => {
      reloadChats();
    }, 10000); // 1 minute in milliseconds

    return () => clearInterval(intervalId);
  }, [current]);

  const reloadChats = async () => {
    if (chat_id) {
      try {
        const res: any = await baseService.get(
          urls.conversations + `/${chat_id}/${my_user.user_id}`
        );

        setchats(res.data?.payload);
        setLoading(false);
      } catch (error) {}
    }
  };

  const my_user = StorageBox.retrieveUserData();
  const getChats = async () => {
    setMe(my_user?.user_id);

    if (chat_id) {
      try {
        const res: any = await baseService.get(
          urls.conversations + `/${chat_id}/${my_user.user_id}`
        );
        setchats(res.data?.payload);
        setLoading(false);

        setTimeout(function () {
          const el = document.getElementById("messages");
          if (el) {
            el.scrollTop = el.scrollHeight;
          }
        }, 100);
      } catch (error) {}
    }
  };

  const [txt, setTxt] = useState<string>("");
  const [sending, setSending] = useState<boolean>(false);

  const sendMessage = async (e: any) => {
    console.log(my_user.user_id);
    setSending(true);
    e.preventDefault();
    if (txt === "") {
      displayWarning("please type a message");
      setSending(false);
    } else {
      try {
        await baseService.post(urls.conversations, {
          receiverId: chat_id,
          senderId: my_user.user_id,
          message: txt,
        });

        getChats();
        setTxt("");
        setSending(false);
      } catch (error) {
        setTxt("");
        // console.log(error);
        setSending(false);
      }
    }
  };

  return (
    <Fragment>
      {!chat_id ? (
        <></>
      ) : loading ? (
        <div className="flex items-center justify-center h-screen">
          <CircularProgress size={70} />
        </div>
      ) : (
        <>
          <div className="flex sm:items-center justify-between py-3 border-b-2 border-gray-200">
            <div className="relative flex items-center space-x-4">
              <div className="relative">
                <Avatar src={current?.profile_pic} alt="" />
              </div>
              <div className="flex flex-col leading-tight">
                <div className="md:text-2xl text-xl mt-1 flex items-center">
                  <span className="text-gray-700 mr-3">
                    {current?.first_name} {current?.last_name}
                  </span>
                </div>
                {/* <span className="text-lg text-gray-600">Junior Developer</span> */}
              </div>
            </div>
            <div className="flex items-center space-x-2"></div>
          </div>
          <div
            id="messages"
            className="flex flex-col space-y-4 p-3 overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch"
          >
            {chats.map((message: any) => {
              return (
                <div key={message?.id}>
                  {message.sender_id === me ? (
                    <Right message={message} />
                  ) : (
                    <Left message={message} user={current} />
                  )}
                </div>
              );
            })}
          </div>
          <div className="border-t-2 border-gray-200 px-4 pt-4 mb-2 sm:mb-0">
            <form className="relative flex" onSubmit={sendMessage}>
              <span className="absolute inset-y-0 flex items-center">
                <button
                  type="button"
                  className="inline-flex items-center justify-center rounded-full h-12 w-12 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300 focus:outline-none hidden sm:inline-flex"
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
                      d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
                    />
                  </svg>
                </button>
                <button
                  type="button"
                  onClick={onClick}
                  className="inline-flex items-center justify-center rounded-full h-12 w-12 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300 focus:outline-none  sm:hidden"
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
                      d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
                    />
                  </svg>
                </button>
              </span>
              <input
                type="text"
                placeholder="Write your message!"
                className="w-full focus:outline-none lg:text-base text-xs focus:placeholder-gray-400 text-gray-600 placeholder-gray-600 pl-12 bg-gray-200 rounded-md py-3"
                value={txt}
                onChange={(e) => setTxt(e.target.value)}
                disabled={sending}
              />
              <div className="absolute right-0 items-center inset-y-0 flex justify-between">
                <button
                  type="submit"
                  className="inline-flex items-center justify-center rounded-lg lg:px-4 lg:py-3 px-2 py-2 transition duration-500 ease-in-out text-white bg-blue-500 hover:bg-blue-400 focus:outline-none"
                >
                  <span className="font-bold lg:text-base text-xs">Send</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="lg:h-6 lg:w-6 h-3 w-3 lg:ml-2 ml-0.5 transform rotate-90"
                  >
                    <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                  </svg>
                </button>
              </div>
            </form>
          </div>
        </>
      )}
    </Fragment>
  );
}
