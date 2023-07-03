import React, {
  ChangeEvent,
  FormEvent,
  useContext,
  useEffect,
  useState,
} from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import GeneralContext from "../context/gen";
import baseService from "../core/baseServices";
import urls from "../core/base.url";
import { displaySuccess, displayWarning } from "../components/alert";
import { Spinner } from "react-bootstrap";
import { StorageBox } from "../core/storage";

interface Question {
  question: string;
  answer: string;
}

export default function SignupQuestions() {
  const { theme, corpid } = useContext(GeneralContext);
  const location = useLocation();
  const state = location.state;
  const { questions, user } = state;
  const navigate = useNavigate();

  const [answers, setAnswers] = useState<Question[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    let quest = [];
    if (questions) {
      for (const question of questions) {
        const data = {
          question: question.field,
          answer: "",
        };
        quest.push(data);
      }
      setAnswers(quest);
    }
  }, []);

  const handleAnswerChange = (
    index: number,
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const newAnswers = [...answers];
    newAnswers[index].answer = event.target.value;
    setAnswers(newAnswers);
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    const isAnyAnswerEmpty = answers.some((item) => item.answer.trim() === "");

    if (isAnyAnswerEmpty) {
      displayWarning("Please answer all questions!");
      return;
    }

    setLoading(true);
    // console.log(answers);

    try {
      const payload = {
        questions: JSON.stringify(answers),
      };
      await baseService.put(urls.updateProfile + `/${user.user_id}`, payload);

      const res: any = await baseService.get(
        urls.get_corporate + `/${corpid}?`
      );
      const corp = res.data?.data;

      if (!corp.verify_auth) {
        setLoading(false);
        navigate(`/main/${corpid}`);
      } else if (user.user_state === "pending") {
        StorageBox.clearStorage();
        displaySuccess(
          "Account set up successfully! However, it will need approval. "
        );
        setLoading(false);
        navigate(`/sign-in/${corpid}`);
      } else {
        setLoading(false);
        navigate(`/main/${corpid}`);
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  return (
    <div className="flex lg:pt-12 lg:pb-8 py-8 flex-col items-center w-full justify-start min-h-screen px-4">
      <h1 className="lg:font-bold font-semibold mb-5 lg:text-center text-left lg:text-4xl text-xl">
        Help us serve you better.
      </h1>
      <div className="">
        <form onSubmit={handleSubmit}>
          {answers.map((item, index) => (
            <div key={index} className="flex flex-col items-start gap-y-3 my-3">
              <label
                htmlFor="name"
                className="text-sm font-medium cursor-pointer"
              >
                {item.question}
              </label>
              <input
                id="name"
                type="text"
                value={item.answer}
                onChange={(event) => handleAnswerChange(index, event)}
                className="w-full p-2 bg-transparent border border-gray-200 rounded-lg outline-none"
                placeholder="Type answer here"
              />
            </div>
          ))}
          <button
            style={{ backgroundColor: theme?.primary_color }}
            type="submit"
            className="inline-flex py-2 px-4 text-white"
          >
            {loading ? <Spinner /> : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
}
