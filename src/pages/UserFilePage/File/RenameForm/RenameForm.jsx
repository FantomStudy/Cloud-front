import React from "react";
import styles from "../File.module.css";
import Button from "../../../../components/Button/Button";

export default function RenameForm({
  name,
  extension,
  handleRename,
  onChange,
}) {
  return (
    <form onSubmit={handleRename} className={styles.rename_mod}>
      <div className={styles.rename_file}>
        <input
          type="text"
          name="name"
          value={name}
          onChange={onChange}
          className={styles.rename_input}
        ></input>

        <p>{`.${extension}`}</p>
      </div>

      <Button type="submit" className="btn">
        <img src="/Edit_Pencil_01.svg" alt="" />
        Save
      </Button>
    </form>
  );
}
