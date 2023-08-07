import React from "react";
import ReactDOM from "react-dom";

interface TModal {
  onClose: () => void;
  modalMessage: string;
}

const Modal: React.FC<TModal> = ({ onClose, modalMessage }) => {
  return ReactDOM.createPortal(
    <div className="fixed inset-0 flex flex-col items-center justify-center z-50">
      <div className="fixed inset-0 bg-gray-800 opacity-75"></div>
      <div className="bg-white rounded-lg p-6 w-96 z-10">
        <div>{modalMessage}</div>
        <div className="w-full flex justify-end">
          <button
            onClick={onClose}
            className="mt-4 px-4 py-2 rounded border border-transparent bg-primary-blue text-base text-white shadow-lg duration-300 hover:bg-white hover:text-primary-blue hover:border hover:border-primary-blue"
          >
            Close
          </button>
        </div>
      </div>
    </div>,
    document.getElementById("modal-root")!
  );
};

export default Modal;
