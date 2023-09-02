import connectDB from "@/backend/database/dbConnect";
import ProductModel from "@/backend/models/product";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function DELETE(req) {
   try {
      await connectDB();
      //for getting id receiving in the params of the requested url
      const { searchParams } = new URL(req.url);
      const id = searchParams.get("id");
      if (!id) {
         return NextResponse.json({
            success: false,
            message: "Product ID is required !!",
         });
      }
      const deleteProduct = await ProductModel.findByIdAndDelete(id);
      if (!deleteProduct) {
         return NextResponse.json({
            success: false,
            message: "unable to delete the product, Please try again later!!",
         });
      }
      return NextResponse.json({
         success: true,
         message: "Product Deleted Successfully !!",
      });
   } catch (error) {
      console.log(error);
      return NextResponse.json({
         success: false,
         message: "Something went wrong ! Please try again later",
      });
   }
}
