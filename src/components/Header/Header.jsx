import React, { useState, useEffect } from "react";
import styles from "./Header.module.css";
import LogoAnimated from "../LogoAnimated/LogoAnimated";
import { useAuth } from "../../requests/authContext";
import { Link, useNavigate } from "react-router-dom";
import SideMenu from "./SideMenu/SideMenu";
import Button from "../Button/Button";

export default function Header() {
  const { isAuth, handleLogout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const closeMenu = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    const overflow = isOpen ? "hidden" : "auto";
    document.body.style.overflow = overflow;

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  return (
    <>
      <header className={styles.header}>
        <div className="container">
          <div className={styles.header_wrapper}>
            <Link to="/" className={styles.logo_link}>
              <LogoAnimated width="40px" />
            </Link>
            <nav className={styles.nav}>
              {isAuth ? (
                <>
                  <Button
                    className={`
                      ${styles.burger_btn} 
                      ${isOpen ? `${styles.open}` : ""}
                    `}
                    onClick={() => {
                      setIsOpen(!isOpen);
                    }}
                  >
                    <span className={styles.span}></span>
                    <span className={styles.span}></span>
                    <span className={styles.span}></span>
                  </Button>

                  <Button
                    onClick={handleLogout}
                    className="btn danger"
                    custom={0.75}
                  >
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    onClick={() => {
                      navigate("/registration");
                    }}
                    className="btn link"
                  >
                    Registration
                  </Button>

                  <Button
                    onClick={() => {
                      navigate("/login");
                    }}
                    className="btn"
                  >
                    Login
                  </Button>
                </>
              )}
            </nav>
          </div>
        </div>
      </header>

      <SideMenu isOpen={isOpen} close={closeMenu} />
    </>
  );
}
