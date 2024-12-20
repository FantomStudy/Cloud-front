import React, { useState, useEffect, useRef } from "react";
import styles from "./UserFilePage.module.css";
import toast from "react-hot-toast";
import { motion } from "motion/react";
import Preloader from "../../components/Preloader/Preloader";
import { showMyFiles, upload } from "../../requests/fileRequests";
import File from "./File/File";
import { appearnce } from "../../animate";
import Button from "../../components/Button/Button";

export default function UserFilePage() {
  const fileInputRef = useRef();
  const [data, setData] = useState([]); // все файлы пользователя
  const [loading, setLoading] = useState(true);
  const [isDisable, setIsDisable] = useState(false);

  const [files, setFiles] = useState([]); // новые файлы

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await showMyFiles();

        setData(response);
      } catch (err) {
        toast.error(err.response.data.message || "Error loading files!");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // обновление списка при удалении файла
  const handleFileDeleted = (deletedFileId) => {
    setData((prevData) =>
      prevData.filter((file) => file.file_id !== deletedFileId)
    );
  };

  const handleFileRenamed = (fileId, newName) => {
    setData((prevData) =>
      prevData.map((file) =>
        file.file_id === fileId ? { ...file, name: newName } : file
      )
    );
  };

  const handleUpload = async () => {
    setIsDisable(true);

    try {
      const response = await upload({ files });

      const successful = response.data.filter((file) => file.success);
      if (successful.length > 0) {
        toast.success(`${successful.length} file(s) uploaded successfully!`);
      }
      setData((prevData) => [...prevData, ...successful]);

      const failed = response.data.filter((file) => file.success == false);
      failed.forEach((file) => {
        toast.error(`${file.name}: ${file.message}`);
      });
    } catch (err) {
      toast.error("Files was not uploaded");
    } finally {
      setFiles([]);
      setIsDisable(false);
    }
  };

  if (loading) {
    return <Preloader />;
  }

  return (
    <section>
      <div className="container">
        <div className={styles.upload_container}>
          <div className={styles.upload_form}>
            <Button
              className={`btn ${styles.upload_btn}`}
              onClick={() => {
                fileInputRef.current.click();
              }}
            >
              <img src="/Add_Plus.svg" alt="" />
              Add files
            </Button>
            <div className={styles.added_files}>
              {files.map((file, index) => {
                return (
                  <motion.div
                    key={index}
                    className={styles.add_file_wrap}
                    variants={appearnce}
                    initial="hidden"
                    animate="visible"
                    custom={index}
                  >
                    <img src="/File_Add.svg" alt="" />
                    <p>{file.name}</p>
                  </motion.div>
                );
              })}
            </div>

            <input
              type="file"
              multiple
              name="files"
              id="files"
              ref={fileInputRef}
              onChange={(e) => setFiles(Array.from(e.target.files))}
              className={styles.upload_input}
            />
          </div>

          <Button
            onClick={handleUpload}
            className={`btn ${styles.upload_btn}`}
            custom={1}
            disabled={isDisable ? true : false}
          >
            <img src="/Cloud_Check.svg" alt="" />
            Upload
          </Button>
        </div>
        <div className={styles.file_container}>
          {data.map((file, index) => {
            return (
              <File
                key={index}
                id={file.file_id}
                name={file.name}
                size={file.size}
                author={file.author.email}
                accesses={file.access}
                onDelete={handleFileDeleted}
                onRename={handleFileRenamed}
                custom={index / 1.2}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}
