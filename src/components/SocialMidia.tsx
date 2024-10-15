import { HStack, Icon, IconButton, Text } from '@chakra-ui/react'
import { TfiTwitter, TfiFacebook, TfiInstagram, TfiLinkedin} from "react-icons/tfi";

interface SocialMidiaProps {
    show?: boolean;
}

export default function SocialMidia({show = true} : SocialMidiaProps) {
    return(
        <>
            {show && (
                <HStack alignItems="center" justifyContent="space-between" h="10">
                    <Text color="gray.100" fontSize={"sm"}></Text>
                    <HStack>
                        <IconButton 
                            bg="white"                   
                            aria-label="Open Navigation"
                            fontSize="18"
                            variant="unstyled"
                            mr="2"
                            display="flex" 
                            justifyContent="center"
                            alignItems="center"  
                            borderRadius="full"
                        >
                            <Icon as={TfiTwitter} />
                        </IconButton>

                        <IconButton 
                            bg="white"                   
                            aria-label="Open Navigation"
                            fontSize="18"
                            variant="unstyled"
                            mr="2"
                            display="flex" 
                            justifyContent="center"
                            alignItems="center"  
                            borderRadius="full"
                        >
                            <Icon as={TfiFacebook} />
                        </IconButton>

                        <IconButton 
                            bg="white"                   
                            aria-label="Open Navigation"
                            fontSize="18"
                            variant="unstyled"
                            mr="2"
                            display="flex" 
                            justifyContent="center"
                            alignItems="center"  
                            borderRadius="full"
                        >
                            <Icon as={TfiInstagram} />
                        </IconButton>         

                        <IconButton 
                            bg="white"                   
                            aria-label="Open Navigation"
                            fontSize="18"
                            variant="unstyled"
                            mr="2"
                            display="flex" 
                            justifyContent="center"
                            alignItems="center"  
                            borderRadius="full"
                        >
                            <Icon as={TfiLinkedin} />
                        </IconButton>                           
                    </HStack>
            </HStack>
            )}       
             
        </>  
    )
}