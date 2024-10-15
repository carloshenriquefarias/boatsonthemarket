import { Divider, Flex, Icon, SimpleGrid, useColorModeValue, Text, Button, VStack, Box,
  HStack, Container
} from '@chakra-ui/react';
import { motion } from 'framer-motion';

import CardAdsHorizontal from '../components/CardAdsHorizontal';
import Card from '../components/Card'
import CardImage from '../components/CardImage';
import CardAds from '../components/CardAds';
import Footer from '../components/Footer'
import Header from '../components/Header'
import MixedCharts from '../components/Charts/MixedCharts';
import ModalDelete from '../components/ModalDelete';
import MenuMiniStatistics from '../components/MenuMiniStatistics';

import { MdAttachMoney, MdBarChart } from "react-icons/md";
import { BsFillPlusSquareFill } from "react-icons/bs";

import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useAuth } from '../hooks/useAuth';

import { api } from '../services/api'

import { ToastContainer } from "react-toastify";
import { toastApiResponse } from '../components/Toast';
import "react-toastify/ReactToastify.min.css";

export default function Ads() {

  const { user } = useAuth();

  const navigate = useNavigate();
  const textColorPrimary = useColorModeValue("secondaryGray.900", "white");
  const textColorSecondary = "gray.400";
  const bg = useColorModeValue("white", "navy.700");
  const cardShadow = useColorModeValue(
    "0px 18px 40px rgba(112, 144, 176, 0.12)",
    "unset"
  );

  const [isLoading, setIsLoading] = useState(false);
  const [adsStatusUpdated, setAdsStatusUpdated] = useState(false);
  const [isModalOpenDeleteButton, setIsModalOpenDeleteButton] = useState(false);
  const [adsType1, setAdsType1] = useState([]);
  const [adsType2, setAdsType2] = useState([]);
  const [adsType3, setAdsType3] = useState([]);
  const [AllAdsType, setAllAdsType] = useState<any[]>([]);
  const [adsIdToDelete, setAdsIdToDelete] = useState('');
 
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
      color: '#eff5fa',
      height: 'auto', 
      borderRadius: 10,  
      mainChart: <MixedCharts chartData={chartData} />
    }
  ];

  function countActiveStatus(adsArray: any) {
    let activeAds = 0;
    let inactiveAds = 0;

    adsArray.map((ad: any) => {
      if (ad.is_active === '1') {
        activeAds++;
      } else if (ad.is_active === '0') {
        inactiveAds++;
      }
    });
  
    return { activeAds, inactiveAds };
  }

  const { activeAds, inactiveAds } = countActiveStatus(AllAdsType);

  const statisticsData = [
    { bg: 'blue', icon: MdBarChart, name: 'Total ads', value: AllAdsType.length },
    { bg: '', icon: MdBarChart, name: 'Total costumers', value: '19' },
    // { bg: '', icon: MdBarChart, name: 'Ads actived', value: '7' },
    { bg: 'blue', icon: MdBarChart, name: 'Ads enabled', value: activeAds },
    { bg: 'blue', icon: MdBarChart, name: 'Ads disabled', value: inactiveAds },
    { bg: 'white', icon: MdAttachMoney, name: 'Total ads sales', value: '19.354,00' },
  ];

  const openModalDeleteButton = (id: string) => {
    setAdsIdToDelete(id)
    setIsModalOpenDeleteButton(true);
  };

  const closeModalDeleteButton = () => {
    setIsModalOpenDeleteButton(false);
  };

  function formatDollar(value: number): string {
    const options: Intl.NumberFormatOptions = {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
    };
    return value.toLocaleString('en-US', options);
  }

  const fetchAllAds = async () => {
    try {
      const response = await api.post('/ads/list_ads.php');
      const adsResponse = response.data;
      setAllAdsType(adsResponse)
  
      const adsType1 = adsResponse.filter((ad: { type_ads: string }) => ad.type_ads === '1');
      const adsType2 = adsResponse.filter((ad: { type_ads: string }) => ad.type_ads === '2');
      const adsType3 = adsResponse.filter((ad: { type_ads: string }) => ad.type_ads === '3');
  
      return { adsType1, adsType2, adsType3 };
    } catch (error) {
      console.error('Error:', error);
      toastApiResponse(error, 'It is not possible to load boat details');
      return { adsType1: [], adsType2: [], adsType3: [] };
    }
  };

  async function handleDeleteAdsByID(adsId: string) {
    try {

      const response = await api.post('/ads/delete_ads.php', { id: adsId });
      toastApiResponse(response, response.data.message);

      await new Promise((resolve) => setTimeout(resolve, 1000));
      closeModalDeleteButton()
      navigate(`/admin`);

    } catch (error) {
      console.error('Error:', error);
      toastApiResponse(error, 'Have ocorred an error to conect to servidor, please try again later');
    }
  };

  const handleClickEditAds = (adsId: string) => {
    navigate(`/adsEdit/${adsId}`);
  };

  function handleGoToRegisterAds() {
    navigate('/registerAds')
  }

  function extractDate(fullDate: any) {
    return fullDate.substring(0, 10);
  }  

  function formatDate(fullDate: string): string {
    const dateParts = fullDate.split(' '); // Divide a string em partes usando o espaço em branco como delimitador
    const dateOnly = dateParts[0]; // A primeira parte é a data
    return dateOnly;
  }

  async function handleAdsEnabledOrDisabled(adsId: string, currentStatus: string) {
    try {
      setIsLoading(true);  
      const newStatus = currentStatus === '1' ? '0' : '1';
  
      const formData = new FormData();
      formData.append("ads_id", adsId);
      formData.append("is_active", newStatus);
      setAdsStatusUpdated(true);
  
      const adsUpdateEndpoint = '/ads/update_ads.php';  
      const response = await api.post(adsUpdateEndpoint, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
  
      if (response.data) {
        const updatedAds = AllAdsType.map((ad: any) => {
          if (ad.id === adsId) {
            return { ...ad, is_active: newStatus };
          }
          return ad;
        });
  
        setAllAdsType(updatedAds);
  
        toastApiResponse(response, response.data.message);
      } else {
        throw new Error('Failed to update ads');
      }
  
      setIsLoading(false);
    } catch (error) {
      console.error('Error:', error);
      toastApiResponse(error, 'An error occurred while connecting to the server, please try again later');
      setIsLoading(false);
    }
  }
  
  const fetchData = async () => {
    const { adsType1, adsType2, adsType3 } = await fetchAllAds();
    setAdsType1(adsType1);
    setAdsType2(adsType2);
    setAdsType3(adsType3);
  };

  useEffect(() => {
    fetchAllAds();
    fetchData();
    setAdsStatusUpdated(false);
  }, [adsStatusUpdated]);
  
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
                  My annoucements
                </Text>

                <Text color={textColorSecondary} fontSize="md" me="6px" mb="5px" mt={2}>
                  Register good annoucements about your boat business today
                </Text>
              </Box>

              <Button bg='gray.50' w='auto' h={'80px'} onClick={handleGoToRegisterAds}>
                <VStack pt={0}>
                  <Icon as={BsFillPlusSquareFill} color={'blue.300'} h='28px' w='28px' />
                  <Text color={'blue.300'} fontSize={['2xs', 'xs', 'sm', 'md']}>Register a ads</Text>
                </VStack>
              </Button>
            </HStack>

            <Divider />
          </SimpleGrid>

          <Card bg={bg} boxShadow={cardShadow} mb='20px' pt={3} px={3} maxWidth={1480} w="100%" mx='auto' borderRadius={10}>
            <Text color={textColorSecondary} fontSize='md' me='6px' mb='5px'>
              Statistics boats
            </Text>

            <SimpleGrid
              columns={{ base: 1, md: 2, lg: 3, "2xl": 5 }}
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
                <motion.div key={index} whileHover={{ translateY: -5 }}>
                  <Box 
                    bg={data.color} 
                    w="100%" 
                    h={data.height} 
                    borderRadius={data.borderRadius} 
                    _hover={{ boxShadow: "0 0 0 5px cyan" }}
                  >                    
                    {data.mainChart}
                  </Box>
                </motion.div>
              ))}
            </SimpleGrid>
          </Card>

          <Card bg={bg} boxShadow={cardShadow} mb='20px' py={3} px={3} maxWidth={1480} w="100%" mx='auto' borderRadius={10}>
            <Text color={textColorSecondary} fontSize='md' mb='10px'>
              My annoucements horizontal registered
            </Text>

            {/* <motion.div
              initial={{ opacity: 0, x: 150 }}
              whileInView={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 150 }}
              transition={{ duration: 0.8 }}
            > */}
              <SimpleGrid columns={{ base: 1, md: 1, lg: 2, xl: 2 }} spacing={2} my={4}>
                {adsType3.map((ads: any, index) => (
                  <CardAdsHorizontal
                    key={index}
                    costumer={ads.customer}
                    initialDate={extractDate(ads.start_date)}
                    finalDate={extractDate(ads.due_date)}
                    price={formatDollar(ads.price)}
                    image={`https://techsoluctionscold.com.br/api-boats/uploads/ads/${ads.image_main_ads}`} 
                    onClickDelete={() => openModalDeleteButton(ads.id)}
                    onClickEdit={() => handleClickEditAds(ads.id)} 
                    onClickStatus={() =>{handleAdsEnabledOrDisabled(ads.id, ads.is_active)}}
                    buttonStatusColor={ads.is_active}
                  />
                ))}
              </SimpleGrid>
            {/* </motion.div> */}
          </Card>

          <Card bg={bg} boxShadow={cardShadow} mb='20px' py={3} px={3} maxWidth={1480} w="100%" mx='auto' borderRadius={10}>
            <Text color={textColorSecondary} fontSize='md' mb='10px'>
              My annoucements square registered
            </Text>

            {/* <motion.div
              initial={{ opacity: 0, x: 150 }}
              whileInView={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 150 }}
              transition={{ duration: 0.8 }}
            > */}
              <SimpleGrid columns={{ base: 1, md: 2, lg: 2, xl: 4 }} spacing={2} my={4}>
                {adsType1.map((ads: any, index: number) => (
                  <CardImage
                    key={index}
                    mode="mode2"
                    costumer={ads.customer}
                    initialDate={extractDate(ads.start_date)}
                    finalDate={extractDate(ads.due_date)}
                    price={formatDollar(ads.price)}
                    image={`https://techsoluctionscold.com.br/api-boats/uploads/ads/${ads.image_main_ads}`} 
                    onClickDelete={() => openModalDeleteButton(ads.id)}
                    onClickEdit={() => handleClickEditAds(ads.id)} 
                    onClickStatus={() =>{handleAdsEnabledOrDisabled(ads.id, ads.is_active)}}
                    buttonStatusColor={ads.is_active}
                  />
                ))}
              </SimpleGrid>
            {/* </motion.div> */}
          </Card>

          <Card bg={bg} boxShadow={cardShadow} mb='20px' py={3} px={3} maxWidth={1480} w="100%" mx='auto' borderRadius={10}>
            <Text color={textColorSecondary} fontSize='md' my='10px'>
              My annoucements vertical registered
            </Text>

            {/* <motion.div
              initial={{ opacity: 0, x: 150 }}
              whileInView={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 150 }}
              transition={{ duration: 0.8 }}
            > */}
              <Container p={{ base: 1, md: 1 }} w="100%" maxW="100%" h="100%">
                <SimpleGrid columns={{ base: 2, sm: 2, md: 3, lg: 3, xl: 6 }} spacing={2} w="100%">
                  {adsType2.map((ads: any, index: number) => (
                    <VStack
                      key={index}
                      borderWidth="1px"
                      cursor="pointer"
                      _hover={{ boxShadow: "0 0 0 5px cyan" }}
                      rounded="md"
                      overflow="hidden"
                      bg={useColorModeValue('white', 'gray.800')}
                    >
                      <Box h="auto" w={'14.5rem'}>
                        <CardAds 
                          image={`https://techsoluctionscold.com.br/api-boats/uploads/ads/${ads.image_main_ads}`} 
                          key={ads.id} 
                          buttonStatusColor={ads.is_active}
                        />
                      </Box>

                      <Box mb={0} px={2} justifyContent={'flex-start'} alignItems={'flex-start'} w={'100%'}>
                        <Text fontSize={{ base: 'sm', sm: 'md', md: 'md' }} fontWeight={'semibold'} noOfLines={2} color={'blue.400'}>
                          {ads.customer}
                        </Text>

                        <Text fontSize={{ base: 'sm', sm: 'md', md: 'md' }} noOfLines={2} color={'blue.400'}>
                          Price ads: $ {formatDollar(ads.price)}
                        </Text>

                        <Text fontSize={{ base: 'sm', sm: 'md', md: 'md' }} noOfLines={2} color={'blue.400'}>
                          Initial date: {formatDate(ads.start_date)}
                        </Text>

                        <Text fontSize={{ base: 'sm', sm: 'md', md: 'md' }} fontWeight={'semibold'} noOfLines={2} color={'red.400'}>
                          Due date: {formatDate(ads.due_date)}
                        </Text>               
                      </Box>

                      <VStack w="100%" h="100%" px={2} mb={2}>
                        <Box w="100%" h="auto" py={1}>
                          <VStack spacing={2} align="stretch">
                            <Button colorScheme="linkedin" onClick={() => handleClickEditAds(ads.id)} w="full" isLoading={isLoading}>
                              EDIT
                            </Button>

                            <Button 
                              colorScheme={ads.is_active === '0' ? 'gray' : 'teal'} 
                              onClick={() =>{handleAdsEnabledOrDisabled(ads.id, ads.is_active)}}
                              w="full"
                              isLoading={isLoading}
                            >
                              {ads.is_active === '1' ? 'ENABLED' : 'DISABLED'}
                            </Button>

                            <Button bg="red.400" color="white" onClick={() => openModalDeleteButton(ads.id)} w="full">
                              DELETE
                            </Button>
                          </VStack>
                        </Box>
                      </VStack>
                    </VStack>
                  ))}
                </SimpleGrid>
              </Container>
            {/* </motion.div> */}
          </Card>

          {isModalOpenDeleteButton && (
            <ModalDelete
              isOpen={isModalOpenDeleteButton}
              onClose={closeModalDeleteButton}
              onClick= {() => handleDeleteAdsByID(adsIdToDelete)}
              // isLoading={isLoading}
              title={'Once you delete your announcement, there is no going back. Please be certain.'}
            />
          )}

          <ToastContainer />
          <Footer />
        </Flex>
      ) : (
        navigate('/')
      )}
    </>
  )
}