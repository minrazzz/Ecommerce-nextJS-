import connectDB from "@/backend/database/dbConnect";
import UserModel from "@/backend/models/user";
import { compare } from "bcryptjs";
import Joi from "joi";
import jwt from "jsonwebtoken";

import { NextResponse } from "next/server";

export const dynamic = "force-dynamic"; //using it will allow full skip to full route and data cache usefull for frequently changing component and real-time data rendering

const schema = Joi.object({
   email: Joi.string().required(),
   password: Joi.string().required(),
});

export async function POST(req) {
   await connectDB();
   const { email, password } = await req.json();
   // console.log(email, password);
   const { error } = schema.validate({ email, password });

   if (error) {
      return NextResponse.json({
         success: false,
         message: error.details[0].message,
      });
   }
   try {
      const checkUser = await UserModel.findOne({ email });
      // console.log("checkUser", checkUser);
      if (!checkUser) {
         return NextResponse.json({
            success: false,
            message: "Account not found with this email",
         });
      }

      const checkPassword = await compare(password, checkUser.password);
      if (!checkPassword) {
         return NextResponse.json({
            success: false,
            message: "Incorrect password please try again",
         });
      }

      const tokenPayload = {
         id: checkUser?._id,
         email: checkUser?.email,
         role: checkUser?.role,
      };

      const demoSecretKey = "default_secretKey";
      const token = jwt.sign(tokenPayload, demoSecretKey, { expiresIn: "1d" }); //token created

      const finalData = {
         token,
         user: {
            email: checkUser?.email,
            name: checkUser?.name,
            id: checkUser?._id,
            role: checkUser?.role,
         },
      };

      return NextResponse.json({
         success: true,
         message: "Login Successfully",
         finalData,
      });
   } catch (error) {
      console.log(error);
      return NextResponse.json({
         success: false,
         message: "Something went wrong please try again later",
      });
   }
}
