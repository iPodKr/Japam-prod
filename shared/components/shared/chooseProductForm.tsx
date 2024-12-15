import { cn } from '@/shared/lib/utils';
import React from 'react'
import { Title } from './title';
import { Button } from '../ui';

interface Props {
    imageUrl: string;
    name: string;
    onClickAdd?: VoidFunction;
    className?: string;
    description: string;
    fullDescription: string;
    brand: string;
    typeProduct: string;
    price: number;
    onSubmit: (id?: number) => void;
    id: number;
    loading?: boolean
}

export const ChooseProductForm: React.FC<Props> = ({
    name,
    imageUrl,
    onClickAdd,
    className,
    description,
    fullDescription,
    brand,
    typeProduct,
    price,
    onSubmit,
    id,
    loading
}) => {

    const handleClickAdd = () => {
        const currentId = id
        if (currentId) {
            onSubmit(currentId)
        }
    }
    return (

        <div className={cn(className, 'flex flex-1')} >
            <div className='flex items-center justify-center flex-1 relative w-full'>
                <img
                    src={imageUrl}
                    alt={name}
                    className='relative left-2 top-2 transition-all z-10 duration-300 w-[400px] h-[400px]'
                />
            </div>
            <div className="w-[490px] bg-[#f7f6f5] p-7">
                <Title text={name} size="md" className="font-extrabold mb-1" />
                <p className='text-gray-400 mb-1'>{description}</p>
                <div className='mb-2'>
                    <span>{brand} | {typeProduct}</span>
                </div>
                <hr className="hr border-1 border-gray-400 "></hr>
                <div className='text-gray-400 mt-3 bg-gray-50 overflow-auto scrollbar h-[420px] '>
                    {fullDescription}
                </div>
                <Button
                    loading={loading}
                    className='h-[55] px-10 text-base rounded-[18px] w-full mt-10'
                    onClick={handleClickAdd}
                >
                    Добавить в корзину за {price} ₽
                </Button>
            </div>
        </div >
    );
};