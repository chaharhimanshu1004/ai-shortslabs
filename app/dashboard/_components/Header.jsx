import React from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { UserButton } from '@clerk/nextjs'
const Header = () => {
    return (
        <div className='flex p-3 px-5 items-center justify-between shadow-md'>
            <div className='flex gap-3 items-center'>
                <Image src={'/logo.jpg'} width={40} height={40} />
                <h2 className='font-bold text-xl'>Ai shorts lab</h2>
            </div>
            <div className='flex gap-3 items-center'>
                <Button>
                    Dashboard
                </Button>
                <UserButton />
            </div>
        </div>
    )
}

export default Header