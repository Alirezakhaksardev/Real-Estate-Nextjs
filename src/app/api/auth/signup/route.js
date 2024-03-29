import User from "@/models/User";
import { hashPassword } from "@/utils/auth";
import connectDB from "@/utils/connectDB";

export async function POST(req) {
  try {
    await connectDB();

    const { email, password } = await req.json();

    if (!email || !password) {
      return Response.json({ error: "لطفا اطلاعات معتبر وارد کنید" }, { status: 422 });
    }

    const existingUser = await User.findOne({email})

    if(existingUser){
        return Response.json({ error: "این حساب کاربری وجود دارد" }, { status: 422 });
    }

    const hashedPassword = await hashPassword(password);

    const newUser = await User.create({email : email, password : hashedPassword})

    return Response.json({ message: "حساب کاربری ایجاد شد !"  , data : newUser}, { status: 201 });

  } catch (err) {
    console.log(err);
    return Response.json({ err: "مشکلی در سرور رخ داده است" }, { status: 500 });
  }
}
