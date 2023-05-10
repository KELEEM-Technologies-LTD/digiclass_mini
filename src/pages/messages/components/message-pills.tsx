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
          <div className="rounded-8 bg-white w-5/12 flex items-center p-2 ml-12">
            <p className="text-black text-left text-lg">{message.message}</p>
          </div>
        </div>
        <small className="text-left text-accent-hover ml-12 mt-0 text-[10px]">
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
          <div className="rounded-8 bg-blue-600 w-5/12 flex items-center p-2 mr-8">
            <p className="text-white text-lg text-left">{message.message}</p>
          </div>
          {/* <GreenCheckMark className="absolute bottom-0" /> */}
        </div>
        <small className="text-right text-accent-hover mt-0 text-[10px]">
          {moment(message.created_at).format("DD/MM/YYYY HH:MM ")}
        </small>
      </div>
    </>
  );
};
