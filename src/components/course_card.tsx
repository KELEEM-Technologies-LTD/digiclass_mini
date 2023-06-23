import { useContext } from "react";
import { Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import GeneralContext from "../context/gen";
import { formatCedis } from "./helpers";
import { CurrencyContext } from "../context/CurrencyContext";

export default function CourseCard(props: { course: any }) {
  const { course } = props;
  const {
    thumbnail,
    title,
    first_name,
    last_name,
    course_id,
    configurations,
    price,
  } = course;
  const { theme, corpid, myCourseArray } = useContext(GeneralContext);
  const { convertValue, convertOldValue } = useContext(CurrencyContext);
  const navigate = useNavigate();

  return (
    <>
      <Col md={4} lg={3} sm={12} className="mb-4">
        <div
          className="relative cursor-pointer flex flex-col rounded-md overflow-hidden shadow-md"
          onClick={() =>
            navigate(
              configurations?.paid
                ? myCourseArray.includes(course_id)
                  ? `/my-course/${course_id}/${corpid}`
                  : `/paid-course/${course_id}/${corpid}`
                : `/course/${course_id}/${corpid}`
            )
          }
        >
          {!configurations?.paid ? (
            <span className="absolute top-0 right-0 bg-green-500 text-white px-2 py-1 text-xs font-bold">
              Free
            </span>
          ) : null}
          <div className="h-40">
            <img
              className="object-cover w-full h-full"
              src={thumbnail}
              alt={thumbnail}
            />
          </div>
          <div className="p-4 flex-grow">
            <h2 className="text-base text-semibold font-semibold mb-2">
              {title}
            </h2>
            <p className="text-primary-600 text-sm mb-2">
              {first_name} {last_name}
            </p>
            <div className="flex items-center mb-2">
              <i
                className={`fa fa-star text-[${theme?.primary_color}] text-sm`}
              ></i>
              <i
                className={`fa fa-star text-[${theme?.primary_color}] text-sm`}
              ></i>
              <i
                className={`fa fa-star-half-alt text-[${theme?.primary_color}] text-sm`}
              ></i>
              <i
                className={`far fa-star text-[${theme?.primary_color}] text-sm`}
              ></i>
              <i
                className={`far fa-star text-[${theme?.primary_color}] text-sm`}
              ></i>
            </div>
            <div className="flex justify-between items-center">
              <p className="text-base text-[black] font-bold">
                {formatCedis(price, "GHS")}
              </p>
              <p className="text-primary-600 text-sm line-through">
                {formatCedis(price, "GHS")}
              </p>
            </div>
          </div>
        </div>
      </Col>
    </>
  );
}

// eslint-disable-next-line no-lone-blocks
{
  /* <Col md={4} lg={3} sm={12}>
<div
  style={{
    marginBottom: "20px",
    background: "#ffffff",
    boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
    borderRadius: "6px",
    cursor: "pointer",
    marginRight: "10px",
    height: "300px",
    overflowY: "hidden",
  }}
  onClick={() =>
    configurations?.paid
      ? alert("Pending inplementation")
      : // window.open(
        //     `http://kelemm-digiclass.herokuapp.com/course/${course_id}`,
        //     "_blank"
        //   )
        navigate(`/course/${course_id}/${corpid}`)
  }
>
  <Image
    src={thumbnail ?? "https://picsum.photos/200"}
    style={{
      height: "150px",
      width: "100%",
      objectFit: "cover",
    }}
  />
  <div style={{ padding: "10px" }} className="text-center">
    <p
      style={{
        fontWeight: "bolder",
        fontSize: "15px",
        color: theme?.primary_color,
        opacity: 0.8,
        marginBottom: "10px",
      }}
    >
      {title}
    </p>
    <small>
      {first_name} {last_name}
    </small>
  </div>
  <div className="px-1 text-center">
    {configurations?.paid ? (
      <p>{formatCedis(price)} on Digiclass</p>
    ) : (
      <>
        <button
          onClick={() => navigate(`/course/${course_id}`)}
          type="submit"
          style={{
            margin: "auto",
            padding: "14px 16px",
            color: "white",
            opacity: 1,
            backgroundColor: theme?.primary_color,
            border: "none",
            marginBottom: "5px",
          }}
        >
          Start Learning
        </button>
        <ProgressBar
          variant="info"
          min={0}
          now={0}
          max={100}
          label="Progress"
          style={{ height: "10px" }}
        />
      </>
    )}
  </div>
</div>
</Col> */
}
