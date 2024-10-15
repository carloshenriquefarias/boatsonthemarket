import { Text, useBreakpointValue, VStack } from '@chakra-ui/react'

export default function Warning() {

  const isWideVersion = useBreakpointValue({
    base: false,
    md: true,
    lg: true,
  })
  
  return (
    <VStack
      bg="blue.400"
      w="100%"
      h="18rem"
      align="center"
      marginX="auto"
      px="6"
      mt={5}
    >
      <VStack align="center" justifyContent="center" w={isWideVersion ? "70%" : "100%"} display={'block'}>
        <Text color="gray.100" fontSize={['sm', 'md', 'lg', '2xl']} mt={5} fontWeight="bold" textAlign="center">
          Unlock Your Nautical Journey, Elevate Your Brand with Us and Advertise Today!
        </Text>
        <Text color="gray.100" fontSize={['2xs','xs', 'sm', 'md']} mt={5} textAlign="center">
          Looking for the perfect platform to showcase your brand, product, or upcoming event? Look no further! BOATS ON THE MARKET is the ideal space to reach a targeted and engaging audience.
          Ready to make a lasting impression? Contact us now for a personalized quote and let us help you maximize your reach!
          Don't miss out on the opportunity to shine in front of our vibrant community. Advertise with BOATS ON THE MARKET and make your mark today!
        </Text>
      </VStack>
    </VStack>
  )
}