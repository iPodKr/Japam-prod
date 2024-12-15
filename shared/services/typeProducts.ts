import { TypeProduct } from "@prisma/client"
import { axiosInstance } from "./instance"
import { ApiRoutes } from "./constants"


export const getAll = async (): Promise<TypeProduct[]> => {
    return (await axiosInstance.get<TypeProduct[]>(ApiRoutes.TYPE_PRODUCTS)).data

}