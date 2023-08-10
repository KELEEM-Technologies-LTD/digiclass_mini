import { ChevronLeft } from "@mui/icons-material";
import { Tab, Tabs } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { displayWarning } from "../../components/alert";
import LoadingOverLay from "../../components/loader";
import GeneralContext from "../../context/gen";
import urls from "../../core/base.url";
import baseService from "../../core/baseServices";
import Files from "../my-course/components/Files";
import Author from "./components/author";
import CourseMedia from "./components/course_media";
import Faq from "./components/faq";
import OverView from "./components/overview";
import Review from "./components/reviews";

export default function PaidCourse() {
  const navigate = useNavigate();
  const { course_id, corp_id } = useParams();
  const { theme } = useContext(GeneralContext);

  const [loading, setLoading] = useState(false);
  const [course, setCourse] = useState<any>([]);
  const [instructor, setInstructor] = useState([]);
  const [review, setReviews] = useState([]);
  const [faq, setFaq] = useState([]);

  const getCourseDetail = async () => {
    setLoading(true);

    try {
      const course_data: any = await baseService.get(
        urls.getCourses +
          `/${course_id}?query_fields=title,status,about,caption,short_description,description,about,skill_level,language,price,caption,instructor,configurations,certificate,contract_percentage,status,view_status,updatedAt,thumbnail`
      );
      setCourse(course_data.data?.data);

      const instructor_res: any = await baseService.get(
        urls.getUser + `/${course_data?.data?.data?.instructor}`
      );
      setInstructor(instructor_res.data?.data);

      const course_reviews: any = await baseService.get(
        urls.getReviews + `?course_id=${course_id}`
      );
      setReviews(course_reviews.data?.data?.data);

      const res: any = await baseService.get(urls.faq + `/${course_id}`);
      setFaq(res.data?.payload);

      setLoading(false);
    } catch (err: any) {
      setLoading(true);
      displayWarning(err.response?.data?.message);
      navigate(-1);
    }
  };

  useEffect(() => {
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
            <div className="px-4 pt-4 pb-2 text-sm text-secondary-500"></div>
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
                  completed={false}
                  setCompleted={() => {}}
                />
              ) : null}
              {value === 1 ? (
                <Review
                  data={review}
                  reload={getCourseDetail}
                  hideForm={true}
                />
              ) : null}
              {value === 2 ? (
                <Author
                  hideMessage={true}
                  instructor={instructor}
                  course_detail={course}
                />
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
