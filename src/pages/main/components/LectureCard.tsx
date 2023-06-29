import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { formatCedis } from "../../../components/helpers";
import play from "../../../assets/img/play.png";
import GeneralContext from "../../../context/gen";
import { StorageBox } from "../../../core/storage";

function LectureCard(props: { data: any }) {
  const { title, thumbnail, price, course_id } = props.data;
  const { corpid } = useContext(GeneralContext);
  const user: any = StorageBox.retrieveUserData();
  return (
    <Link
      to={`/paid-course/${course_id}/${user.corporate_id}`}
      className="grid grid-cols-2 gap-3 h-40 mr-4 rounded "
      style={{ border: "1px solid #787878" }}
    >
      <div
        className="bg-no-repeat w-full relative"
        style={{
          backgroundImage: `url(${thumbnail})`,
          backgroundSize: "cover",
        }}
      >
        <div className="absolute w-full h-full opacity-75 bg-black flex justify-center items-center">
          <button>
            <img src={play} className="w-12" alt="play" />
          </button>
        </div>
      </div>
      <div className="flex flex-col justify-between px-2 py-2">
        <p className="font-serif text-sm font-medium text-black break-words whitespace-pre-wrap">
          {title}
        </p>
        <div className="flex gap-3">
          <p className="font-serif text-sm">Price</p>
          <p className="font-serif text-sm">{formatCedis(price, "GHS")}</p>
        </div>
      </div>
    </Link>
  );
}

export default LectureCard;
