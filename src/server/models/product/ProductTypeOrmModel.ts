import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export default class ProductEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column('text')
  displayName!: string;

  @Column('int')
  totalRating!: number;

  @Column('int')
  price!: number;
}
