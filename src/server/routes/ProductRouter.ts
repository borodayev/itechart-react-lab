import { Router, Request, Response, NextFunction } from 'express';
import ProductRepository from '../repositories/product';

const ProductRouter = Router();

const parseGetParameters = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { displayName, minRating, price, sortBy, page } = req.query;
  const parsedParameters: Record<string, unknown> = {};
  try {
    if (displayName) {
      parsedParameters.displayName = displayName;
    }

    if (minRating) {
      parsedParameters.minRating = parseInt(minRating.toString(), 10);
    }

    if (price) {
      const [minPrice, maxPrice] = price.toString().split(':');
      if (minPrice)
        parsedParameters.minPrice = parseInt(minPrice.toString(), 10);
      if (maxPrice)
        parsedParameters.maxPrice = parseInt(maxPrice.toString(), 10);
    }

    if (sortBy) {
      const [fieldName, order] = sortBy.toString().split(':');
      if (fieldName && order) parsedParameters.sortBy = { fieldName, order };
    }

    if (page) {
      parsedParameters.page = parseInt(page.toString(), 10);
    }

    res.locals.parsedParameters = parsedParameters;
    next();
  } catch (error) {
    next(error);
  }
};

ProductRouter.get('/', parseGetParameters, async (_, res) => {
  const searchParameters = res.locals.parsedParameters;
  const products = await ProductRepository.findAll(searchParameters);
  res.send(products);
});

export default ProductRouter;
