import { Stack} from '@chakra-ui/react'
import VideoPlayer from './VideoPlayer'

export default function Video(){
    return(
        <Stack
            bg="blue.400"
            w="100%" 
            height="auto" 
            align="center"
        >
            <VideoPlayer/>  
        </Stack>        
    )
}