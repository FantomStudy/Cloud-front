import React, { useEffect, useState } from "react";
import file_styles from "../UserFilePage/File/File.module.css";
import { motion } from "motion/react";
import toast from "react-hot-toast";
import { fileAppear } from "../../configs/animate";
import Preloader from "../../components/Preloader/Preloader";
import Button from "../../components/Button/Button";
import { showAccessFiles } from "../../requests/accessRequests";
import { download } from "../../requests/fileRequests";

export default function RecievedFilePage() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [file, setFile] = useState({ id: "", name: "" });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await showAccessFiles();
        setData(response);
      } catch (err) {
        toast.error(err.response.data.message || "Error loading files!");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (file.id && file.name) {
      handleDownload();
    }
  }, [file]);

  const handleDownload = async () => {
    try {
      await download(file.id, file.name);
      toast.success("Download success!");
    } catch (err) {
      console.log(err);

      toast.error(err.response.data.message || "Failed download file");
    }
  };

  if (loading) {
    return <Preloader />;
  }

  return (
    <section>
      <div className="container">
        {data.map((file, index) => {
          return (
            <motion.div
              key={index}
              className={`${file_styles.received} ${file_styles.file}`}
              initial="hidden"
              animate="visible"
              variants={fileAppear}
              custom={index / 1.2}
            >
              <img src="/File_Blank.svg" alt="" className={file_styles.image} />

              <p className={file_styles.name}>{file.name}</p>

              <p className={file_styles.size}>{file.size}</p>
              <p className={file_styles.author}>{file.author}</p>
              <Button
                className={`btn ${file_styles.button}`}
                onClick={() => {
                  setFile({ name: file.name, id: file.file_id });
                }}
              >
                <img src="/Download.svg" alt="" />
              </Button>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
