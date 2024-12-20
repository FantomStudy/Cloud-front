import React from "react";
import ReactDOM from "react-dom";
import styles from "./Modal.module.css";
import { motion } from "motion/react";
import { appearnce } from "../../animate";
import Button from "../Button/Button";

export default function Modal({ show, onCloseClick, children }) {
  if (!show) {
    return null;
  }

  return ReactDOM.createPortal(
    <div className={styles.modal_overlay}>
      <motion.div
        initial="hidden"
        animate="visible"
        variants={appearnce}
        className={styles.modal_container}
      >
        <header className={styles.header}>
          <Button
            onClick={onCloseClick}
            className={styles.modal_close}
          ></Button>
        </header>
        {children}
      </motion.div>
    </div>,
    document.body
  );
}
