
import { Container, ProductForm, } from "@/shared/components/shared";
import { prisma } from "@/prisma/prismaClient"
import { notFound } from "next/navigation"

export default async function ProductPage({ params: { id } }: { params: { id: string } }) {
    const product = await prisma.product.findFirst({
        where: { id: Number(id) }, include: {
            brand: true,
            typeProduct: true

        }
    })

    if (!product) {
        return notFound();
    }

    return (
        <Container className="flex flex-col gap-10">
            <ProductForm product={product} />
        </Container>
    )
}