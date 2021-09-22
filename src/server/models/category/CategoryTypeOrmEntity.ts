import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

type Product = {
  id: string;
  displayName: string;
  price: number;
  totalRating: number;
};

@Entity()
export default class Category {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column('text')
  displayName!: string;

  @OneToMany('Product', 'category')
  products!: Product[];
}
