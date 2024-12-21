import React, { useState } from "react";
import styles from "./AuthPages.module.css";
import toast from "react-hot-toast";
import { motion } from "motion/react";
import { appearance } from "../../configs/animate";
import Preloader from "../../components/Preloader/Preloader";
import { register } from "../../requests/authRequests";
import { useAuth } from "../../contexts/authContext";
import { useNavigate, Link } from "react-router-dom";
import Button from "../../components/Button/Button";

export default function RegisterPage() {
  const { handleLogin } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const [showPass, setShowPass] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await register(formData);
      toast.success(response.message);
      handleLogin();
      navigate("/");
    } catch (err) {
      const error = err.response.data.message;

      toast.error(
        error?.first_name || error?.last_name || error?.email || error?.password
      );
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const capitalizeFirstLetter = (str) => {
    if (!str) return str;
    return str.charAt(0).toUpperCase() + str.slice(1);
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
              <h1>Registration</h1>
              <p className={styles.sub_text}>
                Already used Cloud?{" "}
                <Link to="/login" className={styles.link}>
                  Login!
                </Link>
              </p>
            </div>
            <label htmlFor="first_name" className={styles.label}>
              First Name
            </label>
            <input
              type="text"
              name="first_name"
              id="first_name"
              value={capitalizeFirstLetter(formData.first_name)}
              autoCapitalize="on"
              onChange={handleChange}
              className={`${styles.input} ${styles.input_name}`}
            />
            <label htmlFor="last_name" className={styles.label}>
              Last Name
            </label>
            <input
              type="text"
              name="last_name"
              id="last_name"
              autoCapitalize="on"
              value={capitalizeFirstLetter(formData.last_name)}
              onChange={handleChange}
              className={styles.input}
            />
            <label htmlFor="email" className={styles.label}>
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
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
                value={formData.password}
                onChange={handleChange}
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
              type="submit"
              className={`btn ${styles.auth_btn}`}
              disabled={loading ? true : false}
            >
              Sign up
            </Button>
          </motion.form>
        </div>
      </div>
    </section>
  );
}
