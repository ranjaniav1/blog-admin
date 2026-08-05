import React, { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MdClose } from "react-icons/md";

const Modal = ({
  isOpen,
  onClose,
  title = "Modal Title",
  children,
  width = "max-w-2xl", // default width
}) => {
  const modalRef = useRef();

  const handleOutsideClick = (e) => {
    if (e.target.closest(".tox")) return;

    if (modalRef.current && !modalRef.current.contains(e.target)) {
      onClose();
    }
  };

  const handleEscapePress = (e) => {
    if (e.key === "Escape") onClose();
  };

  useEffect(() => {
    if (!isOpen) return;

    document.body.style.overflow = "hidden";

    document.addEventListener("mousedown", handleOutsideClick);
    document.addEventListener("keydown", handleEscapePress);

    return () => {
      document.body.style.overflow = "";

      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("keydown", handleEscapePress);
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4"
        >
          <motion.div
            ref={modalRef}
            initial={{ scale: 0.96, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.96, opacity: 0 }}
            className={`card ${width} w-full max-h-[90vh] rounded-xl shadow-2xl flex flex-col overflow-hidden`}
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b p-4 shrink-0">
              <h2 className="text-lg font-semibold">{title}</h2>

              <button
                onClick={onClose}
                className="text-2xl text-gray-500 hover:text-black"
              >
                <MdClose />
              </button>
            </div>

            {/* Scrollable Body */}
            <div className="flex-1 overflow-y-auto p-5">
              {children}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Modal;