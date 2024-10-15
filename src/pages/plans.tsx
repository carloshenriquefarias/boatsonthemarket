import { Divider, Flex, Icon, SimpleGrid, useColorModeValue, Text, Button, VStack, Box, HStack} from '@chakra-ui/react';
import { motion } from 'framer-motion';

import Card from '../components/Card'
import CardPlan from '../components/CardPlan';
import Footer from '../components/Footer'
import Header from '../components/Header'
import MixedCharts from '../components/Charts/MixedCharts';
import MenuMiniStatistics from '../components/MenuMiniStatistics';

import { MdAttachMoney, MdBarChart } from "react-icons/md";
import { BsFillPlusSquareFill } from "react-icons/bs";

import { useNavigate} from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

// import { toastApiResponse } from '../components/Toast';
import { ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.min.css";
import { plans } from '../mock/planList';

export default function Plans() {

  const { user } = useAuth();

  const navigate = useNavigate();
  const textColorPrimary = useColorModeValue("secondaryGray.900", "white");
  const textColorSecondary = "gray.400";
  const bg = useColorModeValue("white", "navy.700");
  const cardShadow = useColorModeValue(
    "0px 18px 40px rgba(112, 144, 176, 0.12)",
    "unset"
  );

  const chartData = [
    {
      name: 'Number of clients',
      data: [128, 149, 100, 132, 125, 176, 165, 162, 132, 120, 164, 133],
    },
    {
      name: 'Total Earnings by ads',
      data: [1189, 1738.5, 1135, 1396, 1430.5, 1960.5, 2634, 2733, 1730.5, 1282, 1090, 1034.5],
    },
    {
      name: 'Ads accumulated Revenue',
      data: [1189, 2928.5, 4063.5, 5459.5, 6890, 8850.5, 11484.5, 14217.5, 15948, 17230, 18320, 19354.5],
    },
  ];

  const boxDataMain = [
    {
      id: '1',
      color: '#eff5fa',
      height: 'auto',
      borderRadius: 10,
      mainChart: <MixedCharts chartData={chartData} />
    }
  ];

  const statisticsData = [
    { bg: 'blue', icon: MdBarChart, name: 'Total plans', value: '7' },
    { bg: '', icon: MdBarChart, name: 'On sale', value: '2' },
    { bg: '', icon: MdBarChart, name: 'Total costumers', value: '10' },
    { bg: 'blue', icon: MdBarChart, name: 'Plans enabled', value: '5' },
    { bg: 'blue', icon: MdBarChart, name: 'Plans disabled', value: '2' },
    { bg: 'white', icon: MdAttachMoney, name: 'Total ads sales', value: '19.354,00' },
  ];

  const handleToNewPlan = () => {
    navigate(`/registerPlans`);
  };

  const handleToEdit = () => {
    navigate(`/plansEdit`);
  };

  return (
    <>
      {user?.is_admin == '1' ? (
        <Flex direction="column" height="100%" bg="white">
          <Header />

          <SimpleGrid
            columns={{ base: 1, md: 1, lg: 1 }}
            spacing={3}
            w="100%"
            maxWidth={1480}
            mx='auto'
            mt={5}
            px={3}
          >
            <HStack justifyContent={'space-between'} alignItems={'center'}>
              <Box justifyContent={'flex-start'} alignItems={'center'}>
                <Text
                  color={textColorPrimary}
                  fontWeight="bold"
                  fontSize="2xl"
                  mt="5px"
                  textAlign="left"
                >
                  Boat plans
                </Text>

                <Text color={textColorSecondary} fontSize="md" me="6px" mb="5px" mt={2}>
                  Register good plans about your boat business today
                </Text>
              </Box>

              <Button bg='gray.50' w='auto' h={'80px'} onClick={handleToNewPlan}>
                <VStack pt={0}>
                  <Icon as={BsFillPlusSquareFill} color={'blue.300'} h='28px' w='28px' />
                  <Text color={'blue.300'} fontSize={['2xs', 'xs', 'sm', 'md']}>Register new plan</Text>
                </VStack>
              </Button>
            </HStack>

            <Divider />
          </SimpleGrid>

          <Card bg={bg} boxShadow={cardShadow} mb='20px' pt={3} px={3} maxWidth={1480} w="100%" mx='auto' borderRadius={10}>
            <Text color={textColorSecondary} fontSize='md' me='6px' mb='5px'>
              Statistics boat plans
            </Text>

            <SimpleGrid
              columns={{ base: 1, md: 2, lg: 3, "2xl": 6 }}
              gap='20px'
              spacing={10}
              my='20px'
              w="100%"
              maxWidth={1480}
              mx='auto'
            >
              {statisticsData.map((data, index) => (
                <MenuMiniStatistics key={index} {...data} />
              ))}
            </SimpleGrid>
          </Card>

          <Card bg={bg} boxShadow={cardShadow} mb='20px' py={3} px={3} maxWidth={1480} w="100%" mx='auto' borderRadius={10}>
            <Text color={textColorSecondary} fontSize='md' mb='10px'>
              Analitcs charts
            </Text>

            <SimpleGrid columns={{ base: 1, md: 1, lg: 1, xl: 1 }} spacing={5}>
              {boxDataMain.map((data, index) => (
                <motion.div whileHover={{ translateY: -5 }}>
                  <Box key={index} bg={data.color} w="100%" h={data.height} borderRadius={data.borderRadius} _hover={{ boxShadow: "0 0 0 5px cyan" }}>
                    {data.mainChart}
                  </Box>
                </motion.div>
              ))}
            </SimpleGrid>
          </Card>

          <Card bg={bg} boxShadow={cardShadow} mb='20px' py={3} px={3} maxWidth={1480} w="100%" mx='auto' borderRadius={10}>
            <Text color={textColorSecondary} fontSize='md' mb='10px'>
              My plans registered
            </Text>

            <motion.div
              initial={{ opacity: 0, x: 150 }}
              whileInView={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 150 }}
              transition={{ duration: 0.8 }}
            >
              <SimpleGrid columns={{ base: 1, md: 2, lg: 2, xl: 4 }} spacing={4} my={4}>
                {plans.map((plan, index) => (
                  <CardPlan
                    key={index}
                    plan={plan}
                    onClickEdit={handleToEdit}
                  />
                ))}
              </SimpleGrid>
            </motion.div>
          </Card>

          <ToastContainer />
          <Footer />
        </Flex>
      ) : (
        navigate('/')
      )}
    </>
  )
}