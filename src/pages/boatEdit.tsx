import { Flex } from '@chakra-ui/react'

import Footer from '../components/Footer'
import Header from '../components/Header'
import Projects from '../components/Projects'

export default function BoatEdit() {

  return (
    <Flex direction="column" height="100%" bg="white">
      <Header />

      <Flex width="100%" my="6" mx="auto" px="6" maxWidth={1600}>
        <Projects />
      </Flex>

      <Footer />
    </Flex>
  )
}