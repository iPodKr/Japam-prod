import React from "react";
import { Filters } from "./useFilters";
import qs from "qs";
import { useRouter } from "next/navigation";

export const useQueryFilters = (filters: Filters) => {
    const router = useRouter()

    React.useEffect(() => {
        const params = {
            ...filters.prices,
            typeProducts: Array.from(filters.selectedTypeProducts),
        };

        const query = qs.stringify(params, {
            arrayFormat: 'comma',
        })


        router.push(`?${query}`, {
            scroll: false
        })
    }, [filters, router])
}