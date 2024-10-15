'use client'
import { Button, Flex, HStack, Text, VStack, Divider, SimpleGrid, useBreakpointValue } from '@chakra-ui/react';
import AllRights from './AllRights'
import Menu from './Menu'
// import { motion } from "framer-motion";

export default function Footer() {

  const isWideVersion = useBreakpointValue({ base: false, lg: true });

  function handleTwitter(){
    window.open("https://x.com/boatsotmarket?s=11", "_blank");
  }

  function handleInstagram(){
    window.open("https://www.instagram.com/boatsonthemarket/", "_blank");
  }

  function handleFacebook(){
    window.open("https://www.facebook.com/profile.php?id=61558098417731", "_blank");
  }

  return (
    <>
      <Flex
        bg="white"
        w="100%"
        h="14rem"
        align="center"
        marginX="auto"
        mt="4"
        maxWidth={1500}
      >
        <VStack
          w="55%"
          alignItems="center"
          justifyContent="center"
          marginX="auto"
          maxWidth={1500}
        >
          {/* <motion.div
            initial={{ opacity: 0, y: 200, scale: 0.5 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 200, scale: 0.5 }}
            transition={{ duration: 0.5 }}
            className='origin-center'
          > */}
            <SimpleGrid
              columns={{ base: 1, md: 1, lg: 2, xl: 2 }} spacing={10}
              w={'100%'}
              alignItems="center"
              justifyContent="space-between"
              h="auto"
              mb={10}
            >
              <VStack mb={2}>
                <Text fontSize={['sm', 'md', 'lg', '2xl']} fontWeight='bold'>Follow Us On Social Media!</Text>
              </VStack>

              <HStack spacing={3} alignItems={'center'} justifyContent={'center'}> 
                <Button colorScheme='twitter' fontSize={['2xs', 'xs', 'sm', 'md']} onClick={handleTwitter}>
                  Twitter
                </Button>
                <Button colorScheme='facebook' fontSize={['2xs', 'xs', 'sm', 'md']} onClick={handleFacebook}>
                  Facebook
                </Button>
                <Button colorScheme='pink' fontSize={['2xs', 'xs', 'sm', 'md']} onClick={handleInstagram}>
                  Instagram
                </Button>
              </HStack>
            </SimpleGrid>
          {/* </motion.div> */}

          <Divider borderColor="gray.200" mb={5}></Divider>
        </VStack>         
      </Flex>

      {isWideVersion ?
        <HStack w='100%' display={{ base: 'none', md: 'flex' }} alignItems="center" justifyContent={'center'}>
          <Menu color='blue.400' />
        </HStack>
        : null
      }
      <AllRights />
    </>
  )
}