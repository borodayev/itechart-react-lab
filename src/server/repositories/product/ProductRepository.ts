import ProductDTO from 'server/dtos/ProductDTO';
import BaseRepository from '../BaseRepository';

export default interface ProductRepository extends BaseRepository<ProductDTO> {
  findByPrice(price: number): Promise<ProductDTO | null>;
}
