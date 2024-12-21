import React from "react";
import styles from "./LogoAnimated.module.css";
import { motion } from "motion/react";
import { drawLogo } from "../../configs/animate";

export default function LogoAnimated({ width }) {
  const letters = Array.from("Cloud");

  return (
    <div className={styles.wrapper}>
      <motion.svg
        width={width}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        initial="hidden"
        animate="visible"
      >
        <motion.path
          d="M19 11C21.2091 11 23 12.7909 23 15C23 17.2091 21.2091 19 19 19L6 19.0001C3.23858 19.0001 1 16.7613 1 13.9999C1 11.3498 3.06206 9.18144 5.66895 9.01082C6.79019 6.64004 9.20335 5 12 5C15.5267 5 18.4447 7.60802 18.9297 11.0006C18.9532 11.0002 18.9764 11 19 11Z"
          stroke="var(--primary)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          variants={drawLogo}
        />
      </motion.svg>
      <div className={styles.text}>
        {letters.map((letter, index) => {
          return (
            <motion.span
              key={index}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{
                delay: index * 0.15,
                duration: 0.6,
              }}
            >
              {letter}
            </motion.span>
          );
        })}
      </div>
    </div>
  );
}
