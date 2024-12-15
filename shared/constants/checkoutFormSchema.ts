import { z } from "zod";

export const checkoutFormSchema = z.object({
    firstName: z.string().min(2, { message: ' Должно быть не менее 2 символов' }),
    lastName: z.string().min(2, { message: 'Должно быть  не менее 2 символов' }),
    email: z.string().email({ message: 'Некорректный email' }),
    phone: z.string().min(10, { message: 'Введите корректный номер' }),
    address: z.string().min(5, { message: 'Введите корректный адрес' }),
    comment: z.string().optional()
})

export type CheckoutFormValues = z.infer<typeof checkoutFormSchema>