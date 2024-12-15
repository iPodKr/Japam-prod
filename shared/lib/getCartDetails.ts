import { CartDTO } from "../services/dto/cart.dto";
import { calcCartItemTotalPrice } from "./calcCartItemTotalPrice";

export type CartStateItem = {
    id: number;
    quantity: number;
    name: string;
    imageUrl: string;
    price: number;
    description: string;
    productId: number;
    disabled?: boolean;
}

interface ReturnProps {
    items: CartStateItem[],
    totalAmount: number,
}
export const getCartDetails = (data: CartDTO): ReturnProps => {
    const items = data.cartItems.map((item) => ({
        id: item.id,
        description: item.product.description,
        quantity: item.quantity,
        name: item.product.name,
        imageUrl: item.product.imageUrl,
        price: calcCartItemTotalPrice(item),
        productId: item.product.id,
        disabled: false
    })) as CartStateItem[]

    return {
        totalAmount: data.totalAmount,
        items
    }
}
