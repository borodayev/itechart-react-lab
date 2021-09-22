import { Repository, Connection } from 'typeorm';
import ProductDTO from '../../dtos/ProductDTO';
import ProductEntity from '../../models/product/ProductTypeOrmEntity';
import ProductRepository from './ProductRepository';
import connectionDriver from '../../databaseConnection';

export default class ProductTypeOrmRepository implements ProductRepository {
  async save(product: ProductDTO): Promise<void> {
    const repository = await this.getRepository();
    const isExists = await this.exists(product);
    if (isExists) {
      repository.update(product.id, product);
    } else {
      repository.create(product);
    }
  }

  async exists(product: ProductDTO): Promise<boolean> {
    const repository = await this.getRepository();
    const isExists = await repository.findOne(product.id);
    return !!isExists;
  }

  async delete(product: ProductDTO): Promise<void> {
    const repository = await this.getRepository();
    await repository.delete(product.id);
  }

  async findByPrice(price: number): Promise<ProductDTO | null> {
    const repository = await this.getRepository();
    const product = await repository.findOne({ price });
    if (!product) return null;
    return this.toDto(product);
  }

  private toDto(product: ProductEntity): ProductDTO {
    const { id, displayName, price, totalRating } = product;
    return { id, displayName, price, totalRating };
  }

  private async getRepository(): Promise<Repository<ProductEntity>> {
    const connection =
      (await connectionDriver.getConnection()) as unknown as Connection;
    return connection.getRepository(ProductEntity);
  }
}
