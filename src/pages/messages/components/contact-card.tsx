import { Avatar } from "@mui/material";
import { Badge } from "react-bootstrap";

const ContactCardNew = (props: {
  onClick: () => void;
  current: any;
  thisCurrent?: any;
}) => {
  const { onClick, current, thisCurrent } = props;
  return (
    <button
      onClick={onClick}
      className={`flex items-center w-full px-3 py-2 transition-colors duration-200 gap-x-2 hover:bg-blue-100 focus:outline-none ${
        thisCurrent === current ? "bg-blue-100" : ""
      }`}
    >
      {current?.profile_pic ? (
        <Avatar src={current?.profile_pic} alt="" />
      ) : (
        <Avatar />
      )}
      <div className="text-left flex justify-between rtl:text-right">
        <div>
          <h1 className="text-sm font-medium text-blue-700 capitalize dark:text-white">
            {current?.first_name}
          </h1>
          <p className="text-xs text-primary-500 dark:text-primary-400">
            Instructor
          </p>
        </div>
        <div>
          {current?.unread_count !== 0 ? (
            <Badge
              style={{
                fontSize: "9px",
                marginLeft: "15px",
                padding: "1px 1px 1px 1px",
              }}
            >
              {current?.unread_count}
            </Badge>
          ) : null}
        </div>
      </div>
    </button>
  );
};

export default ContactCardNew;
