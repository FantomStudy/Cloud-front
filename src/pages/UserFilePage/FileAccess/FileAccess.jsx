import React from "react";
import styles from "./FileAccess.module.css";
import Button from "../../../components/Button/Button";

export default function FileAccess({ file, accesses }) {
  return (
    <div>
      <p>Access to file: {file}</p>
      {accesses.map((access, index) => {
        return (
          <div key={index} className={styles.access}>
            <img src="/User_03.svg" alt="" className={styles.user} />

            <p key={index}>{access.full_name}</p>
            <p key={index}>{access.email}</p>

            <Button className="btn danger">Remove</Button>
          </div>
        );
      })}
    </div>
  );
}
