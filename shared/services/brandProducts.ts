import { Brand } from "@prisma/client"
import { axiosInstance } from "./instance"
import { ApiRoutes } from "./constants"


export const getAll = async (): Promise<Brand[]> => {
    return (await axiosInstance.get<Brand[]>(ApiRoutes.BRAND_PRODUCTS)).data

}

