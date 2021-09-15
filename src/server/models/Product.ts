import { Schema } from 'mongoose';
import db from '../db';

const ProductSchema = new Schema(
  {
    displayName: String,
    categoryId: Schema.Types.ObjectId,
    totalRating: Number,
    price: Number
  },
  {
    timestamps: true
  }
);

const Product = db.getConnection().model('products', ProductSchema);

export default Product;
