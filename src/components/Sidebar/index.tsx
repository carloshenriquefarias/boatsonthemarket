import { Box } from '@chakra-ui/react';
import { SidebarNav } from './SidebarNav'

export function SideBar(){
    return (       
        <Box as="aside" w="18%" mr="8">
            <SidebarNav/>
        </Box>        
    )
}