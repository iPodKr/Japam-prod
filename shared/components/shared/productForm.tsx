'use client'

import { ProductWithRelations } from '@/@types/prisma';
import { useCartStore } from '@/shared/store';
import React from 'react'
import toast from 'react-hot-toast';
import { ChooseProductForm } from './chooseProductForm';

interface Props {
    product: ProductWithRelations;
    onAddProduct?: VoidFunction
    className?: string;
}

export const ProductForm: React.FC<Props> = ({ product, onAddProduct: _onAddProduct, }) => {

    const [addCartItem, loading] = useCartStore((state) => [state.addCartItem, state.loading])
    const onAddProduct = async (id?: number) => {
        try {
            if (id) {
                await addCartItem({
                    productId: id,
                });
            }
            toast.success(product.name + ' добавлен в корзину');

            _onAddProduct?.();
        } catch (error) {
            toast.error('Произошла ошибка при добавлении в корзину');
            console.error(error)
        }
    };

    return (
        <ChooseProductForm
            imageUrl={product.imageUrl}
            name={product.name}
            description={product.description}
            fullDescription={product.fullDescription}
            brand={product.brand.name}
            typeProduct={product.typeProduct.name}
            price={product.price}
            onSubmit={onAddProduct}
            id={product.id}
            loading={loading}
        />
    );
};