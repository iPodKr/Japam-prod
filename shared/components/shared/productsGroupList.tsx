'use client'


import React, { useEffect, useRef } from 'react'
import { Title } from './title';
import { cn } from '@/shared/lib/utils';
import { useIntersection } from 'react-use'
import { ProductCart } from './productCart';
import { useCategoryStore } from '@/shared/store/category';
import { ProductWithRelations } from '@/@types/prisma';
import { Product } from '@prisma/client';

interface Props {
    title: string;
    // items: ProductWithRelations[];
    items: Product[]
    categoryId: number;
    className?: string;
    listClassName?: string;
}

export const ProductsGroupList: React.FC<Props> = ({
    className,
    title,
    items,
    categoryId,
    listClassName

}) => {
    const setActiveCategoryId = useCategoryStore((state) => state.setActiveId)
    const intersectionRef = useRef(null)
    const intersection = useIntersection(intersectionRef, {
        threshold: 0.4,
    })

    useEffect(() => {
        if (intersection?.isIntersecting) {
            setActiveCategoryId(categoryId)
        }
    }, [categoryId, intersection?.isIntersecting, title])
    return (
        <div className={className} id={title} ref={intersectionRef}>
            <Title text={title} size='lg' className='font-extrabold mb-5' />

            <div className={cn('grid grid-cols-3 gap-[50px]', listClassName)}>
                {
                    items.map((product, i) => (
                        <ProductCart
                            key={product.id}
                            id={product.id}
                            name={product.name}
                            price={product.price}
                            imageUrl={product.imageUrl}
                            description={product.description}
                        />
                    ))
                }
            </div>
        </div>
    );
};