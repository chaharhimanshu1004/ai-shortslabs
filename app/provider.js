'use client'
import { db } from '@/configs/db';
import { Users } from '@/configs/schema';
import { useUser } from '@clerk/nextjs'
import { eq } from 'drizzle-orm';
import React, { useEffect } from 'react'

function Provider({children}) {
    const {user} = useUser();
    const isNewUser = async() => {
        const result = await db.select().from(Users).where(eq(Users.email, user?.primaryEmailAddress?.emailAddress));
        if(!result[0]){
            await db.insert(Users).values({
                email: user.primaryEmailAddress?.emailAddress,
                name: user.fullName,
                imageUrl: user.imageUrl
            })
        }
    }

    useEffect(()=>{
        if(user){
            isNewUser();
        }
    },[user]);


  return (
    <div>{children}</div>
  )
}

export default Provider