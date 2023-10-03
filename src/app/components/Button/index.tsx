import React from "react";
import style from "./Button.module.css";
type Props = {
  children: string;
  css: "main" | "gray" | "mainDisable" | "grayDisable";
  type:"button" | "submit" | "reset";
};

const Button = ({ children, css ,type}: Props) => {
  return (
    <>
      <button
      type={type}
        className={
          css == "main"
            ? style.buttonMain
            : css == "gray"
            ? style.buttonGray
            : ""
        }
        role="button"
      >
        {children}
      </button>
    </>
  );
};

export default Button;
