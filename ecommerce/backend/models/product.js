import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
   {
      name: String,
      price: Number,
      Price: Number,
      dPrice: "String",
      description: String,
      category: String,
      sizes: Array,
      deliveryInfo: String,
      onSale: String,
      priceDrop: Number,
      imageUrl: String,
   },
   { timestamps: true }
);

const ProductModel =
   mongoose.models.ProductModels ||
   mongoose.model("ProductModels", ProductSchema);

export default ProductModel;
