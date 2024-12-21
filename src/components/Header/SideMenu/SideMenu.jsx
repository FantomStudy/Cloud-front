import React from "react";
import styles from "./SideMenu.module.css";
import { motion } from "motion/react";
import Button from "../../Button/Button";
import { sideMenuAppear, sideMenuOverlay } from "../../../configs/animate";
import { useAuth } from "../../../contexts/authContext";
import { Link } from "react-router-dom";

export default function SideMenu({ isOpen, close }) {
  const { handleLogout } = useAuth();
  return (
    <>
      <motion.div
        className={styles.overlay}
        onClick={close}
        initial={false}
        animate={isOpen ? "opened" : "closed"}
        variants={sideMenuOverlay}
      ></motion.div>

      <motion.div
        className={styles.side_menu}
        initial={false}
        animate={isOpen ? "opened" : "closed"}
        variants={sideMenuAppear}
        onClick={close}
      >
        <nav className={styles.nav}>
          <Link to="/" className={styles.nav_item}>
            My Files
          </Link>
          <Link to="/access" className={styles.nav_item}>
            Received
          </Link>
        </nav>
        <Button onClick={handleLogout} className="btn danger" custom={0.75}>
          <img src="/Log_Out.svg" alt="" />
          Logout
        </Button>
      </motion.div>
    </>
  );
}
