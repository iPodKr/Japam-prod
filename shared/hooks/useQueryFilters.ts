import React from "react";
import { Filters } from "./useFilters";
import qs from "qs";
import { useRouter } from "next/navigation";

export const useQueryFilters = (filters: Filters) => {
    const isMounted = React.useRef(false);
    const router = useRouter()

    React.useEffect(() => {
        if (isMounted.current) {
            const params = {
                ...filters.prices,
                typeProducts: Array.from(filters.selectedTypeProducts),
                brandProducts: Array.from(filters.selectedBrandProducts),
            };

            const query = qs.stringify(params, {
                arrayFormat: 'comma',
            })


            router.push(`?${query}`, {
                scroll: false
            })
            console.log(filters, 999);

        }

        isMounted.current = true;
    }, [filters])
}