import React from "react";
import styles from "./Preloader.module.css";
import LogoAnimated from "../LogoAnimated/LogoAnimated";
import { motion } from "motion/react";
import { appearance } from "../../configs/animate";

export default function Preloader() {
  return (
    <div className="container">
      <div className={styles.wrapper}>
        <motion.div
          className={styles.preloader_container}
          initial="hidden"
          animate="visible"
          variants={appearance}
        >
          <LogoAnimated width="75" />
          <motion.p variants={appearance} custom={1.5} className={styles.load}>
            Loading...
          </motion.p>
        </motion.div>
      </div>
    </div>
  );
}
