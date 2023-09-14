import React from "react";

type TPrimaryButton = {
  clickHandler?: () => void;
  name: string;
  type?: "submit" | "button" | "reset";
};

const PrimaryButton: React.FC<TPrimaryButton> = ({
  clickHandler = () => {},
  name,
  type = "button",
}) => {
  return (
    <button
      type={type}
      onClick={clickHandler}
      className={
        "px-4 py-2 rounded border border-transparent bg-primary-blue text-base text-white shadow-lg duration-300 hover:bg-white hover:text-primary-blue hover:border hover:border-primary-blue"
      }
    >
      {name}
    </button>
  );
};

export default PrimaryButton;
