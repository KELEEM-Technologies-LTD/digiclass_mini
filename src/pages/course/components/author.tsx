import React, { useContext } from "react";
import GeneralContext from "../../../context/gen";
import { Link } from "react-router-dom";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";

export default function Author(props: any) {
  const { theme } = useContext(GeneralContext);
  const { instructor, course_detail } = props;
    const { first_name, last_name, resume, user_role } = instructor;
    console.log(resume);

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
                <p className="font-bold text-lg text-black">
                  {first_name + " " + last_name}{" "}
                  <Link to={`/instructor/${course_detail.instructor}`}>
                    <OpenInNewIcon />
                  </Link>
                </p>
                <div className="flex justify-between">
                  <p>{user_role}</p>
                </div>
              </div>
            </div>
            <div className="mt-10">
              <p className="font-bold text-black">About the author</p>
              <p className="md:mt-5">{resume}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
