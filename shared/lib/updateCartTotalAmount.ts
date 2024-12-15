import { prisma } from "@/prisma/prismaClient"
import { calcCartItemTotalPrice } from "./calcCartItemTotalPrice"


export const updateCartTotalAmount = async (token: string) => {
    const userCart = await prisma.cart.findFirst({
        where: {
            token
        },
        include: {
            cartItems: {
                orderBy: {
                    createdAt: 'desc'
                },
                include: {
                    product: true
                }
            }
        }
    })

    if (!userCart) {
        return 0
    }

    const totalAmount = userCart?.cartItems.reduce((acc, item) => {
        return acc + calcCartItemTotalPrice(item)
    }, 0)

    return await prisma.cart.update({
        where: {
            id: userCart.id
        },
        data: {
            totalAmount
        },
        include: {
            cartItems: {
                orderBy: {
                    createdAt: 'desc'
                },
                include: {
                    product: true
                }
            }
        }

    })
}