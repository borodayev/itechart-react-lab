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
class CategoryClass extends defaultClasses.TimeStamps {
  @prop({ type: String, default: uuidv4 })
  _id!: string;

  @prop({ type: String })
  displayName!: string;
}

const Category = getModelForClass(CategoryClass);

export default Category;
