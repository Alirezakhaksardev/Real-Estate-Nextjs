import connectDB from "@/utils/connectDB";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import User from "@/models/User";
import DashboardSidebar from "@/layout/DashboardSidebar";
import AdminPage from "@/templates/AdminPage";
import Profile from "@/models/Profile";

export const metadata = {
  title: "پنل کاربری املاک | پروژه تمرینی",
};

async function Admin() {
  await connectDB();
  const session = await getServerSession(authOptions);
  if (!session) return redirect("/signin");

  const user = await User.findOne({ email: session.user.email });
  if (!user) return redirect("/signin");

  if (user.role != "ADMIN") redirect("/dashboard");

  const profiles = await Profile.find({ published: false }).select("-userId");

  return (
    <DashboardSidebar role={user.role} email={session?.user.email}>
      <AdminPage profiles={profiles} />
    </DashboardSidebar>
  );
}

export default Admin;
