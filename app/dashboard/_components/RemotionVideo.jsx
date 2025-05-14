import React from 'react'
import { AbsoluteFill, Img, Sequence, useVideoConfig } from 'remotion'

function RemotionVideo({ script, audioFileUrl, captions, imageList, setDurationInFrames }) {

  const { fps } = useVideoConfig();

  const getDurationFrame = () => {
    const duration = captions[captions.length - 1]?.end / 1000 * fps
    setDurationInFrames(duration)
    return duration ;
  }


  return (
    <AbsoluteFill className='bg-black'>
      {
        imageList?.map((item, index) => (
          <>
            <Sequence key={index} from={((index * getDurationFrame()) / imageList?.length)} durationInFrames={getDurationFrame()}>
              <Img src={item} style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }} >
              </Img>
            </Sequence>
          </>
        ))
      }

    </AbsoluteFill>
  )
}

export default RemotionVideo