import React, { createContext, useContext, useState } from "react";
import Modal from "@/components/Modal/Modal";

interface ModalContextType {
  openModal: (message: string) => void;
  closeModal: () => void;
  isModalOpen: boolean;
  modalMessage: string;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

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

  const openModal = (message: string) => {
    setModalMessage(message);
    setIsModalOpen(true);
    document.body.classList.add("modal-open");
  };

  const closeModal = () => {
    setModalMessage("");
    setIsModalOpen(false);
    document.body.classList.remove("modal-open");
  };

  return (
    <ModalContext.Provider
      value={{ openModal, closeModal, isModalOpen, modalMessage }}
    >
      {isModalOpen && (
        <Modal onClose={closeModal} modalMessage={modalMessage} />
      )}
      {children}
    </ModalContext.Provider>
  );
};
