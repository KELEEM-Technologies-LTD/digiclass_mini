import { Search } from "@mui/icons-material";
import { Pagination } from "@mui/material";
import { Fragment, useContext, useEffect, useState } from "react";
import { ButtonGroup, Col, Container, Row, Spinner } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import CourseCard from "../components/course_card";
import LoadingOverLay from "../components/loader";
import NavBar from "../components/navbar";
import GeneralContext from "../context/gen";
import { StorageBox } from "../core/storage";
import baseService from "../core/baseServices";
import urls from "../core/base.url";

export default function Home() {
  const navigate = useNavigate();
  const {
    loading,
    user,
    courseLoading,
    courses,
    corpid,
    setCorpId,
    theme,
    hiddenCourses,
    hiddenLoading,
  } = useContext(GeneralContext);

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

  const [query, setQuery] = useState<string>("");
  const [results, setResults] = useState<any>([]);
  const handleInputChange = (event: any) => {
    setQuery(event.target.value);
    const filteredCourses = courses.filter((course: any) =>
      course.title.toLowerCase().includes(event?.target?.value?.toLowerCase())
    );
    // console.log(filteredCourses);
    setResults(filteredCourses);
  };

  const tabs = ["All", "Paid", "Free"];
  const [tab, setTab] = useState<number>(0);
  const filterTab = (current_tab: number) => {
    if (current_tab === 0) {
      setQuery("");
    } else if (current_tab === 1) {
      setQuery(tabs[current_tab]);
      const filteredCourses = courses.filter(
        (course: any) => course.configurations.paid
      );
      setResults(filteredCourses);
    } else if (current_tab === 2) {
      setQuery(tabs[current_tab]);
      const filteredCourses = courses.filter(
        (course: any) => !course.configurations.paid
      );
      setResults(filteredCourses);
    }
  };

  const [categories, setCategories] = useState<any>([]);
  const [currentCategory, setCurrentCategory] = useState<string>("");
  useEffect(() => {
    const get_categories = async () => {
      try {
        const res: any = await baseService.get(urls.categories + `?size=6`);
        setCategories(res.data?.data?.data);
        // console.log(res.data?.data?.data);
      } catch (error) {}
    };
    get_categories();
  }, []);

  const filterTabCategory = (cat: string, name: string) => {
    setCurrentCategory(cat);
    setQuery(name);
    const filteredCourses = courses.filter(
      (course: any) => course.category === cat
    );
    setResults(filteredCourses);
    // console.log(filteredCourses);
  };

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
      <div className="my-2 px-2 md:grid hidden md:grid-cols-8 gap-1">
        {categories?.map((_d: any, i: number) => {
          return (
            <button
              className={
                currentCategory === _d.category_id
                  ? `bg-[${theme?.primary_color}] hover:bg-[${theme?.primary_color}] text-white font-bold py-1 px-2 border border-[${theme?.primary_color}] rounded`
                  : "bg-white hover:bg-gray-100 text-gray-800 font-semibold py-1 px-2 border border-gray-400 rounded shadow"
              }
              key={i}
              onClick={() => filterTabCategory(_d.category_id, _d.name)}
            >
              {_d.name}
            </button>
          );
        })}
      </div>
      <div className="flex flex-col md:flex-row justify-between my-2">
        <div className="text-center">
          <ButtonGroup className="px-3">
            {tabs.map((_d, i) => (
              <button
                key={i}
                type="submit"
                onClick={() => {
                  setTab(i);
                  filterTab(i);
                }}
                className={`${
                  tab === i
                    ? `bg-[${theme?.primary_color}] text-[${theme?.primary_color}] hover:bg-[${theme?.primary_color}] hover:text-white hover:bg-opacity-80  py-2 px-4`
                    : `border-y-[2px] border-x-[1px] border-[${theme?.primary_color}] hover:bg-[${theme?.primary_color}]  hover:text-white py-2 px-4`
                } ${i === 0 ? `rounded-l-lg` : i === 2 ? "rounded-r-lg" : ""}`}
              >
                {_d}
              </button>
            ))}
          </ButtonGroup>
        </div>
        <div className="flex mt-2 md:mt-0 items-center">
          <input
            type="text"
            placeholder="Search..."
            className="py-2 px-4 rounded-l-lg border border-gray-300 focus:outline-none focus:ring focus:border-blue-300 w-64"
            value={query}
            onChange={handleInputChange}
          />
          <button
            type="submit"
            className={`border border-gray-300  hover:bg-[${theme?.primary_color}] hover:bg-opacity-80 text-black py-2 px-4 rounded-r-lg`}
          >
            <Search className="w-6 h-6" />
          </button>
        </div>
      </div>
      <Container className="mt-5" fluid>
        <Row className="mt-3">
          {courseLoading ? (
            <Spinner />
          ) : query ? (
            results.length === 0 ? (
              <p className="p-5">No results found</p>
            ) : (
              results.map((_d: any, i: number) => (
                <CourseCard course={_d} key={i} />
              ))
            )
          ) : (
            courses.map((_d: any, i: number) => (
              <CourseCard course={_d} key={i} />
            ))
          )}
        </Row>
        {courses.length === 0 && results.length === 0 ? (
          <>
            <Row className="text-center mt-5">
              <Col md={{ span: 8, offset: 2 }}>
                <Pagination count={1} variant="outlined" />
              </Col>
            </Row>
          </>
        ) : (
          <></>
        )}
        {hiddenLoading ? null : hiddenCourses.length === 0 ? null : (
          <Fragment>
            <p className="my-3 text-2xl">Courses made available to you</p>
            <Row>
              {hiddenCourses.map((_d: any, i: number) => {
                return <CourseCard course={_d} key={i} />;
              })}
            </Row>
          </Fragment>
        )}
      </Container>
    </>
  );
}
