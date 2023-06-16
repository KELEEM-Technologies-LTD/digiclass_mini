import { ChevronLeft, PhotoSizeSelectSmall } from "@mui/icons-material";
import { Tab, Tabs } from "@mui/material";
import { Fragment, useContext, useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import ReactPlayer from "react-player";
import { useNavigate, useParams } from "react-router-dom";
import LoadingOverLay from "../../components/loader";
import GeneralContext from "../../context/gen";
import urls from "../../core/base.url";
import baseService from "../../core/baseServices";
import { StorageBox } from "../../core/storage";
import Files from "../my-course/components/Files";
import { is_course_completed } from "../my-course/section_helper";
import Faq from "./components/faq";
import OverView from "./components/overview";
import Review from "./components/reviews";
import SingleSection from "./components/sections";
import moment from "moment";
import Author from "./components/author";
import { displayWarning } from "../../components/alert";

export default function COurse() {
  const { course_id } = useParams();
  const { current, theme, setCurrent, player, setPlayer, corpid, setCorpId } =
    useContext(GeneralContext);
  const navigate = useNavigate();
  const [playing, setPlaying] = useState(false);

  const [loading, setLoading] = useState<boolean>(true);
  const [courseDetail, setCourseDetail] = useState<any>([]);
  const [sections, setSections] = useState<any>([]);
  const [course, setCourse] = useState<any>([]);

  const { corp_id } = useParams();
  useEffect(() => {
    if (StorageBox.retrieveUserData().corporate_id !== corp_id) {
      // console.log("Logout and ");
      StorageBox.clearStorage();
      window.location.href = `/sign-in/${corp_id}`;
    }
    if (corpid === "") {
      setCorpId(corp_id);
    }
  }, []);

  const [reviews, setReviews] = useState<any>([]);
  const [faq, setFaq] = useState<any>([]);
  const [instructor, setInstructor] = useState([]);

  const [graded, setGraded] = useState(false);
  const [grade_message, setGrade_message] = useState(<></>);
  const getDetails = async () => {
    try {
      const course_data: any = await baseService.get(
        urls.getCourses +
          `/${course_id}?query_fields=title,status,about,caption,short_description,description,about,skill_level,language,price,caption,instructor,configurations,certificate,contract_percentage,status,view_status,updatedAt,thumbnail`
      );
      //   console.log(course_data.data?.data);
      setCourseDetail(course_data.data?.data);

      try {
        const instructor_res: any = await baseService.get(
          urls.getUser + `/${course_data?.data?.data?.instructor}`
        );
        setInstructor(instructor_res.data?.data);
      } catch (error: any) {
        console.log(error);
        displayWarning(error.response?.data?.message);
        navigate(-1);
      }

      const res: any = await baseService.get(urls.get_single + `/${course_id}`);
      // console.log(res.data);
      setCourse(res.data?.payload?.details);
      setSections(res.data?.payload?.sections);
      const current = {
        url: res.data?.payload?.sections[0]?.url,
        section_name: res.data?.payload?.sections[0]?.name,
        course_id: course_id,
      };
      setCurrent(current);
      setPlayer(false);

      if (res.data?.payload?.details?.configurations?.quiz_required) {
        const user: any = StorageBox.retrieveUserData();

        const res_result: any = await baseService.get(
          urls.results + `/${user?.user_id}/${course_id}`
        );

        const result_status = res_result.data?.payload?.result_status;
        if (result_status === "passed") {
          setGraded(true);
          setGrade_message(
            <Container>
              <p>
                You have completed {course_data.data?.data?.title} your
                certificate is ready here
              </p>
              <div className="mt-2 flex flex-col md:flex-row p-2 justify-between">
                <button
                  // to="#"
                  className="ml-8 inline-flex items-center justify-center whitespace-nowrap rounded-2 border border-transparent bg-[#f54242] px-10 py-2 text-base font-medium text-white shadow-xl hover:bg-[#e87979] mb-2"
                  onClick={() => {
                    setCompleted(false);
                    setGraded(false);
                  }}
                >
                  Continue watching
                </button>
                <button
                  onClick={() =>
                    navigate(
                      `/certifications/${corp_id}/${course_data.data?.data.course_id}`
                    )
                  }
                  className={`ml-8 inline-flex items-center justify-center whitespace-nowrap rounded-2 border border-transparent bg-[${theme?.primary_color}] px-5 py-2 text-base font-medium text-white shadow-xl w-10 hover:bg-secondary-800`}
                >
                  Certificate
                </button>
              </div>
            </Container>
          );
        } else if (result_status === "pending") {
          setGraded(true);
          setGrade_message(
            <Container>
              <p>Quiz submitted, please await instructor review</p>
              <div className="mt-2 flex flex-col md:flex-row p-2 justify-between">
                <button
                  // to="#"
                  className="ml-8 inline-flex items-center justify-center whitespace-nowrap rounded-2 border border-transparent bg-[#f54242] px-10 py-2 text-base font-medium text-white shadow-xl hover:bg-[#e87979] mb-2"
                  onClick={() => {
                    setCompleted(false);
                    setGraded(false);
                  }}
                >
                  Continue watching
                </button>
              </div>
            </Container>
          );
        } else if (result_status === "failed") {
          const timeFromDB = res_result.data?.payload?.date_added;
          const reseatDays = parseInt(
            course_data.data?.data?.configurations?.reseat
          );
          const futureDate = moment(timeFromDB).add(reseatDays, "days");
          const newTimestamp = futureDate.format();

          if (moment().isAfter(futureDate)) {
            console.log("time expired");
            await baseService.put(
              urls.request_reseat + `/${user?.user_id}/${course_id}`,
              {}
            );
            window.location.reload();
          }

          setGraded(true);
          setGrade_message(
            <Container>
              <p className="p-4">
                You have completed {course_data.data?.data?.title}, however you
                did no meet the course requirements for a pass, contact
                instructor to schedule a retake of the quiz <br />
                Quiz would be available on{" "}
                {moment(newTimestamp).format("Do MMMM YYYY, HH:MM:SS")}
              </p>
              <div className="mt-2 flex flex-col md:flex-row p-2 justify-between">
                <button
                  // to="#"
                  className="ml-8 inline-flex items-center justify-center whitespace-nowrap rounded-2 border border-transparent bg-[#f54242] px-10 py-2 text-base font-medium text-white shadow-xl hover:bg-[#e87979] mb-2"
                  onClick={() => {
                    setCompleted(false);
                    setGraded(false);
                  }}
                >
                  Continue watching
                </button>
              </div>
            </Container>
          );
        }
      }

      const course_reviews: any = await baseService.get(
        urls.getReviews + `?course_id=${course_id}`
      );
      //   console.log(course_reviews.data?.data?.data);
      setReviews(course_reviews.data?.data?.data);

      const course_faq: any = await baseService.get(urls.faq + `/${course_id}`);
      setFaq(course_faq.data?.payload);

      setLoading(false);
    } catch (error) {
      // console.log(error);
      navigate(`/home/${corp_id}`);
    }
  };

  useEffect(() => {
    getDetails();
  }, []);

  useEffect(() => {
    checkStatus(sections.length);
  }, [sections]);

  const [completed, setCompleted] = useState<boolean>(false);
  const checkStatus = async (section_count: number) => {
    const result = await is_course_completed(
      course_id as string,
      section_count
    );
    // console.log(result);
    setCompleted(result);
  };

  const [value, setValue] = useState<number>(0);
  return loading ? (
    <LoadingOverLay />
  ) : (
    <>
      {/* <NavBar /> */}
      <div
        className={`bg-[${theme?.primary_color}] w-full py-6 px-4 flex gap-3`}
      >
        <button onClick={() => navigate(-1)} className="text-white">
          <ChevronLeft />
          {course?.title}
        </button>
      </div>
      <div style={{ minHeight: "100vh" }}>
        <div className="flex flex-wrap">
          <div className="w-full md:w-8/12 border">
            {graded ? (
              <div className="w-full h-[60vh] flex items-center justify-center">
                {grade_message}
              </div>
            ) : completed ? (
              <Fragment>
                <div className="w-full h-[60vh] flex items-center justify-center">
                  {courseDetail.configurations?.quiz_required ? (
                    <div>
                      <p>
                        You have completed {courseDetail?.title} please take a
                        quiz now
                      </p>
                      <div className="mt-2 flex flex-col md:flex-row p-2 justify-between">
                        <button
                          // to="#"
                          className="ml-8 inline-flex items-center justify-center whitespace-nowrap rounded-2 border border-transparent bg-[#f54242] px-10 py-2 text-base font-medium text-white shadow-xl hover:bg-[#e87979] mb-2"
                          onClick={() => setCompleted(false)}
                        >
                          Continue watching
                        </button>
                        <button
                          onClick={() =>
                            navigate(`/start-quiz/${corp_id}/${course_id}`)
                          }
                          className={`ml-8 inline-flex items-center justify-center whitespace-nowrap rounded-2 border border-transparent bg-[${theme?.primary_color}] px-5 py-2 text-base font-medium text-white shadow-xl w-10 hover:bg-secondary-800`}
                        >
                          Start quiz
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <p>
                        You have completed {courseDetail?.title} your
                        certificate is ready here
                      </p>
                      <div className="mt-2 flex flex-col md:flex-row p-2 justify-between">
                        <button
                          // to="#"
                          className="ml-8 inline-flex items-center justify-center whitespace-nowrap rounded-2 border border-transparent bg-[#f54242] px-10 py-2 text-base font-medium text-white shadow-xl hover:bg-[#e87979] mb-2"
                          onClick={() => setCompleted(false)}
                        >
                          Continue watching
                        </button>
                        <button
                          onClick={() =>
                            navigate(
                              `/certifications/${corp_id}/${courseDetail.course_id}`
                            )
                          }
                          className={`ml-8 inline-flex items-center justify-center whitespace-nowrap rounded-2 border border-transparent bg-[${theme?.primary_color}] px-5 py-2 text-base font-medium text-white shadow-xl w-10 hover:bg-secondary-800`}
                        >
                          Certificate
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </Fragment>
            ) : (
              <Fragment>
                <ReactPlayer
                  width="100%"
                  height="70vh"
                  url={current?.url}
                  playing={false}
                  controls={true}
                />
                <PhotoSizeSelectSmall
                  style={{ color: theme?.primary_color, cursor: "pointer" }}
                  onClick={() => setPlayer(true)}
                />
              </Fragment>
            )}
          </div>
          <div className="w-full md:w-4/12 border">
            <div className="px-4 py-3 bg-white">
              <p className={`text-[${theme?.primary_color}] text-lg`}>
                Course content
              </p>
            </div>
            <hr className="my-1 mx-5 border-t border-blue-400" />
            <div className="px-4 pt-4 pb-2 text-sm text-secondary-500">
              {sections.map((_d: any, i: number) => (
                <SingleSection
                  data={_d}
                  key={i}
                  checkStatus={() => checkStatus(sections.length)}
                />
              ))}
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
                <Review data={reviews} reload={getDetails} />
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
{
  /* {value === 2 ? <>Author</> : null} */
}
