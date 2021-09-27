import CategoryDTO from 'server/dtos/CategoryDTO';
import BaseRepository from '../BaseRepository';

export default interface CategoryRepository
  extends BaseRepository<CategoryDTO> {
  findAll(): Promise<CategoryDTO[] | []>;

  findAllWithProducts(isTopProducts: boolean): Promise<CategoryDTO[] | []>;
}
