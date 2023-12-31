import connectDB from "@/backend/database/dbConnect";
import UserModel from "@/backend/models/user";
import { hash } from "bcryptjs";
import Joi from "joi";
import { NextResponse } from "next/server";

const schema = Joi.object({
   name: Joi.string().required(),
   email: Joi.string().email().required(),
   password: Joi.string().min(6).required(),
   role: Joi.string().required(),
});

export const dynamic = "force-dynamic";

export async function POST(req) {
   await connectDB();

   const { name, email, password, role } = await req.json();
   //validate the schema
   const { error } = schema.validate({ name, email, password, role });

   if (error) {
      return NextResponse.json({
         success: false,
         message: error.details[0].message,
      });
   }
   try {
      //check if the user exists or not
      const isUserAlreadyExists = await UserModel.findOne({ email });
      if (isUserAlreadyExists) {
         return NextResponse.json({
            success: false,
            message: "User already exists. Please try with different email",
         });
      } else {
         const hashPassword = await hash(password, 12); //to convert password to hash before create new user

         const newlyCreatedUser = await UserModel.create({
            name,
            email,
            password: hashPassword,
            role,
         });
         if (newlyCreatedUser) {
            return NextResponse.json({
               success: true,
               message: "Account Created Successfully!!",
            });
         }
      }
   } catch (error) {
      console.log("Error in new user registration");
      return NextResponse.json({
         success: false,
         message: "something went wrong Please try again later",
      });
   }
}
