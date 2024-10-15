import { Button, HStack, Text, SimpleGrid, VStack } from '@chakra-ui/react'
import { useState } from 'react';
import ModalEmail from './ModalEmail';

export default function Budget() {

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <SimpleGrid
      templateColumns={{ base: '1fr', md: '70% 30%' }}
      columns={{ base: 1, md: 2 }}
      bg="white"
      mt={-20}
      w="55%"
      h={'13rem'}
      maxWidth={1480}
      borderRadius={10}
      spacing={4}
      px={10}
      alignItems="center"
      justifyContent="center"
      marginX="auto"
      boxShadow="0px 2px 8px 0px rgba(0,0,0,0.2)"
      py={3}
    >
      <VStack alignItems="flex-start" justifyContent="center">
        <HStack justifyContent='flex-start' alignItems={'flex-start'}>
          <Text color="blue.400" fontSize={['sm', 'md', 'lg', 'xl']} textAlign="left" fontWeight="bold">
            REQUEST A QUOTE
          </Text>
        </HStack>
        <Text color="blue.400" fontSize={['xs', 'sm']}>
          Contact us today to discuss your preferences about annoucemments, and allow us to provide you a different way to get a new client.
        </Text>
      </VStack>

      <Button w="100%" fontSize={['2xs', 'xs','sm']} bg="blue.400" color="gray.50" onClick={openModal}>
        GET A QUOTE NOW!
      </Button>

      {isModalOpen && (
        <ModalEmail 
          isOpen={isModalOpen} 
          onClose={closeModal} 
          title='Contact our team' 
        />
      )}
    </SimpleGrid>
  )
}

