import connectDB from "@/backend/database/dbConnect";
import ProductModel from "@/backend/models/product";
import Joi from "joi";
import { NextResponse } from "next/server";

// const addNewProductSchema = Joi.object({
//    name: Joi.string().required(),
//    description: Joi.string().required(),
//    price: Joi.number().required(),
//    category: Joi.string().required(),
//    sizes: Joi.array().required(),
//    deliveryInfo: Joi.string().required(),
//    onSale: Joi.string().required(),
//    priceDrop: Joi.number().required(),
//    imageUrl: Joi.string().required(),
// });

const addNewProductSchema = Joi.object({
   name: Joi.string().required(),
   Price: Joi.number().required(),

   description: Joi.string().required(),
   category: Joi.string().required(),
   sizes: Joi.array().required(),
   deliveryInfo: Joi.string().required(),
   onSale: Joi.string().required(),
   priceDrop: Joi.number().required(),
   imageUrl: Joi.string().required(),
});

export const dynamic = "force-dynamic";

export async function POST(req) {
   try {
      await connectDB();
      const user = "admin"; // will be getting this later from the middleware

      if (user === "admin") {
         const extractData = await req.json();
         console.log("payload", extractData);

         const {
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

         const { error } = addNewProductSchema.validate({
            name,
            description,
            Price,
            imageUrl,
            category,
            sizes,
            deliveryInfo,
            onSale,
            priceDrop,
         });

         if (error) {
            return NextResponse.json({
               success: false,
               message: error.details[0].message,
            });
         }

         const newlyCreatedProduct = await new ProductModel({
            name,
            description,

            Price,

            imageUrl,
            category,
            sizes,
            deliveryInfo,
            onSale,
            priceDrop,
         });
         await newlyCreatedProduct.save();
         console.log("response", newlyCreatedProduct);

         if (newlyCreatedProduct) {
            return NextResponse.json({
               success: true,
               message: "Product Added Successfully",
               data: newlyCreatedProduct,
            });
         } else {
            return NextResponse.json({
               success: false,
               message: "Failed to add the product !",
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
