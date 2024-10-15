'use client'
import { Box, Image, Container, useColorModeValue, VStack, Text } from "@chakra-ui/react";
import { motion} from "framer-motion";

interface CardAdsProps {
  id?: string;
  image: string;
  buttonStatusColor?: string;
}

export default function CardAds({ image, buttonStatusColor }: CardAdsProps) {
  return (
    <motion.div whileHover={{ translateY: -5 }}>
      <Container p={{ base: 1, md: 1 }}>
        <Box
          cursor={'pointer'}
          _hover={{ boxShadow: "0 0 0 5px cyan" }}
          rounded="md"
          overflow="hidden"
          bg={useColorModeValue('white', 'gray.800')}
          h={'20rem'} 
          w="14rem"
        >
          <Box position="relative" borderRadius={10} overflow="hidden" h={'100%'}>
            {buttonStatusColor === '0' && (
              <VStack
                top={0}
                h="100%"
                w="100%"
                justifyContent="center"
                alignItems="center"
                position="absolute"
                zIndex={1}
              >
                <Box bg="blue.200" h="100%" w="100%" opacity={0.7} rounded="md" />
                <Text
                  fontFamily="heading"
                  fontSize="lg"
                  color="gray.100"
                  position="absolute"
                  textAlign={'center'}
                  zIndex={2}
                >
                  ANNOUNCEMENT DISABLED
                </Text>
              </VStack>
            )}

            <Image
              src={image}
              // objectFit="fill"
              // w="100%"
              // h="100%"
              w="14rem"
              h="20rem"
              borderRadius="md"
            />
            {/* <Box
              position="absolute"
              bottom={0}
              left={0}
              right={0}
              p={4}
              bg="rgba(0, 0, 0, 0.6)"
              color="white"
            >
              Card Title
            </Box> */}
          </Box>
        </Box>
      </Container>
    </motion.div>
  );
}
