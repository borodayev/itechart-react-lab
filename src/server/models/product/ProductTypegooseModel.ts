import { Types } from 'mongoose';
import {
  prop,
  modelOptions,
  defaultClasses,
  getModelForClass,
  index
} from '@typegoose/typegoose';
import { v4 as uuidv4 } from 'uuid';

@index({ displayName: 'text' })
@index({ totalRating: 1 })
@index({ price: 1 })
@modelOptions({
  schemaOptions: { collection: 'products' }
})
export class Product extends defaultClasses.TimeStamps {
  @prop({ type: String, default: uuidv4 })
  _id!: string;

  @prop({ type: String })
  displayName!: string;

  @prop({ type: Types.ObjectId })
  categoryIds!: Types.ObjectId[];

  @prop({ type: Number })
  totalRating!: number;

  @prop({ type: Number })
  price!: number;
}

const ProductTypegooseModel = getModelForClass(Product);
export default ProductTypegooseModel;
