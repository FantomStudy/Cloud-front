import React, { useState, useEffect, useRef } from "react";
import styles from "./UserFilePage.module.css";
import toast from "react-hot-toast";
import { motion } from "motion/react";
import { fileAppear } from "../../configs/animate";
import Preloader from "../../components/Preloader/Preloader";
import Button from "../../components/Button/Button";
import { showUserFiles, upload } from "../../requests/fileRequests";
import FileList from "./FileList/FileList";

export default function UserFilePage() {
  const fileInputRef = useRef();
  const [data, setData] = useState([]); // все файлы пользователя
  const [files, setFiles] = useState([]); // новые файлы
  const [loading, setLoading] = useState(true);
  const [isDisable, setIsDisable] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await showUserFiles();
        setData(response);
      } catch (err) {
        toast.error(err.response.data.message || "Error loading files!");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

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
      successful.forEach((file) => {
        file.access = [
          {
            full_name: `${file.author.first_name} ${file.author.last_name}`,
            email: file.author.email,
            type: "author",
          },
        ];
      });

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

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    const validFiles = [];

    selectedFiles.forEach((file) => {
      if (file.size > 5 * 1024 * 1024) {
        toast.error(`File ${file.name} is too large. The size limit is 5MB.`);
      } else {
        validFiles.push(file);
      }
    });
    setFiles(validFiles);
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
                    variants={fileAppear}
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
              onChange={handleFileChange}
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

        <FileList
          files={data}
          onDelete={handleFileDeleted}
          onRename={handleFileRenamed}
        />
      </div>
    </section>
  );
}
