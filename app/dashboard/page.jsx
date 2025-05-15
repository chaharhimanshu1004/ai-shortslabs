'use client'
import React, { useContext, useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { CirclePlus } from 'lucide-react';
import EmptyState from './_components/EmptyState';
import Link from 'next/link';
import { VideoData } from '@/configs/schema';
import { db } from '@/configs/db';
import { eq } from 'drizzle-orm';
import { useUser } from '@clerk/nextjs';
import VideoList from './_components/VideoList';

const Dashboard = () => {
  const [videoList, setVideoList] = useState([]);
  const { user } = useUser();
  const getVideoList = async () => {
    const result = await db.select().from(VideoData).where(eq(VideoData?.createdBy, user?.primaryEmailAddress?.emailAddress));
    setVideoList(result);
  }

  useEffect(() => {
    if(user){
      getVideoList();
    }
  }, [user])
  
  return (
    <div>
      <div className='flex justify-between items-center'>
        <h2 className='font-bold text-2xl text-primary'>Dashboard</h2>
        <Link href={'/dashboard/create-new'}>
          <Button>
            Create New
            <CirclePlus />
          </Button>
        </Link>
      </div>
      {
        videoList.length === 0 && 
        <div>
            <EmptyState />
          </div>
      }
      <VideoList videoList={videoList} />

    </div>
  )
}

export default Dashboard