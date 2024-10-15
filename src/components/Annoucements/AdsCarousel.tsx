import { Box, Divider, SimpleGrid, Text, Image } from "@chakra-ui/react";
import { motion } from 'framer-motion';

interface ImageData {
  imageUrl: string;
}

export default function AdsCorousel({ imageUrl }: ImageData) {
  return (
    <>
      <Text fontSize={['sm', 'md', 'lg', 'xl']} fontWeight={'bold'} color={'blue.400'} mt={10}>
        BOX CAROUSSEL
      </Text>

      <Divider borderColor="blue.400" mt={4} mb={6}></Divider>

      <motion.div
        initial={{ opacity: 0, x: 150 }}
        whileInView={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 150 }}
        transition={{ duration: 0.8 }}
      >
        <SimpleGrid
          templateColumns={{ base: '1fr', sm: '1fr', md: '70% 30%' }}
          columns={{ base: 1, sm: 1, md: 1, lg: 1, xl: 2 }}
          spacing={3}
          w={'100%'}
          height={'auto'}
          mt={10}
          marginX="auto"
          maxWidth={1480}
        >
          <Box
            w={{ base: "100%", md: "100%" }}
            height={{ base: '25rem', md: '31rem', lg: '37rem' }}
            cursor={'pointer'}
            bg='red'
          >
            <Image
              src={"https://alliedyachting.com/wp-content/uploads/2019/01/news__412099723.jpg"}
              alt=""
              objectFit="fill"
              width="100%"
              height="100%"
            />
          </Box>

          <SimpleGrid columns={1} spacing={3} w='100%'>
            <Box w={{ base: "100%", md: "96%" }} h="auto">
              <Image
                src={imageUrl}
                alt=""
                objectFit="fill"
                width="100%"
                height="100%"
              />
            </Box>

            <Box w={{ base: "100%", md: "96%" }} h="100%" bg="white">
              <Image
                src={"https://www.ez-dock.com/content/uploads/2020/12/01-Where-Is-the-Best-Place-to-Store-a-Fire-Extinguisher-on-Your-Boat.jpg"}
                alt=""
                objectFit="fill"
                width="100%"
                height="100%"
              />
            </Box>
          </SimpleGrid>
        </SimpleGrid>
      </motion.div>
    </>
  );
};