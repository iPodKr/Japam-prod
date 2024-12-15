import { useSearchParams } from "next/navigation";
import React from "react";
import { useSet } from "react-use";


interface PriceProps {
    priceFrom?: number;
    priceTo?: number;
}

interface QueryFilters extends PriceProps {
    typeProducts: string;
    brandProducts: string;
}

export interface Filters {
    selectedTypeProducts: Set<string>;
    selectedBrandProducts: Set<string>;
    prices: PriceProps;
}

interface ReturnProps extends Filters {
    setPrices: (name: keyof PriceProps, value: number) => void;
    setSelectedTypeProducts: (value: string) => void;
    setSelectedBrandProducts: (value: string) => void;
}

export const useFilters = (): ReturnProps => {
    const searchParams = useSearchParams() as unknown as Map<keyof QueryFilters, string>

    const [selectedTypeProducts, { toggle: toggleTypeProducts }] = useSet(
        new Set<string>(searchParams.get('typeProducts')?.split(','))
    )
    const [selectedBrandProducts, { toggle: toggleBrandProducts }] = useSet(
        new Set<string>(searchParams.get('brandProducts')?.split(','))
    )

    const [prices, setPrices] = React.useState<PriceProps>({
        priceFrom: Number(searchParams.get('priceFrom')) || undefined,
        priceTo: Number(searchParams.get('priceTo')) || undefined,
    })

    const updatePrice = (name: keyof PriceProps, value: number) => {
        setPrices((prev) => ({
            ...prev,
            [name]: value
        }))
    }


    // return {
    //     selectedTypeProducts,
    //     prices,
    //     setPrices: updatePrice,
    //     setSelectedTypeProducts: toggleTypeProducts,
    //     selectedBrandProducts,
    //     setSelectedBrandProducts: toggleBrandProducts
    // }

    return React.useMemo(() => ({
        selectedTypeProducts,
        prices,
        setPrices: updatePrice,
        setSelectedTypeProducts: toggleTypeProducts,
        selectedBrandProducts,
        setSelectedBrandProducts: toggleBrandProducts
    }), [selectedTypeProducts, prices, selectedBrandProducts])
}