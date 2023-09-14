import React, { useEffect, useMemo, useRef } from "react";
import ReactDOM from "react-dom";
import { CheckIcon, XMarkIcon } from "@heroicons/react/20/solid";
import PrimaryButton from "@/elements/PrimaryButton/PrimaryButton";
import { TModalStatus } from "@/types";

interface TModal {
  onClose: () => void;
  modalMessage: string;
  status: TModalStatus;
}

const Modal: React.FC<TModal> = ({ onClose, modalMessage, status }) => {
  const modalRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const checkIfClickedOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        onClose();
      }
    };
    document.addEventListener("click", checkIfClickedOutside);
    return () => {
      document.removeEventListener("click", checkIfClickedOutside);
    };
  }, [onClose]);

  const backGround = useMemo(() => {
    return status === "success" ? "bg-green-400" : "bg-red-300";
  }, [status]);

  return ReactDOM.createPortal(
    <div className="fixed inset-0 flex flex-col items-center justify-center z-50">
      <div className="fixed inset-0 bg-gray-800 opacity-75"></div>
      <div className="bg-white rounded-lg w-96 z-10" ref={modalRef}>
        <div className="flex justify-center pt-4">
          <div className={`${backGround} w-12 h-12 p-2 rounded-full`}>
            {status === "success" ? <CheckIcon /> : <XMarkIcon />}
          </div>
        </div>
        <div className="p-6">{modalMessage}</div>
        <div
          className={`w-full flex justify-end ${backGround} p-2 rounded-b-lg`}
        >
          <PrimaryButton name="Close" clickHandler={onClose} />
        </div>
      </div>
    </div>,
    document.getElementById("modal-root")!
  );
};

export default Modal;
