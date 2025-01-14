import React from 'react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

const EmptyState = () => {
    return (
        <div className='flex p-5 py-24 items-center flex-col mt-10 border-2 border-dashed'>
            <h2>You don't have any short video created!</h2>
            <Link href={'/dashboard/create-new'}>
                <Button>Create short video</Button>
            </Link>
        </div>
    )
}

export default EmptyState