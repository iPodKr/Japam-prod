import { ChooseProductModal, Container, ProductImage, Title } from "@/shared/components/shared";
import { prisma } from "@/prisma/prismaClient"
import { notFound } from "next/navigation"

export default async function ProductModalPage({ params: { id } }: { params: { id: string } }) {
    const product = await prisma.product.findFirst({
        where: {
            id: Number(id)
        },
        include: {
            brand: true,
            typeProduct: true,
        }
    })
    if (!product) {
        return notFound
    }

    return <ChooseProductModal product={product} />

}

