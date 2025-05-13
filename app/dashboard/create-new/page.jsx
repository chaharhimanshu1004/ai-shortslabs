'use client'
import React, { useContext, useEffect, useState } from 'react'
import SelectTopic from './_components/SelectTopic'
import SelectStyle from './_components/SelectStyle'
import SelectDuration from './_components/SelectDuration'
import { Button } from '@/components/ui/button'
import axios from 'axios'
import { toast } from "sonner"
import CustomLoader from './_components/CustomLoader'
import { v4 as uuidv4 } from 'uuid';
import { VideoDataContext } from '@/app/_context/VideoDataContext'



const CreateNew = () => {
  const [formData,setFormData] = useState([]);
  const [loading,setLoading] = useState(false);
  const [videoScript,setVideoScript] = useState([]);
  const [audioFileUrl, setAudioFileUrl] = useState();
  const [captions, setCaptions] = useState([]);
  const [imageList, setImageList] = useState([]);

  const { videoData, setVideoData } = useContext(VideoDataContext);

  const onHandleInputChange = (fieldName,fieldValue)=>{
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
      const response = result?.data?.result?.response;
      if (response) {
        setVideoData(prev => ({
          ...prev,
          videoScript: response
        }))
        setVideoScript(result.data.result.response);
        await generateAudioFile(result.data.result.response);
      }
    }catch(err){
      console.log('Error while getting video script',err);
      toast('Error while getting video script, Please try again later');
    }
  }

  // generate audio
  const generateAudioFile = async (videoScriptData) => {
    setLoading(true);
    let script = '';
    const id = uuidv4();
    videoScriptData.forEach(item => {
      script += item.contentText;
    })

    const response = await axios.post('/api/generate-audio',{
      text: script,
      id
    });
    const audioUrl = response?.data?.audioUrl;
    setVideoData(prev => ({
      ...prev,
      'audioFileUrl': audioUrl
    }))
    setAudioFileUrl(audioUrl);
    audioUrl && generateAudioCaptions(response?.data?.audioUrl, videoScriptData);

  }

  // generate captions
  const generateAudioCaptions = async (audioUrl, videoScriptData) => {
    setLoading(true);
    const response = await axios.post('/api/generate-captions', {
      audioUrl
    });
    const result = response?.data?.captions;
    setCaptions(result);
    setVideoData(prev => ({
      ...prev,
      'captions': result
    }))
    setLoading(false);
    result && generateImage(videoScriptData);
  }
  // generate image
  const generateImage = async (videoScriptData) => {
    setLoading(true);
    let images = [];
    for (const item of videoScriptData) {
      try {
        const res = await axios.post('/api/generate-image', {
          prompt: item.imagePrompt
        })
        const imageUrl = res?.data?.imageUrl;
        setVideoData(prev => ({
          ...prev,
          'imageList': imageUrl
        }))
        images.push(imageUrl);
      } catch (err) {
        console.log('Error while generating a image', err);
      }
    }
   
    setImageList(images)
    setLoading(false);
  }

  useEffect(() => {
    console.log(videoData)
  }, [videoData])

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