import moment from "moment";
import { StorageBox } from "../core/storage";
import { displayWarning } from "./alert";

export const formatCedis = (number: number, code: string) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: code,
  }).format(number);
};

export const errorHelper = (error: any, alt: string = "Error!!!!") => {
  // console.log(error);
  if (error.response?.status === 400) {
    const message = error.response?.data?.err?.details[0].message;
    displayWarning(message);
  } else if (error.response?.status === 403) {
    const message = error.response?.data?.message;
    displayWarning(message);
  } else if (
    error.response?.status === 401 ||
    error.response?.statusCode === 401
  ) {
    // const message = error.response?.data?.message;
    displayWarning("User logged out, please login and try again");
    StorageBox.clearStorage();
    setTimeout(() => {
      window.location.href = "/";
    }, 300);
  } else {
    displayWarning(alt);
  }
};

export function formatTimeAgo(date: any) {
  const now = moment();
  const momentDate = moment(date);

  const seconds = now.diff(momentDate, "seconds");
  const minutes = now.diff(momentDate, "minutes");
  const hours = now.diff(momentDate, "hours");
  const days = now.diff(momentDate, "days");
  const weeks = now.diff(momentDate, "weeks");
  const months = now.diff(momentDate, "months");
  const years = now.diff(momentDate, "years");

  if (seconds < 60) {
    return `${seconds} seconds ago`;
  } else if (minutes < 60) {
    return `${minutes} minutes ago`;
  } else if (hours < 24) {
    return `${hours} hours ago`;
  } else if (days < 7) {
    return `${days} days ago`;
  } else if (weeks < 4) {
    return `${weeks} weeks ago`;
  } else if (months < 12) {
    return `${months} months ago`;
  } else {
    return `${years} years ago`;
  }
}
