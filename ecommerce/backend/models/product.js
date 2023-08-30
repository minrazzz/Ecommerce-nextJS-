import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
   {
      name: String,
      description: String,
      Price: Number,
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
