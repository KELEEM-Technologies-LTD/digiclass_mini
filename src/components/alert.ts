import Swal from "sweetalert2";

export const displayWarning = (
  message: string,
  time: number = 3000,
  onComplete: () => void = () => {},
  position:
    | "top"
    | "top-start"
    | "top-end"
    | "top-left"
    | "top-right"
    | "center"
    | "center-start"
    | "center-end"
    | "center-left"
    | "center-right"
    | "bottom"
    | "bottom-start"
    | "bottom-end"
    | "bottom-left"
    | "bottom-right" = "top-right",
  toast: boolean = true
) => {
  Swal.fire({
    text: message,
    icon: "error",
    confirmButtonText: "Cool",
    toast: toast,
    position: position,
    timer: time,
    showConfirmButton: false,
    timerProgressBar: true,
  }).then(() => {
    onComplete();
  });
};

export const displaySuccess = (
  message: string,
  onComplete: () => void = () => {},
  time: number = 3000,
  position:
    | "top"
    | "top-start"
    | "top-end"
    | "top-left"
    | "top-right"
    | "center"
    | "center-start"
    | "center-end"
    | "center-left"
    | "center-right"
    | "bottom"
    | "bottom-start"
    | "bottom-end"
    | "bottom-left"
    | "bottom-right" = "top-right",
  toast: boolean = true
) => {
  Swal.fire({
    text: message,
    icon: "success",
    confirmButtonText: "Cool",
    toast: toast,
    position: position,
    timer: time,
    showConfirmButton: false,
    timerProgressBar: true,
  }).then(() => {
    onComplete();
  });
};

export const displayLoading = (
  message: string,
  position:
    | "top"
    | "top-start"
    | "top-end"
    | "top-left"
    | "top-right"
    | "center"
    | "center-start"
    | "center-end"
    | "center-left"
    | "center-right"
    | "bottom"
    | "bottom-start"
    | "bottom-end"
    | "bottom-left"
    | "bottom-right" = "top-right"
) => {
  Swal.fire({
    title: message,
    allowOutsideClick: false,
    // allowEscapeKey: false,
    didOpen: () => {
      Swal.showLoading();
    },
    position: position,
  });
};
