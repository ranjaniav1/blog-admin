'use client';

import Toast from "../common/Toast";
import { createContext, useContext, useState, useCallback } from "react";

const ToastContext = createContext();

let toastIdCounter = 0;

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  // ✅ Stable dismiss function (prevents re-render issues)
  const dismissToast = useCallback((id) => {
    setToasts((prev) => {
      // Prevent unnecessary state updates
      if (!prev.some((t) => t.id === id)) return prev;
      return prev.filter((toast) => toast.id !== id);
    });
  }, []);

  const showToast = useCallback((type, message, duration = 2000) => {
    const id = `toast-${Date.now()}-${toastIdCounter++}`;

    setToasts((prev) => [...prev, { id, type, message }]);

    // ✅ Auto dismiss (only for non-loading)
    if (type !== "loading") {
      setTimeout(() => {
        dismissToast(id);
      }, duration);
    }

    return id;
  }, [dismissToast]);

  return (
    <ToastContext.Provider value={{ showToast, dismissToast }}>
      {children}

      {/* Toast Container */}
      <div className="fixed top-4 right-4 z-50 space-y-2">
        {toasts.map((toast) => (
          <Toast
            key={toast.id}
            type={toast.type}
            message={toast.message}
            onClose={() => dismissToast(toast.id)} // ✅ safe
          />
        ))}
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => useContext(ToastContext);