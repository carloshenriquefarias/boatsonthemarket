'use client'
import { Box, Center, Text, Flex, Heading, Image, SimpleGrid, Stack, VStack,
  useColorModeValue, Divider
} from '@chakra-ui/react';

import Header from '../components/Header'
import CardAboutUsOne from '../components/CardAboutUsOne'
import CardAboutUsTwo from '../components/CardAboutUsTwo'
import Footer from '../components/Footer'

// import { motion } from "framer-motion";

export default function AboutUs() {

  const textColorPrimary = useColorModeValue("secondaryGray.900", "white");
  const textColorSecondary = "gray.400";

  return (
    <Flex direction="column" height="100%" bg="white">
      <Header />

      <Stack
        bg="blue.400"
        w="100%"
        height="auto"
        align="center"
      >
        <Center w="100%" height="auto">
          <Box w="100%" height="auto">
            <Image
              src={'https://images.pexels.com/photos/42092/pexels-photo-42092.jpeg?auto=compress&cs=tinysrgb&w=1600'}
              alt=""
              w="100%"
              maxH={{ base: 300, md: 400, lg: 500, xl: 550 }}
              objectFit="cover"
            />
          </Box>
        </Center>
      </Stack>

      {/* <motion.div
        initial={{ opacity: 0, x: -150 }}
        whileInView={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -150 }}
        transition={{ duration: 1 }}
      > */}
        <SimpleGrid columns={{ base: 1, md: 1, lg: 1 }} spacing={3}
          w="100%"
          maxWidth={1500}
          mx='auto'
          mt={5}
          px={3}
        >
          <Text
            color={textColorPrimary}
            fontWeight='bold'
            fontSize='2xl'
            mt='5px'
          >
            About our company
          </Text>

          <Text color={textColorSecondary} fontSize='md' me='6px' mb='5px'>
            See how we are evoluing in this area and how we have starting our business
          </Text>
          <Divider />
        </SimpleGrid>
      {/* </motion.div> */}

      <SimpleGrid columns={{ base: 1, md: 1, lg: 1 }} spacing={3}
        w="100%"
        maxWidth={1500}
        mx='auto'
        mt={5}
        height={'auto'}
        mb={5}
      >
        <VStack maxW={1500} h='auto' width="100%" mx="auto">
          <Heading mt={3} size={'sm'} color={'gray.400'} px={5}>
            At Boats On The Market, we are not just another company in the business of boats; we are your trusted partner in fulfilling your maritime dreams. We are your compass in the world of boating, guiding you toward the best prices and providing unparalleled search options to help you find the vessel of your dreams.
          </Heading>

          {/* <motion.div
            initial={{ opacity: 0, x: -150 }}
            whileInView={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -150 }}
            transition={{ duration: 1 }}
          > */}
            <CardAboutUsOne
              image='https://images.unsplash.com/photo-1504384308090-c894fdcc538d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZW1wbG95ZWVzfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60'
              title='Our Journey: Setting Sail'
              description='Boats On The Market was founded by a passionate team of boating enthusiasts who recognized the need for a new approach to buying and selling boats. We embarked on this journey with the vision of revolutionizing the boating industry by making it easier, more accessible, and more enjoyable for everyone.'
            />
          {/* </motion.div> */}

          {/* <motion.div
            initial={{ opacity: 0, x: 150 }}
            whileInView={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 150 }}
            transition={{ duration: 0.8 }}
          > */}
            <CardAboutUsTwo
              image='https://images.unsplash.com/photo-1621277224630-81d9af65e40c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mzh8fHlhdGNoc3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60'
              title='Our Mission: Your Nautical Dreams, Our Priority'
              description='At Nautical Ventures, our mission is clear: we are dedicated to helping you buy and sell boats seamlessly. Whether youre a seasoned sailor searching for your next adventure or a first-time buyer dipping your toes into the world of boating, weve got you covered. Your satisfaction is our top priority, and we are committed to delivering the best possible experience'
            />
          {/* </motion.div> */}

          {/* <motion.div
            initial={{ opacity: 0, x: -150 }}
            whileInView={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -150 }}
            transition={{ duration: 1 }}
          > */}

            <CardAboutUsOne
              image='https://images.unsplash.com/photo-1605281317010-fe5ffe798166?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8eWF0Y2h8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60'
              title='Why Choose Boats On The Market:'
              description='Best Prices: We understand that buying or selling a boat is a significant financial decision. Thats why we work tirelessly to ensure you get the best value for your investment. Our team of experts constantly monitors the market to provide you with competitive pricing.
            Great Search Options: Finding the perfect boat should be an exciting and stress-free experience. Our user-friendly platform offers advanced search options, allowing you to filter and discover boats that match your unique preferences, ensuring you find what youre looking for in the easiest way possible.'
            />
          {/* </motion.div> */}

          {/* <motion.div
            initial={{ opacity: 0, x: 150 }}
            whileInView={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 150 }}
            transition={{ duration: 0.8 }}
          > */}

            <CardAboutUsTwo
              image='https://images.unsplash.com/photo-1599582350162-83106f579198?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHlhdGNofGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60'
              title='Join Us on This Voyage:'
              description='Whether youre ready to set sail on a new adventure or youre looking to part ways with your beloved boat, we are here to make your journey smooth, exciting, and rewarding. We invite you to embark on this voyage with us and experience the future of buying and selling boats.
            At Nautical Ventures, were not just a company; were your trusted partner in navigating the waters of the boating world. Your dreams are our business, and were dedicated to helping you reach them.
            Welcome aboard, and lets make waves together!'
            />
          {/* </motion.div> */}
        </VStack>
      </SimpleGrid>

      <Footer />
    </Flex>
  )
}