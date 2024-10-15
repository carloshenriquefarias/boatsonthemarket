import { useRef, useState } from 'react';
import { Box, Center } from '@chakra-ui/react';

const VideoPlayer = () => {
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const [muted, setMuted] = useState(true);

    return (
        <Center w="100%" height="auto">
            <Box w="100%" height="auto">
                <video
                    ref={videoRef}
                    controls={false} 
                    autoPlay={true}
                    muted={muted}
                    width="100%"
                    height="auto"
                    onEnded={() => {
                        if (videoRef.current) {
                            videoRef.current.currentTime = 0;
                            videoRef.current.play();
                        }
                    }}
                >
                    <source src="./video/boatsvideo.mp4" type="video/mp4" />
                </video>
                {!muted && (
                    <button onClick={() => setMuted(true)}>Ativar Som</button>
                )}
            </Box>
        </Center>
    );
}

export default VideoPlayer;







