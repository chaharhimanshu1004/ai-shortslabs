import React, { useState } from 'react'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

const SelectDuration = ({onUserSelect}) => {
    const [selectedDuration, setSelectedDuration ] = useState();
    return (
        <div className='mt-7'>
            <h2 className='font-bold text-2xl text-primary'>
                Select Duration
            </h2>
            <p className='text-gray-500'>Select the duration for your video:</p>
            <Select onValueChange={(value) => {
                setSelectedDuration(value)
                onUserSelect('duration', value);
            }}>
                <SelectTrigger className="w-full mt-2 p-6 text-lg ">
                    <SelectValue placeholder="Select Duration" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value='30 Seconds'>30 seconds</SelectItem>
                    <SelectItem value='60 Seconds'>60 seconds</SelectItem>
                </SelectContent>
            </Select>

        </div>

    )
}

export default SelectDuration