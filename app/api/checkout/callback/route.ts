import { PaymentCallbackData } from "@/@types/yookassa";
import { prisma } from "@/prisma/prismaClient";
import { OrderSuccessTemplate } from "@/shared/components/shared/emailTemplates/orderSuccess";
import { sendEmail } from "@/shared/lib";
import { CartItemDTO } from "@/shared/services/dto/cart.dto";
import { OrderStatus } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";


export async function POST(req: NextRequest) {
    try {
        const body = (await req.json()) as PaymentCallbackData;

        const order = await prisma.order.findFirst({
            where: {
                id: Number(body.object.metadata.order_id),
            },
        })

        if (!order) {
            return NextResponse.json({ error: 'order not found' }, { status: 404 })
        }

        const isSucceeded = body.object.status === 'succeeded';

        await prisma.order.update({
            where: {
                id: order.id,
            },
            data: {
                status: isSucceeded ? OrderStatus.SUCCEEDED : OrderStatus.CANCELLED,
            },
        })

        const items = JSON.parse(order?.items as string) as CartItemDTO[];

        if (isSucceeded) {
            await sendEmail(
                order.email,
                'Ваш заказ успешно успешно оформлен',
                OrderSuccessTemplate({ orderId: order.id, items })
            )
        } else {
            //TODO: отправить письмо об отмене заказа
        }


    } catch (error) {
        console.log('[CheckoutCallback] Server error', error);
        return NextResponse.json({ error: 'server error' }, { status: 500 })
    }
}