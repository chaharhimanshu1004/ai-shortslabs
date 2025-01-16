'use client'

import React, { useState } from 'react'
import Image from 'next/image'

const SelectStyle = ({onUserSelect}) => {
    const styleOptions = [
        {
            name: 'Realistic',
            image: '/realistic.png'
        },
        {
            name: 'Cartoon',
            image: '/cartoon.jpg'
        },
        {
            name: 'Comic',
            image: '/comic.jpg'
        },
        {
            name: 'Water Color',
            image: '/watercolor.jpg'
        },
        {
            name: 'GTA',
            image: '/gta.webp'
        },
    ]

    const [selectedStyle, setSelectedStyle] = useState();
    return (
        <div className='mt-7 '>
            <h2 className='font-bold text-2xl text-primary'>
                Select Style
            </h2>
            <p className='text-gray-500'>Select style for your video:</p>

            <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-5 mt-3'>
                {
                    styleOptions.map((item,index) => (
                        <div className={`relative hover:scale-105 cursor-pointer rounded-xl transition-all ${selectedStyle == item.name ? 'border-4 border-primary' : ''}`} key={index}> 
                            <Image key={index} src={item.image} width={100} height={100}
                                className='h-48 object-cover rounded-lg w-full' alt={item.name}
                                onClick={()=>{
                                    setSelectedStyle(item.name)
                                    onUserSelect('style',item.name);
                                }}
                            />    
                            <h2 className='absolute p-1 bg-black bottom-0 w-full text-white text-center rounded-b-lg'>{item.name}</h2>                   
                        </div>
                    )) 
                }
            </div>

        </div>
    )
}

export default SelectStyle