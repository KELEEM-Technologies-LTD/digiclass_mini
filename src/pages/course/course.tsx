import { PhotoSizeSelectSmall } from "@mui/icons-material";
import { SetStateAction, useContext, useEffect, useState } from "react";
import { Col, Container, Nav, Row } from "react-bootstrap";
import ReactPlayer from "react-player";
import { useNavigate, useParams } from "react-router-dom";
import LoadingOverLay from "../../components/loader";
import NavBar from "../../components/navbar";
import GeneralContext from "../../context/gen";
import urls from "../../core/base.url";
import baseService from "../../core/baseServices";
import SingleSection from "./components/sections";
import { StorageBox } from "../../core/storage";
import { Box, Tab, Tabs } from "@mui/material";
import OverView from "./components/overview";

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

  const getDetails = async () => {
    if (current?.course_id === course_id) {
      setPlayer(false);
    }
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

      setLoading(false);
    } catch (error) {
      // console.log(error);
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
                playing={!player}
                controls={true}
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
              <SingleSection data={_d} key={i} />
            ))}
          </Col>
        </Row>
        <Tabs
          value={value}
          onChange={(e: any, newValue: any) => setValue(newValue)}
        >
          <Tab label="Overview" />
          <Tab label="Reviews" />
          <Tab label="Author" />
          <Tab label="FAQ" />
          <Tab label="Quiz" />
          <Tab label="Files" />
        </Tabs>
        <div style={{ minHeight: "50vh" }} className="px-5 mt-4">
          {value === 0 ? <OverView data={course} /> : null}
          {value === 1 ? <>Reviews</> : null}
          {value === 2 ? <>Author</> : null}
          {value === 3 ? <>FAQ</> : null}
          {value === 4 ? <>Quiz</> : null}
          {value === 5 ? <>Files</> : null}
        </div>
      </Container>
    </>
  );
}
