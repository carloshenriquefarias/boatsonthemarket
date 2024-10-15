import {Text, useColorModeValue, Box, SimpleGrid, Divider, FormControl,
  HStack, Button, VStack, Icon, Center, Heading, Stack, Flex, RadioGroup, Radio, FormLabel, Input, SkeletonCircle, SkeletonText, Skeleton
} from "@chakra-ui/react";
import { motion } from 'framer-motion';

import AdsCorousel from "../components/Annoucements/AdsCarousel";
import AdsVertical from "../components/Annoucements/AdsVertical";
import AdsHorizontal from "../components/Annoucements/AdsHorizontal";
import Card from "../components/Card";
import DropzoneGlobal from "../components/DropzoneGlobal";
import Footer from '../components/Footer'
import Header from '../components/Header'

import { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { useParams } from 'react-router-dom';

import { FaRegArrowAltCircleLeft } from "react-icons/fa";;
import { useNavigate } from "react-router-dom";

import { ToastContainer } from "react-toastify";
import { toastApiResponse } from "../components/Toast";
import "react-toastify/ReactToastify.min.css";
import { api } from "../services/api";

interface ImageData {
  path: string;
  preview: string;
}

interface AdType {
  label: string;
  content: React.ReactNode;
}

export const listNews = [
  {
    // id: '1',
    title: 'Festival fishing',
    description: 'Find here in this category the list of super yatchs that are available',
    image: "./images/superYacht.jpg",
  },
  {
    // id: '2',
    title: 'Party yatchs 2024',
    description: 'Find here in this category the list of motor yatchs that are available',
    image: "./images/motorYacht.jpg",
  },
  {
    // id: '3',
    title: 'Sailing green summer',
    description: 'Find here in this category the list of sailing yatchs that are available',
    image: "./images/sailingYacht.jpg",
  },
  {
    // id: '4',
    title: 'Grammy of boats',
    description: 'Find here in this category the list of personal water that are available',
    image: "./images/PWC.jpg",
  },
];

export default function AdsEdit() {

  const { id: adsId } = useParams<{ id: string }>();
 
  const [dueDate, setDueDate] = useState('2024-01-01');  
  const [formData, setFormData] = useState<any>(
    {  
      id: "",
      customer:"",
      links_ads: "",
      image_main_ads: "",
      price: "",
      start_date: "",
      due_date: dueDate,
      type_ads: "",
      is_active: "",
      is_date_expired: "",
    }
  );
  
  const [typeAds, setTypeAds] = useState('1');
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingData, setIsLoadingData] = useState(true);
  const [imageMainAds, setImageMainAds] = useState<ImageData[]>([]);

  const { user } = useAuth();

  const bg = useColorModeValue("white", "navy.700");
  const cardShadow = useColorModeValue("0px 18px 40px rgba(112, 144, 176, 0.12)", "unset");
  const imageUrl = imageMainAds.length > 0 ? imageMainAds[0]?.preview || '' : '';
  const navigate = useNavigate();
  const textColorPrimary = useColorModeValue("secondaryGray.900", "white");
  const textColorSecondary = "gray.400";
  const start_date = new Date(formData.due_date); 

  function formatDollar(value: number): string {
    const options: Intl.NumberFormatOptions = {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
    };
    return value.toLocaleString('en-US', options);
  }

  const handleRadioChange = (value: any) => {
    setTypeAds(value);
  };

  const handleMainAds = (updatedFiles: any) => {
    setImageMainAds(updatedFiles)
  };

  const handleGoToAds = () => {
    navigate(`/ads`);
  };

  // const handleInputChanges = (e: any) => {
  //   const { name, value } = e.target;
  //   setFormData((prevFormData: any) => ({
  //     ...prevFormData,
  //     [name]: value,
  //   }));
  // };

  const handleInputChanges = (e: any) => {
    const { name, value } = e.target;
    setFormData((prevFormData: any) => ({
      ...prevFormData,
      [name]: name === 'due_date' ? new Date(value).toISOString().split('T')[0] : value,
    }));
  };
  
  
  const AdTypeLabels: { [key: string]: AdType } = {
    '1': { label: 'BOX CAROUSSEL', content: <AdsCorousel imageUrl={imageUrl} /> },
    '2': { label: 'ADS VERTICAL', content: <AdsVertical imageUrl={imageUrl}/> },
    '3': { label: 'HORIZONTAL', content: <AdsHorizontal imageUrl={imageUrl} showTitle/> },
  };

  const adType = AdTypeLabels[typeAds as keyof typeof AdTypeLabels] || AdTypeLabels['1'];

  const fetchCurrentlyAds = async () => {
    try {
      const response = await api.post('/ads/list_ads.php');
      const adsResponse = response.data;
      const foundCurrentlyAds = adsResponse.find((item: any) => item.id === adsId);

      console.log('foundCurrentlyAds => ', foundCurrentlyAds);
      

      handleRadioChange(foundCurrentlyAds.type_ads);      
      setDueDate(foundCurrentlyAds.due_date);
      setFormData(foundCurrentlyAds);
      setTimeout(() => {
        setIsLoadingData(false);
      }, 2000);

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

  async function handleUptadeAds() {
    try {
      setIsLoading(true);

      const formImage = new FormData();  
      formImage.append("links_ads", formData.links_ads);
      formImage.append("price", formData.price);
      formImage.append("customer", formData.customer);
      formImage.append("due_date", formData.due_date);
      formImage.append("type_ads", typeAds);
      formImage.append("ads_id", formData.id);
      formImage.append("is_active", formData.is_active);
  
      if (imageMainAds.length > 0) {
        const response = await fetch(imageMainAds[0].preview);
        const blob = await response.blob();
        const imageFile = new File([blob], 'image_main_ads.jpg', { type: blob.type });
  
        formImage.append('image_main_ads', imageFile);
      }

      const adsUpdateEndpoint = '/ads/update_ads.php';  
      const response = await api.post(adsUpdateEndpoint, formImage, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
  
      if (response.data) {
        toastApiResponse(response, response.data.message);
      } else {
        throw new Error('Failed to uptade ads');
      }
  
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setIsLoading(false);
      navigate(`/ads`);

    } catch (error) {
      console.error('Error:', error);
      toastApiResponse(error, 'An error occurred while connecting to the server, please try again later');
      await new Promise((resolve) => setTimeout(resolve, 3000));
      navigate(`/ads`);
    }
  }

  useEffect(() => {    
    fetchCurrentlyAds();
  }, [])

  return (
    <>
      {user?.is_admin == '1' ? (      
        <Flex direction="column" height="100%" bg="white">
          <Header />

          {isLoadingData ? (
            <Box padding='6' boxShadow='lg' bg='white'>
              <SkeletonCircle size='10' />
              <Skeleton height='150' width='150' />
              <SkeletonText mt='4' noOfLines={12} spacing='4' skeletonHeight='10' />
            </Box>
          ) : (
            <Flex width="100%" my="6" mx="auto" px="6" maxWidth={1600}>
              <Card mb={{ base: "0px", "2xl": "10px" }} width="100%" mx="auto" maxWidth={1480}>
                <motion.div
                  initial={{ opacity: 0, x: -150 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -150 }}
                  transition={{ duration: 1 }}
                >
                  <SimpleGrid
                    columns={{ base: 1, md: 1, lg: 1 }}
                    spacing={3}
                    w="100%"
                    maxWidth={1480}
                    mx='auto'
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
                          Update your announcement
                        </Text>

                        <Text color={textColorSecondary} fontSize="md" me="6px" mb="5px" mt={2}>
                          Select a image and create your announcement
                        </Text>
                      </Box>

                      <Button bg='gray.50' w='auto' h={'80px'} onClick={handleGoToAds}>
                        <VStack pt={0}>
                          <Icon as={FaRegArrowAltCircleLeft} color={'blue.300'} h='28px' w='28px' />
                          <Text color={'blue.300'} fontSize={['2xs', 'xs', 'sm', 'md']}>Portal ads</Text>
                        </VStack>
                      </Button>
                    </HStack>

                    <Divider />
                  </SimpleGrid>
                </motion.div>

                <Card bg={bg} boxShadow={cardShadow} mb='20px' px={3} py={3}>
                  <Text
                    color={textColorPrimary}
                    fontWeight='bold'
                    fontSize='lg'
                  >
                    Details about the news
                  </Text>

                  <FormControl mt={5}>
                    <FormLabel color={'red'}>
                      Please, before you update your announcement select the way you want for this post
                    </FormLabel>
                    <RadioGroup onChange={handleRadioChange} value={typeAds.toString()} color={'red'}>
                      <Stack direction='row'>
                        <Radio value='1' colorScheme='red'>Square card</Radio>
                        <Radio value='2' colorScheme='red'>Vertical card</Radio>
                        <Radio value='3' colorScheme='red'>Horizontal card</Radio>
                      </Stack>
                    </RadioGroup>
                  </FormControl>

                  <Center mt={5}>
                    <SimpleGrid columns={{ base: 1, md: 1, lg: 1, xl: 1 }} spacing={5} w={'40%'} justifyContent={'center'} alignItems={'center'}>
                      <Heading size='md' mt={5} textAlign={'center'}>Select the main photo of your announcement</Heading>
                      <Text mt={5} color={'red'} fontSize='sm' textAlign={'center'}>
                        Warning: We recommend upload images with high resolution for a best performance! Minimum 640 x 480.
                      </Text>
                      <FormControl>
                        <VStack spacing={4} mt={5}>
                          <DropzoneGlobal 
                            onFilesChange={handleMainAds} 
                            typeCardAds={typeAds} 
                            imagePrevious={`https://techsoluctionscold.com.br/api-boats/uploads/ads/${formData.image_main_ads}`} 
                          />
                        </VStack>
                        <Divider my={5} />
                      </FormControl>
                    </SimpleGrid>
                  </Center>

                  <SimpleGrid columns={{ base: 1, md: 1, lg: 1, xl: 1 }} spacing={5}>
                    <VStack mt={3}>
                      <FormControl mt={2}>
                        <FormLabel>Customer name</FormLabel>
                        <Input
                          type={'text'}
                          name='customer'
                          variant='filled'
                          value={formData.customer}
                          onChange={handleInputChanges}
                        />
                      </FormControl>

                      <FormControl mt={2}>
                        <FormLabel>Link to this ads</FormLabel>
                        <Input
                          type='text'
                          name='links_ads'
                          variant='filled'
                          value={formData.links_ads}
                          onChange={handleInputChanges}
                        />
                      </FormControl>

                      <FormControl mt={2}>
                        <FormLabel>Final date for this ads</FormLabel>
                        <Input
                          type={'date'}
                          name='due_date'
                          variant='filled'
                          value={start_date.toISOString().split('T')[0]}
                          onChange={handleInputChanges}
                        />
                      </FormControl>

                      <FormControl mt={2}>
                        <FormLabel>Price this ads</FormLabel>
                        <Input
                          type={'text'}
                          name='price'
                          variant='filled'
                          value={formatDollar(formData.price)}
                          onChange={handleInputChanges}
                        />
                      </FormControl>
                    </VStack>
                  </SimpleGrid>
                </Card>

                {imageUrl.length > 0 && (
                  <Card bg={bg} boxShadow={cardShadow} mb='20px' px={3} py={3}>
                    <Text
                      color={textColorPrimary}
                      fontWeight='bold'
                      fontSize='lg'
                      mb='5px'
                    >
                      Preview of the ads
                    </Text>

                    {adType.content}
                  </Card>
                )}

                <Card bg={bg} boxShadow={cardShadow} mb='20px' px={3} py={3}>
                  <SimpleGrid columns={{ base: 1, md: 1 }} spacing={5}>
                    <HStack alignItems={'center'} justifyContent={'space-between'}>
                      <Stack justifyContent={'flex-start'} alignItems={'flex-start'}>
                        <Text
                          color={textColorPrimary}
                          fontWeight='bold'
                          fontSize='lg'
                          textAlign={'left'}
                        >
                          ADS ABOUT BOATS
                        </Text>

                        <Text
                          color={textColorPrimary}
                          fontWeight='thin'
                          fontSize='sm'
                          textAlign={'left'}
                        >
                          Now you can publish and updated the ads about your boats
                        </Text>
                      </Stack>

                      <Button bg='yellow.200' isLoading={isLoading} onClick={handleUptadeAds}>
                        Update ads
                      </Button>
                    </HStack>
                  </SimpleGrid>
                </Card>

                <ToastContainer />
              </Card>
            </Flex>
          )}

          <Footer />
        </Flex>       
      ) : (
        navigate('/')
      )}
    </>
  );
}
