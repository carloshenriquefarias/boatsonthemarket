import { Flex, SimpleGrid } from '@chakra-ui/react'
import AllBoats from '../components/AllBoats'
import Footer from '../components/Footer'
import Header from '../components/Header'

export default function ListBoat() {
  return (
    <Flex direction="column" height="100%" bg="white">
      <Header />

      <SimpleGrid 
        columns={{ base: 1, md: 1, lg: 1 }} 
        spacing={3}
        w="100%"
        maxWidth={1480}
        mx='auto'
        mt={5}
      >
        <AllBoats />
      </SimpleGrid>

      <Footer />
    </Flex>
  )
}