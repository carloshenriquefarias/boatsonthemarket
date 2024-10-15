import { Flex } from '@chakra-ui/react'

import Footer from '../components/Footer'
import Header from '../components/Header'
import MyProfile from '../components/MyProfile'

export default function EditProfile() {

  return (
    <Flex direction="column" height="100%" bg="white">
      <Header />

      <Flex width="100%" my="6" mx="auto" px="6" maxWidth={1600}>
        <MyProfile />
      </Flex>

      <Footer />
    </Flex>
  )
}