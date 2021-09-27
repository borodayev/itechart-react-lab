import ProductDTO from './ProductDTO';

export default interface CategoryDTO {
  id: string;
  displayName: string;
  products?: ProductDTO[];
}
