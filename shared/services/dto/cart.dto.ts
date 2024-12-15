
import { Cart, CartItem, Product } from "@prisma/client";

// export type CartItemDTO = CartItem & {
//     cartItems: CartItem & {
//         product: Product
//     }

// }
export type CartItemDTO = CartItem & {
    product: Product
}




export interface CartDTO extends Cart {
    cartItems: CartItemDTO[];
}

export interface CreateCartItemValues {
    productId: number;
}