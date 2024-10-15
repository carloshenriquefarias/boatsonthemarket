import { HStack, Icon, Text } from "@chakra-ui/react";

export default function BoatTypesButton ({ icon, text, onClick }: any){
    return (
      <HStack
        px={2}
        bg={'blue.500'}
        height={'auto'}
        w='auto'
        py={2}
        borderRadius={10}
        justifyContent={'flex-start'}
        alignItems={'center'}
        onClick={onClick}
        cursor={'pointer'}
      >
        <Icon as={icon} fontSize="2xl" color={'yellow.500'} />
        <Text color={'yellow.500'} fontSize={['2xs', 'xs', 'sm', 'md']}>{text}</Text>
      </HStack>
    );
  };