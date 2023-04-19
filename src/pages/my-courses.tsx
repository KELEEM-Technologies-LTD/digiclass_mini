import React, { useContext, useEffect, useState } from "react";
import GeneralContext from "../context/gen";
import LoadingOverLay from "../components/loader";
import NavBar from "../components/navbar";
import { useNavigate, useParams } from "react-router-dom";
import { StorageBox } from "../core/storage";
import { Container } from "react-bootstrap";
import {
  Card,
  CardContent,
  Grid,
  LinearProgress,
  Typography,
} from "@mui/material";
import { ArrowRight } from "@mui/icons-material";
import baseService from "../core/baseServices";
import urls from "../core/base.url";

export default function MyCourse() {
  const { loading, theme, corpid, setCorpId, myCourseLoading, myCourse } =
    useContext(GeneralContext);

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

  const styles = {
    root: {
      padding: 16,
    },
    title: {
      fontSize: 32,
      fontWeight: "bold",
      marginBottom: 24,
    },
    courseCard: {
      cursor: "pointer",
      transition: "transform 0.3s ease-in-out",
      "&:hover": {
        transform: "translateY(-2px)",
      },
    },
    courseCardContent: {
      display: "flex",
      flexDirection: "column",
      height: "100%",
    },
    courseImage: {
      marginBottom: 16,
    },
    courseTitle: {
      fontSize: 24,
      fontWeight: "bold",
    },
    courseInstructor: {
      color: "#6B7280",
    },
    courseDescription: {
      marginTop: "auto",
    },
    courseButton: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      marginTop: 16,
      backgroundColor: "#3B82F6",
      color: "#FFFFFF",
      borderRadius: 4,
      padding: "8px 16px",
      transition: "background-color 0.3s ease-in-out",
      "&:hover": {
        backgroundColor: "#2563EB",
      },
    },
  };

  return loading ? (
    <LoadingOverLay />
  ) : (
    <>
      <NavBar />
      {myCourseLoading ? (
        <LinearProgress
          sx={{
            "& .MuiLinearProgress-bar": {
              backgroundColor: theme?.primary_color,
            },
          }}
        />
      ) : (
        <Container fluid>
          <div className="flex flex-col font-serif">
            {/* main content */}
            <div className="mt-12 md:px-16 px-3">
              <div style={styles.root}>
                <Typography style={styles.title}>My Courses</Typography>
                <Grid container spacing={4}>
                  {myCourse.length === 0 ? (
                    <>
                      <Grid item md={12}>
                        <Typography
                          style={styles.courseTitle}
                          className="text-center"
                        >
                          You have not purchased any course from DigiClass
                        </Typography>
                      </Grid>
                    </>
                  ) : (
                    myCourse.map((course: any, index: number) => (
                      <Grid item xs={12} sm={6} md={4} key={index}>
                        <PaidCourseCard course={course} corp_id={corp_id} />
                      </Grid>
                    ))
                  )}
                </Grid>
              </div>
            </div>
          </div>
        </Container>
      )}
    </>
  );
}

const PaidCourseCard = (props: { course: any; corp_id: any }) => {
  const { course, corp_id } = props;
  const navigate = useNavigate();
  const [completed, setCompleted] = useState<number>(0);
  const [total, setTotal] = useState<number>(0);

  useEffect(() => {
    // console.log(course);
    getCourseSections();
    getCourseProgress();
  }, []);

  const getCourseSections = async () => {
    const course_id = course.course_id;
    const user: any = StorageBox.retrieveUserData();
    try {
      const res: any = await baseService.get(
        urls.getCourses + `/${course_id}/users/${user.user_id}`
      );

      // console.log(res.data?.data?.sections?.length);
      setTotal(res.data?.data?.sections?.length);
    } catch (error) {
      // console.log(error);
    }
  };

  const getCourseProgress = async () => {
    const user: any = StorageBox.retrieveUserData();
    const course_id = course.course_id;
    const user_id = user.user_id;

    try {
      const res: any = await baseService.get(
        urls.getAllCompletedSections + `/${user_id}/${course_id}`
      );
      // console.log(res.data.payload?.length);
      setCompleted(res.data?.payload?.length);
    } catch (error) {
      // console.log(error);
    }
  };

  const styles = {
    root: {
      padding: 16,
    },
    title: {
      fontSize: 32,
      fontWeight: "bold",
      marginBottom: 24,
    },
    courseCard: {
      cursor: "pointer",
      transition: "transform 0.3s ease-in-out",
      // maxHeight: "520px",
      minHeight: "520px",
      "&:hover": {
        transform: "translateY(-2px)",
      },
    },
    courseCardContent: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      minHeight: "520px",
    },
    courseImage: {
      marginBottom: 16,
    },
    courseTitle: {
      fontSize: 18,
      fontWeight: "bold",
    },
    courseInstructor: {
      color: "#6B7280",
    },
    courseDescription: {
      marginTop: "auto",
    },
    courseButton: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      marginTop: 16,
      backgroundColor: "#3B82F6",
      color: "#FFFFFF",
      borderRadius: 4,
      padding: "8px 16px",
      transition: "background-color 0.3s ease-in-out",
      "&:hover": {
        backgroundColor: "#2563EB",
      },
    },
  };

  // console.log(course);
  return (
    <Card style={styles.courseCard} onClick={() => {}}>
      <CardContent
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          minHeight: "520px",
        }}
      >
        <img
          src={course.thumbnail}
          alt={course.title}
          style={styles.courseImage}
        />
        <Typography style={styles.courseTitle}>{course.title}</Typography>
        <Typography style={styles.courseInstructor}>
          {/* Instructor: <InstructorName instructor={course.instructor} /> <br /> */}
          Language: {course.language} <br />
          Skill Level: {course.skill_level}
        </Typography>
        {/* {completed} / {total} */}
        <ProgressBar total={total} completed={completed} />
        <Typography style={styles.courseDescription}>
          {course.short_description}
        </Typography>
        <div
          className="mt-auto"
          style={styles.courseButton}
          onClick={() => navigate(`/my-course/${course.course_id}/${corp_id}`)}
        >
          View Course <ArrowRight />
        </div>
      </CardContent>
    </Card>
  );
};

const ProgressBar = (props: { total: number; completed: number }) => {
  const { total, completed } = props;
  const percentage: number = Math.floor((completed / total) * 100);
  const { theme } = useContext(GeneralContext);

  return (
    <div className="relative mt-2 pt-1">
      <div
        className={`overflow-hidden h-2 mb-1 text-xs flex rounded bg-[${theme?.primary_color}]`}
      >
        <div
          style={{ width: `${percentage ? percentage : 0}%` }}
          className={`shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-[${theme?.primary_color}]`}
        />
      </div>
      <div className="flex mb-2 items-center justify-between">
        <div>
          <span
            className={`text-xs font-semibold inline-block py-1 px-2 uppercase rounded text-primary-600 bg-[${theme?.primary_color}]`}
          >
            Progress
          </span>
        </div>
        <div
          className={`text-xs font-semibold inline-block text-[${theme?.primary_color}]`}
        >
          {percentage ? percentage : 0}%
        </div>
      </div>
    </div>
  );
};
