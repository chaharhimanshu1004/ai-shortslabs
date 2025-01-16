'use client'
import React, { useState } from 'react'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"


const SelectTopic = ({onUserSelect}) => {
    const options = ['Custom Prompt','Random AI Story','Scary Story','Historical Facts','Bed Time Story','Motivational','Fun Facts']
    const [selectedOption, setSelectedOption] = useState();
    return (
        <div>
            <h2 className='font-bold text-2xl text-primary'>
                Select Topic
            </h2>
            <p className='text-gray-500'>Select topic for your video:</p>
            <Select onValueChange={(value)=>{
                setSelectedOption(value)
                value!='Custom Prompt' && onUserSelect('topic',value);
            }}>
                <SelectTrigger className="w-full mt-2 p-6 text-lg ">
                    <SelectValue placeholder="Content Type" />
                </SelectTrigger>
                <SelectContent>
                    {
                        options.map((item,index)=>(
                            <SelectItem key={index} value={item}>{item}</SelectItem>
                        ))
                    }
                </SelectContent>
            </Select>

            {selectedOption == 'Custom Prompt' 
                &&  < Textarea className='mt-3' placeholder='Write prompt for your video!!' 
                     onChange={(e)=>onUserSelect('topic',e.target.value)}
                />
            }

        </div>
    )
}

export default SelectTopic