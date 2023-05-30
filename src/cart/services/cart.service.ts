import { Injectable } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cart } from 'src/database/entities/cart.entity';
import { v4 } from 'uuid';
import { CartItem } from 'src/database/entities/cart-item.entity';

@Injectable()
export class CartService {

  constructor(
    @InjectRepository(Cart) private cartRepo: Repository<Cart>,
    @InjectRepository(CartItem) private cartItemsRepo: Repository<CartItem>
  ) {}

  async createByUserId(userId: string) {
    const newCart = await this.cartRepo.insert({
      id: v4(),
      userId,
      createdAt: new Date(),
      updatedAt: new Date(),
      status: 'OPEN',
      cartItems: []
    });

    return newCart;
  }

  async findOrCreateByUserId(userId: string): Promise<Cart> {
    const cart = await this.cartRepo.findOne({where: {userId}, relations: ['cartItems']});
    if (!cart) {
      await this.createByUserId(userId);
      return await this.cartRepo.findOneBy({ userId })
    }
    return cart;
  }

  async updateByUserId(userId: string, cart: Cart): Promise<Cart> {
    const updatedCart = await this.findOrCreateByUserId(userId);
    updatedCart.cartItems = cart.cartItems;
    return await this.cartRepo.save(updatedCart);
  }

  async removeByUserId(userId: string): Promise<Cart> {
    const removedCart = await this.findOrCreateByUserId(userId);
    await this.cartItemsRepo.delete({ cartId: removedCart.id });
    return await this.cartRepo.remove(removedCart);
  }

}
