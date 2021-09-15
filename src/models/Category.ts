import { Schema } from 'mongoose';
import db from '../db';

const CategorySchema = new Schema(
  {
    displayName: String
  },
  {
    timestamps: true
  }
);

const CategoryModel = db.getConnection().model('categories', CategorySchema);

export default CategoryModel;
