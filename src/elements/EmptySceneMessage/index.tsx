import React from "react";

type TEmptySceneMessage = {
  message: string;
};

const EmptySceneMessage: React.FC<TEmptySceneMessage> = ({ message }) => {
  return (
    <>
      <div className="bg-gray-100 mx-auto text-center p-9 mt-14 max-w-full">
        <h1 className="text-2xl font-bold text-gray-800">{message}</h1>
      </div>
    </>
  );
};

export default EmptySceneMessage;
