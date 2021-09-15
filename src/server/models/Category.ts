import { prop, defaultClasses, getModelForClass } from '@typegoose/typegoose';

class CategoryClass extends defaultClasses.TimeStamps {
  @prop({ type: String })
  displayName!: string;
}

const Category = getModelForClass(CategoryClass);

export default Category;
