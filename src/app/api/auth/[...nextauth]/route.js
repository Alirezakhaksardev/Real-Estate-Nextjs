import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import connectDB from "@/utils/connectDB";
import User from "@/models/User";
import { verifyPassword } from "@/utils/auth";

const handler = NextAuth({
  session: { strategy: "jwt" },

  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        const { email, password } = credentials;

        try {
          await connectDB();
        } catch (err) {
          throw new Error("مشکلی در سرور رخ داده است !");
        }

        // Check vlid Data
        if ((!email, !password)) throw new Error("لطفا اطلاعات معتبر وارد کنید !");
        // Check Exist User
        const user = await User.findOne({ email });
        if (!user) throw new Error("لطفا ابتدا حساب کاربری ایجاد کنید !");

        // Check password
        const isValid = await verifyPassword(password, user.password);
        if (!isValid) throw new Error("ایمیل یا رمز عبور اشتباه است!");

        // Success To Login
        return { email };
      },
    }),
  ],
});

export { handler as GET, handler as POST };
