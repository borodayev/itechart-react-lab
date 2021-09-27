import type { ReturnModelType, DocumentType } from '@typegoose/typegoose';
import { Product } from 'server/models/product/ProductTypegooseModel';
import ProductDTO from 'server/dtos/ProductDTO';
import { FilterQuery } from 'mongoose';
import ProductRepository, {
  ProductSearchParameters
} from './ProductRepository';

export default class ProductTypegooseRepository implements ProductRepository {
  private model: ReturnModelType<typeof Product>;

  private PER_PAGE = 3;

  constructor(model: ReturnModelType<typeof Product>) {
    this.model = model;
  }

  static toDto(product: Product): ProductDTO {
    const { _id, displayName, price, totalRating } = product;
    return { id: _id, displayName, price, totalRating };
  }

  async save(product: ProductDTO): Promise<void> {
    const isExists = await this.exists(product);
    if (isExists) {
      await this.model.updateOne({ _id: product.id }, { $set: { ...product } });
    } else {
      await this.model.create(product);
    }
  }

  exists(product: ProductDTO): Promise<boolean> {
    return this.model.exists({ _id: product.id });
  }

  async delete(product: ProductDTO): Promise<void> {
    await this.model.remove({ _id: product.id });
  }

  async findByPrice(price: number): Promise<ProductDTO | null> {
    const product = await this.model.findOne({ price });
    if (!product) return null;
    return ProductTypegooseRepository.toDto(product);
  }

  async findAll(
    searchParameters: ProductSearchParameters
  ): Promise<ProductDTO[] | []> {
    const {
      displayName,
      maxPrice,
      minPrice,
      sortBy,
      minRating,
      page = 1
    } = searchParameters;
    const filter: FilterQuery<DocumentType<Product>> = {
      ...(displayName && { displayName }),
      ...(minRating && { totalRating: { $gte: minRating } })
    };

    if (maxPrice || minPrice) {
      filter.price = {
        ...(minPrice && { $gte: minPrice }),
        ...(maxPrice && { $lte: maxPrice })
      };
    }

    const sort = sortBy
      ? { [sortBy.fieldName]: sortBy.order === 'asc' ? 1 : -1 }
      : {};

    const offset = page * this.PER_PAGE;

    const productsQuery = this.model
      .find(filter)
      .sort(sort)
      .limit(this.PER_PAGE);

    if (page > 1) productsQuery.skip(offset);

    const products = await productsQuery;
    return products.map(ProductTypegooseRepository.toDto);
  }
}
