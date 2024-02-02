"use client";

import { useEffect, useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { LuShare2 } from "react-icons/lu";
import styles from "@/modules/ShareButton.module.css";
import toast from "react-hot-toast";

function ShareButton() {
  const [url, setUrl] = useState("");

  useEffect(() => {
    setUrl(window.location.href);
  }, []);

  const handClick = () => {
    toast.success("آدرس آگهی با موفقیت کپی شد !")
  }

  return (
    <CopyToClipboard text={url}>
      <div className={styles.container} onClick={handClick}>
        <LuShare2 />
        <button>اشتراک گذاری</button>
      </div>
    </CopyToClipboard>
  );
}

export default ShareButton;
