import React from "react";

function GoogleButton(props: any) {
  return (
    <button
      {...props}
      className="flex w-full items-center px-2 py-4 bg-white rounded-5"
    >
      <img src="./img/google.svg" alt="googlelogo" />
      <p className="ml-6 text-lg text-center">Continue with Google</p>
    </button>
  );
}

export default GoogleButton;
