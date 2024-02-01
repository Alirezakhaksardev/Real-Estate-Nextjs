import User from "@/models/User";
import { getServerSession } from "next-auth";
import { Types } from "mongoose";
import connectDB from "@/utils/connectDB";
import Profile from "@/models/Profile";

export async function POST(req) {
  try {
    await connectDB();

    const body = await req.json();
    const { title, description, location, phone, realState, price, constructionDate, category, amenities, rules } =
      body;

    const session = await getServerSession(req);

    if (!session) {
      return Response.json({ error: "لطفا وارد حساب کاربری خود شوید !", status: 401 });
    }

    const user = await User.findOne({ email: session.user.email });

    if (!user) {
      Response.json({ error: "حساب کاربری پیدا نشد!", status: 404 });
    }

    if (!title || !location || !description || !phone || !realState || !price || !constructionDate || !category) {
      return Response.json({ error: "لطفا اطلاعات معتبر وارد کنید" }, { status: 400 });
    }
    const newProfile = await Profile.create({
      title,
      description,
      location,
      phone,
      realState,
      constructionDate,
      amenities,
      rules,
      category,
      price: +price,
      userId: new Types.ObjectId(user._id),
    });
    console.log(newProfile);

    return Response.json({ message: "آگهی جدید اضافه شد" }, { status: 201 });
  } catch (err) {
    console.log(err);
    return Response.json({ error: "مشکلی در سرور رخ داده است !", status: 500 });
  }
}

export async function PATCH(req) {
  try {
    await connectDB();

    const body = await req.json();
    const { _id, title, description, location, phone, realState, price, constructionDate, category, amenities, rules } =
      body;

    const session = await getServerSession(req);

    if (!session) {
      return Response.json({ error: "لطفا وارد حساب کاربری خود شوید !", status: 401 });
    }

    const user = await User.findOne({ email: session.user.email });

    if (!user) {
      Response.json({ error: "حساب کاربری پیدا نشد!", status: 404 });
    }

    if (
      !_id ||
      !title ||
      !location ||
      !description ||
      !phone ||
      !realState ||
      !price ||
      !constructionDate ||
      !category
    ) {
      return Response.json({ error: "لطفا اطلاعات معتبر وارد کنید" }, { status: 400 });
    }

    const profile = await Profile.findOne({ _id });

    if(!user._id.equals(profile.userId)) Response.json({ error: "دسترسی شما به این اگهی مسدود شده است !" }, { status: 403 });

    profile.title = title;
    profile.description = description;
    profile.location = location;
    profile.phone = phone;
    profile.realState = realState;
    profile.price = price;
    profile.constructionDate = constructionDate;
    profile.amenities = amenities;
    profile.rules = rules;
    profile.category = category;
    profile.save();
    return Response.json({ message: "آگهی با موفقیت ویرایش شد" }, { status: 200 });

  } catch (err) {
    console.log(err);
    return Response.json({ error: "مشکلی در سرور رخ داده است !", status: 500 });
  }
}
