import { Dialog, Transition } from "@headlessui/react";
import { PlayIcon } from "@heroicons/react/20/solid";
import { Star, StarBorder, StarHalf } from "@mui/icons-material";
import moment from "moment";
import { Fragment, useContext, useEffect, useRef, useState } from "react";
import ReactPlayer from "react-player";
import imgplay from "../../../assets/img/play.png";
import languageicon from "../../../assets/svg/voice.svg";
import calender from "../../../assets/svg/wallet.svg";
import { displayWarning } from "../../../components/alert";
import GeneralContext from "../../../context/gen";
import urls from "../../../core/base.url";
import baseService from "../../../core/baseServices";

export default function CourseMedia(props: any) {
  const [rating, setRating] = useState(5);
  const { title, short_description, course_id, language, updatedAt } =
    props.course_detail;

  // const { first_name, last_name } = props.instructor;
  const { corpid } = useContext(GeneralContext);

  let [isOpen, setIsOpen] = useState(false);
  const [preview, setPreview] = useState(
    "https://www.youtube.com/embed/5oH9Nr3bKfw"
  );

  useEffect(() => {
    const checkRating = () => {
      const sum = props.reviews.reduce(
        (acc: any, item: any) => acc + item.rating,
        0
      );
      if (sum === 0) {
        setRating(5);
      } else {
        const mean = sum / props.reviews.length;
        setRating(mean);
      }
    };
    const get_preview = async () => {
      try {
        if (props?.course_detail?.course_id) {
          const res: any = await baseService.get(
            urls.preview + `/${props?.course_detail?.course_id}`
          );
          setPreview(res.data?.video?.url);
        }
      } catch (error) {
        // console.log(error);
      }
    };
    checkRating();
    get_preview();
  }, [course_id, props?.course_detail?.course_id, props.reviews]);

  // Calculate the number of full stars
  const fullStars = Math.floor(rating);

  // Calculate the number of empty stars
  const emptyStars = 5 - Math.ceil(rating);
  const hasHalfStar = rating % 1 !== 0;

  const playerRef = useRef<ReactPlayer | null>(null);
  const handleProgress = (state: any) => {
    if (state.playedSeconds >= 60 && playerRef.current) {
      playerRef.current.seekTo(60);
      displayWarning(
        "Please purchase course to get the complete course content"
      );
      setIsOpen(false);
    }
  };
  return (
    <div className="flex py-20 md:px-24 px-3 md:flex-row items-center flex-col-reverse  md:gap-40 bg-black opacity-80 h-100">
      <>
        <div className="flex flex-col md:mt-0 mt-6  ">
          <p className="md:text-4xl text-3xl font-bold text-white opacity-100">
            {title}
          </p>
          <p className="text-md mt-0">{short_description}</p>
          {!props.loading && (
            <div className="flex mt-3">
              <div className="flex items-center">
                <p className="font-bold text-sm text-white">
                  {rating.toFixed(1)}
                </p>
                <div className="flex gap-1 items-center ml-1">
                  {[...Array(fullStars)].map((_, i) => (
                    <Star width={14} key={i} className="text-white" />
                  ))}
                  {hasHalfStar && (
                    <StarHalf width={14} className="text-white" />
                  )}
                  {[...Array(emptyStars)].map((_, i) => (
                    <StarBorder width={14} key={i} className="text-white" />
                  ))}
                </div>
              </div>
              <p className="ml-3">
                ({props.reviews.length} ratings) {props.reviews.length} students
              </p>
            </div>
          )}

          <div className="flex items-center mt-3">
            <i className="fa fa-graduation-cap text-white mr-2 "></i>
            <p className="font-bold text-md text-white">
              Certificate of completion
            </p>
          </div>

          <div className="flex gap-4">
            <div className="flex items-center mt-3">
              <img src={calender} alt="wallet" className="mr-2 text-white" />
              <p className="text-white">
                Last updated {moment(updatedAt).format("Do MMM YYYY")}{" "}
              </p>
            </div>
            <div className="flex items-center mt-3 text-white">
              <img src={languageicon} alt="voice" className="mr-2" />
              <p>{language}</p>
            </div>
          </div>
          <div className=" grid md:grid-cols-2 grid-cols-1  gap-3 mt-6">
            <button
              className="outlineLg border-2 py-4 border-secondary-600"
              onClick={() => {
                window.location.href = `/buy-now/${course_id}/${corpid}`;
              }}
            >
              <p className="text-white">Buy course now</p>
            </button>
          </div>
          <p className="text-center my-6 text-white">
            30-Day Money-Back Guarantee
          </p>
        </div>

        <div className="flex flex-col justify-center items-center">
          <div
            className="flex flex-col justify-center items-center"
            style={{ cursor: "pointer" }}
            onClick={() => setIsOpen(true)}
          >
            <img src={imgplay} alt="play" />
            <p className="text-white mt-2">Play course overview</p>
          </div>
        </div>
      </>

      <>
        <Transition appear show={isOpen} as={Fragment}>
          <Dialog
            as="div"
            className="relative z-10"
            onClose={() => setIsOpen(false)}
          >
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black bg-opacity-50" />
            </Transition.Child>

            <div className="fixed inset-0 overflow-y-auto w-200">
              <div className="flex min-h-full items-center justify-center p-4 text-center">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 scale-95"
                  enterTo="opacity-100 scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 scale-100"
                  leaveTo="opacity-0 scale-95"
                >
                  <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                    <Dialog.Title
                      as="h3"
                      className="text-lg font-medium leading-6 text-gray-900 text-center text-secondary-400"
                    >
                      Course Preview
                    </Dialog.Title>
                    <div className="mt-2 container">
                      <ReactPlayer
                        ref={playerRef}
                        onProgress={handleProgress}
                        url={preview}
                        controls
                        width="100%"
                        playIcon={
                          <PlayIcon
                            className="w-10 h-10 my-40"
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
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition>
      </>
    </div>
  );
}
