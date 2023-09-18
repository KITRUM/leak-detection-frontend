import React, { createContext, useContext, useState } from "react";
import Modal from "@/components/Modal/Modal";
import { TModalStatus } from "@/types";

interface ModalContextType {
  openModal: (message: string, status: TModalStatus) => void;
  closeModal: () => void;
  isModalOpen: boolean;
}

const ModalContext = createContext<ModalContextType | null>(null);

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModal must be used within a ModalProvider");
  }
  return context;
};

export const ModalProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [modalStatus, setModalStatus] = useState<TModalStatus>("success");

  const openModal = (message: string, status: TModalStatus) => {
    setModalMessage(message);
    setModalStatus(status);
    setIsModalOpen(true);
    document.body.classList.add("modal-open");
  };

  const closeModal = () => {
    setModalMessage("");
    setModalStatus("success");
    setIsModalOpen(false);
    document.body.classList.remove("modal-open");
  };

  return (
    <ModalContext.Provider value={{ openModal, closeModal, isModalOpen }}>
      {isModalOpen && (
        <Modal
          onClose={closeModal}
          modalMessage={modalMessage}
          status={modalStatus}
        />
      )}
      {children}
    </ModalContext.Provider>
  );
};
