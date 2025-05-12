'use client'
import React, { useState } from 'react'
import SelectTopic from './_components/SelectTopic'
import SelectStyle from './_components/SelectStyle'
import SelectDuration from './_components/SelectDuration'
import { Button } from '@/components/ui/button'
import axios from 'axios'
import { toast } from "sonner"
import CustomLoader from './_components/CustomLoader'
import { v4 as uuidv4 } from 'uuid';


const VIDEO_SCRIPT = [{
  "scene": 1,
  "imagePrompt": "A photorealistic painting of a Roman soldier standing guard in front of the Colosseum, with a bustling crowd and gladiators entering the arena.",
  "contentText": "The Colosseum in Rome wasn't just for gladiator fights. It also hosted mock naval battles!"
},
]
const CreateNew = () => {
  const [formData,setFormData] = useState([]);
  const [loading,setLoading] = useState(false);
  const [videoScript,setVideoScript] = useState([]);
  const [audioFileUrl, setAudioFileUrl] = useState();
  const [captions, setCaptions] = useState([]);
  const [imageList, setImageList] = useState([]);

  const onHandleInputChange = (fieldName,fieldValue)=>{
    setFormData({
      ...formData,
      [fieldName]:fieldValue
    })
  }

  const createNewButtonClickHandler = () =>{
    // getVideoScript();
    // generateAudioFile();
    // generateAudioCaptions(FILE_URL);
    generateImage()
  }

  // Get video script
  const getVideoScript = async ()=>{
    setLoading(true);
    const prompt = `Write a script to generate ${formData.duration} video on topic : ${formData.topic} with AI image prompt in ${formData.style} format for each scene and give me result in JSON format with imagePrompt and contentText as field, No plain Text`;
    try{
      const result = await axios.post('/api/get-video-script',{
        prompt
      });
      setVideoScript(result.data.result.response);
      generateAudioFile(result.data.result.response);
      setLoading(false);

    }catch(err){
      console.log('Error while getting video script',err);
      toast('Error while getting video script, Please try again later');
    }
  }

  const generateAudioFile = async (videoScriptData) => {
    setLoading(true);
    let script = '';
    const id = uuidv4();
    videoScriptData.forEach(item => {
      script += item.contentText;
    })

    const response = await axios.post('/api/generate-audio',{
      text: scriptData,
      id
    });
    setAudioFileUrl(response?.data?.audioUrl);
    generateAudioCaptions(response?.data?.audioUrl);
    setLoading(false);

  }

  const generateAudioCaptions = async (audioUrl) => {
    setLoading(true);
    const response = await axios.post('/api/generate-captions', {
      audioUrl
    });
    setCaptions(response?.data?.captions);
    generateImage();
    setLoading(false);
  }

  const generateImage = async () => {
    setLoading(true);
    let images = [];
    VIDEO_SCRIPT.forEach(async (item) => {
      const response = await axios.post('/api/generate-image', {
        prompt: item.imagePrompt
      });
      console.log('Image URL:', response.data.imageUrl);
      images.push(response.data.imageUrl);
    });
    console.log('>>>here are the final images: ', images)
    setImageList
    setLoading(false);
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