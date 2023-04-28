import {
  ChevronLeft,
  PhotoSizeSelectSmall,
  PlayCircleOutline,
} from "@mui/icons-material";
import { Tab, Tabs } from "@mui/material";
import { Fragment, useContext, useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import ReactPlayer from "react-player";
import { Link, useNavigate, useParams } from "react-router-dom";
import LoadingOverLay from "../../components/loader";
import GeneralContext from "../../context/gen";
import urls from "../../core/base.url";
import baseService from "../../core/baseServices";
import { StorageBox } from "../../core/storage";
import Faq from "../course/components/faq";
import OverView from "../course/components/overview";
import Review from "../course/components/reviews";
import SingleSection from "../course/components/sections";
import { is_course_completed } from "./section_helper";
import Files from "./components/Files";

export default function PaidCourse() {
  const { current, theme, setCurrent, player, setPlayer, corpid, setCorpId } =
    useContext(GeneralContext);
  const { corp_id, course_id } = useParams();
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

  const [loading, setLoading] = useState<boolean>(true);
  const [courseDetail, setCourseDetail] = useState<any>([]);
  const [reviews, setReviews] = useState<any>([]);
  const [videos, setVideos] = useState<any>([]);
  const [sections, setSections] = useState<any>([]);
  const [faq, setFaq] = useState<any>([]);
  const getData = async () => {
    try {
      const course_data: any = await baseService.get(
        urls.getCourses +
          `/${course_id}?query_fields=title,status,about,caption,short_description,description,about,skill_level,language,price,caption,instructor,configurations,certificate,contract_percentage,status,view_status,updatedAt,thumbnail`
      );
      //   console.log(course_data.data?.data);
      setCourseDetail(course_data.data?.data);

      const course_reviews: any = await baseService.get(
        urls.getReviews + `?course_id=${course_id}`
      );
      //   console.log(course_reviews.data?.data?.data);
      setReviews(course_reviews.data?.data?.data);

      const user: any = StorageBox.retrieveUserData();
      const videos_section: any = await baseService.get(
        urls.getCourses + `/${course_id}/users/${user.user_id}`
      );
      //   console.log(videos_section.data?.data);
      let vid = videos_section.data?.data?.videos;
      let sec = videos_section.data?.data?.sections;
      setVideos(vid);
      setSections(sec);

      const current = {
        url: vid[sec[0]?.section_id][0].url,
        section_name: sec[0]?.name,
        course_id: course_id,
        paid: true,
      };

      setCurrent(current);
      setPlayer(false);

      const course_faq: any = await baseService.get(urls.faq + `/${course_id}`);
      setFaq(course_faq.data?.payload);

      setLoading(false);
    } catch (error: any) {
      console.log(error);
    }
  };
  useEffect(() => {
    getData();
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
    console.log(result);
    setCompleted(result);
  };

  const [value, setValue] = useState<number>(0);
  const navigate = useNavigate();
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
          {courseDetail?.title}
        </button>
      </div>

      <div style={{ minHeight: "100vh" }}>
        <div className="flex flex-wrap">
          {/* Vidoe Player  */}
          <div className="w-full md:w-8/12">
            {completed ? (
              <Fragment>
                <div className="w-full h-[60vh] flex items-center justify-center">
                  {courseDetail.configurations?.quiz_required ? (
                    <div>
                      <p>
                        You have completed {courseDetail?.title} please take a
                        quiz now
                      </p>
                      <div className="mt-2 flex justify-between">
                        <button
                          // to="#"
                          className="ml-8 inline-flex items-center justify-center whitespace-nowrap rounded-2 border border-transparent bg-[#f54242] px-10 py-2 text-base font-medium text-white shadow-xl hover:bg-[#e87979]"
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
                      <div className="mt-2 flex justify-between">
                        <button
                          // to="#"
                          className="ml-8 inline-flex items-center justify-center whitespace-nowrap rounded-2 border border-transparent bg-[#f54242] px-10 py-2 text-base font-medium text-white shadow-xl hover:bg-[#e87979]"
                          onClick={() => setCompleted(false)}
                        >
                          Continue watching
                        </button>
                        <button
                          onClick={() =>
                            navigate(
                              `/certifications/${courseDetail.course_id}`
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
                  light={courseDetail?.thumbnail}
                  playIcon={
                    <PlayCircleOutline
                      className="w-20 h-20 my-40"
                      style={{ color: "white" }}
                    />
                  }
                  config={{
                    file: {
                      attributes: {
                        controlsList: "nodownload",
                      },
                    },
                  }}
                />
                <PhotoSizeSelectSmall
                  style={{ color: theme?.primary_color, cursor: "pointer" }}
                  onClick={() => setPlayer(true)}
                />
              </Fragment>
            )}
          </div>
          <div className="w-full md:w-4/12">
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
        <Container fluid>
          <Tabs
            value={value}
            onChange={(e: any, newValue: any) => setValue(newValue)}
          >
            <Tab label="Overview" />
            <Tab label="Reviews" />
            <Tab label="FAQ" />
            <Tab label="Files" />
          </Tabs>
          <div style={{ minHeight: "50vh" }} className="px-5 mt-4">
            {value === 0 ? <OverView data={courseDetail} /> : null}
            {value === 1 ? <Review data={reviews} reload={getData} /> : null}
            {value === 2 ? <Faq data={faq} /> : null}
            {value === 3 ? <Files course_id={course_id} /> : null}
          </div>
        </Container>
      </div>
    </>
  );
}
