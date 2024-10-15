import { Divider, Flex, Icon, SimpleGrid, useColorModeValue, Text, Button, VStack, Box,
  HStack, useBreakpointValue
} from '@chakra-ui/react';
import { motion } from 'framer-motion';

import BarCharts from '../components/Charts/BarCharts';
import Card from '../components/Card'
import CardStats, { IFeature } from '../components/CardStats';
import ColumnCharts from '../components/Charts/ColumnCharts';
import Footer from '../components/Footer'
import GroupBarChart from '../components/Charts/GroupBarCharts';
import Header from '../components/Header'
import HorizontalCharts from '../components/Charts/HorizontalCharts';
import LineCharts from '../components/Charts/LineCharts';
import MenuMiniStatistics from '../components/MenuMiniStatistics';
import MixedCharts from '../components/Charts/MixedCharts';
import PieCharts from '../components/Charts/PieCharts';

import { MdAttachMoney} from "react-icons/md";
import { IoBoatSharp } from "react-icons/io5";
import { MdDirectionsBoatFilled } from "react-icons/md";
import { MdOutlinePayment } from "react-icons/md";
import { ImUserTie } from "react-icons/im";
import { FaBuysellads } from "react-icons/fa6";
import { HiLockOpen } from "react-icons/hi2";
import { HiLockClosed } from "react-icons/hi";
import { AiFillLike } from "react-icons/ai";
import { AiFillDislike } from "react-icons/ai";
import { FaUserTie } from "react-icons/fa";
import { ImNewspaper } from "react-icons/im";
import { HiClipboardDocumentList } from "react-icons/hi2";
import { MdPayment } from "react-icons/md";

import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

import { ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.min.css";
import { api } from '../services/api';
import { useEffect, useState } from 'react';
import { BoatDataGlobal } from '../mock/motorYatchs';
import { toastApiResponse } from '../components/Toast';

export default function Admin() {

  const { user } = useAuth();

  const bg = useColorModeValue("white", "navy.700");
  const cardShadow = useColorModeValue( "0px 18px 40px rgba(112, 144, 176, 0.12)", "unset" );
  const columns = useBreakpointValue({ base: 1, md: 2, lg: 2, xl: 4 });
  const navigate = useNavigate();
  const textColorPrimary = useColorModeValue("secondaryGray.900", "white");
  const textColorSecondary = "gray.400";
  const isWideVersion = useBreakpointValue({ base: false, lg: true});

  const [boats, setBoats] = useState<BoatDataGlobal[]>([]);
  const [AllAdsType, setAllAdsType] = useState<any[]>([]);
  const [allNews, setAllNews] = useState<any[]>([]);
  const [allUsers, setAllUsers] = useState<any[]>([]);  

  const counts = {
    is_active_0: 0,
    is_active_1: 0,
    is_date_expired_false: 0,
    is_date_expired_true: 0
  };

  boats.forEach(boat => {
    if (boat.is_active === "0") {
      counts.is_active_0++;
    } else if (boat.is_active === "1") {
      counts.is_active_1++;
    }
  
    if (boat.is_date_expired === false) {
      counts.is_date_expired_false++;
    } else if (boat.is_date_expired === true) {
      counts.is_date_expired_true++;
    }
  });

  async function fetchAllBoats() {
    try {
      const response = await api.post('/list_all_boats.php');
      const totalBoats = response.data;
      setBoats(totalBoats);

    } catch (error) {
      console.error('Error:', error);
      toastApiResponse(error, 'It is not possible to load boat details');
    }
  };

  const fetchAllAds = async () => {
    try {
      const response = await api.post('/ads/list_ads.php');
      const adsResponse = response.data;
      setAllAdsType(adsResponse)
    } catch (error) {
      console.error('Error:', error);
      toastApiResponse(error, 'It is not possible to load ads information');
      // return { adsType1: [], adsType2: [], adsType3: [] };
    }
  };

  const fetchAllNews = async () => {
    try {
      const response = await api.post('/news/list_news.php');
      const newsResponse = response.data;
      setAllNews(newsResponse)
  
    } catch (error) {
      console.error('Error:', error);
      toastApiResponse(error, 'It is not possible to load news details');
    }
  };

  const fetchAllUser = async () => {
    try {
      const response = await api.post('/user/list_all.php');
      const allUsers = response.data;
      setAllUsers(allUsers);
      console.log('Dados do usuário:', allUsers);
      
    } catch (error) {
      console.error('Error:', error);
      toastApiResponse(error, 'It is not possible to list this user! Please try again!');
    } finally {
    }
  };

  const chartData = [
    {
      name: 'Number of users',
      data: [128, 149, 100, 132, 125, 176, 165, 162, 132, 120, 164, 133],
    },
    {
      name: 'Total earnings boats',
      data: [3389, 1738.5, 1135, 1396, 1430.5, 1960.5, 2634, 2733, 1730.5, 1282, 1090, 1034.5],
    },
    {
      name: 'Total earnings ads',
      data: [2500, 1738.5, 1135, 1396, 1430.5, 1960.5, 2634, 2733, 1730.5, 1282, 1090, 1034.5],
    },
    {
      name: 'Accumulated Revenue',
      data: [5189, 4928.5, 3063.5, 5459.5, 6890, 8850.5, 11484.5, 14217.5, 15948, 17230, 18320, 19354.5],
    },
  ];

  const statisticsData = [
    { bg: 'blue', icon: MdDirectionsBoatFilled, name: 'Total boats', value: boats.length },
    { bg: '', icon: AiFillLike, name: 'Boats actived', value: counts.is_date_expired_false},
    { bg: '', icon: AiFillDislike, name: 'Boats expired', value: counts.is_date_expired_true },
    { bg: 'blue', icon: HiLockOpen, name: 'Boats enabled', value: counts.is_active_1 },
    { bg: 'blue', icon: HiLockClosed, name: 'Boats disabled', value: counts.is_active_0 },
    { bg: 'white', icon: MdAttachMoney, name: 'Sales this month', value: '5.889,00' },
    { bg: 'blue', icon: FaBuysellads, name: 'Total ads', value: AllAdsType.length },
    { bg: '', icon: ImNewspaper, name: 'Total news', value: allNews.length },
    { bg: '', icon: HiClipboardDocumentList , name: 'Total plans', value: '7' },
    { bg: 'blue', icon: MdPayment , name: 'Payments made', value: '15' },
    { bg: 'blue', icon: FaUserTie, name: 'Total users', value: allUsers.length },
    { bg: '', icon: MdAttachMoney, name: 'Total Sales 2024', value: '19.354,50' },
  ];

  const soldByMonth = [1189, 1738.5, 1135, 1396, 1430.5, 1960.5, 2634, 2733, 1730.5, 1282, 1090, 1034.5];

  const barChartData = {
    amounts: [89, 57, 74, 50, 89, 68],
    products: ['Enhanced', 'Master', 'Classic', 'Free', 'Basic', 'Mega']
  };

  const pieChartData = {
    seriesData: [
      { value: 25, name: 'Enhanced' },
      { value: 8, name: 'Free' },
      { value: 10, name: 'Classic' },
      { value: 35, name: 'Master' },     
      { value: 10, name: 'Basic' },
      { value: 12, name: 'Mega' }
    ]
  };
  const horizontalChartsData = [
    { Product: 'Water toys', Amount: 20 },
    { Product: 'Super', Amount: 80 },
    { Product: 'Motor', Amount: 30 },
    { Product: 'Sailing', Amount: 20 },
    { Product: 'PWC', Amount: 40 },
    { Product: 'Commercial', Amount: 10 },
  ];

  const lineChartsData = [
    { Month: 'Jan', Free: 1500, Basic: 200, Classic: 300, Enhanced: 1250, Master: 400, Mega: 600 },
    { Month: 'Feb', Free: 550, Basic: 650, Classic: 350, Enhanced: 1300, Master: 1450, Mega: 700 },
    { Month: 'Mar', Free: 700, Basic: 500, Classic: 400, Enhanced: 550, Master: 500, Mega: 800 },
    { Month: 'Apr', Free: 150, Basic: 750, Classic: 450, Enhanced: 600, Master: 550, Mega: 900 },
    { Month: 'May', Free: 700, Basic: 100, Classic: 500, Enhanced: 450, Master: 600, Mega: 1000 },
    { Month: 'Jun', Free: 250, Basic: 250, Classic: 550, Enhanced: 600, Master: 1650, Mega: 1100 },
    { Month: 'Jul', Free: 800, Basic: 900, Classic: 600, Enhanced: 550, Master: 700, Mega: 1200 },
    { Month: 'Aug', Free: 550, Basic: 150, Classic: 650, Enhanced: 200, Master: 1750, Mega: 1300 },
    { Month: 'Sep', Free: 200, Basic: 400, Classic: 700, Enhanced: 650, Master: 800, Mega: 1400 },
    { Month: 'Oct', Free: 50, Basic: 50, Classic: 750, Enhanced: 300, Master: 1850, Mega: 1500 },
    { Month: 'Nov', Free: 1000, Basic: 100, Classic: 800, Enhanced: 750, Master: 900, Mega: 1600 },
    { Month: 'Dec', Free: 1050, Basic: 10, Classic: 850, Enhanced: 1500, Master: 950, Mega: 1700 },
  ];

  const groupBarChartData = {
    source: [
      ['Category', 'Brazil', 'Argentina', 'Nigeria', 'USA', 'France'],
      ['Jan', 30, 40, 20, 15, 20],
      ['Fev', 50, 10, 40, 18, 45],
      ['Mar', 80, 30, 10, 60, 25]
    ]
  };

  const colors = [ '#DBAC2C', 'cyan', '#53BF9D', '#003661', '#9699b0',];

  const boxDataMain = [
    { 
      color: '#eff5fa',
      height: 'auto', 
      borderRadius: 10,  
      mainChart: <MixedCharts chartData={chartData} />
    }
  ];

  const boxData = [
    { 
      color: '#eff5fa',
      height: '400px',
      borderRadius: 10,
      titleChart: 'Total plan sold by month',
      chartComponent: <ColumnCharts data={soldByMonth} />
    },
    { 
      color: '#eff5fa',
      height: '400px',
      borderRadius: 10,
      titleChart: 'Best sellers this month',
      chartComponent: <BarCharts data={barChartData} />
    },
    { 
      color: '#eff5fa',
      height: '400px',
      borderRadius: 10,
      titleChart: 'Percetual of plans sellers',
      chartComponent: <PieCharts data={pieChartData} />
    },
    { 
      color: '#eff5fa',
      height: '400px',
      borderRadius: 10,
      titleChart: 'Incomes by category',
      chartComponent: <LineCharts rawData={lineChartsData}/>
    },
  ];

  const otherImportantData = [
    { 
      color: '#eff5fa',
      height: '350px',
      borderRadius: 10,
      titleChart: 'Boats by category',
      chartComponent: <HorizontalCharts seriesData={horizontalChartsData}/>
    },
    { 
      color: '#eff5fa',
      height: '350px',
      borderRadius: 10,
      titleChart: 'Visitors by country',
      chartComponent: <GroupBarChart data={groupBarChartData} colors={colors} />
    },
  ];

  const handleClickRegisterBoat = () => {
    navigate('/registerBoatBasic');
  };

  const handleGoToNews = () => {
    { user && navigate('/news') }
  };

  const handleGoToAds = () => {
    { user && navigate('/ads') }
  };

  const handleGoToUsers = () => {
    { user && navigate('/users') }
  };

  const handleGoToPayment = () => {
    { user && navigate('/payments') }
  };

  const features: IFeature[] = [
    {
      heading: 'Payments report',
      content: 'Choose from Stripe, Braintree, or PayPal to launch your product quickly.',
      titleButton: 'Show all payments',
      icon: MdOutlinePayment,
      onClick: handleGoToPayment,
    },
    {
      heading: 'All user registred',
      content: 'Webhooks are wired up to automatically email receipts and invoices show.',
      titleButton: 'See all users boats',
      icon: ImUserTie,
      onClick: handleGoToUsers,
    },
    {
      heading: 'Boats news',
      content: 'Webhooks are wired up to automatically email receipts and invoices show.',
      titleButton: 'Go to breaking news',
      icon: IoBoatSharp,
      onClick: handleGoToNews,
    },
    {
      heading: 'Clients ads',
      content: 'Roll your own API to easily connect with other services. Pull in updates.',
      titleButton: 'Check up all ads',
      icon: FaBuysellads,
      onClick: handleGoToAds,
    },
  ];

  useEffect(() => {
    fetchAllBoats();
    fetchAllAds();
    fetchAllNews();
    fetchAllUser();
  }, []);

  return (
    <>
      {user?.is_admin == '1' ? (
        <Flex direction="column" height="100%" bg="white">
          <Header />

          {/* <motion.div
            initial={{ opacity: 0, x: -150 }}
            whileInView={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -150 }}
            transition={{ duration: 1 }}
          > */}
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
                    Admin dashboard analytics
                  </Text>

                  <Text color={textColorSecondary} fontSize="md" me="6px" mb="5px" mt={2}>
                    This is the best place to analyze statistics for a good decision
                  </Text>
                </Box>

                <Button bg='gray.50' w='auto' h={'80px'} onClick={handleClickRegisterBoat}>
                  <VStack pt={0}>
                    <Icon as={IoBoatSharp} color={'blue.300'} h='28px' w='28px' />
                    <Text color={'blue.300'} fontSize={['2xs', 'xs', 'sm', 'md']}>                      
                      {isWideVersion ? 'See all boats registred' : 'See boats'}
                    </Text>
                  </VStack>
                </Button>
              </HStack>

              <Divider />
            </SimpleGrid>
          {/* </motion.div> */}

          <Card bg={bg} boxShadow={cardShadow} mb='20px' pt={3} px={3} maxWidth={1480} w="100%" mx='auto' borderRadius={10}>
            <Text color={textColorSecondary} fontSize='md' me='6px' mb='5px'>
              All statistics
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
                <MenuMiniStatistics key={index} {...data}/>
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

            {/* <motion.div
              initial={{ opacity: 0, x: -150 }}
              whileInView={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -150 }}
              transition={{ duration: 1 }}
            > */}
              <SimpleGrid columns={columns} spacing={3} w="auto" maxWidth={1480} mx="auto" mt={5}>
                {boxData.map((data, index) => (
                  <motion.div whileHover={{ translateY: -5 }}>
                    <Box key={index} bg={data.color} w="auto" h={data.height} borderRadius={data.borderRadius} mx='auto' _hover={{ boxShadow: "0 0 0 5px cyan" }}>
                      <Text color={textColorSecondary} fontSize='md' pt={3} px={3}>
                        {data.titleChart}
                      </Text>
                      {data.chartComponent}
                    </Box>
                  </motion.div>
                ))}
              </SimpleGrid>
            {/* </motion.div> */}
          </Card>

          {/* <motion.div
            initial={{ opacity: 0, y: -50 }}
            whileInView={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 150 }}
            transition={{ duration: 0.8 }}
            style={{ width: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}
          > */}
            <Card bg={bg} boxShadow={cardShadow} mb='20px' py={3} px={3} maxWidth={1480} w="100%" mx='auto' borderRadius={10}>
              <SimpleGrid columns={{ base: 1, md: 1, lg: 2, xl: 2 }} spacing={3} w="100%" maxWidth={1480} mx="auto">
                {otherImportantData.map((data, index) => (
                  <motion.div whileHover={{ translateY: -5 }}>
                    <Box key={index} bg={data.color} w="auto" h={data.height} borderRadius={data.borderRadius} _hover={{ boxShadow: "0 0 0 5px cyan" }}>
                      <Text color={textColorSecondary} fontSize='md' p={3}>
                        {data.titleChart}
                      </Text>
                      {data.chartComponent}
                    </Box>
                  </motion.div>
                ))}
              </SimpleGrid>
            </Card>
          {/* </motion.div> */}

          <Card bg={bg} boxShadow={cardShadow} mb='20px' py={3} px={3} maxWidth={1480} w="100%" mx='auto' borderRadius={10}>
            <Text color={textColorSecondary} fontSize='md' mb='10px'>
              Other important reports
            </Text>

            {/* <motion.div
              initial={{ opacity: 0, x: 150 }}
              whileInView={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 150 }}
              transition={{ duration: 0.8 }}
            > */}
              <SimpleGrid columns={{ base: 1, md: 1, lg: 1, xl: 1 }} spacing={5}>
                <CardStats features={features} />
              </SimpleGrid>
            {/* </motion.div> */}
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