"use server"

import prisma from "@/db/prisma"
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"
import { User } from "@prisma/client"
import { revalidatePath } from "next/cache"

export async function getUserProfileAction() {
    const { getUser } = getKindeServerSession()
    const user = await getUser()
    if (!user) return null
    const currentUser = await prisma.user.findUnique({
        where: {
            id: user.id
        }
    })
    return currentUser
}

export async function updateUserProfileAction({
    name, image 
}:{name:string, image : string}) {
    const { getUser } = getKindeServerSession()
    const user = await getUser()
    if (!user) return null

    const updatedFields:Partial<User>={}
    //tells that its ok if other User fields are not included

    if(name)  updatedFields.name=name
    if(image) updatedFields.image=image

    const updatedUser= await prisma.user.update({
        where:{
            id: user.id
        },
        data : updatedFields
    })
     revalidatePath("/update-profile")//tells nextjs to refetch this page 
    //because when we update profile pic then the sidebar img also needs to be  updated
    return {success:true, user: updatedUser}
}