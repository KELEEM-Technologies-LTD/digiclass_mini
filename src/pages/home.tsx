import { useContext, useEffect } from "react";
import { Col, Container, Row, Spinner } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import CourseCard from "../components/course_card";
import LoadingOverLay from "../components/loader";
import NavBar from "../components/navbar";
import GeneralContext from "../context/gen";
import { StorageBox } from "../core/storage";
import { Pagination } from "@mui/material";

export default function Home() {
  const navigate = useNavigate();
  const { loading, user, courseLoading, courses, corpid, setCorpId, theme } =
    useContext(GeneralContext);

  const { corp_id } = useParams();
  useEffect(() => {
    if (StorageBox.retrieveUserData()?.corporate_id !== corp_id) {
      // console.log("Logout and ");
      StorageBox.clearStorage();
      window.location.href = `/sign-in/${corp_id}`;
    }
    if (corpid === "") {
      setCorpId(corp_id);
    }
  }, []);

  return loading ? (
    <LoadingOverLay />
  ) : (
    <>
      <NavBar />
      <div className="flex flex-col font-serif">
        {/* Header  */}
        <div
          className={`flex flex-col bg-[${theme?.primary_color}] md:px-16 px-4 justify-end`}
        >
          <div className="flex justify-between items-center">
            <p className=" text-2xl md:text-4xl md:font-semibold text-white py-7">
              Courses
            </p>
          </div>
        </div>
      </div>
      <Container className="mt-5" fluid>
        <Row className="mt-3">
          {courseLoading ? (
            <Spinner />
          ) : (
            courses.map((_d: any, i: number) => (
              <CourseCard course={_d} key={i} />
            ))
          )}
        </Row>
        <Row className="text-center mt-5">
          <Col md={{ span: 8, offset: 2 }}>
            <Pagination count={1} variant="outlined" />
          </Col>
        </Row>
      </Container>
    </>
  );
}
