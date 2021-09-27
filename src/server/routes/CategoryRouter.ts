import { Router } from 'express';
import CategoryRepository from '../repositories/category';

const CategoryRouter = Router();

CategoryRouter.get('/', async (req, res) => {
  const { includeProducts, includeTop3Products } = req.query;
  let categories = await CategoryRepository.findAll();

  if (includeProducts) {
    categories = await CategoryRepository.findAllWithProducts(
      !!includeTop3Products
    );
  }
  res.send(categories);
});

export default CategoryRouter;
