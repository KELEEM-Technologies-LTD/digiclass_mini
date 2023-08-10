import { Star, StarHalf, StarOutline } from "@mui/icons-material";
import moment from "moment";
import { useContext, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { displaySuccess, displayWarning } from "../../../components/alert";
import GeneralContext from "../../../context/gen";
import "./review.css";
import baseService from "../../../core/baseServices";
import urls from "../../../core/base.url";

export default function Review(props: {
  data: any;
  reload: () => void;
  hideForm?: boolean;
}) {
  const { data, reload, hideForm } = props;
  const { course_id } = useParams();
  const { theme } = useContext(GeneralContext);

  const [rating, setRating] = useState<number>(0);
  const [title, setTitle] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [posting, setPosting] = useState<boolean>(false);

  const handleRating = (e: any) => {
    setRating(e.target.value);
  };

  const postReview = async (e: any) => {
    e.preventDefault();

    if (rating === 0) {
      displayWarning("Please select a rating");
    } else {
      const reviewData = {
        title: title,
        description: message,
        course_id: course_id,
        rating: rating,
      };
      setPosting(true);
      try {
        await baseService.post(urls.getReviews, reviewData);
        reload();
        setTitle("");
        setMessage("");
        displaySuccess("Review posted, thank you!");
        setPosting(false);
      } catch (error) {
        setPosting(false);
      }
      // console.log(reviewData);
    }
  };

  return (
    <>
      <Row>
        <Col md={4}>
          {data.length === 0 ? (
            <p>There are no reviews for this coures</p>
          ) : null}
          {data.map((d: any, index: number) => {
            return <ReviewCard key={index} review={d} />;
          })}
        </Col>
      </Row>
      {hideForm ? null : (
        <Row className="my-3">
          <Col md={5}>
            <form onSubmit={postReview}>
              <p
                className={`text-[${theme?.primary_color}] font-bold text-lg mt-7`}
              >
                Add a review
              </p>

              <div className="flex">
                <p></p>
                <div className="rating">
                  <input
                    type="radio"
                    name="rating"
                    value="5"
                    id="5"
                    onChange={handleRating}
                  />
                  <label style={{ color: theme?.primary_color }} htmlFor="5">
                    ☆
                  </label>
                  <input
                    type="radio"
                    name="rating"
                    value="4"
                    id="4"
                    onChange={handleRating}
                  />
                  <label style={{ color: theme?.primary_color }} htmlFor="4">
                    ☆
                  </label>
                  <input
                    type="radio"
                    name="rating"
                    value="3"
                    id="3"
                    onChange={handleRating}
                  />
                  <label style={{ color: theme?.primary_color }} htmlFor="3">
                    ☆
                  </label>
                  <input
                    type="radio"
                    name="rating"
                    value="2"
                    id="2"
                    onChange={handleRating}
                  />
                  <label style={{ color: theme?.primary_color }} htmlFor="2">
                    ☆
                  </label>
                  <input
                    type="radio"
                    name="rating"
                    value="1"
                    id="1"
                    onChange={handleRating}
                  />
                  <label style={{ color: theme?.primary_color }} htmlFor="1">
                    ☆
                  </label>
                </div>
              </div>
              <div className="mb-7">
                <label
                  htmlFor="title"
                  className="block mb-2 text-sm font-medium text-primary-900"
                >
                  Title
                </label>
                <input
                  type="text"
                  id="title"
                  className="bg-primary-50 border border-primary-300 text-primary-900 text-sm rounded-lg focus:ring-secondary-500 focus:border-secondary-500 block w-full p-2.5"
                  placeholder="Review title"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div>
                <label
                  htmlFor="message"
                  className="block mb-2 text-sm font-medium text-primary-900"
                >
                  Leave a message
                </label>
                <textarea
                  id="message"
                  rows={4}
                  className="block p-2.5 w-full text-sm text-primary-900 bg-primary-100 rounded-lg border border-primary-300 focus:ring-secondary-400 focus:border-secondary-400"
                  placeholder="Your message..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                ></textarea>
              </div>
              <div className="text-end mt-7">
                <button
                  className={`rounded-2 border border-transparent bg-[${theme?.primary_color}] px-8 py-2 text-base font-medium text-white shadow-xl hover:bg-secondary-800`}
                  disabled={posting}
                >
                  {posting ? (
                    <div className="flex justify-center items-center">
                      <div
                        className={`w-8 h-8 border-2 border-blue rounded-full border-t-2 border-t-blue animate-spin`}
                      ></div>
                    </div>
                  ) : (
                    "Post Review"
                  )}
                </button>
              </div>
            </form>
          </Col>
        </Row>
      )}
    </>
  );
}

function ReviewCard(props: { review: any }) {
  const { review } = props;
  const rating = review.rating;

  // Calculate the number of full stars
  const fullStars = Math.floor(rating);

  // Calculate the number of empty stars
  const emptyStars = 5 - Math.ceil(rating);

  // Calculate whether there should be a half star
  const hasHalfStar = rating % 1 !== 0;

  const { theme } = useContext(GeneralContext);

  return (
    <div className="flex gap-lg-4 gap-3 my-6 border">
      <div className=" ">
        <div className="flex items-center justify-center h-12 w-12 border rounded-full bg-secondary-700 ">
          <p className="text-white">
            {review.title[0] + review.description[0]}
          </p>
        </div>
      </div>
      <div className="flex flex-col ">
        <p className={`font-bold text-base text-[${theme?.primary_color}]`}>
          {review.title}
        </p>
        <div className="flex gap-4">
          <div className="flex">
            {[...Array(fullStars)].map((_, i) => (
              <Star
                className={`text-[${theme?.primary_color}]`}
                width={14}
                key={i}
              />
            ))}
            {hasHalfStar && (
              <StarHalf
                className={`text-[${theme?.primary_color}]`}
                width={14}
              />
            )}
            {[...Array(emptyStars)].map((_, i) => (
              <StarOutline
                className={`text-[${theme?.primary_color}]`}
                width={14}
                key={i}
              />
            ))}
          </div>
        </div>
        <p className="mt-2">
          {moment(review.updatedAt).format("Do MMMM YYYY")}
        </p>
        <p className="leading-8">{review.description}</p>
      </div>
    </div>
  );
}
