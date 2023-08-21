import { Dialog, Transition } from "@headlessui/react";
import { MessageOutlined } from "@mui/icons-material";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { CircularProgress } from "@mui/material";
import { Fragment, useContext, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { displaySuccess, displayWarning } from "../../../components/alert";
import GeneralContext from "../../../context/gen";
import urls from "../../../core/base.url";
import baseService from "../../../core/baseServices";
import { StorageBox } from "../../../core/storage";

export default function Author(props: any) {
  const { corp_id } = useParams();
  const { theme } = useContext(GeneralContext);
  const { instructor, course_detail, hideMessage } = props;
  const { first_name, last_name, user_role, additional_info, linkedin_url } =
    instructor;
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const cancelButtonRef = useRef(null);

  const socials = linkedin_url ? JSON.parse(linkedin_url) : {};
  const keys = Object.keys(socials);

  const send_message = async () => {
    setSending(true);
    if (message === "") {
      displayWarning("Please type  a message to the course instructor");
      setSending(false);
      return;
    } else {
      // setSending(true);

      const user: any = StorageBox.retrieveUserData();
      try {
        await baseService.post(urls.conversations, {
          senderId: user.user_id,
          receiverId: instructor.user_id,
          message: message,
        });
        displaySuccess(
          "Message sent to instructor, the instructor would reply you as soon as possible, check your messages."
        );
        setOpen(false);
        setSending(false);
        setMessage("");
      } catch (error) {
        displayWarning("Message was not sent to instructor, please try again.");
      }
    }
  };

  return (
    <>
      <div className="py-8 flex flex-col text-black px-2">
        <div>
          <p className="">Instructor</p>
          <div className="mt-10 flex flex-col">
            <div className="flex items-center ">
              <div
                className={`flex justify-center pt-3 items-center h-16 w-16 rounded-full bg-[${theme?.primary_color}]`}
              >
                <p className="text-white font-bold text-lg">
                  {first_name[0] + last_name[0]}
                </p>
              </div>
              <div className="ml-4">
                <div className="font-bold text-lg text-black flex">
                  <p>{first_name + " " + last_name} </p>
                  <div className="flex flex-col">
                    <Link
                      to={`/instructor/${corp_id}/${course_detail.instructor}`}
                    >
                      <OpenInNewIcon />
                    </Link>
                    {hideMessage ? null : (
                      <div className="text-black">
                        <Link to="#" onClick={() => setOpen(true)}>
                          <MessageOutlined />
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex justify-between">
                  <p>{user_role}</p>
                </div>
              </div>
            </div>
            {linkedin_url ? (
              <div className="mt-10">
                <p className="font-bold text-black">About the author</p>

                <p className="font-bold text-l my-1">Social media handles:</p>
                {keys?.map((_d, i) => {
                  return (
                    <div className="flex gap-2" key={i}>
                      <p className="font-bold">{_d.toLocaleUpperCase()}: </p>
                      <p
                        className="cursor-pointer text-[#6666ea]"
                        onClick={() => {
                          window.open(socials?.[_d], "_blank");
                        }}
                      >
                        {socials?.[_d]}
                      </p>
                    </div>
                  );
                })}
                <div className="flex gap-2 mt-4">
                  <p className="font-bold text-l">Occupation:</p>
                  <p>{additional_info?.occupation}</p>{" "}
                </div>

                <div className="flex gap-2 mt-4">
                  <p className="font-bold text-l">Organization:</p>
                  <p>{additional_info?.organization}</p>{" "}
                </div>

                <p className="font-bold text-l mt-4">
                  Subject Area(s):
                  <span className="flex mt-3">
                    {additional_info?.subjectArea
                      .split(",")
                      ?.map((_d: any, i: number) => (
                        <small
                          key={i}
                          className="bg-[#6666ea] text-white rounded-full px-4 py-2 mr-3"
                        >
                          {_d}
                        </small>
                      ))}
                  </span>
                </p>
              </div>
            ) : null}
          </div>
        </div>
      </div>

      <Transition.Root show={open} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          initialFocus={cancelButtonRef}
          onClose={setOpen}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-[white] text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                  <div className="bg-[white] px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                    <div className="sm:items-start">
                      <div className=" text-center sm:mt-0 sm:ml-4 sm:text-left">
                        <Dialog.Title
                          as="h3"
                          className="text-base font-semibold leading-6 text-primary-900"
                        >
                          Send Author a message
                        </Dialog.Title>
                        <hr className="my-3 bg-secondary-300" />
                        <div className="mb-6">
                          <label
                            htmlFor="message"
                            className="block text-primary-700 font-bold mb-2"
                          >
                            Message
                          </label>
                          <textarea
                            rows={3}
                            className=" appearance-none border rounded w-full py-2 px-3 text-primary-700 leading-tight focus:outline-none focus:shadow-outline"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="px-4 py-2 sm:flex sm:flex-row flex-col justify-center sm:px-6">
                    <button
                      type="button"
                      className=" inline-flex md:mb-0 mb-3 w-full justify-center rounded-md border border-primary-300 bg-[white] px-4 py-2 text-base font-medium text-primary-700 shadow-sm hover:bg-primary-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                      onClick={() => {
                        setOpen(false);
                        setSending(false);
                        setMessage("");
                      }}
                      ref={cancelButtonRef}
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      style={{ backgroundColor: theme?.primary_color }}
                      className=" px-4 rounded md:ml-5 md:w-[6rem] h-9 w-full"
                      onClick={send_message}
                      disabled={sending}
                    >
                      {sending ? (
                        <>
                          <CircularProgress size={20} className="text-white" />
                        </>
                      ) : (
                        "send"
                      )}
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
}
