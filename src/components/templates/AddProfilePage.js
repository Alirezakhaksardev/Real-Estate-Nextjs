"use client";

import { useState } from "react";
import styles from "@/templates/AddProfilePage.module.css";
import TextInput from "@/modules/TextInput";
import RadioList from "@/modules/RadioList";
import TextList from "@/modules/TextList";

function AddProfilePage() {
  const [profileData, setProfileData] = useState({
    title: "",
    description: "",
    location: "",
    phone: "",
    price: "",
    realState: "",
    constractionDate: new Date(),
    category: "",
    rules: [],
    amenities: [],
  });
  const submitHandler = (e) => {
    e.preventDefault();
    console.log(profileData);
  };
  return (
    <form onSubmit={submitHandler} className={styles.container}>
      <h3>ثبت آگهی</h3>
      <TextInput title="عنوان آگهی" name="title" profileData={profileData} setProfileData={setProfileData} />
      <TextInput
        title="توضیحات"
        name="description"
        profileData={profileData}
        setProfileData={setProfileData}
        textarea={true}
        />
      <TextInput title="آدرس" name="location" profileData={profileData} setProfileData={setProfileData} />
      <TextInput title="شماره تلفن" name="phone" profileData={profileData} setProfileData={setProfileData} />
      <TextInput title="قیمت (تومان)" name="price" profileData={profileData} setProfileData={setProfileData} />
      <TextInput title="بنگاه" name="realState" profileData={profileData} setProfileData={setProfileData} />
    
      <RadioList profileData={profileData} setProfileData={setProfileData} />

      <TextList title="امکانات رفاهی" profileData={profileData} setProfileData={setProfileData} type={"amenities"} />
      <TextList title="قوانین" profileData={profileData} setProfileData={setProfileData} type={"rules"} />
      <button className={styles.submit} type="submit"> ثبت آگهی</button>
    </form>
  );
}

export default AddProfilePage;
