import { prisma } from "@/prisma/prismaClient";
import { NextRequest, NextResponse } from "next/server";
import crypto from 'crypto';
import { findOrCreateCart } from "@/shared/lib/findOrCreateCart";
import { CreateCartItemValues } from "@/shared/services/dto/cart.dto";
import { updateCartTotalAmount } from "@/shared/lib/updateCartTotalAmount";

export async function GET(req: NextRequest) {
    try {
        const token = req.cookies.get('cartToken')?.value;

        if (!token) {
            return NextResponse.json({ totalAmount: 0, cartItems: [] })
        }

        const userCart = await prisma.cart.findFirst({
            where: {
                OR: [
                    {
                        token,
                    }
                ]
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
        return NextResponse.json(userCart)
    } catch (error) {
        console.log('[CART_GET] Server error', error);
        return NextResponse.json({ message: 'Не удалось получить корзину' }, { status: 500 })
    }
}

export async function POST(req: NextRequest) {
    try {
        let token = req.cookies.get('cartToken')?.value;

        if (!token) {
            token = crypto.randomUUID();
        }

        const userCart = await findOrCreateCart(token);

        const data = (await req.json()) as CreateCartItemValues

        const findCartItem = await prisma.cartItem.findFirst({
            where: {
                cartId: userCart.id,
                productId: data.productId
            }
        })


        if (findCartItem) {
            await prisma.cartItem.update({
                where: {
                    id: findCartItem.id
                },
                data: {
                    quantity: findCartItem.quantity + 1
                }
            })
        } else {
            await prisma.cartItem.create({
                data: {
                    cartId: userCart.id,
                    productId: data.productId,
                    quantity: 1
                }
            })
        }
        const updatedUserCart = await updateCartTotalAmount(token);
        const resp = NextResponse.json(updatedUserCart)
        resp.cookies.set('cartToken', token,)
        return resp

    } catch (error) {
        console.log('[CART_POST] Server error', error);
        return NextResponse.json({ message: 'Не удалось создать корзину' }, { status: 500 })
    }
}
