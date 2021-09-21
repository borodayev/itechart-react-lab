import {
  prop,
  defaultClasses,
  getModelForClass,
  modelOptions
} from '@typegoose/typegoose';

@modelOptions({
  schemaOptions: { collection: 'products' }
})
class CategoryClass extends defaultClasses.TimeStamps {
  @prop({ type: String })
  displayName!: string;
}

const Category = getModelForClass(CategoryClass);

export default Category;
