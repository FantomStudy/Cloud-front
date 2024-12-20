import React, { useState, useEffect, useRef } from "react";
import styles from "./File.module.css";
import toast from "react-hot-toast";
import { motion } from "motion/react";
import {
  deleteFile,
  download,
  renameFile,
} from "../../../requests/fileRequests";
import { appearnce, fileAppear } from "../../../animate";
import Button from "../../../components/Button/Button";
import Modal from "../../../components/Modal/Modal";
import useModal from "../../../requests/useModal";
import FileAccess from "../FileAccess/FileAccess";

// props: id, name, size, author, accesses, onDelete, onRename, custom
export default function File({ ...props }) {
  const [name, setName] = useState("");
  const [extension, setExtension] = useState("");
  const [renameMod, setRenameMod] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isShowingModal, toggleModal] = useModal();
  const ref = useRef();

  useEffect(() => {
    const { name, extension } = nameSplit(props.name);
    setName(name);
    setExtension(extension);
  }, [props.name]);

  const handleDownload = async () => {
    setIsVisible(false);

    try {
      const response = await download(props.id, props.name);
      toast.success("Download success!");
    } catch (err) {
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
      const response = await renameFile(props.id, { name: newName });
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

  const nameSplit = (file_name) => {
    const file = file_name.split(".");
    const extension = file.pop();
    const name = file.join();
    return { name, extension };
  };

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
        <form onSubmit={handleRename} className={styles.rename_mod}>
          <input
            type="text"
            name="name"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
            className={styles.rename_input}
          ></input>
          <p>
            {"."}
            {nameSplit(props.name).extension}
          </p>
          <Button type="submit" className="btn">
            Save
          </Button>
        </form>
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
        ></button>
        {isVisible && (
          <motion.div
            className={styles.dropdown_menu}
            variants={appearnce}
            initial="hidden"
            animate="visible"
          >
            <Button onClick={handleDownload}>Download</Button>
            <Button
              onClick={() => {
                setRenameMod(true);
                setIsVisible(false);
              }}
            >
              Rename
            </Button>
            <Button
              onClick={() => {
                toggleModal();
                setIsVisible(false);
              }}
            >
              Share
            </Button>
            <Button onClick={handleDelete}>Delete</Button>
          </motion.div>
        )}
      </div>
      <Modal show={isShowingModal} onCloseClick={toggleModal}>
        <FileAccess file={props.name} accesses={props.accesses} />
        
      </Modal>
    </motion.div>
  );
}
