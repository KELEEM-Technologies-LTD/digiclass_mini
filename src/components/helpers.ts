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
