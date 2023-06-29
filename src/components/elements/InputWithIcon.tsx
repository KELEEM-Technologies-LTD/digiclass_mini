import React from "react";

function InputWithIcon(props: any) {
  const { icon, icon1, className, type, error, placeholder, disabled } = props;
  const ring = error ? `ring-1 ring-secondary` : "";
  return (
    <div className={` ${className} ${disabled ? "bg-gray-200" : ""} `}>
      {icon1 ? (
        <span className="flex justify-center items-center px-4">
          <img src={icon1} alt="e0m" />
        </span>
      ) : null}
      <input
        data-testid="input"
        className={`focus:outline-none font-serif border-gray-300 px-4 bg-gray-100  ${
          disabled ? "bg-gray-200" : ""
        }   w-full ${ring} `}
        type={type}
        placeholder={placeholder}
        disabled={disabled}
        {...props}
      />
      {icon ? (
        <span className="flex justify-center items-center px-2">
          <i className={icon}></i>
        </span>
      ) : null}
    </div>
  );
}

export default InputWithIcon;
