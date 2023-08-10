import { FolderMinusIcon, TagIcon } from "@heroicons/react/20/solid";
import { Search } from "@mui/icons-material";
import { Pagination } from "@mui/material";
import { Fragment, useContext, useEffect, useState } from "react";
import { Col, Container, Row, Spinner } from "react-bootstrap";
import { useParams } from "react-router-dom";
import CourseCard from "../components/course_card";
import LoadingOverLay from "../components/loader";
import NavBar from "../components/navbar";
import GeneralContext from "../context/gen";
import urls from "../core/base.url";
import baseService from "../core/baseServices";
import { StorageBox } from "../core/storage";

export default function Home() {
  const {
    loading,
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
        const response: any = await baseService.get(
          urls.site_configurations + `/get/top-categories`
        );
        const payload = JSON.parse(response.data?.payload);
        setCategories(payload);
        console.log(payload);

        // const res: any = await baseService.get(urls.categories + `?size=6`);
        // setCategories(res.data?.data?.data);
        // console.log(res.data?.data?.data);
      } catch (error) {}
    };
    get_categories();

    // console.log("lol");
  }, []);

  const filterTabCategory = (cat: string, name: string) => {
    if (cat === "all-unfiltered") {
      setCurrentCategory("");
      setQuery("");
    } else {
      setCurrentCategory(cat);
      setQuery(name);
      const filteredCourses = courses.filter(
        (course: any) => course.category === cat
      );
      setResults(filteredCourses);
    }
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
      <div className="flex flex-col md:flex-row justify-between my-2">
        <div className="text-center">
          <div className="relative inline-flex">
            <select
              className="block appearance-none w-full py-2 px-4 pr-8 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                filterTabCategory(e.target.value, "filter by category")
              }
            >
              <option value="all-unfiltered">All categories</option>
              {categories?.map((_d: any, i: number) => {
                return (
                  <option
                    key={i}
                    onChange={() => {
                      filterTabCategory(_d.category_id, _d.name);
                      // console.log(_d.category_id, _d.name);
                    }}
                    value={_d.value}
                  >
                    {_d.label}
                  </option>
                );
              })}
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
              <TagIcon className="h-4 w-4 text-gray-400" />
            </div>
          </div>
          <div className="relative inline-flex">
            <select
              className="block appearance-none w-full py-2 px-4 pr-8 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                setTab(parseInt(e.target.value));
                filterTab(parseInt(e.target.value));
              }}
            >
              {tabs.map((_d, i) => (
                <option key={i} value={i}>
                  {_d}
                </option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
              <FolderMinusIcon className="h-4 w-4 text-gray-400" />
            </div>
          </div>
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
