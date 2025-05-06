// context/ToastContext.jsx or .tsx
import { createContext, useContext, useState } from "react";
import Toast from "../common/Toast";

const ToastContext = createContext();

let toastIdCounter = 0;

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const showToast = (type, message, duration = 2000) => {
    const id = `toast-${Date.now()}-${toastIdCounter++}`;

    setToasts((prev) => [...prev, { id, type, message }]);

    if (type !== "loading") {
      setTimeout(() => dismissToast(id), duration);
    }

    return id;
  };

  const dismissToast = (id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  return (
    <ToastContext.Provider value={{ showToast, dismissToast }}>
      {children}
      <div className="fixed top-4 right-4 z-50 space-y-2">
        {toasts.map((toast) => (
          <Toast
            key={toast.id}
            type={toast.type}
            message={toast.message}
            onClose={() => dismissToast(toast.id)}
          />
        ))}
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => useContext(ToastContext);
