import { Flex, Stack, useBreakpointValue } from '@chakra-ui/react'

import Header from '../components/Header'
import Video from '../components/Video'
import PopularBoat from '../components/PopularBoat'
import BoxCarousel from '../components/BoxCarousel'
import ListCardBoat from '../components/ListCardBoat'
import Warning from '../components/Warning'
import Footer from '../components/Footer'
import Budget from '../components/GetBudget'
import LatestNews from '../components/LatestNews'

export default function Home() {

  const isWideVersion = useBreakpointValue({
    base: false,
    md: true,
    lg: true,
  })

  return (
    <Flex direction="column" height="100%" bg="white">
      <Header />

      {isWideVersion ? (<Video />) : null}

      <Stack px='5%' >
        <PopularBoat />
        <BoxCarousel />
        <ListCardBoat />
        <LatestNews />
      </Stack>
      
      <Warning />
      <Budget />
      <Footer />
    </Flex>
  )
}