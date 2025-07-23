"use server"

import prisma from "@/db/prisma"
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"


async function checkIfAdmin() {
    const { getUser } = getKindeServerSession()
    const user = await getUser()
    const isAdmin = user?.email === process.env.ADMIN_EMAIL
    if (!user || !isAdmin) return false
    return user
}


type PostArgs = {
    text: string,
    mediaUrl?: string,
    mediaType?: "image" | "video",
    isPublic: boolean

}
export async function createPostAction({ isPublic, mediaUrl, mediaType, text }: PostArgs) {
    const user = await checkIfAdmin()
    if (!user) {
        throw new Error("Unauthorized")
    }
    const newPost = await prisma.post.create({
        data: {
            text,
            mediaUrl,
            mediaType,
            isPublic,
            userId: user?.id
        }
    })
    return { success: true, post: newPost }
}


export async function getAllProductionAction() {
    const user = await checkIfAdmin()
    if (!user) {
        throw new Error("Unauthorized")
    }
    const products = await prisma.product.findMany()
    return { success: true, products}
}

type ProductArgs = {
    name: string,
    image: string,
    price: string
}

export async function addNewProductToStoreAction({ name, image, price }: ProductArgs) {
    const user = await checkIfAdmin()
    if (!user) {
        throw new Error("Unauthorized")
    }
    if (!name || !image || !price) {
        throw new Error("Please fill all the fields")
    }
    const priceInNumber = Math.round(parseFloat(price) * 100)//cnverts string to float
    if (isNaN(priceInNumber)) {
        throw new Error("Price must be a number")
    }
    const newProduct = await prisma.product.create({
        data: {
            image,
            price: priceInNumber,
            name
        }
    })
    return { success: true, product: newProduct }
}

export async function toggleProductArchiveAction (productId: string){
    const isAdmin = await checkIfAdmin()
    if(!isAdmin) throw new Error("Unauthorized")

    const product = await prisma.product.findFirst({
        where:{
            id: productId
        }
    })
    if(!product ) throw new Error("Product not found")

    const updatedProduct = await prisma.product.update({
        where : {
            id : productId
        },
        data:{
            isArchived: !product.isArchived
        }
    })
    return { success: true, product: updatedProduct}


}
