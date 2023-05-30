import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm'
import { CartItem } from './cart-item.entity';

@Entity('carts')
export class Cart {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('uuid')
    userId: string;

    @Column('date')
    createdAt: Date;

    @Column('date')
    updatedAt: Date;

    @Column('varchar')
    status: 'OPEN' | 'ORDERED';

    @OneToMany(() => CartItem, cartItem => cartItem.cart, { cascade: true })
    cartItems: CartItem[];
}
