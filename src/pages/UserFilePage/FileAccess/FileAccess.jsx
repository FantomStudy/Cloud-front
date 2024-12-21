import React, { useState } from "react";
import styles from "./FileAccess.module.css";
import Button from "../../../components/Button/Button";
import { addAccess, removeAccess } from "../../../requests/accessRequests";
import toast from "react-hot-toast";
import { motion } from "motion/react";
import { fileAppear } from "../../../configs/animate";

export default function FileAccess({ id, file, initialAccess }) {
  const [accessList, setAccessList] = useState(initialAccess);
  const [addEmail, setAddEmail] = useState("");

  const handleAdd = async (e) => {
    e.preventDefault();

    try {
      const response = await addAccess(id, { email: addEmail });
      setAccessList(response.data);

      toast.success(`Now ${addEmail} have access to this file`);
    } catch (err) {
      toast.error(err.response.data.message || "Couldn't grant access");
      console.log(err);
    }
  };

  const handleRemove = async (email) => {
    try {
      const response = await removeAccess(id, { email });
      setAccessList(response.data);

      toast.success(`${email} no longer has access to file`);
    } catch (err) {
      toast.error(err.response.data.message || "Couldn't restrict access!");
    }
  };

  return (
    <div className={styles.access_modal}>
      <h3>Access to file: {file}</h3>
      <p>Enter email to give access:</p>
      <form className={styles.access_form} onSubmit={handleAdd}>
        <input
          type="email"
          id="addEmail"
          name="addEmail"
          value={addEmail}
          onChange={(e) => {
            setAddEmail(e.target.value);
          }}
        />
        <Button type="submit" className="btn">
          <img src="/Add_Plus.svg" alt="" />
          Add
        </Button>
      </form>

      {accessList.map((access, index) => {
        return (
          <motion.div
            key={index}
            className={styles.access}
            initial="hidden"
            animate="visible"
            variants={fileAppear}
          >
            <img src="/User_03.svg" alt="" className={styles.user} />
            <p className={styles.full_name}>{access.full_name}</p>
            <p className={styles.email}>{access.email}</p>
            {access.type == "author" ? (
              <p className={styles.owner}>Owner of file</p>
            ) : (
              <Button
                className={`btn danger ${styles.btn}`}
                onClick={() => handleRemove(access.email)}
              >
                <img src="/Trash_Empty.svg" alt="" />
                Remove
              </Button>
            )}
          </motion.div>
        );
      })}
    </div>
  );
}
