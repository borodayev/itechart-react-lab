import { Types } from 'mongoose';
import {
  prop,
  modelOptions,
  defaultClasses,
  getModelForClass
} from '@typegoose/typegoose';
import { v4 as uuidv4 } from 'uuid';

@modelOptions({
  schemaOptions: { collection: 'products' }
})
export class ProductEntity extends defaultClasses.TimeStamps {
  @prop({ type: String, default: uuidv4 })
  _id!: string;

  @prop({ type: String })
  displayName!: string;

  @prop({ type: Types.ObjectId })
  categoryId!: Types.ObjectId;

  @prop({ type: Number })
  totalRating!: number;

  @prop({ type: Number })
  price!: number;
}

const ProductTypegooseModel = getModelForClass(ProductEntity);
export default ProductTypegooseModel;
