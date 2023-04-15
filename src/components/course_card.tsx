import { Col, Image, ProgressBar } from "react-bootstrap";
import GeneralContext from "../context/gen";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { formatCedis } from "./helpers";

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
  const { theme, corpid } = useContext(GeneralContext);
  const navigate = useNavigate();
  return (
    <>
      <Col md={4} lg={3} sm={12}>
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
              ? window.open(
                  `http://kelemm-digiclass.herokuapp.com/course/${course_id}`,
                  "_blank"
                )
              : navigate(`/course/${course_id}/${corpid}`)
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
      </Col>
    </>
  );
}
