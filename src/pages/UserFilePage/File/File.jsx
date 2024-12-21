import React, { useState, useEffect, useRef } from "react";
import styles from "./File.module.css";
import toast from "react-hot-toast";
import { motion } from "motion/react";
import { deleteFile, download, rename } from "../../../requests/fileRequests";
import { appearance, fileAppear } from "../../../configs/animate";
import Button from "../../../components/Button/Button";
import Modal from "../../../components/Modal/Modal";
import useModal from "../../../hooks/useModal";
import FileAccess from "../FileAccess/FileAccess";
import RenameForm from "./RenameForm/RenameForm";
import { data } from "react-router-dom";

/* props: id, name, size, author, access, onDelete, onRename, custom */

export default function File({ ...props }) {
  const [name, setName] = useState("");
  const [extension, setExtension] = useState("");
  const [renameMod, setRenameMod] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isShowingModal, toggleModal] = useModal();
  const ref = useRef();

  const nameSplit = (file_name) => {
    const file = file_name.split(".");
    const extension = file.pop();
    const name = file.join();
    return { name, extension };
  };

  useEffect(() => {
    const { name, extension } = nameSplit(props.name);
    setName(name);
    setExtension(extension);
  }, [props.name]);

  const handleClickOutside = (event) => {
    if (ref.current && !ref.current.contains(event.target)) {
      setIsVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleDownload = async () => {
    setIsVisible(false);

    try {
      await download(props.id, props.name);
      toast.success("Download success!");
    } catch (err) {
      console.log(err);

      toast.error(err.response.data.message || "Failed download file");
    }
  };

  const handleDelete = async () => {
    setIsVisible(false);

    try {
      const response = await deleteFile(props.id);
      toast.success(response.data.message);
      props.onDelete(props.id);
    } catch (err) {
      toast.error(err.response.data.message || "Failed deleting file");
    }
  };

  const handleRename = async (e) => {
    e.preventDefault();
    const newName = `${name}.${extension}`;

    try {
      const response = await rename(props.id, { name: newName });
      props.onRename(props.id, newName);
      toast.success("File was renamed");
    } catch (err) {
      toast.error(err.response.data.message.name);
      const { name: origName, extension: origExtension } = nameSplit(
        props.name
      );
      setName(origName);
      setExtension(origExtension);
    } finally {
      setRenameMod(false);
    }
  };

  return (
    <motion.div
      className={styles.file}
      initial="hidden"
      animate="visible"
      variants={fileAppear}
      custom={props.custom}
    >
      <img src="/File_Blank.svg" alt="" className={styles.image} />

      {renameMod ? (
        <RenameForm
          name={name}
          extension={extension}
          handleRename={handleRename}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
      ) : (
        <p className={styles.name}>{props.name}</p>
      )}

      <p className={styles.size}>{props.size}</p>
      <p className={styles.author}>{props.author}</p>

      <div className={styles.actions} ref={ref}>
        <button
          className={styles.more_button}
          onClick={() => {
            setIsVisible(true);
          }}
        />
        {isVisible && (
          <motion.div
            className={styles.dropdown_menu}
            variants={appearance}
            initial="hidden"
            animate="visible"
          >
            <Button children={"Download"} onClick={handleDownload} />
            <Button
              children={"Rename"}
              onClick={() => {
                setRenameMod(true);
                setIsVisible(false);
              }}
            />
            <Button
              children={"Share"}
              onClick={() => {
                toggleModal();
                setIsVisible(false);
              }}
            />
            <Button children={"Delete"} onClick={handleDelete} />
          </motion.div>
        )}
      </div>

      <Modal show={isShowingModal} onCloseClick={toggleModal}>
        <FileAccess
          id={props.id}
          file={props.name}
          initialAccess={props.access}
        />
      </Modal>
    </motion.div>
  );
}
