import React from "react";

type TEmptySceneMessage = {
  message: string;
};

const EmptySceneMessage: React.FC<TEmptySceneMessage> = ({ message }) => {
  return (
    <div className="bg-gray-100 w-full text-center p-9 mt-14">
      <h2 className="text-2xl font-bold text-gray-800">{message}</h2>
    </div>
  );
};

export default EmptySceneMessage;
