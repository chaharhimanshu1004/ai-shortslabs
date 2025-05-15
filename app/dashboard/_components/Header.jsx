import React, { useContext } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { UserButton } from '@clerk/nextjs'
import { UserDetailContext } from '@/app/_context/UserDetailContext'


const Header = () => {

    const { userDetail, setUserDetail } = useContext(UserDetailContext);

    return (
        <div className='flex p-3 px-5 items-center justify-between shadow-md'>
            <div className='flex gap-3 items-center'>
                <Image src={'/logo.jpg'} width={40} height={40} />
                <h2 className='font-bold text-xl'>Ai shorts lab</h2>
            </div>
            <div className='flex gap-3 items-center'>
                <div className='flex gap-1 items-center'>
                    <Image src={'/coin.png'} width={20} height={20} />
                    <h2>
                        {userDetail?.credits}
                    </h2>
                </div>
                <Button>
                    Dashboard
                </Button>
                <UserButton />
            </div>
        </div>
    )
}

export default Header