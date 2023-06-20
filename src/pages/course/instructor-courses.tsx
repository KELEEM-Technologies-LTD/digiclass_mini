import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { StorageBox } from "../../core/storage";
import GeneralContext from "../../context/gen";
import NavBar from "../../components/navbar";
import baseService from "../../core/baseServices";
import urls from "../../core/base.url";
import { displayWarning } from "../../components/alert";
import { Col, Container, Row, Spinner } from "react-bootstrap";
import { Pagination } from "@mui/material";
import CourseCard from "../../components/course_card";
import LoadingOverLay from "../../components/loader";

export default function InstructorCourses() {
  const { corp_id, instructor_id } = useParams();
  const { current, theme, setCurrent, player, setPlayer, corpid, setCorpId } =
    useContext(GeneralContext);

  const [instructor, setInstructor] = useState<any>([]);
  const [pageLoading, setPageLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (StorageBox.retrieveUserData().corporate_id !== corp_id) {
      // console.log("Logout and ");
      StorageBox.clearStorage();
      window.location.href = `/sign-in/${corp_id}`;
    }
    if (corpid === "") {
      setCorpId(corp_id);
    }

    const get_data = async () => {
      try {
        const instructor_res: any = await baseService.get(
          urls.getUser + `/${instructor_id}`
        );
        setInstructor(instructor_res.data?.data);
        setPageLoading(false);
      } catch (error: any) {
        // console.log(error);
        displayWarning(error.response?.data?.message);
        navigate(-1);
      }
    };

    get_data();
  }, []);

  const [loading, setLoading] = useState<boolean>(true);
  const [courses, setCourses] = useState<any>([]);
  const [page, setPage] = useState<number>(1);

  useEffect(() => {
    const get_data = async () => {
      // setLoadingDraft(true);
      try {
        const res: any = await baseService.get(
          urls.course +
            `?filter=instructor=${instructor_id},status=active&page=${page}&size=8`
        );
        // console.log(res);
        // console.log(res.data?.data);
        setCourses(res.data?.data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };

    get_data();
  }, [instructor_id, page]);

  return pageLoading ? (
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
              Courses by{" "}
              <span>
                {instructor?.first_name + " " + instructor?.last_name}
              </span>
            </p>
          </div>
        </div>
      </div>
      {/* {JSON.stringify(theme)} */}
      <Container className="mt-5" fluid>
        <Row className="mt-3">
          {loading ? (
            <Spinner />
          ) : (
            courses?.data?.map((_d: any, i: number) => (
              <CourseCard course={_d} key={i} />
            ))
          )}
        </Row>
        <Col md={12} className="mt-3">
          <Pagination
            count={courses?.totalPages}
            page={page}
            onChange={(event: React.ChangeEvent<unknown>, p: number) => {
              setLoading(true);
              setPage(p);
            }}
          />
        </Col>
      </Container>
    </>
  );
}
