import CategoryTypegooseRepository from './CategoryTypegooseRepository';
import CategoryTypegooseModel from '../../models/category/CategoryTypegooseModel';
import CategoryRepository from './CategoryRepository';

const CategoryRepositoryFactory = (dbType: string): CategoryRepository => {
  if (dbType === 'mongodb')
    return new CategoryTypegooseRepository(CategoryTypegooseModel);

  throw new Error(`DB: ${dbType} is not supported`);
};

export default CategoryRepositoryFactory(process.env.DB_TYPE || '');
