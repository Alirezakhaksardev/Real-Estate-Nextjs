"use client";

import React, { useState } from "react";
import styles from "@/templates/SignupPage.module.css";
import Link from "next/link";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { ThreeDots } from "react-loader-spinner";
import Loader from "@/modules/Loader";

function SignupPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    repassword: "",
  });

  const [loading, setLoading] = useState(false);

  const changHandler = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const router = useRouter();
  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (!formData.email || !formData.password || !formData.repassword) {
      toast.error("لطفا تمامی فیلد ها را پر کنید !");
      setLoading(false);
      return;
    }
    if (formData.password !== formData.repassword) {
      toast.error("رمز و تکرار آن برابر نیست !");
      setLoading(false);
      return;
    }

    const res = await fetch("/api/auth/signup", {
      method: "POST",
      body: JSON.stringify({ email: formData.email, password: formData.password }),
      headers: { "Content-Type": "apllication/json" },
    });
    const data = await res.json();
    console.log(data)
    if (res.status === 201) {
      router.push("/signin");
      
    } else {
      toast.error(data.error);
      setLoading(false);
    }
  };

  return (
    <div className={styles.form}>
      <h4>فرم ثبت نام</h4>
      <form onSubmit={submitHandler}>
        <label htmlFor="email">ایمیل :</label>
        <input type="text" id="email" name="email" value={formData.email} onChange={changHandler} />

        <label htmlFor="password">رمز عبور :</label>
        <input type="password" id="password" name="password" value={formData.password} onChange={changHandler} />

        <label htmlFor="repassword">تکرار پسورد :</label>
        <input type="password" id="repassword" name="repassword" value={formData.repassword} onChange={changHandler} />

        {!loading && <button type="submit">ثبت نام</button>}
        <Loader/>
      </form>
      <p>
        حساب کاربری دارید ؟<Link href="/signin">ورود</Link>
      </p>
      <Toaster />
    </div>
  );
}

export default SignupPage;
