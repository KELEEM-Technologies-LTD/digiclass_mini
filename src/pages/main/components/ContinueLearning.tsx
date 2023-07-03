import React, { useContext, useRef } from "react";
import { Skeleton } from "@mui/material";
import LectureCard from "./LectureCard";
import chevronLeft from "../../../assets/svg/chevron-left.svg";
import chevronRight from "../../../assets/svg/chevron-right.svg";
import GeneralContext from "../../../context/gen";

export default function ContinueLearning() {
  const { courses, loading } = useContext(GeneralContext);
  const sliderRef = useRef<HTMLDivElement>(null);
  const handlePrev = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollLeft -= 300;
    }
  };

  const handleNext = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollLeft += 300;
    }
  };
  return (
    <div className="py-2 px-5 w-full flex-col overflow-x-hidden md:flex hidden">
      <div className="flex justify-between">
        <p className="text-2xl font-medium text-black font-serif">
          Let's start learning
        </p>
        <div className="grid grid-cols-2 gap-6 md:pr-52">
          <button onClick={handlePrev}>
            <img src={chevronLeft} alt="chev" />
          </button>
          <button onClick={handleNext}>
            <img src={chevronRight} alt="chev" />
          </button>
        </div>
      </div>
      <div className="mt-6" style={{ overflowX: "hidden" }}>
        <div
          className="flex overflow-y-auto whitespace-nowrap scroll-smooth scrollbar-hide"
          ref={sliderRef}
        >
          {loading ? (
            <Skeleton
              height={150}
              width={300}
              style={{ marginRight: "30px" }}
            />
          ) : (
            courses.map((item: any, index: any) => (
              <div
                key={index}
                style={{ marginRight: "20px", minWidth: "380px" }}
              >
                <LectureCard data={item} />
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
