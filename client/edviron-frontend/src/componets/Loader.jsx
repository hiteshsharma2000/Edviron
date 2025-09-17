import { motion } from "framer-motion";

function Loader() {
  return (
    <div className="flex items-center justify-center h-40 bg-gray-50">
      <motion.div
        className="w-12 h-12 border-4 border-gray-300 border-t-green-500 rounded-full"
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
      />
    </div>
  );
}

export default Loader;
