import { db } from '@/configs/db';
import { Users } from '@/configs/schema';
import { useUser } from '@clerk/nextjs'
import { eq } from 'drizzle-orm';
import React from 'react'

function Provider({children}) {
    const {user} = useUser();
    const isNewUser = async() => {
        const result = await db.select().from(Users).where(eq(Users.email, user?.primaryEmailAddress?.emailAddress));

    }
  return (
    <div>{children}</div>
  )
}

export default Provider