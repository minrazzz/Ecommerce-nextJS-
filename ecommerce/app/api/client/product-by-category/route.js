import connectDB from "@/backend/database/dbConnect";
import ProductModel from "@/backend/models/product";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(req) {
   try {
      await connectDB();
      const { searchParams } = new URL(req.url);
      const id = searchParams.get("id");
      const getData = await ProductModel.find({ category: id });
      console.log(getData);
      if (!getData) {
         return NextResponse.json({
            success: false,
            status: 204,
            message: "No Products found",
         });
      }
      return NextResponse.json({
         success: true,
         data: getData,
      });
   } catch (error) {
      console.log(error);
      return NextResponse.json({
         success: false,
         message: "Something went wrong ! Please try again later",
      });
   }
}
