import { HStack, Icon, Link, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import { IconType } from "react-icons/lib";

interface BoxDefaultProps {
  titleMenu: string;
  icon: IconType;
  onClick?: () => void;
}

export const BoxDefault: React.FC<BoxDefaultProps> = ({ icon: IconComponent, onClick, titleMenu }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleHover = () => {
    setIsHovered(!isHovered);
  };

  return (
    <Link
      color={isHovered ? 'blue.300' : 'gray.300'}
      onMouseEnter={handleHover}
      onMouseLeave={handleHover}
      textDecoration='none' 
      onClick={onClick}
    >                      
      <HStack px={3} bg={isHovered ? 'gray.50' : 'white'} height={'auto'} w='full' py={2} borderRadius={10}>
        <Icon as={IconComponent} fontSize="2xl" />
        <Text>{titleMenu}</Text>
      </HStack>
    </Link>
  );
};
