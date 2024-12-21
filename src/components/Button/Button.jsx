import React from "react";
import { motion } from "motion/react";
import { buttonAnimate } from "../../configs/animate";

export default function Button({ children, ...props }) {
  return (
    <motion.button
      initial="hidden"
      animate="visible"
      whileTap="tapped"
      variants={buttonAnimate}
      {...props}
    >
      {children}
    </motion.button>
  );
}
