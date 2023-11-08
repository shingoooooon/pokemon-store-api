import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
@Entity('pokemons')
export class Pokemon {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  price: number;

  @Column()
  description: string;

  @Column()
  imgPath: string;

  @Column()
  type1: string;

  @Column()
  type2: string;
}
