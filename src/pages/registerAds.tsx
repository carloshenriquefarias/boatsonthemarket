import {Text, useColorModeValue, Box, SimpleGrid, Divider, FormControl,
  HStack, Button, VStack, Icon, Center, Heading, Stack, Flex, RadioGroup, Radio, FormLabel, Input
} from "@chakra-ui/react";
import { motion } from 'framer-motion';
import { api } from "../services/api";

import AdsCorousel from "../components/Annoucements/AdsCarousel";
import AdsVertical from "../components/Annoucements/AdsVertical";
import AdsHorizontal from "../components/Annoucements/AdsHorizontal";
import Card from "../components/Card";
import DropzoneGlobal from "../components/DropzoneGlobal";
import Footer from '../components/Footer'
import Header from '../components/Header'

import { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";

import { FaRegArrowAltCircleLeft } from "react-icons/fa";;
import { useNavigate } from "react-router-dom";

import { ToastContainer } from "react-toastify";
import { toastApiResponse } from "../components/Toast";
import "react-toastify/ReactToastify.min.css";

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

export default function RegisterAds() {

  const [typeAds, setTypeAds] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [imageMainAds, setImageMainAds] = useState<ImageData[]>([]);
  const [formData, setFormData] = useState<any>({ linkAds: '', finalDate: '', customer: '', price: '', typeAds});
  const [allDataAds, setAllDataAds] = useState({ ...formData });
  
  const { user } = useAuth();
  
  const bg = useColorModeValue("white", "navy.700");
  const cardShadow = useColorModeValue("0px 18px 40px rgba(112, 144, 176, 0.12)", "unset");
  const imageUrl = imageMainAds.length > 0 ? imageMainAds[0]?.preview || '' : '';
  const navigate = useNavigate();
  const textColorPrimary = useColorModeValue("secondaryGray.900", "white");
  const textColorSecondary = "gray.400";
  const numberAds = typeAds;
  const resultAdsType = numberToString(numberAds);

  const handleRadioChange = (value: any) => {
    setTypeAds(Number(value));
  };

  const handleMainAds = (updatedFiles: any) => {
    setImageMainAds(updatedFiles)
  };

  const handleGoToAds = () => {
    navigate(`/ads`);
  };

  function numberToString(number: number) {
    return number.toString();
  }

  const handleInputChanges = (e: any) => {
    const { name, value } = e.target;
    setFormData((prevFormData: any) => ({
      ...prevFormData,
      [name]: value,
    }));
  };
  
  const AdTypeLabels: { [key: number]: AdType } = {
    1: { label: 'BOX CAROUSSEL', content: <AdsCorousel imageUrl={imageUrl} /> },
    2: { label: 'ADS VERTICAL', content: <AdsVertical imageUrl={imageUrl}/> },
    3: { label: 'HORIZONTAL', content: <AdsHorizontal imageUrl={imageUrl} showTitle/> },
  };

  const adType = AdTypeLabels[typeAds as keyof typeof AdTypeLabels] || AdTypeLabels[1];

  async function handlePublishAds() {
    try {
      setIsLoading(true);

      const formImage = new FormData();  
      formImage.append("links_ads", formData.linkAds);
      formImage.append("price", formData.price);
      formImage.append("due_date", formData.finalDate);
      formImage.append("type_ads", resultAdsType);
      formImage.append("customer", formData.customer);
  
      if (imageMainAds.length > 0) {
        const response = await fetch(imageMainAds[0].preview);
        const blob = await response.blob();
        const imageFile = new File([blob], 'image_main_ads.jpg', { type: blob.type });
  
        formImage.append('image_main_ads', imageFile);
      }
  
      const adsRegisterEndpoint = '/ads/register.php';  
      const response = await api.post(adsRegisterEndpoint, formImage, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
  
      if (response.data) {
        toastApiResponse(response, response.data.message);
      } else {
        throw new Error('Failed to publish ads');
      }
  
      await new Promise((resolve) => setTimeout(resolve, 2000));
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
    handleRadioChange(typeAds)
  }, [])

  console.log('os dados finais da ads atuais sao 13:42:', allDataAds);

  useEffect(() => {
    setAllDataAds({ ...formData });
  }, [formData]);

  return (
    <>
      {user?.is_admin == '1' ? ( 
        <Flex direction="column" height="100%" bg="white">
          <Header />

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
                        Register a new announcement
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
                  Details about the ads
                </Text>

                <FormControl mt={5}>
                  <FormLabel color={'red'}>
                    Please, before you get start your announcement select the way you want for this post
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
                        <DropzoneGlobal onFilesChange={handleMainAds} typeCardAds={typeAds} />
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
                        value={formData.customer}
                        onChange={handleInputChanges}
                      />
                    </FormControl>

                    <FormControl mt={2}>
                      <FormLabel>Link to this ads</FormLabel>
                      <Input
                        type={'text'}
                        name='linkAds'
                        value={formData.linkAds}
                        onChange={handleInputChanges}
                      />
                    </FormControl>

                    <FormControl mt={2}>
                      <FormLabel>Final date for this ads</FormLabel>
                      <Input
                        type={'text'}
                        name='finalDate'
                        value={formData.finalDate}
                        onChange={handleInputChanges}
                      />
                    </FormControl>

                    <FormControl mt={2}>
                      <FormLabel>Price this ads</FormLabel>
                      <Input
                        type={'text'}
                        name='price'
                        value={formData.price}
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

                    <Button bg='yellow.200' isLoading={isLoading} onClick={handlePublishAds}>
                      Publish ads
                    </Button>
                  </HStack>
                </SimpleGrid>
              </Card>

              <ToastContainer />
            </Card>
          </Flex>

          <Footer />
        </Flex>
      ) : (
        navigate('/')
      )}
    </>
  );
}
