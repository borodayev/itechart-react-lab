import CategoryDTO from 'server/dtos/CategoryDTO';
import { Category } from 'server/models/category/CategoryTypegooseModel';
import { Product } from 'server/models/product/ProductTypegooseModel';
import type { ReturnModelType } from '@typegoose/typegoose';
import ProductTypegooseRepository from '../product/ProductTypegooseRepository';

export default class CategoryTypegooseRepository {
  private model: ReturnModelType<typeof Category>;

  constructor(model: ReturnModelType<typeof Category>) {
    this.model = model;
  }

  static toDto(category: Category & { products?: Product[] }): CategoryDTO {
    const { _id, displayName, products } = category;
    let productsDto;
    if (products) {
      productsDto = products.map(ProductTypegooseRepository.toDto);
    }
    return { id: _id, displayName, products: productsDto };
  }

  async save(category: CategoryDTO): Promise<void> {
    const isExists = await this.exists(category);
    if (isExists) {
      await this.model.updateOne(
        { _id: category.id },
        { $set: { ...category } }
      );
    } else {
      await this.model.create(category);
    }
  }

  exists(category: CategoryDTO): Promise<boolean> {
    return this.model.exists({ _id: category.id });
  }

  async delete(category: CategoryDTO): Promise<void> {
    await this.model.remove({ _id: category.id });
  }

  async findAll(): Promise<CategoryDTO[] | []> {
    const categories = await this.model.find();
    return categories.map(CategoryTypegooseRepository.toDto);
  }

  async findAllWithProducts(
    isTopProducts: boolean
  ): Promise<CategoryDTO[] | []> {
    const aggregation: Record<string, unknown>[] = [
      {
        $lookup: {
          from: 'products',
          localField: '_id',
          foreignField: 'categoryIds',
          as: 'products',
          pipeline: isTopProducts
            ? [{ $sort: { totalRating: -1 } }, { $limit: 3 }]
            : []
        }
      }
    ];

    const categories = await this.model.aggregate(aggregation);
    const categoriesDto = categories.map((category) =>
      CategoryTypegooseRepository.toDto(category)
    );
    return categoriesDto;
  }
}
