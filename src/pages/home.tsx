import { useContext, useEffect } from "react";
import { Container, Row, Spinner } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import CourseCard from "../components/course_card";
import LoadingOverLay from "../components/loader";
import NavBar from "../components/navbar";
import GeneralContext from "../context/gen";
import { StorageBox } from "../core/storage";

export default function Home() {
  const navigate = useNavigate();
  const { loading, user, courseLoading, courses, corpid, setCorpId } =
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
      <Container className="mt-5">
        <h5 className="text-center">
          Welcome {user?.first_name}, you can start learning your favorite
          courses now on digiclass.
        </h5>
        <Row className="mt-3">
          {courseLoading ? (
            <Spinner />
          ) : (
            courses.map((_d: any, i: number) => (
              <CourseCard course={_d} key={i} />
            ))
          )}
        </Row>
      </Container>
    </>
  );
}
