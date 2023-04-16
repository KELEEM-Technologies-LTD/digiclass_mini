import { useEffect } from "react";
import { Col, Row, Table } from "react-bootstrap";

export default function OverView(props: { data: any }) {
  const { data } = props;
  const { about, skill_level, language, caption } = data;
  useEffect(() => {
    console.log(data);
  }, []);

  return (
    <>
      <h5>About this course</h5>
      <div
        style={{ overflowX: "hidden", marginBottom: "10px" }}
        dangerouslySetInnerHTML={{ __html: about }}
        className="fs-6"
      />

      <Row>
        <Col md={6}>
          <Table className="mb-5">
            <tbody>
              <tr>
                <td>
                  <ul style={{ listStyle: "none" }}>
                    <li>
                      Skill level:{" "}
                      <span className="fw-bold"> {skill_level}</span>
                    </li>
                    <li>
                      Languages: <span className="fw-bold">{language}</span>
                    </li>
                    <li>
                      Captions:{" "}
                      <span className="fw-bold">{caption ? "Yes" : "No"}</span>
                    </li>
                  </ul>
                </td>
                <td>
                  <ul style={{ listStyle: "none" }}>
                    <li>
                      Instructor: <span className="fw-bold"></span>
                    </li>
                  </ul>
                </td>
              </tr>
            </tbody>
          </Table>
        </Col>
      </Row>
    </>
  );
}
