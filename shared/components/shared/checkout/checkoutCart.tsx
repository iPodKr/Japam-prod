import React from 'react'
import { WhiteBlock } from '../white-block';
import { CheckoutItem } from '../checkout-item';
import { CartStateItem } from '@/shared/lib/getCartDetails';
import { CheckoutItemSkeleton } from '../checkout-item-skeleton';

interface Props {
    items: CartStateItem[];
    onClickCountButton: (id: number, quantity: number, type: 'plus' | 'minus') => void;
    removeCartItem: (id: number) => void;
    className?: string;
    loading?: boolean
}

export const CheckoutCart: React.FC<Props> = ({ items, onClickCountButton, removeCartItem, className, loading }) => {
    return (
        <WhiteBlock title='1. Корзина' className={className}>
            <div className="flex flex-col gap-5">

                {loading
                    ?
                    [...Array(4)].map((_, index) => <CheckoutItemSkeleton key={index} />)
                    :
                    items.map((item) => (
                        <CheckoutItem
                            key={item.id}
                            id={item.id}
                            imageUrl={item.imageUrl}
                            description={item.description}
                            name={item.name}
                            price={item.price}
                            quantity={item.quantity}
                            disabled={item.disabled}
                            onClickCountButton={(type) => onClickCountButton(item.id, item.quantity, type)}
                            onClickRemove={() => removeCartItem(item.id)}
                        />
                    ))
                }
            </div>
        </WhiteBlock>
    );
};