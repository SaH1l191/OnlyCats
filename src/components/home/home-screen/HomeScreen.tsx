
import BaseLayout from "@/components/BaseLayout";
import React from 'react'
import UserProfile from "./UserProfile";
import Posts from "./Posts";
import prisma from "@/db/prisma";
import { getUserProfileAction } from "@/app/update-profile/actions";
import { notFound } from "next/navigation";

const HomeScreen = async () => {

    const admin = await prisma.user.findUnique({
      where:{
        email : process.env.ADMIN_EMAIL
      }
    })
    const user = await getUserProfileAction()


    //auth check 
    if(!user ) return notFound()


  return (
    <BaseLayout>
      <UserProfile />
      {/* admin will always be present (from .env) */}
      <Posts admin={admin!} isSubscribed={user.isSubscribed} 
       />
    </BaseLayout>
  )
}

export default HomeScreen