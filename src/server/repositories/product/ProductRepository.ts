import ProductDTO from 'server/dtos/ProductDTO';
import BaseRepository from '../BaseRepository';

export type ProductSearchParameters = {
  displayName: string;
  maxPrice: number;
  minPrice: number;
  minRating: number;
  sortBy: {
    fieldName: string;
    order: string;
  };
};

export default interface ProductRepository extends BaseRepository<ProductDTO> {
  findByPrice(price: number): Promise<ProductDTO | null>;
  findAll(
    searchParameters: ProductSearchParameters
  ): Promise<ProductDTO[] | []>;
}
