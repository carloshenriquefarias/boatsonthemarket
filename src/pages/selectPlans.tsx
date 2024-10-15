import { Flex, Stack, VStack, Text, useColorModeValue } from '@chakra-ui/react'

import Footer from '../components/Footer'
import Header from '../components/Header'
import PlanList from '../components/PlanList'
// import { useNavigate } from 'react-router-dom';

export default function SelectPlans() {
  const textColorPrimary = useColorModeValue("secondaryGray.900", "white");
  const textColorSecondary = "gray.400";

  // const navigate = useNavigate();

  // const handleGoToRegister = () => {
  //   navigate(`/login`);
  // };

  return (
    <Flex direction="column" height="100%" bg="white">
      <Header />

      <Flex width="100%" my="6" mx="auto" px="6" maxWidth={1300}>
        <VStack width="100%">
          <Text
            color={textColorPrimary}
            fontWeight='bold'
            fontSize='2xl'
            mt='5px'
            mb='5px'
          >
            Select the best plan for you
          </Text>

          <Text color={textColorSecondary} fontSize='md' me='26px' mb='15px'>
            Pick a plan that best matches quality and performance to your boats
          </Text>

          <Stack justifyContent='center' alignItems='center' width="100%">
            <PlanList />
          </Stack>

          {/* <Button w='32%' onClick={handleGoToRegister}>Advanced</Button> */}
        </VStack>
      </Flex>

      <Footer />
    </Flex>
  )
}