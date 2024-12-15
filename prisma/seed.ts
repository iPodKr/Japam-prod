import { hashSync } from "bcrypt";
import { prisma } from "./prismaClient";
import { disconnect } from "process";
import { brands, categories, products, typeProducts } from "./constants";

async function up() {
    await prisma.user.createMany({
        data: [
            {
                fullName: 'User Test',
                email: 'user@test.ru',
                password: hashSync('1111', 10),
                verified: new Date(),
                role: 'USER'
            },
            {
                fullName: 'Admin Admin',
                email: 'admin@test.ru',
                password: hashSync('1111', 10),
                verified: new Date(),
                role: 'ADMIN'
            }
        ]
    })

    await prisma.category.createMany({
        data: categories,
    })

    await prisma.brand.createMany({
        data: brands
    })
    await prisma.typeProduct.createMany({
        data: typeProducts
    })
    await prisma.product.createMany({
        data: products
    })
    await prisma.cart.createMany({
        data: [
            {
                userId: 1,
                totalAmount: 0,
                token: '1111'
            },
            {
                userId: 2,
                totalAmount: 0,
                token: '2222'
            },
        ]
    })
    await prisma.cartItem.create({
        data:
        {
            productId: 1,
            cartId: 1,
            quantity: 2
        },

    })
}
async function down() {
    await prisma.$executeRaw`TRUNCATE TABLE "User" RESTART IDENTITY CASCADE`;
    await prisma.$executeRaw`TRUNCATE TABLE "Brand" RESTART IDENTITY CASCADE`;
    await prisma.$executeRaw`TRUNCATE TABLE "Product" RESTART IDENTITY CASCADE`;
    await prisma.$executeRaw`TRUNCATE TABLE "Category" RESTART IDENTITY CASCADE`;
    await prisma.$executeRaw`TRUNCATE TABLE "Cart" RESTART IDENTITY CASCADE`;
    await prisma.$executeRaw`TRUNCATE TABLE "CartItem" RESTART IDENTITY CASCADE`;
    await prisma.$executeRaw`TRUNCATE TABLE "TypeProduct" RESTART IDENTITY CASCADE`;
}
async function main() {
    try {
        await down();
        await up();
    } catch (e) {
        console.error(e);

    }

}

main().then(async () => {
    await prisma.$disconnect();
})
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    })