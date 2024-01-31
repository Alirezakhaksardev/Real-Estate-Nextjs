"use client";

import { useState } from "react";
import styles from "@/templates/AddProfilePage.module.css";
import TextInput from "@/modules/TextInput";
import RadioList from "@/modules/RadioList";
import TextList from "@/modules/TextList";
import CustomDatePicker from "@/modules/CustomDatePicker";

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
  const submitHandler = async (e) => {
    e.preventDefault();

    const res = await fetch('/api/profile' , {
      method : "POST",
      body : JSON.stringify(profileData),
      headers : {"Content-Type" : "application/json"}
    })
    
    const data = await res.json();
    if(data.error){
      console.log(data)
    }else{
      console.log({"success":data})
    }

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
      <CustomDatePicker
        profileData={profileData}
        setProfileData={setProfileData}
      />

      <button className={styles.submit} type="submit"> ثبت آگهی</button>
    </form>
  );
}

export default AddProfilePage;
