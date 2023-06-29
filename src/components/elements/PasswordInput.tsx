import React, { useState } from "react";

function PasswordInput(props: any) {
  const { icon, className, error, placeholder, onChange } = props;
  const [show, setShow] = useState(false);
  const ring = error ? `ring-1 ring-secondary` : "";
  return (
    <div className={`${className}`}>
      <input
        data-testid="input"
        className={`focus:outline-none px-4 font-serif bg-white w-full ${ring} `}
        type={show ? "text" : "password"}
        placeholder={placeholder}
        onChange={onChange}
      />

      <span
        onClick={() => setShow(!show)}
        className="flex justify-center items-center px-4"
      >
        {show ? (
          <i className="fa fa-eye text-sm"></i>
        ) : (
          <i className="fa fa-eye-slash text-sm"></i>
        )}
      </span>
    </div>
  );
}

export default PasswordInput;
