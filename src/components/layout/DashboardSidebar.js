import Link from "next/link";
import { CgProfile } from "react-icons/cg";
import LogoutButton from "../modules/LogoutButton";
import styles from "@/layout/DashboardSidebar.module.css"

function DashboardSidebar({children, email}) {
  return (
    <div className={styles.container}>
        <div className={styles.sidebar}>
             <CgProfile />
            <p>{email}</p>
            <span></span>
            <Link href="/dashboard">حساب کاربری</Link>
            <Link href="/dashboard/my-profiles">آگهی های من</Link>
            <Link href="/dashboard/add">ثبت آگهی</Link>            
            <LogoutButton />
        </div>
        <div className={styles.main}>
            {children}
        </div>
    </div>
  )
}

export default DashboardSidebar