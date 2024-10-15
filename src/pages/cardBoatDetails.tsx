import { Flex } from '@chakra-ui/react';
import Header from '../components/Header'
import Footer from '../components/Footer'
import TabsBoat from '../components/Tabs'
import Contact from '../components/Contact'
import "react-toastify/ReactToastify.min.css";

export default function CardBoatDetails() {
  return (
    <Flex direction="column" height="100%" bg="white">
      <Header />
      <TabsBoat />
      <Contact />
      <Footer />
    </Flex>
  )
}