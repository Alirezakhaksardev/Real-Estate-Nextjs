"use client";

import Link from "next/link";
import { FiLogIn } from "react-icons/fi";
import { FaUserAlt } from "react-icons/fa";
import styles from "@/layout/Header.module.css";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

function Header() {
  const { data, status } = useSession();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status == "unauthenticated") setLoading(false);
    if (status == "authenticated") setLoading(false);
    else if (status == "loading") setLoading(true);
  }, [status]);

  return (
    <header className={styles.header}>
      <div>
        <ul>
          <li>
            <Link href="/">صفحه اصلی</Link>
          </li>
          <li>
            <Link href="/buy-residential">آگهی ها</Link>
          </li>
        </ul>
      </div>
      {loading ? (
        <></>
      ) : data ? (
        <div className={styles.login}>
          <Link href="/dashboard">
            <FaUserAlt />
          </Link>
        </div>
      ) : (
        <div className={styles.login}>
          <Link href="/signin">
            <FiLogIn />
            <span>ورود</span>
          </Link>
        </div>
      )}
    </header>
  );
}

export default Header;
