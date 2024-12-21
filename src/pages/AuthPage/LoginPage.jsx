import React, { useState } from "react";
import styles from "./AuthPages.module.css";
import toast from "react-hot-toast";
import { motion } from "motion/react";
import { appearance } from "../../configs/animate";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../requests/authRequests";
import { useAuth } from "../../contexts/authContext";
import Preloader from "../../components/Preloader/Preloader";
import Button from "../../components/Button/Button";

export default function LoginPage() {
  const navigate = useNavigate();
  const { handleLogin } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const [showPass, setShowPass] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await login({ email, password });
      toast.success(response.message);
      handleLogin();
      navigate("/");
    } catch (err) {
      const error = err.response.data.message;

      toast.error(error?.email || error?.password || error);
    } finally {
      setLoading(false);
    }
  };

  const showPassword = (e) => {
    e.preventDefault();
    setShowPass(!showPass);
  };

  if (loading) {
    return <Preloader />;
  }

  return (
    <section>
      <div className="container">
        <div className={styles.wrapper}>
          <motion.form
            onSubmit={handleSubmit}
            className={styles.form}
            initial={"hidden"}
            whileInView={"visible"}
            variants={appearance}
          >
            <div className={styles.block}>
              <h1>Sign in</h1>
              <p className={styles.sub_text}>
                New to Cloud?{" "}
                <Link to="/registration" className={styles.link}>
                  Sign Up!
                </Link>
              </p>
            </div>
            <label htmlFor="email" className={styles.label}>
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              className={styles.input}
            />
            <label htmlFor="password" className={styles.label}>
              Password
            </label>
            <div className={styles.password}>
              <input
                type={showPass ? "text" : "password"}
                name="password"
                id="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                className={`${styles.input} ${styles.password}`}
              />
              <button
                onClick={showPassword}
                className={styles.show_btn}
                style={{
                  backgroundImage: showPass
                    ? "url('/Hide.svg')"
                    : "url('/Show.svg')",
                }}
              />
            </div>
            <Button
              className={`btn ${styles.auth_btn}`}
              type="submit"
              disabled={loading ? true : false}
            >
              Login
            </Button>
          </motion.form>
        </div>
      </div>
    </section>
  );
}
