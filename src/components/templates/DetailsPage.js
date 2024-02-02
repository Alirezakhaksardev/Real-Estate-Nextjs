import React from "react";
import { SiHomebridge } from "react-icons/si";
import { AiOutlinePhone } from "react-icons/ai";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { BiCalendarCheck } from "react-icons/bi";
import styles from "@/templates/DetailsPage.module.css";
import { e2p, sp } from "@/utils/replaceNumber";
import { icons } from "@/constants/icons";
import { categories } from "@/constants/strings";
import ItemList from "@/modules/ItemList";
import Title from "@/modules/Title";
import ShareButton from "@/modules/ShareButton";
import { Toaster } from "react-hot-toast";

function DetailsPage({
  data: { title, location, description, amenities, rules, realState, phone, price, category, constructionDate },
}) {
  return (
    <div className={styles.container}>
      <Toaster />
      <div className={styles.main}>
        <h1>{title}</h1>
        <span>
          <HiOutlineLocationMarker />
          {location}
        </span>
        <Title>توضیحات</Title>
        <p>{description}</p>
        <Title>امکانات رفاهی</Title>
        <ItemList data={amenities} />
        <Title>قوانین</Title>
        <ItemList data={rules} />
      </div>
      <div className={styles.sidebar}>
        <div className={styles.realState}>
          <SiHomebridge />
          <p>املاک {realState}</p>
          <span>
            <AiOutlinePhone />
            {e2p(phone)}
          </span>
        </div>
        <ShareButton />
        <div className={styles.price}>
          <p>
            {icons[category]}
            {categories[category]}
          </p>
          <p>{sp(price)} تومان</p>
          <p>
            <BiCalendarCheck />
            {new Date(constructionDate).toLocaleDateString("fa-IR")}
          </p>
        </div>
      </div>
    </div>
  );
}

export default DetailsPage;
