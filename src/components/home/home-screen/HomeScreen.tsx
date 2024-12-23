
import BaseLayout from "@/components/BaseLayout";
import React from 'react'
import UserProfile from "./UserProfile";
import Posts from "./Posts";

const HomeScreen = async () => {




  return (
    <BaseLayout>
      <UserProfile />
      <Posts />
    </BaseLayout>
  )
}

export default HomeScreen