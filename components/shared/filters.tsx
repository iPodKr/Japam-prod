'use client'

import React from 'react'
import { Title } from './title';
import { Input } from '../ui';
import { RangeSlider } from './rangeSlider';
import { CheckBoxFiltersGroup } from './checkBoxFiltersGroup';
import { useQueryFilters, useTypeProducts, useFilters } from '@/hooks';

interface Props {
    className?: string;
}


export const Filters: React.FC<Props> = ({ className }) => {
    const { typeProducts, loading } = useTypeProducts();
    const filters = useFilters()

    useQueryFilters(filters)

    const items = typeProducts.map((item) => ({ value: String(item.id), text: item.name }))

    const updatePrices = (prices: number[]) => {
        filters.setPrices('priceFrom', prices[0])
        filters.setPrices('priceTo', prices[1])
    }

    return (
        <div className={className}>
            <Title text='Фильтрация' size='sm' className='mb-5 font-bold' />

            {/*Фильтр цен*/}
            <div className='mt-5 border-y-neutral-100 py-6 pb-7'>
                <p className='font-bold mb-3'>Цена от и до:</p>
                <div className='flex gap-3 mb-5'>
                    <Input
                        type="number"
                        placeholder='0'
                        min={0}
                        max={99000}
                        value={String(filters.prices.priceFrom)}
                        onChange={(e) => filters.setPrices('priceFrom', Number(e.target.value))}
                    />

                    <Input
                        type="number"
                        placeholder='100000'
                        min={100}
                        max={100000}
                        value={String(filters.prices.priceTo)}
                        onChange={(e) => filters.setPrices('priceTo', Number(e.target.value))}
                    />
                </div>
                <RangeSlider
                    min={0}
                    max={100000}
                    step={100}
                    value={[
                        filters.prices.priceFrom || 0,
                        filters.prices.priceTo || 100000,

                    ]}
                    onValueChange={updatePrices}
                />
            </div>
            <CheckBoxFiltersGroup
                title='Вид товара'
                name='typeProducts'
                className='mt-5'
                limit={4}
                defaultItems={items.slice(0, 6)}
                items={items}
                loading={loading}
                onClickCheckbox={filters.setSelectedTypeProducts}
                selectedIds={filters.selectedTypeProducts}
            />
        </div>
    );
};