import { Api } from "@/services/apiClient";
import { TypeProduct } from "@prisma/client";
import React from "react";

export const useTypeProducts = () => {
    const [typeProducts, setTypeProducts] = React.useState<TypeProduct[]>([]);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        async function fetchTypeProducts() {
            try {
                setLoading(true);
                const typeProducts = await Api.typeProducts.getAll();
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
    };
}