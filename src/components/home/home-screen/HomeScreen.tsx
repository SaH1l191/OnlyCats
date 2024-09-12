"use client"
import { LogoutLink } from '@kinde-oss/kinde-auth-nextjs'
import React from 'react'

const HomeScreen = () => {
  return (
    <div>HomeScreen
      <LogoutLink>
      <p>Logout</p>

      </LogoutLink>
    
    </div>
  )
}

export default HomeScreen