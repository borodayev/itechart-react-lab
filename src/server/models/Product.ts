import { Types } from 'mongoose';
import {
  prop,
  modelOptions,
  defaultClasses,
  getModelForClass
} from '@typegoose/typegoose';
import db from '../db';

@modelOptions({
  schemaOptions: { collection: 'products' },
  existingConnection: db.getConnection()
})
class ProductClass extends defaultClasses.TimeStamps {
  @prop({ type: String })
  public displayName!: string;

  @prop({ type: Types.ObjectId })
  public categoryId!: Types.ObjectId;

  @prop({ type: Number })
  public totalRating!: number;

  @prop({ type: Number })
  public price!: number;
}

const Product = getModelForClass(ProductClass);

export default Product;
