import connectDB from "@/backend/database/dbConnect";
import ProductModel from "@/backend/models/product";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
   try {
      await connectDB();
      const user = "admin";

      if (user === "admin") {
         const extractAllProducts = await ProductModel.find({});
         // console.log(extractAllProducts);
         if (extractAllProducts) {
            return NextResponse.json({
               success: true,
               data: extractAllProducts,
            });
         } else {
            return NextResponse.json({
               success: false,
               status: 204,
               message: "No Products found",
            });
         }
      } else {
         return NextResponse.json({
            success: false,
            message: "you are not authorized",
         });
      }
   } catch (error) {
      console.log(error);
      return NextResponse.json({
         success: false,
         message: "Something went wrong ! Please try again later",
      });
   }
}
