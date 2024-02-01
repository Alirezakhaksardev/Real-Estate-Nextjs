import Profile from "@/models/Profile";
import User from "@/models/User";
import connectDB from "@/utils/connectDB";
import { getServerSession } from "next-auth";

export async function DELETE(req, context) {
  try {
    await connectDB();


    const id = context.params.profileId;


    const session = await getServerSession(req);

    if (!session) {
      return Response.json({ error: "لطفا وارد حساب کاربری خود شوید !", status: 401 });
    }

    const user = await User.findOne({ email: session.user.email });

    if (!user) {
      Response.json({ error: "حساب کاربری پیدا نشد!", status: 404 });
    }

    const profile = await Profile.findOne({ _id : id});

    if(!user._id.equals(profile.userId)) Response.json({ error: "دسترسی شما به این اگهی مسدود شده است !" }, { status: 403 });

    await Profile.deleteOne({_id : id});

    return Response.json({ message: "آگهی مورد نظر حذف شد حذف شد" }, { status: 200 });


  } catch (err) {
    console.log(err);
    return Response.json({ error: "مشکلی در سرور رخ داده است !", status: 500 });
  }
}
