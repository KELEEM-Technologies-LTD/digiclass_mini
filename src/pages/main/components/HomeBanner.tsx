import React, { useContext } from "react";
import { Link } from "react-router-dom";
import GeneralContext from "../../../context/gen";
import { StorageBox } from "../../../core/storage";
import img1 from "../../../assets/img/grillbg.svg";
import img2 from "../../../assets/img/1.png";
import img3 from "../../../assets/img/2.png";

export default function HomeBanner() {
  const { corpid, theme } = useContext(GeneralContext);
  const user = StorageBox.retrieveUserData();
  return (
    <div>
      <div className="md:h-screen md:px-16 grid md:grid-cols-2 grid-cols-1 items-center">
        <img src={img3} alt="people" className="md:hidden w-full" />

        <div className="flex flex-col justify-center md:px-0 md:mt-0 mt-4 px-5   ">
          <div className="">
            <p
              className={`text-2xl font-medium tracking-wide text-gray-600 lg:text-4xl font-serif`}
              style={{ lineHeight: "1.2em" }}
            >
              {`Hi ${user.first_name}, choose a course, master it`}
            </p>

            <p className={`md:mt-4 mt-2 text-lg font-serif`}>
              Get courses from as low as GHS 49.99 and stay ahead
            </p>
            <Link to={`/home/${user.corporate_id}`}>
              <button
                style={{
                  backgroundColor: theme?.primary_color,
                }}
                className={`${
                  theme?.primary_color ? "text-white" : "border text-black"
                } py-2.5 px-8 mt-4 inline-flex`}
              >
                Browse Courses
              </button>
            </Link>
          </div>
        </div>

        <div className="hidden md:block relative">
          <>
            <div className="absolute top-0 left-0">
              <img src={img1} alt="bg" />
            </div>

            <div className="relative z-10">
              <img src={img2} alt="bg" />
            </div>

            <div className="absolute bottom-0 right-0 z-0 ">
              <img src={img1} alt="bg" />
            </div>
          </>
        </div>
      </div>
    </div>
  );
}
