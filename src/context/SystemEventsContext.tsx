import React, { useEffect } from "react";
import { Response, TSystemEvent, TSystemEventType } from "@/types";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { connectSystemEvents } from "@/services/system";

export const SystemEventsProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const notify = (message: string, type: TSystemEventType) => {
    switch (type) {
      case "alert_critical":
        return toast.error(message, {
          position: "bottom-right",
          autoClose: false,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      case "alert_success":
        return toast.success(message, {
          position: "bottom-right",
          autoClose: false,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      case "info":
        return toast.info(message, {
          position: "bottom-right",
          autoClose: false,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
    }
  };

  useEffect(() => {
    const systemEventsData = connectSystemEvents();

    systemEventsData.onmessage = (event) => {
      const response: Response<TSystemEvent> = JSON.parse(event.data);

      const { message, type } = response.result as TSystemEvent;
      notify(message, type);
    };

    return () => {
      systemEventsData.close();
    };
  });

  return (
    <>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      {children}
    </>
  );
};
