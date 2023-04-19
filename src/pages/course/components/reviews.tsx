import { Star, StarHalf, StarOutline } from "@mui/icons-material";
import moment from "moment";
import { useContext } from "react";
import { Col, Row } from "react-bootstrap";
import GeneralContext from "../../../context/gen";

export default function Review(props: { data: any }) {
  const { data } = props;

  return (
    <Row>
      <Col md={{ span: 8, offset: 2 }}>Review</Col>
      {data.length === 0 ? <p>There are no reviews for this coures</p> : null}
      {data.map((d: any, index: number) => {
        return <ReviewCard key={index} review={d} />;
      })}
    </Row>
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
    <div className="flex gap-4 my-6 ">
      <div className=" ">
        <div className="flex items-center justify-center h-12 w-12 rounded-full bg-secondary-700 ">
          <p className="text-white">
            {review.title[0] + review.description[0]}
          </p>
        </div>
      </div>
      <div className=" flex flex-col ">
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
          <p className="">{moment(review.updatedAt).format("Do MMMM YYYY")}</p>
        </div>
        <p className="leading-8">{review.description}</p>
      </div>
    </div>
  );
}
