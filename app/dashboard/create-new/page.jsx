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
import { db } from '@/configs/db'
import { useUser } from '@clerk/nextjs'
import { VideoData } from '@/configs/schema'
import PlayerDialog from '../_components/PlayerDialog'



const CreateNew = () => {
  const [formData,setFormData] = useState([]);
  const [loading,setLoading] = useState(false);
  const [videoScript,setVideoScript] = useState([]);
  const [audioFileUrl, setAudioFileUrl] = useState();
  const [captions, setCaptions] = useState([]);
  const [imageList, setImageList] = useState([]);
  const [playVideo, setPlayVideo] = useState(true);
  const [videoId, setVideoId] = useState(1);

  const { user } = useUser();

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
  const getVideoScript = async () => {
    setLoading(true);
    const prompt = `Write a script to generate ${formData.duration} video on topic : ${formData.topic} with AI image prompt in ${formData.style} format for each scene and give me result in JSON format with imagePrompt and contentText as field, No plain Text`;
    try {
      const result = await axios.post('/api/get-video-script', {
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
    } catch (err) {
      console.log('Error while getting video script', err);
      toast('Error while getting video script, Please try again later');
      setLoading(false)
    }
  }

  // generate audio
  const generateAudioFile = async (videoScriptData) => {
    setLoading(true);
    try {
      let script = '';
      const id = uuidv4();
      videoScriptData.forEach(item => {
        script += item.contentText;
      });

      const response = await axios.post('/api/generate-audio', {
        text: script,
        id
      });
      const audioUrl = response?.data?.audioUrl;
      setVideoData(prev => ({
        ...prev,
        'audioFileUrl': audioUrl
      }));
      setAudioFileUrl(audioUrl);
      audioUrl && generateAudioCaptions(response?.data?.audioUrl, videoScriptData);
    } catch (err) {
      console.log('Error while generating audio file', err);
      toast('Error while generating audio file, Please try again later');
      setLoading(false);
    }
  }

  // generate captions
  const generateAudioCaptions = async (audioUrl, videoScriptData) => {
    setLoading(true);
    try {
      const response = await axios.post('/api/generate-captions', {
        audioUrl
      });
      const result = response?.data?.captions;
      setCaptions(result);
      setVideoData(prev => ({
        ...prev,
        'captions': result
      }));
      result && generateImage(videoScriptData);
    } catch (err) {
      console.log('Error while generating captions', err);
      toast('Error while generating captions, Please try again later');
      setLoading(false);
    } 
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
        const imageUrl = res?.data?.result;
        images.push(imageUrl);
      } catch (err) {
        console.log('Error while generating a image', err);
      }
    }
    setVideoData(prev => ({
      ...prev,
      'imageList': images
    }))
    setImageList(images)
    setLoading(false);
  }

  useEffect(() => {
    console.log(videoData);
    if(Object.keys(videoData).length == 4){
      saveVideoData(videoData);
    }
  }, [videoData]);

  const saveVideoData = async (videoData) => {
    setLoading(true);
    try {
      const result = await db.insert(VideoData).values({
        script: videoData.videoScript,
        audioFileUrl: videoData.audioFileUrl,
        captions: videoData.captions,
        imageList: videoData.imageList,
        createdBy: user?.primaryEmailAddress?.emailAddress
      }).returning({ id: VideoData.id });

      setVideoId(result[0].id);
      setPlayVideo(true);
      setLoading(false);
    } catch (err) {
      console.log('Error while saving video data', err);
      toast('Error while saving video data, Please try again later');
      setLoading(false);
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

      <PlayerDialog playVideo={ playVideo } videoId={ videoId } />

    </div>
  )
}

export default CreateNew