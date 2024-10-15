'use client'
import { Box, Text, VStack, Image, Flex } from "@chakra-ui/react";
// import { motion } from "framer-motion";

export default function BoatTypesCard({ title, subtitle, description, imageBoatType, onClick }: any) {
  return (
    // <motion.div
    //   initial={{ opacity: 0, x: -150 }}
    //   whileInView={{ opacity: 1, x: 0 }}
    //   exit={{ opacity: 0, x: -150 }}
    //   transition={{ duration: 1 }}
    // >
      <Flex
        w={'auto'}
        h={'auto'}
        flex="1"
        transition="all 0.25s"
        transitionTimingFunction="spring(1 100 10 10)"
        _hover={{ transform: "translateY(-4px)", shadow: "xl" }}
        onClick={onClick}
        cursor={'pointer'}
      >
        <VStack
          w={['auto', '140px', '160px', '180px', '200px']}
          h={['180px', '200px', '220px', '240px', '260px']}
          justifyContent='center'
          alignItems='flex-start'
          _hover={{ boxShadow: "0 0 0 5px cyan" }}
          borderRadius={5}
          cursor={'pointer'}
          position="relative"
          overflow="hidden"
        >
          <Box
            w="100%"
            h="100%"
            position="relative"
          >
            <Image
              src={imageBoatType}
              alt=""
              w="100%"
              height="100%"
              objectFit="cover"
              borderRadius={5}
            />

            <VStack
              position="absolute"
              top="50%"
              w='100%'
              h='100%'
              left="50%"
              transform="translate(-50%, -50%)"
              textAlign="center"
              zIndex={2}
              // bg={'rgba(0, 16, 44, 0.65)'}
              bg={'rgba(2, 23, 61, 0.65)'}
              p={4}
              color="white"
            >
              <Text fontFamily="heading" fontSize="2xl" fontWeight="bold" color={"yellow.500"} pt={5}>
                {title}
              </Text>
              <Text fontSize="lg" fontWeight="normal">
                {subtitle}
              </Text>
              <Text fontSize="xs" fontWeight="normal">
                {description}
              </Text>
            </VStack>
          </Box>
        </VStack>
      </Flex>
    // </motion.div>
  );
};

