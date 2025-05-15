import React from 'react'
import { AbsoluteFill, Img, Sequence, useVideoConfig, Audio, useCurrentFrame, staticFile, interpolate } from 'remotion'

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
          const duration = getDurationFrame();

          const scale = (index) =>  interpolate(
            frame,
            [startTime, startTime + duration/2, startTime + duration], // zoom-in zoom-out 
            index % 2 == 0 ? [1, 1.8, 1] : [1.8, 1, 1.8],
            {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
            }

          )
          return (
            <>
              <Sequence key={index} from={startTime} durationInFrames={getDurationFrame()}>
                <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center' }}>
                  <Img src={item} style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transform: `scale(${scale(index)})`,
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