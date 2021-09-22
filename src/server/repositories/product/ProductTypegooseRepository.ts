import type { ReturnModelType } from '@typegoose/typegoose';
import { Product } from 'server/models/product/ProductTypegooseModel';
import ProductDTO from 'server/dtos/ProductDTO';
import ProductRepository from './ProductRepository';

export default class ProductTypegooseRepository implements ProductRepository {
  private model: ReturnModelType<typeof Product>;

  constructor(model: ReturnModelType<typeof Product>) {
    this.model = model;
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
    return this.toDto(product);
  }

  private toDto(product: Product): ProductDTO {
    const { _id, displayName, price, totalRating } = product;
    return { id: _id, displayName, price, totalRating };
  }
}
