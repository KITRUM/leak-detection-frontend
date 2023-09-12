import React from "react";

type TPin = {
  size?: number;
  isPinned: boolean;
};

const Pin: React.FC<TPin> = ({ size = 6, isPinned }) => {
  return (
    <div className={`w-${size} h-${size}`} title={isPinned ? "Unpin" : "Pin"}>
      <svg
        aria-hidden="true"
        className={
          "w-full h-full mr-2 text-primary-blue dark:text-gray-600 stroke-primary-blue cursor-pointer hover:scale-[1.1] duration-300"
        }
        viewBox="0 0 19 19"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M1 17.9999L6 13M1.70711 8.70706L10.2929 17.2928C10.5842 17.5842 11.0832 17.4179 11.1414 17.01L11.9057 11.6599C11.9669 11.2315 12.1654 10.8345 12.4714 10.5285L14.4142 8.58574C14.7893 8.21066 15.298 7.99995 15.8284 7.99995H16.7929C17.2383 7.99995 17.4614 7.46138 17.1464 7.1464L11.8536 1.8535C11.5386 1.53852 11 1.76161 11 2.20706V3.17152C11 3.70196 10.7893 4.21066 10.4142 4.58574L8.4714 6.52855C8.16541 6.83454 7.76842 7.03303 7.34003 7.09423L1.98995 7.85853C1.58207 7.9168 1.41576 8.41571 1.70711 8.70706Z"
          fill={isPinned ? "currentColor" : "none"}
        />
      </svg>
    </div>
  );
};

export default Pin;
