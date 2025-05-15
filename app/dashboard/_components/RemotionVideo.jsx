import React from 'react'
import { AbsoluteFill, Img, Sequence, useVideoConfig, Audio, useCurrentFrame, staticFile } from 'remotion'

function RemotionVideo({ script, audioFileUrl, captions, imageList, setDurationInFrames }) {

  const { fps } = useVideoConfig();
  const frame = useCurrentFrame();
  const getDurationFrame = () => {
    const duration = captions[captions.length - 1]?.end / 1000 * fps
    setDurationInFrames(duration)
    return duration ;
  }

  const getCurrentCaption = () => {
    const currentTime = (frame / 30) * 1000; // 30 = fps
    const currentCaption = captions.find((caption) => {
      return currentTime >= caption.start && currentTime <= caption.end;
    });
    return currentCaption?.text || '';
  }


  return (
    <AbsoluteFill className='bg-black'>
      {
        imageList?.map((item, index) => {
          const startTime = ((index * getDurationFrame()) / imageList?.length);
          return (
            <>
              <Sequence key={index} from={startTime} durationInFrames={getDurationFrame()}>
                <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center' }}>
                  <Img src={item} style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                  }} />
                  <AbsoluteFill style={{
                    color: 'white',
                    justifyContent: 'center',
                    top: undefined,
                    bottom: 50,
                    height: 150,
                    textAlign: 'center',
                    width: '100%',
                  }}>
                    <h2 className='text-2xl'>{getCurrentCaption()}</h2>
                  </AbsoluteFill>
                </AbsoluteFill>
              </Sequence>
            </>
          )
        })
      }
      <AbsoluteFill>
        {audioFileUrl && <Audio src={audioFileUrl} startFrom={0} />}
      </AbsoluteFill>


    </AbsoluteFill>
  )
}

export default RemotionVideo