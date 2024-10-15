import { HStack, Link } from '@chakra-ui/react'
import { useState } from 'react';

type MenuProps = {
    titleMenu: string;
    fontColorLink: string;
    onClick?: () => void;
}

export default function LinkMenu({titleMenu, fontColorLink, onClick}: MenuProps){

    const fontSizeMenu = 'sm'
    const [isHovered, setIsHovered] = useState(false);

    const handleHover = () => {
        setIsHovered(!isHovered);
    };

    return(
        <HStack alignItems="center" justifyContent="center" h="10" mb={2}>
            <HStack spacing={6}>
                <Link
                    fontSize={fontSizeMenu}
                    color={isHovered ? 'yellow.300' : fontColorLink}
                    fontWeight='bold'
                    onMouseEnter={handleHover}
                    onMouseLeave={handleHover}
                    textDecoration='none' 
                    onClick={onClick}
                >
                    {titleMenu}
                </Link>           
            </HStack>
        </HStack>   
    )
}