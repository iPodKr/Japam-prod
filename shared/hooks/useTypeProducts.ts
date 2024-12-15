import { Api } from "@/shared/services/apiClient";
import { Brand, TypeProduct } from "@prisma/client";
import React from "react";

export const useTypeProducts = () => {
    const [typeProducts, setTypeProducts] = React.useState<TypeProduct[]>([]);
    //==
    const [brandProducts, setBrandProducts] = React.useState<Brand[]>([]);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        async function fetchTypeProducts() {
            try {
                setLoading(true);
                const typeProducts = await Api.typeProducts.getAll();
                const brandProducts = await Api.brandProducts.getAll();

                setBrandProducts(brandProducts);
                setTypeProducts(typeProducts);
            } catch (error) {
                console.log(error)
            } finally {
                setLoading(false);
            }
        }
        fetchTypeProducts();
    }, []);

    return {
        typeProducts,
        loading,
        brandProducts
    };
}