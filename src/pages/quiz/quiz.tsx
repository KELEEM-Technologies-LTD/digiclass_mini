import { ChevronLeft } from "@mui/icons-material";
import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  LinearProgress,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import { Fragment, useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { displaySuccess, displayWarning } from "../../components/alert";
import GeneralContext from "../../context/gen";
import urls from "../../core/base.url";
import baseService from "../../core/baseServices";
import { StorageBox } from "../../core/storage";
import { RunCheck } from "./mini-components";
import Swal from "sweetalert2";

export default function Quiz() {
  const { theme, corpid, setCorpId } = useContext(GeneralContext);
  const navigate = useNavigate();
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

  useEffect(() => {
    getQuiz();
  }, []);

  const [loading, setLoading] = useState<boolean>(true);
  const [questions, setQuestions] = useState<any>([]);
  const [result, setResult] = useState<boolean>(false);
  const getQuiz = async () => {
    try {
      const result_payload: any = await baseService.get(
        urls.results + `/${StorageBox.retrieveUserData().user_id}/${course_id}`
      );

      const result_state =
        Object.keys(result_payload.data?.payload)?.length === 0 ? false : true;
      setResult(result_state);

      if (result_state) {
        if (result_payload?.data?.payload?.result_status === "passed") {
          window.location.href = `/certifications/${corp_id}/${course_id}`;
        }
      }

      const res: any = await baseService.get(
        urls.quiz_questions + `/${course_id}`
      );

      //   console.log(res.data?.payload[0]);
      setQuestions(res.data?.payload);

      setLoading(false);
    } catch (error) {}
  };

  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [completed, setCompleted] = useState<any>({});
  const [show, setShow] = useState<boolean>(false);
  const [file, setFile] = useState<any>(null);
  const [loadingQuestionStatus, setLoadingQuestionStatus] =
    useState<boolean>(true);

  const [myAnswer, setMyAnswer] = useState<string>("");
  const [submitting, setSubmitting] = useState<boolean>(false);
  const handleSubmitAnswer = async () => {
    try {
      if (myAnswer === "" && file === null) {
        displayWarning("Please input an answer");
      } else {
        setSubmitting(true);

        let addon = [];

        if (file) {
          //do file upload here
          const data = new FormData();
          data.append("file", file);
          const upload_to_secondary: any = await baseService.post(
            urls.secondary_upload,
            data
          );

          addon = upload_to_secondary?.data?.payload;

          // addon = upload_data?.data;
        }

        const user: any = StorageBox.retrieveUserData();
        const feedback =
          questions[currentQuestion].q_type === "type_a"
            ? myAnswer === questions[currentQuestion].correct_answer
              ? "correct_answer"
              : "wrong_answer"
            : "essay_type";
        // console.log(feedback);
        const data = {
          user_id: user.user_id,
          course_id: course_id,
          question_id: questions[currentQuestion].id,
          answer: JSON.stringify({ answer: myAnswer, attachment: addon }),
          feedback: feedback,
        };
        // console.log(data);
        await baseService.post(urls.quiz_asnwers, data);
        const newCompleted = completed;
        newCompleted[currentQuestion] = true;
        setCompleted(newCompleted);
        setMyAnswer("");
        setSubmitting(false);
        displaySuccess("Answer submitted");
        handleNext();
      }
    } catch (error) {
      console.log(error);
      displayWarning("Error submiting answer, please try again later");
    }
  };

  const handleNext = () => {
    setMyAnswer("");
    setFile(null);
    const total = questions.length;
    const newPage = currentQuestion + 1;
    if (newPage === total) {
      setShow(true);
    } else {
      setCurrentQuestion(newPage);
    }
  };

  const goBack = () => {
    setMyAnswer("");
    setFile(null);
    const newStep = currentQuestion === 0 ? 0 : currentQuestion - 1;
    setCurrentQuestion(newStep);
    setShow(false);
  };
  const initializeGrading = async () => {
    Swal.fire({
      title: "Are you sure?",
      text: "Courses can only be submitted once, are you sure you want to submit your answers to the instructor?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, submit!",
    }).then(async (result: any) => {
      if (result.isConfirmed) {
        setLoading(true);
        try {
          const user: any = StorageBox.retrieveUserData();
          const my_results: any = await baseService.get(
            urls.scores + `/${user.user_id}/${course_id}`
          );

          const my_results_payload = my_results?.data?.payload;

          const obj_score = my_results_payload?.correct_answers;
          const objOnly =
            questions.length === my_results_payload.total_questions;

          const course_configuration: any = await baseService.get(
            urls.getCourses +
              `/${course_id}?query_fields=configurations,instructor,title`
          );

          const passmark = parseInt(
            course_configuration?.data?.data?.configurations?.passmark
          );

          //   console.log(obj_score);
          //   console.log(questions?.length);

          const percentage =
            (parseInt(obj_score) / parseInt(questions?.length)) * 100;

          let resultStats = "pending";
          if (percentage >= passmark) {
            resultStats = "passed";
            await baseService.post(urls.sendEmail, {
              to: user.email,
              subject: `Quiz results, ${course_configuration?.data?.data?.title}`,
              text: `Congratulations, Your results for ${course_configuration?.data?.data?.title} has been submitted. The course was passed, the results are available on your course page`,
            });
          } else if (percentage <= passmark) {
            resultStats = "failed";

            await baseService.post(urls.sendEmail, {
              to: user.email,
              subject: `Quiz results, ${course_configuration?.data?.data?.title}`,
              text: `Your results for ${course_configuration?.data?.data?.title} has been reviewed. The course was failed, please await instructor approval to retake the course`,
            });
          }

          // console.log(resultStats);
          // console.log(percentage);
          // console.log(my_results_payload);
          // console.log(objOnly);
          await baseService.post(urls.results, {
            user_id: user?.user_id,
            course_id: course_id,
            obj_score: obj_score + ` correct MCQ answer(s)`,
            result_status: resultStats,
          });
          // console.log(obj_score);
          // console.log(init);

          await baseService.post(urls.postNotification, {
            target: course_configuration?.data?.data?.instructor,
            heading: `Quiz submission, ${course_configuration?.data?.data?.title}`,
            message: `Quiz submission made for ${course_configuration?.data?.data?.title}, please go to course page to review`,
          });

          //send Email to instructor

          setResult(true);
          setLoading(false);
          Swal.fire("Submitted!", "Course has been submitted.", "success");
        } catch (error) {
          setLoading(false);
          Swal.fire("Submitted!", "Error submitting course", "error");
          console.log(error);
        }
      }
    });
  };

  const setAnswered = () => {
    setLoadingQuestionStatus(true);
    setTimeout(() => {
      const newCompleted = completed;
      newCompleted[currentQuestion] = true;
      setCompleted(newCompleted);
      setLoadingQuestionStatus(false);
    }, 1000);
  };

  return loading ? (
    <Fragment>
      <LinearProgress />
      <div className="text-center">
        <p>Setting up Quiz environment, please wait....</p>
      </div>
    </Fragment>
  ) : result ? (
    <div className="flex items-center justify-center h-screen">
      <div>
        <p className="text-2xl">
          You have completed this quiz, please await instructor's review
        </p>
        <button onClick={() => navigate(-1)}>Go back</button>
      </div>
    </div>
  ) : (
    <Fragment>
      <div
        className={`bg-[${theme?.primary_color}] w-full py-6 px-4 flex gap-3`}
      >
        <button onClick={() => navigate(-1)} className="text-white">
          <ChevronLeft />
        </button>
      </div>
      {submitting ? <LinearProgress /> : null}
      {show ? (
        <div className="flex justify-center mt-7">
          <div className="w-full md:w-1/2 p-3">
            <Typography sx={{ mt: 2, mb: 1 }}>
              All questions have been submitted, hit submit to send all
              questions to admin
            </Typography>
            <p className="mt-2 text-sm text-[red]">
              Courses can only be submitted once, are you sure you want to
              submit your answers to the instructor?
            </p>
            <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
              <Box sx={{ flex: "1 1 auto" }} />
              <Button onClick={goBack}>Go back</Button>
            </Box>

            <Button onClick={initializeGrading}>Complete quiz</Button>
          </div>
        </div>
      ) : (
        <Fragment>
          <RunCheck
            activeStep={currentQuestion}
            questions={questions}
            setAnswered={setAnswered}
            setLoadingQuestionStatus={setLoadingQuestionStatus}
          />

          <div className="flex justify-center mt-7">
            <div className="w-full md:w-1/2 p-3">
              <p className="text-xl">
                Question {`${currentQuestion + 1}/${questions.length}`}
              </p>
              <hr />
              <div className="px-10">
                {questions[currentQuestion]?.q_type === "type_a" ? (
                  <FormControl>
                    <FormLabel id="demo-radio-buttons-group-label">
                      <p className="text-xl bg-[white] p-3 mt-2">
                        {questions[currentQuestion]?.question}
                      </p>
                    </FormLabel>
                    <RadioGroup
                      aria-labelledby="demo-radio-buttons-group-label"
                      name="radio-buttons-group"
                      value={myAnswer}
                      onChange={(e) => setMyAnswer(e.target.value)}
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2  gap-4 justify-end">
                        <div className="p-4 self-end">
                          <FormControlLabel
                            style={{ backgroundColor: "white" }}
                            className={`radioCard ${
                              myAnswer ===
                              questions[currentQuestion]?.answers[0]
                                ? "active"
                                : ""
                            }`}
                            value={questions[currentQuestion]?.answers[0]}
                            control={<Radio />}
                            label={questions[currentQuestion]?.answers[0]}
                          />
                        </div>
                        <div className="p-4 self-end">
                          <FormControlLabel
                            style={{ backgroundColor: "white" }}
                            className={`radioCard ${
                              myAnswer ===
                              questions[currentQuestion]?.answers[1]
                                ? "active"
                                : ""
                            }`}
                            value={questions[currentQuestion]?.answers[1]}
                            control={<Radio />}
                            label={questions[currentQuestion]?.answers[1]}
                          />
                        </div>
                        <div className="p-4 self-end">
                          <FormControlLabel
                            style={{ backgroundColor: "white" }}
                            className={`radioCard ${
                              myAnswer ===
                              questions[currentQuestion]?.answers[2]
                                ? "active"
                                : ""
                            }`}
                            value={questions[currentQuestion]?.answers[2]}
                            control={<Radio />}
                            label={questions[currentQuestion]?.answers[2]}
                          />
                        </div>
                        <div className="p-4 self-end">
                          <FormControlLabel
                            style={{ backgroundColor: "white" }}
                            className={`radioCard ${
                              myAnswer ===
                              questions[currentQuestion]?.answers[3]
                                ? "active"
                                : ""
                            }`}
                            value={questions[currentQuestion]?.answers[3]}
                            control={<Radio />}
                            label={questions[currentQuestion]?.answers[3]}
                          />
                        </div>
                      </div>
                    </RadioGroup>
                  </FormControl>
                ) : (
                  <>
                    <p className="text-2xl  bg-[white] p-3 mt-2">
                      {questions[currentQuestion]?.question}
                    </p>

                    <textarea
                      id="message"
                      rows={10}
                      className="block mt-4 p-2.5 w-full text-sm text-primary-900 bg-primary-100 rounded-lg border border-primary-300 focus:ring-secondary-400 focus:border-secondary-400"
                      placeholder="Type your answer here.."
                      value={myAnswer}
                      onChange={(e) => setMyAnswer(e.target.value)}
                    ></textarea>

                    <input
                      type="file"
                      className="mt-3"
                      onChange={(e: any) => setFile(e.target.files[0])}
                      accept="application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                    />
                  </>
                )}

                <div className="flex justify-between mt-4">
                  <div className="flex space-x-2">
                    <Button
                      disabled={currentQuestion === 0 || submitting}
                      onClick={goBack}
                    >
                      Back
                    </Button>
                    <Button disabled={submitting} onClick={() => setShow(true)}>
                      complete
                    </Button>
                  </div>
                  <div className="flex">
                    <div className="flex flex-col">
                      {!loadingQuestionStatus ? (
                        completed[currentQuestion] ? (
                          <>
                            You have submitted answers to this question
                            <Button
                              disabled={submitting}
                              onClick={handleSubmitAnswer}
                            >
                              Resumbmit
                            </Button>
                          </>
                        ) : null
                      ) : (
                        <Button
                          disabled={submitting}
                          onClick={handleSubmitAnswer}
                        >
                          Submit
                        </Button>
                      )}
                    </div>
                    <Button disabled={submitting} onClick={handleNext}>
                      Skip
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
}
