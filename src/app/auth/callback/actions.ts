"use server";
import prisma from "@/db/prisma";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
 
 

export async function checkAuthStatus() {
    const { getUser } = getKindeServerSession()
    const user = await getUser()

    if (!user) return { sucess: false }

    const existingUser = await prisma.user.findUnique({ where: { id: user.id } })

    if (!existingUser) {
        await prisma.user.create({
            data: {
                id: user.id,
                name: user.given_name + " " + user.family_name,
                email: user.email!, //tells ts that is will receive some value everytime 
                image: user.picture
            }
        })
    }
    return { sucess: true }
}