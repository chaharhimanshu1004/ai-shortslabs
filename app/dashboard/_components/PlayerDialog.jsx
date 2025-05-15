'use client'
import React, { useEffect, useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Player } from '@remotion/player'
import RemotionVideo from './RemotionVideo'
import { Button } from '@/components/ui/button';
import { db } from '@/configs/db';
import { VideoData } from '@/configs/schema';
import { eq } from 'drizzle-orm';



function PlayerDialog({ playVideo, videoId }) {

    const [openDialog, setOpenDialog] = useState(false);
    const [videoData, setVideoData] = useState();
    const [durationInFrames, setDurationInFrames] = useState(120); // ex : 120 frames :: 30 fps == 120/30 = 4 seconds 

    useEffect(() => {
        setOpenDialog(playVideo);
        videoId && getVideoData();
    }, [playVideo])

    const getVideoData = async () => {
        const result = await db.select().from(VideoData).where(eq(VideoData.id, videoId));
        setVideoData(result[0]);
    }


    return (
        <Dialog open={openDialog}>
            <DialogContent >
                <DialogHeader className='bg-white flex flex-col items-center'>
                    <DialogTitle className='text-3xl font-bold my-5'>Yeahhh!!! Your video is ready</DialogTitle>
                    <DialogDescription>
                        <Player
                            component={RemotionVideo}
                            durationInFrames={Number(durationInFrames.toFixed(0))} // it should be a number
                            compositionWidth={300}
                            compositionHeight={450}
                            fps={30}
                            controls={true} // for video player controls 
                            inputProps={{
                                ...videoData,
                                setDurationInFrames: (duration) => {
                                    setDurationInFrames(duration);
                                }
                            }}
                            // logLevel="trace"
                        />
                        <div className='flex gap-10 mt-8'>
                            <Button variant='outline'>
                                Cancel
                            </Button>
                            <Button>
                                Export
                            </Button>
                        </div>
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}

export default PlayerDialog