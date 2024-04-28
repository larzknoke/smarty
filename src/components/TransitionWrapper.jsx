import { motion } from "framer-motion";

function TransitionWrapper({ children }) {
  return (
    <motion.div
      className="w-full flex justify-center"
      initial={{ x: 50, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: -50, opacity: 0 }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 20,
      }}
    >
      {children}
    </motion.div>
  );
}

export default TransitionWrapper;
