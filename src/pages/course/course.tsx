import { ChevronLeft, PhotoSizeSelectSmall } from "@mui/icons-material";
import { Tab, Tabs } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import ReactPlayer from "react-player";
import { useNavigate, useParams } from "react-router-dom";
import LoadingOverLay from "../../components/loader";
import NavBar from "../../components/navbar";
import GeneralContext from "../../context/gen";
import urls from "../../core/base.url";
import baseService from "../../core/baseServices";
import { StorageBox } from "../../core/storage";
import OverView from "./components/overview";
import SingleSection from "./components/sections";
import Review from "./components/reviews";
import Faq from "./components/faq";

export default function COurse() {
  const { course_id } = useParams();
  const { current, theme, setCurrent, player, setPlayer, corpid, setCorpId } =
    useContext(GeneralContext);
  const navigate = useNavigate();
  const [playing, setPlaying] = useState(false);

  const [loading, setLoading] = useState<boolean>(true);
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
  const getDetails = async () => {
    try {
      const res: any = await baseService.get(urls.get_single + `/${course_id}`);
      console.log(res.data);
      setCourse(res.data?.payload?.details);
      setSections(res.data?.payload?.sections);
      const current = {
        url: res.data?.payload?.sections[0]?.url,
        section_name: res.data?.payload?.sections[0]?.name,
        course_id: course_id,
      };
      setCurrent(current);
      setPlayer(false);

      const course_reviews: any = await baseService.get(
        urls.getReviews + `?course_id=${course_id}`
      );
      //   console.log(course_reviews.data?.data?.data);
      setReviews(course_reviews.data?.data?.data);

      const course_faq: any = await baseService.get(urls.faq + `/${course_id}`);
      setFaq(course_faq.data?.payload);

      setLoading(false);
    } catch (error) {
      console.log(error);
      navigate(`/home/${corp_id}`);
    }
  };

  useEffect(() => {
    getDetails();
  }, []);

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
          <div className="w-full md:w-8/12">
            {/* <div className="flex"> */}
            <ReactPlayer
              width="100%"
              height="70vh"
              url={
                current?.url ?? "https://www.youtube.com/watch?v=TiT-jxk21Yg"
              }
              playing={!player}
              controls={true}
            />
            <PhotoSizeSelectSmall
              style={{ color: theme?.primary_color, cursor: "pointer" }}
              onClick={() => setPlayer(true)}
            />
            {/* </div> */}
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
                <SingleSection data={_d} key={i} />
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
            {value === 0 ? <OverView data={course} /> : null}
            {value === 1 ? <Review data={reviews} reload={getDetails} /> : null}
            {/* {value === 2 ? <>Author</> : null} */}
            {value === 2 ? <Faq data={faq} /> : null}
            {value === 3 ? <>Files</> : null}
          </div>
        </Container>
      </div>
    </>
  );
}
