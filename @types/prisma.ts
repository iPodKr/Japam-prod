import { Brand, Product, TypeProduct } from "@prisma/client";

export type ProductWithRelations = Product & { brand: Brand; typeProduct: TypeProduct; }
