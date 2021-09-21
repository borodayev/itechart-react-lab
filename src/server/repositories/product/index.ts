import ProductTypeOrmRepository from './ProductTypeOrmRepository';
import ProductTypegooseRepository from './ProductTypegooseRepository';
import ProductTypegooseModel from '../../models/product/ProductTypegooseModel';
import ProductRepository from './ProductRepository';

const ProductRepositoryFactory = (dbType: string): ProductRepository => {
  if (dbType === 'mongodb')
    return new ProductTypegooseRepository(ProductTypegooseModel);
  if (dbType === 'postgres') {
    return new ProductTypeOrmRepository();
  }

  throw new Error(`DB: ${dbType} is not supported`);
};

const a = ProductRepositoryFactory(process.env.DB_TYPE || '');

export default a;
