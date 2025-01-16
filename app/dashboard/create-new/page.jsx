'use client'
import React, { useState } from 'react'
import SelectTopic from './_components/SelectTopic'
import SelectStyle from './_components/SelectStyle'
import SelectDuration from './_components/SelectDuration'
import { Button } from '@/components/ui/button'
import axios from 'axios'
import { toast } from "sonner"
import CustomLoader from './_components/CustomLoader'

const CreateNew = () => {
  const [formData,setFormData] = useState([]);
  const [loading,setLoading] = useState(false);
  const [videoScript,setVideoScript] = useState('');

  const onHandleInputChange = (fieldName,fieldValue)=>{
    console.log('>>>>fieldName & fieldValue',fieldName,fieldValue);
    setFormData({
      ...formData,
      [fieldName]:fieldValue
    })
  }

  const createNewButtonClickHandler = () =>{
    getVideoScript();
  }

  // Get video script
  const getVideoScript = async ()=>{
    setLoading(true);
    const prompt = `Write a script to generate ${formData.duration} video on topic : ${formData.topic} with AI image prompt in ${formData.style} format for each scene and give me result in JSON format with imagePrompt and contentText as field, No plain Text`;
    try{
      const result = await axios.post('/api/get-video-script',{
        prompt
      });
      console.log('>>>script',result.data.result.response);
      setLoading(false);

    }catch(err){
      console.log('Error while getting video script',err);
      toast('Error while getting video script, Please try again later');
    }
    
  }

  return (
    <div className='md:px-20 '>
      <h2 className='font-bold text-4xl text-primary text-center'>
        CreateNew
      </h2>
      <div className='mt-10 shadow-md p-10 '>

        <SelectTopic onUserSelect={onHandleInputChange} />

        <SelectStyle onUserSelect={onHandleInputChange} />

        <SelectDuration onUserSelect={onHandleInputChange} />

        <Button onClick={createNewButtonClickHandler} className='mt-10 w-full'>Create short video</Button>

      </div>

      <CustomLoader loading={loading} />

    </div>
  )
}

export default CreateNew