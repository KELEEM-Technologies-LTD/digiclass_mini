import { useContext, useEffect, useState } from "react";
import GeneralContext from "../../context/gen";
import { StorageBox } from "../../core/storage";
import { useParams } from "react-router-dom";
import LoadingOverLay from "../../components/loader";
import baseService from "../../core/baseServices";
import urls from "../../core/base.url";
import NavBar from "../../components/navbar";
import { Col, Container, Row } from "react-bootstrap";
import ReactPlayer from "react-player";
import { PhotoSizeSelectSmall, PlayCircleOutline } from "@mui/icons-material";
import SingleSection from "../course/components/sections";
import { Tab, Tabs } from "@mui/material";
import OverView from "../course/components/overview";
import SinglePaidSection from "./components/section-paid";
import Review from "../course/components/reviews";
import Faq from "../course/components/faq";

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
      console.log(error.response);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const [value, setValue] = useState<number>(0);

  return loading ? (
    <LoadingOverLay />
  ) : (
    <>
      <NavBar />
      <Container fluid>
        <Row className="mt-3">
          <Col md={8}>
            <div className="d-flex">
              <ReactPlayer
                width="100%"
                height="70vh"
                url={
                  current?.url ?? "https://www.youtube.com/watch?v=TiT-jxk21Yg"
                }
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
            </div>
          </Col>
          <Col md={4}>
            <div className="text-center">
              <h5 style={{ color: theme?.primary_color }}>Course Content</h5>
            </div>
            {sections.map((_d: any, i: number) => (
              <SinglePaidSection key={i} videos={videos} sections={_d} />
            ))}
          </Col>
        </Row>
        <Tabs
          value={value}
          onChange={(e: any, newValue: any) => setValue(newValue)}
        >
          <Tab label="Overview" />
          <Tab label="Reviews" />
          {/* <Tab label="Author" /> */}
          <Tab label="FAQ" />
          <Tab label="Quiz" />
          <Tab label="Files" />
        </Tabs>
        <div style={{ minHeight: "50vh" }} className="px-5 mt-4">
          {value === 0 ? <OverView data={courseDetail} /> : null}
          {value === 1 ? <Review data={reviews} reload={getData} /> : null}
          {/* {value === 2 ? <>Author</> : null} */}
          {value === 2 ? <Faq data={faq} /> : null}
          {value === 3 ? <>Quiz</> : null}
          {value === 4 ? <>Files</> : null}
        </div>
      </Container>
    </>
  );
}
