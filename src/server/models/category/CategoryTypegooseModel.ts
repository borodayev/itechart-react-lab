import {
  prop,
  defaultClasses,
  getModelForClass,
  modelOptions
} from '@typegoose/typegoose';
import { v4 as uuidv4 } from 'uuid';

@modelOptions({
  schemaOptions: { collection: 'categories' }
})
export class Category extends defaultClasses.TimeStamps {
  @prop({ type: String, default: uuidv4 })
  _id!: string;

  @prop({ type: String })
  displayName!: string;
}

const CategoryTypegooseModel = getModelForClass(Category);

export default CategoryTypegooseModel;
