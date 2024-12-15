'use client'

import { FormProvider, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button, Skeleton, } from "@/shared/components/ui"
import { useCart } from "@/shared/hooks"
import { ArrowRight } from "lucide-react"
import {
    Container,
    Title,
    WhiteBlock,
    CheckoutAddressForm,
    CheckoutCart,
    CheckoutPersonalForm
} from "@/shared/components"
import { checkoutFormSchema, CheckoutFormValues } from "@/shared/constants"
import { createOrder } from "@/app/actions"
import toast from "react-hot-toast"
import React from "react"
import { useSession } from "next-auth/react"
import { Api } from "@/shared/services/apiClient"

export default function CheckoutPage() {
    const [submitting, setSubmitting] = React.useState(false);
    const { totalAmount, items, updateItemQuantity, removeCartItem, loading } = useCart()
    const { data: session } = useSession()

    const form = useForm<CheckoutFormValues>({
        resolver: zodResolver(checkoutFormSchema),
        defaultValues: {
            email: '',
            firstName: '',
            lastName: '',
            phone: '',
            address: '',
            comment: '',
        }
    })

    React.useEffect(() => {
        async function fetchUserInfo() {
            const data = await Api.auth.getMe()
            const [firstName, lastName] = data.fullName.split(' ')

            form.setValue('firstName', firstName)
            form.setValue('lastName', lastName)
            form.setValue('email', data.email)
        }

        if (session) {
            fetchUserInfo()
        }
    }, [session])

    const onSubmit = async (data: CheckoutFormValues) => {
        try {
            setSubmitting(true);
            const url = await createOrder(data);

            toast.success('Заказ успешно создан! 📋 переход  к оплате...', {
                icon: '✅',
            });

            if (url) {
                location.href = url;
            }

        } catch (error) {
            console.log(error);
            setSubmitting(false);
            toast.error('Не удалось создать заказ', {
                icon: '❌'
            });
        }
    }

    const onClickCountButton = (id: number, quantity: number, type: 'plus' | 'minus') => {
        const newQuantity = type === 'plus' ? quantity + 1 : quantity - 1;

        updateItemQuantity(id, newQuantity);

    }
    return (
        <Container className="mt-10">
            <Title text='Оформление заказа' className="font-extrabold mb-8 text-[36px]" />
            <FormProvider {...form} >
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <div className="flex gap-10">

                        {/*Левая часть*/}
                        <div className="flex flex-col gap-10 flex-1 mb-20">
                            <CheckoutCart
                                onClickCountButton={onClickCountButton}
                                removeCartItem={removeCartItem}
                                items={items}
                                loading={loading}
                            />

                            <CheckoutPersonalForm className={loading ? "opacity-40 pointer-events-none" : ""} />

                            <CheckoutAddressForm className={loading ? "opacity-40 pointer-events-none" : ""} />
                        </div>

                        {/*Правая часть*/}
                        <div className="w-[450px]">
                            <WhiteBlock
                                className="p-6 sticky top-4"
                            >
                                <div className="flex flex-col gap-1">
                                    <span className="text-xl">Итого</span>
                                    {loading ?
                                        (<Skeleton className=" h-11 w-48" />)
                                        :
                                        (<span className="h-11 text-[34px] font-extrabold">{totalAmount} ₽</span>)
                                    }
                                </div>

                                <Button
                                    loading={loading || submitting}
                                    type="submit"
                                    className="w-full h-14 rounded-2xl mt-20 text-base font-bold">
                                    Оформить заказ
                                    <ArrowRight className="w-5 ml-2" />
                                </Button>
                            </WhiteBlock>
                        </div>
                    </div>
                </form>
            </FormProvider>
        </Container>
    )
}