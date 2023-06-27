import { useContext, useLayoutEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import GeneralContext from "../../context/gen";
import baseService from "../../core/baseServices";
import urls from "../../core/base.url";
import { displayWarning } from "../../components/alert";
import { StorageBox } from "../../core/storage";
import LoadingOverLay from "../../components/loader";
import { ChevronLeft } from "@mui/icons-material";
import SingleSection from "./components/sections";
import CourseMedia from "./components/course_media";
import OverView from "./components/overview";
import { Container } from "react-bootstrap";
import { Tab, Tabs } from "@mui/material";
import Faq from "./components/faq";
import Files from "../my-course/components/Files";
import Author from "./components/author";
import Review from "./components/reviews";

export default function PaidCourse() {
  const [loading, setLoading] = useState(true);
  const [course, setCourse] = useState<any>([]);
  const [instructor, setInstructor] = useState([]);
  const [review, setReviews] = useState([]);
  const [reviewLoading, setreviewLoading] = useState(true);
  const [sections, setSections] = useState<any>([]);
  const navigate = useNavigate();

  const { course_id, corp_id } = useParams();
  const { current, theme, setCurrent, player, setPlayer, corpid, setCorpId } =
    useContext(GeneralContext);

  const getCourseDetail = async () => {
    setLoading(true);

    try {
      const course_data: any = await baseService.get(
        urls.getCourses +
          `/${course_id}?query_fields=title,status,about,caption,short_description,description,about,skill_level,language,price,caption,instructor,configurations,certificate,contract_percentage,status,view_status,updatedAt,thumbnail`
      );

      console.log(course_data.data?.data);
      setCourse(course_data.data?.data);

      const token = StorageBox.getAccessToken();
      if (token !== null) {
        try {
          const instructor_res: any = await baseService.get(
            urls.getUser + `/${course_data?.data?.data?.instructor}`
          );
          setInstructor(instructor_res.data?.data);
          setLoading(false);
        } catch (error: any) {
          // console.log(error);
          displayWarning(error.response?.data?.message);
          navigate(-1);
        }
      }
    } catch (err: any) {
      setLoading(true);
      displayWarning(err.response?.data?.message);
      navigate(-1);
    }
  };

  const getReviews = async () => {
    const token = await StorageBox.retrieveUserData();
    setreviewLoading(true);
    try {
      const reviewres: any = await baseService.get(
        urls.getReviews + `?course_id=${course_id}`
      );
      setReviews(reviewres.data?.data?.data);
      setreviewLoading(false);
    } catch (er) {
      setreviewLoading(false);
    }
  };

  //   const checkCourse = async () => {
  //     const user = await StorageBox.retrieveUserData();
  //     try {
  //       const res = await baseService.get(
  //         urls.getCourses + `/${course_id}/users/${user.user_id}`
  //       );

  //       // console.log(res.data?.data);
  //       window.location.href = `/my-course/${courseid}`;
  //       // setVideos(res.data?.data?.videos[keys[0]]);

  //       // console.log(keys);
  //       // console.log(res.data?.data?.videos[keys[0]]);
  //     } catch (error) {
  //       // console.log(error.response?.data?.message);
  //     }
  //   };

  const [completed, setCompleted] = useState<boolean>(false);
  //   const checkStatus = async (section_count: number) => {
  //     const result = await is_course_completed(
  //       course_id as string,
  //       section_count
  //     );
  //     // console.log(result);
  //     setCompleted(result);
  //   };

  const [faq, setFaq] = useState([]);
  const [faqLoading, setFaqLoading] = useState(false);
  const getFaq = async () => {
    try {
      setFaqLoading(true);
      const res: any = await baseService.get(urls.faq + `/${course_id}`);
      setFaq(res.data?.payload);
      setFaqLoading(false);
      // console.log(res?.data?.payload);
    } catch (error) {
      console.log(error);
    }
  };

  useLayoutEffect(() => {
    // checkCourse();
    getCourseDetail();
  }, []);

  const [value, setValue] = useState<number>(0);
  return loading ? (
    <LoadingOverLay />
  ) : (
    <>
      <div
        className={`bg-[${theme?.primary_color}] w-full py-6 px-4 flex gap-3`}
      >
        <button onClick={() => navigate(-1)} className="text-white">
          <ChevronLeft />
          {course?.title}
        </button>
      </div>
      <div style={{ minHeight: "100vh" }}>
        <div className="bg-white grid md:grid-cols-12 grid-cols-1 gap-0">
          <div
            className="col-span-9"
            style={{
              backgroundImage: `url(${course.thumbnail})`,
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
            }}
          >
            <CourseMedia
              course_detail={course}
              instructor={instructor}
              loading={loading}
              reviews={review}
            />
          </div>
          <div
            className="col-span-3"
            style={{ maxHeight: "70vh", overflowY: "hidden" }}
          >
            <div className="px-4 py-3 bg-white">
              <p className={`text-[${theme?.primary_color}] text-lg`}>
                Course content
              </p>
            </div>
            <hr className="my-1 mx-5 border-t border-blue-400" />
            <div className="px-4 pt-4 pb-2 text-sm text-secondary-500">
              {/* {sections.map((_d: any, i: number) => (
                <SingleSection
                  data={_d}
                  key={i}
                  checkStatus={() => checkStatus(sections.length)}
                />
              ))} */}
            </div>
          </div>
        </div>

        <div>
          <Container fluid>
            <Tabs
              value={value}
              onChange={(e: any, newValue: any) => setValue(newValue)}
            >
              <Tab label="Overview" />
              <Tab label="Reviews" />
              <Tab label="Author" />
              <Tab label="FAQ" />
              <Tab label="Files" />
            </Tabs>
            <div style={{ minHeight: "50vh" }} className="px-1 mt-4">
              {value === 0 ? (
                <OverView
                  data={course}
                  completed={completed}
                  setCompleted={setCompleted}
                />
              ) : null}
              {value === 1 ? (
                <Review data={review} reload={getCourseDetail} />
              ) : null}
              {value === 2 ? (
                <Author instructor={instructor} course_detail={course} />
              ) : null}
              {value === 3 ? <Faq data={faq} /> : null}
              {value === 4 ? <Files course_id={course_id} /> : null}
            </div>
          </Container>
        </div>
      </div>
    </>
  );
}
