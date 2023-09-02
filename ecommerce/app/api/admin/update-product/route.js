import connectDB from "@/backend/database/dbConnect";
import ProductModel from "@/backend/models/product";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function PUT(req) {
   try {
      await connectDB();
      const extractData = await req.json();
      const {
         _id,
         name,
         description,
         Price,
         imageUrl,
         category,
         sizes,
         deliveryInfo,
         onSale,
         priceDrop,
      } = extractData;
      const updatedProduct = await ProductModel.findByIdAndUpdate(
         { _id },
         {
            name,
            description,
            Price,
            imageUrl,
            category,
            sizes,
            deliveryInfo,
            onSale,
            priceDrop,
         },
         { new: true }
      );
      if (updatedProduct) {
         return NextResponse.json({
            success: true,
            message: "Product updated Successfully",
            data: updatedProduct,
         });
      } else {
         return NextResponse.json({
            success: false,
            message: "Failed to update product ! Please try again later",
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
