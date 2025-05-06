// components/Toast.tsx
import { motion } from "framer-motion";
import {
  AiOutlineCheckCircle,
  AiOutlineClose,
  AiOutlineInfoCircle,
  AiOutlineWarning,
  AiOutlineLoading3Quarters,
  AiOutlineCloseCircle,
} from "react-icons/ai";

const iconMap = {
  success: <AiOutlineCheckCircle className="text-green-600 text-xl" />,
  error: <AiOutlineCloseCircle className="text-red-600 text-xl" />,
  warning: <AiOutlineWarning className="text-yellow-600 text-xl" />,
  info: <AiOutlineInfoCircle className="text-blue-600 text-xl" />,
  loading: (
    <AiOutlineLoading3Quarters className="animate-spin text-gray-600 text-xl" />
  ),
};

const bgMap = {
  success: "bg-green-50 border-green-500",
  error: "bg-red-50 border-red-500",
  warning: "bg-yellow-50 border-yellow-500",
  info: "bg-blue-50 border-blue-500",
  loading: "bg-gray-100 border-gray-400",
};

const Toast = ({ type, message, onClose }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95, y: 20 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className={`relative w-full max-w-sm flex items-start gap-3 border-l-4 px-4 py-3 my-rounded shadow-md ${bgMap[type]}`}
    >
      <div className="mt-1">{iconMap[type]}</div>
      <div className="text-sm font-medium text-gray-800">{message}</div>
      {/* <AiOutlineClose
        onClick={onClose}
        className="absolute top-2 right-2 cursor-pointer text-gray-500 hover:text-gray-700"
      /> */}
      {/* Progress bar */}
      <motion.div
        className="absolute bottom-0 left-0 h-[3px] bg-black/30 rounded-full"
        initial={{ width: "100%" }}
        animate={{ width: 0 }}
        transition={{ duration: 2, ease: "easeInOut" }}
      />
    </motion.div>
  );
};

export default Toast;
