import { cn } from '@/shared/lib/utils';
import React from 'react'

interface Props {
    className?: string;
}

export const SortPopup: React.FC<Props> = ({ className }) => {
    return (
        <div className={cn(
            'inline-flex items-center gap-1 bg-gray-50 px-3 md:px-5 h-[40px] md:h-[52px] rounded-xl md:rounded-2xl cursor-pointer text-sm md:text-base',
            className
        )}>

        </div>
    );
};
