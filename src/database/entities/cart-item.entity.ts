import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm'
import { Cart } from './cart.entity';

@Entity('cart_items')
export class CartItem {
    @PrimaryGeneratedColumn('uuid', { name: 'cart_id'})
    cartId: string;

    @Column('uuid')
    productId: string;

    @Column('integer')
    count: number;

    @ManyToOne(() => Cart, cart => cart.cartItems) 
    @JoinColumn({name: 'cart_id'})
    cart: Cart; 

}