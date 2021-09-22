import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

type Category = {
  id: string;
  displayName: string;
};

@Entity()
export default class Product {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column('text')
  displayName!: string;

  @Column('int')
  totalRating!: number;

  @Column('int')
  price!: number;

  @ManyToOne('Category', 'products')
  category!: Category;
}
