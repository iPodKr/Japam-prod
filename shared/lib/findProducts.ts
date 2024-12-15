import { prisma } from "@/prisma/prismaClient";

export interface GetSearchParams {
    query?: string;
    sortBy?: string;
    typeProducts?: string;
    brandProducts?: string;
    priceFrom?: number;
    priceTo?: number;
}

const DEFAULT_MIN_PRICE = 0;
const DEFAULT_MAX_PRICE = 100000;

export const findProducts = async (params: GetSearchParams) => {
    const productBrands = params.brandProducts?.split(',').map(Number);
    const productTypes = params.typeProducts?.split(',').map(Number);

    const minPrice = Number(params.priceFrom || DEFAULT_MIN_PRICE);
    const maxPrice = Number(params.priceTo || DEFAULT_MAX_PRICE);

    const categories = await prisma.category.findMany({

        include: {
            product: {
                orderBy: {
                    id: 'desc'
                },
                where: {
                    brand: productBrands
                        ? {
                            id: {
                                in: productBrands
                            }
                        }
                        : undefined,
                    typeProduct: productTypes
                        ? {
                            id: {
                                in: productTypes
                            }
                        }
                        : undefined,
                    price: {
                        gte: minPrice,
                        lte: maxPrice,
                    }
                }
            },

        }
    })
    return categories
}