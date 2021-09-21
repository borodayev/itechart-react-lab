export default interface BaseRepository<T> {
  save(t: T): Promise<unknown>;
  exists(t: T): Promise<boolean>;
  delete(t: T): Promise<void>;
}
