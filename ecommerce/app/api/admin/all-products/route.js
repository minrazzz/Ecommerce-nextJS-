import connectDB from "@/backend/database/dbConnect";
import ProductModel from "@/backend/models/product";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
   try {
      await connectDB();
      const extractAllProducts = await ProductModel.find({});
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
   } catch (error) {
      console.log(error);
      return NextResponse.json({
         success: false,
         message: "Something went wrong ! Please try again later",
      });
   }
}
