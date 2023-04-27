import { useEffect } from "react";
import { StorageBox } from "../../core/storage";
import urls from "../../core/base.url";
import baseService from "../../core/baseServices";

export function RunCheck(props: {
  activeStep: any;
  questions: any;
  setAnswered: any;
  setLoadingQuestionStatus: any;
}) {
  const { activeStep, questions, setAnswered, setLoadingQuestionStatus } =
    props;
  useEffect(() => {
    runCheck();
  }, [activeStep]);

  const runCheck = async () => {
    setLoadingQuestionStatus(true);
    try {
      await baseService.get(
        urls.quiz_asnwers +
          `/${StorageBox.retrieveUserData().user_id}/${
            questions[activeStep].id
          }/`
      );

      //   console.log(res.data);
    } catch (error) {
      setAnswered();
    }
  };

  return null;
}
