import { useContext, useEffect, useState } from "react";
import { Col, Row, Table } from "react-bootstrap";
import GeneralContext from "../../../context/gen";
import urls from "../../../core/base.url";
import baseService from "../../../core/baseServices";
import { StorageBox } from "../../../core/storage";
import { useNavigate, useParams } from "react-router-dom";

export default function OverView(props: {
  data: any;
  completed: boolean;
  setCompleted: any;
}) {
  const { data, completed, setCompleted } = props;
  const { about, skill_level, language, caption } = data;
  const { theme } = useContext(GeneralContext);
  const { corp_id } = useParams();

  useEffect(() => {
    getQuizResult();
  }, []);

  const [quizIsRequired, setQuizIsRequired] = useState(true);
  const [message, setMessage] = useState("Complete quiz to get cerification");
  const getQuizResult = async () => {
    if (data?.configurations?.quiz_required) {
      try {
        const user = StorageBox.retrieveUserData();
        const res: any = await baseService.get(
          urls.results + `/${user?.user_id}/${data?.course_id}`
        );
        // console.log(res.data?.payload);
        const result_status = res.data?.payload?.result_status;
        if (result_status === "passed") {
          setCompleted(true);
          setQuizIsRequired(false);
        } else if (result_status === "pending") {
          setMessage("Quiz submitted, please await instructor review");
        } else if (result_status === "failed") {
          setMessage(
            "Quiz submitted, course was failed, contact instructor to rewrite the quiz."
          );
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      setQuizIsRequired(false);
    }
  };

  const navigate = useNavigate();

  return (
    <>
      <h5 className="">About this course</h5>
      <div
        style={{ overflowX: "hidden", marginBottom: "10px" }}
        dangerouslySetInnerHTML={{ __html: about }}
        className="fs-6"
      />

      <Row>
        <Col md={6} className="">
          <div className="d-flex flex-column flex-lg-row ">
            <ul style={{ listStyle: "none" }} className="">
              <li className="d-flex mb-3">
                Skill level:{" "}
                <span className="fw-bold mx-2"> {skill_level}</span>
              </li>
              <li className="d-flex mb-3">
                Languages: <span className="fw-bold mx-2">{language}</span>
              </li>
              <li className="d-flex mb-3">
                Captions:{" "}
                <span className="fw-bold mx-2">{caption ? "Yes" : "No"}</span>
              </li>
            </ul>
            <ul style={{ listStyle: "none" }}>
              <li className="d-flex mb-3">
                Instructor: <span className="fw-bold mx-2"></span>
              </li>
            </ul>
          </div>
          <div className="d-flex flex-column flex-lg-row">
            <div className="mx-lg-3 mb-2">
              <h5>Certificates</h5>
            </div>
            <div>
              <p className="mx-2">
                get Digiclass certificate by completing entire course
              </p>
              {completed ? (
                quizIsRequired ? (
                  <p className="flex items-center justify-center">{message}</p>
                ) : (
                  <button
                    onClick={() => {
                      navigate(`/certifications/${corp_id}/${data.course_id}`);
                    }}
                    className={`border-[2px] border-[${theme?.primary_color}] px-6 py-lg-2 py-1 d-flex justify-content-center align-items-center rounded-5`}
                  >
                    Digiclass certificate
                  </button>
                )
              ) : null}
            </div>
          </div>
          {/* <Table className="mb-5">
            <tbody className="border">
              <tr className="d-flex flex-lg-row flex-column border">
                <td>
                  <ul style={{ listStyle: "none" }}>
                    <li className="d-flex">
                      Skill level:{" "}
                      <span className="fw-bold"> {skill_level}</span>
                    </li>
                    <li className="d-flex">
                      Languages: <span className="fw-bold">{language}</span>
                    </li>
                    <li className="d-flex">
                      Captions:{" "}
                      <span className="fw-bold">{caption ? "Yes" : "No"}</span>
                    </li>
                  </ul>
                </td>
                <td>
                  <ul style={{ listStyle: "none" }}>
                    <li className="d-flex">
                      Instructor: <span className="fw-bold">kklllqlwooqwp</span>
                    </li>
                  </ul>
                </td>
              </tr>
              <tr>
                <td>Certificates</td>
                <td>
                  <p>get Digiclass certificate by completing entire course</p>
                  {completed ? (
                    quizIsRequired ? (
                      <p className="flex items-center justify-center">
                        {message}
                      </p>
                    ) : (
                      <button
                        onClick={() => {
                          navigate(
                            `/certifications/${corp_id}/${data.course_id}`
                          );
                        }}
                        className={`border-[2px] border-[${theme?.primary_color}] px-6 py-1 rounded-5`}
                      >
                        <p>Digiclass certificate</p>
                      </button>
                    )
                  ) : null}
                </td>
              </tr>
            </tbody>
          </Table> */}
        </Col>
      </Row>
    </>
  );
}
