import moment from "moment";
import { Avatar } from "@mui/material";

export const Left = (props: { message: any; user: any }) => {
  const { message, user } = props;
  return (
    <>
      <div className="flex flex-col my-2">
        <div className="flex relative">
          <Avatar
            src={user?.profile_pic}
            className="h-10 w-10 rounded-full absolute bottom-0 "
          />
          <div className="rounded-8 bg-white lg:max-w-lg sm:max-w-sm max-w-xs flex items-center lg:px-3 p-2 ml-5">
            <p className="text-black text-left lg:text-sm text-xs whitespace-pre-line break-words">
              {message.message}
            </p>
          </div>
        </div>
        <small className="text-left text-accent-hover ml-12 mt-0 lg:text-sm text-xs">
          {moment(message.created_at).format("DD/MM/YYYY HH:MM ")}
        </small>
      </div>
    </>
  );
};

export const Right = (props: { message: any }) => {
  const { message } = props;
  return (
    <>
      <div className="flex flex-col my-2 ">
        <div className="flex justify-end  relative">
          <div className="rounded-8 bg-blue-600 lg:max-w-lg sm:max-w-sm max-w-xs flex items-center lg:px-3 p-2 mr-0">
            <p className="text-white lg:text-sm text-xs text-left whitespace-pre-line break-words">
              {message.message}
            </p>
          </div>
          {/* <GreenCheckMark className="absolute bottom-0" /> */}
        </div>
        <small className="text-right lg:text-sm text-xs text-accent-hover mr-0 mt-2">
          {moment(message.created_at).format("DD/MM/YYYY HH:MM ")}
        </small>
      </div>
    </>
  );
};
