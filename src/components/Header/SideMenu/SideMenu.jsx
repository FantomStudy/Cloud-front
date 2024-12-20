import React from "react";
import styles from "./SideMenu.module.css";
import { motion } from "motion/react";
import { openSide } from "../../../animate";

export default function SideMenu({ isOpen, close }) {
  return (
    <motion.div
      className={styles.overflow}
      onClick={close}
      initial={false}
      animate={isOpen ? "opened" : "closed"}
      variants={openSide}
    >
      <div className={styles.side_menu}>ref</div>
    </motion.div>
  );
}
