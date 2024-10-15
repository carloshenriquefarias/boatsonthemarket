import {
  Text, useColorModeValue, Box, SimpleGrid, Divider, FormControl,
  HStack, Button, VStack, Icon, Center, Heading, Stack, Image, Flex,
  RadioGroup, Radio, FormLabel, Skeleton, SkeletonText
} from "@chakra-ui/react";
import { motion } from 'framer-motion';
import { CardLatestNews } from "../components/CardLatestNews";
import { api } from "../services/api";

import Card from "../components/Card";
import Footer from '../components/Footer'
import DropzoneGlobal from "../components/DropzoneGlobal";
import Header from '../components/Header'
import MiniSection from "../components/MiniSection";
import NewsForm from "../components/NewsForm";

import { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { useNavigate, useParams } from "react-router-dom";

import { FaRegArrowAltCircleLeft } from "react-icons/fa";;

import { ToastContainer } from "react-toastify";
import { toastApiResponse } from "../components/Toast";
import "react-toastify/ReactToastify.min.css";

interface ImageData {
  path: string;
  preview: string;
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

export default function NewsEdit() {
  const { user } = useAuth();
  const { id: newsId } = useParams<{ id: string }>();

  const bg = useColorModeValue("white", "navy.700");
  const cardShadow = useColorModeValue("0px 18px 40px rgba(112, 144, 176, 0.12)", "unset");
  const navigate = useNavigate();
  const textColorPrimary = useColorModeValue("secondaryGray.900", "white");
  const textColorSecondary = "gray.400";

  const [isLoading, setIsLoading] = useState(false);
  const [imageMainNews, setImageMainNews] = useState<ImageData[]>([]);
  const [imageUpdatedFirstSection, setImageFirstSection] = useState<ImageData[]>([]);
  const [imageUpdatedSecondSection, setImageSecondSection] = useState<ImageData[]>([]);
  const [imageUpdatedThirdSection, setImageThirdSection] = useState<ImageData[]>([]);
  const [isLoadingData, setIsLoadingData] = useState(true);

  const [formDataNews, setFormDataNews] = useState<any>({
    id: '', amountSections: '', title: '', subtitle: '', introduce: '', textDivisor: '', textOne: '', textTwo: '', textThree: '',
    textFour: '', textFive: '', textSix: '', conclusion: '', imageMainNews: '',
    imageFirstSection: '', imageSecondSection: '', imageThirdSection: '',
  });

  const [amountSections, setAmountSections] = useState(formDataNews.amountSections);
  const [allDataNews, setAllDataNews] = useState({ ...formDataNews });

  const handleRadioChange = (value: any) => {
    console.log('updatedFiles 08:39 => ', value);
    setAmountSections(value);
  };

  // const handleRadioChange = (value: any) => {
  //   setAmountSections(Number(value));
  // };

  const handleMainNews = (updatedFiles: any) => {
    // console.log('updatedFiles 08:39 => ', updatedFiles);
    setImageMainNews(updatedFiles)
  };

  const handleSelectImageFirstSection = (updatedFiles: any) => {
    setImageFirstSection(updatedFiles)
  };

  const handleSelectImageSecondSection = (updatedFiles: any) => {
    setImageSecondSection(updatedFiles)
  };

  const handleSelectImageThirdSection = (updatedFiles: any) => {
    setImageThirdSection(updatedFiles)
  };

  const handleInputChanges = (e: any) => {
    const { name, value } = e.target;
    setFormDataNews((prevFormData: any) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleToNews = () => {
    navigate(`/news`);
  }

  const handleTextAreaChanges = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setFormDataNews((prevData: any) => ({ ...prevData, [name]: value }));
  };

  const fetchCurrentlyNews = async () => {
    try {
      const response = await api.post('/news/list_news.php');
      const newsResponse = response.data;
      const foundCurrentlyNews = newsResponse.find((item: any) => item.id === newsId);
      console.log('foundCurrentlyNews => ', foundCurrentlyNews);

      handleRadioChange(foundCurrentlyNews.amountSections);      
      setFormDataNews(foundCurrentlyNews);
      setTimeout(() => {
        setIsLoadingData(false);
      }, 2000);

    } catch (error) {
      console.error('Error:', error);
      toastApiResponse(error, 'It is not possible to load boat details');
    }
  };

  async function handleUpdateNews() {
    try {

      console.log('os dados finais atualizados sao 10:28:', allDataNews);
      // return

      setIsLoading(true);
      const formData = new FormData();
      
      formData.append("news_id", formDataNews.id);
      formData.append("amountSections", amountSections);
      formData.append("title", formDataNews.title);
      formData.append("subtitle", formDataNews.subtitle);
      formData.append("introduce", formDataNews.introduce);
      formData.append("textDivisor", formDataNews.textDivisor);
      formData.append("textOne", formDataNews.textOne);
      formData.append("textTwo", formDataNews.textTwo);
      formData.append("textThree", formDataNews.textThree);
      formData.append("textFour", formDataNews.textFour);
      formData.append("textFive", formDataNews.textFive);
      formData.append("textSix", formDataNews.textSix);
      formData.append("conclusion", formDataNews.conclusion);

      if (imageMainNews.length > 0) {
        const response = await fetch(imageMainNews[0].preview);
        const blob = await response.blob();
        const imageFile = new File([blob], 'imageMainNews.jpg', { type: blob.type });
  
        formData.append('imageMainNews', imageFile);
      }

      if (imageUpdatedFirstSection.length > 0) {
        const response = await fetch(imageUpdatedFirstSection[0].preview);
        const blob = await response.blob();
        const imageFile = new File([blob], 'imageFirstSection.jpg', { type: blob.type });
  
        formData.append('imageFirstSection', imageFile);
      }

      if (imageUpdatedSecondSection.length > 0) {
        const response = await fetch(imageUpdatedSecondSection[0].preview);
        const blob = await response.blob();
        const imageFile = new File([blob], 'imageSecondSection.jpg', { type: blob.type });
  
        formData.append('imageSecondSection', imageFile);
      }

      if (imageUpdatedThirdSection.length > 0) {
        const response = await fetch(imageUpdatedThirdSection[0].preview);
        const blob = await response.blob();
        const imageFile = new File([blob], 'imageThirdSection.jpg', { type: blob.type });
  
        formData.append('imageThirdSection', imageFile);
      }

      const UpdateNewsEndpoint = '/news/update_news.php';  
      const response = await api.post(UpdateNewsEndpoint, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      if (response.data) {
        toastApiResponse(response, response.data.message);
      } else {
        throw new Error('Failed to publish news');
      }
  
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setIsLoading(false);
      navigate(`/news`);

    } catch (error) {
      console.error('Error:', error);
      toastApiResponse(error, 'An error occurred while connecting to the server, please try again later');
      await new Promise((resolve) => setTimeout(resolve, 3000));
      navigate(`/admin`);
    }
  }

  useEffect(() => {
    setAllDataNews({ ...formDataNews });
  }, [formDataNews]);

  useEffect(() => {    
    fetchCurrentlyNews();
  }, [])

  return (
    <>
      {user?.is_admin == '1' ? (
        <Flex direction="column" height="100%" bg="white">
          <Header />

          {isLoadingData ? (
            <Flex width="100%" my="6" mx="auto" px="6" maxWidth={1600}>
              <Card mb={{ base: "0px", "2xl": "10px" }} width="100%" mx="auto" maxWidth={1480}>
                {/* <SkeletonCircle size='10' /> */}
                <Skeleton height='150' width='150' />
                <SkeletonText mt='4' noOfLines={12} spacing='4' skeletonHeight='10' />
              </Card>
            </Flex>
          ) : (
            <Flex width="100%" my="6" mx="auto" px="6" maxWidth={1600}>
              <Card mb={{ base: "0px", "2xl": "10px" }} width="100%" mx="auto" maxWidth={1480}>
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
                          Edit your news
                        </Text>

                        <Text color={textColorSecondary} fontSize="md" me="6px" mb="5px" mt={2}>
                          Select a image and create a good text to publish your latest news
                        </Text>
                      </Box>

                      <Button bg='gray.50' w='auto' h={'80px'} onClick={handleToNews}>
                        <VStack pt={0}>
                          <Icon as={FaRegArrowAltCircleLeft} color={'blue.300'} h='28px' w='28px' />
                          <Text color={'blue.300'} fontSize={['2xs', 'xs', 'sm', 'md']}>News portal</Text>
                        </VStack>
                      </Button>
                    </HStack>

                    <Divider />
                  </SimpleGrid>
                {/* </motion.div> */}

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
                      Please, before you get start your news select how many sections you want for this post
                    </FormLabel>
                    <RadioGroup onChange={handleRadioChange} value={amountSections.toString()} color={'red'}>
                      <Stack direction='row'>
                        <Radio value='1' colorScheme='red'>One section</Radio>
                        <Radio value='2' colorScheme='red'>Two sections</Radio>
                        <Radio value='3' colorScheme='red'>Three sections</Radio>
                      </Stack>
                    </RadioGroup>
                  </FormControl>

                  <NewsForm
                    formData={formDataNews}
                    handleInputChanges={handleInputChanges}
                    handleTextAreaChanges={handleTextAreaChanges}
                    amountSections={amountSections}
                  />
                </Card>

                <Card bg={bg} boxShadow={cardShadow} mb='20px' px={3} py={3}>
                  <Text
                    color={textColorPrimary}
                    fontWeight='bold'
                    fontSize='lg'
                    mb='5px'
                  >
                    Main Image
                  </Text>

                  <Center>
                    <SimpleGrid columns={{ base: 1, md: 1, lg: 1, xl: 1 }} spacing={5} w={'40%'} justifyContent={'center'} alignItems={'center'}>
                      <Heading size='md' mt={5} textAlign={'center'}>1 - Please, select the main photo of your news</Heading>
                      <Text mt={5} color={'red'} fontSize='sm' textAlign={'center'}>
                        Warning: We recommend upload images with high resolution for a best performance! Minimum 640 x 480.
                      </Text>
                      <FormControl>
                        <VStack spacing={4} mt={5}>
                          <DropzoneGlobal 
                            imagePrevious={`https://techsoluctionscold.com.br/api-boats/uploads/news/${formDataNews.imageMainNews}`} 
                            onFilesChange={handleMainNews} 
                          />
                        </VStack>
                        <Divider my={5} />
                      </FormControl>
                    </SimpleGrid>
                  </Center>
                </Card>

                <Card bg={bg} boxShadow={cardShadow} mb='20px' px={3} py={3}>
                  <Text
                    color={textColorPrimary}
                    fontWeight='bold'
                    fontSize='lg'
                    mb='5px'
                  >
                    First section
                  </Text>

                  <Center>
                    <SimpleGrid columns={{ base: 1, md: 1, lg: 1, xl: 1 }} spacing={5} w={'40%'} justifyContent={'center'} alignItems={'center'}>
                      <Heading size='md' mt={5} textAlign={'center'}>2 - Now choose the first image of the section</Heading>
                      <Text mt={5} color={'red'} fontSize='sm' textAlign={'center'}>
                        Warning: We recommend upload images with high resolution for a best performance! Minimum 640 x 480.
                      </Text>
                      <FormControl>
                        <VStack spacing={4} mt={5}>
                          <DropzoneGlobal 
                            imagePrevious={`https://techsoluctionscold.com.br/api-boats/uploads/news/${formDataNews.imageFirstSection}`} 
                            onFilesChange={handleSelectImageFirstSection} 
                          />
                        </VStack>
                        <Divider my={5} />
                      </FormControl>
                    </SimpleGrid>
                  </Center>
                </Card>

                {amountSections >= 2 && (
                  <Card bg={bg} boxShadow={cardShadow} mb='20px' px={3} py={3}>
                    <Text
                      color={textColorPrimary}
                      fontWeight='bold'
                      fontSize='lg'
                      mb='5px'
                    >
                      Second section
                    </Text>

                    <Center>
                      <SimpleGrid columns={{ base: 1, md: 1, lg: 1, xl: 1 }} spacing={5} w={'40%'} justifyContent={'center'} alignItems={'center'}>
                        <Heading size='md' mt={5} textAlign={'center'}>3 - Now choose the second image of the section</Heading>
                        <Text mt={5} color={'red'} fontSize='sm' textAlign={'center'}>
                          Warning: We recommend upload images with high resolution for a best performance! Minimum 640 x 480.
                        </Text>
                        <FormControl>
                          <VStack spacing={4} mt={5}>
                            <DropzoneGlobal 
                              imagePrevious={`https://techsoluctionscold.com.br/api-boats/uploads/news/${formDataNews.imageSecondSection}`} 
                              onFilesChange={handleSelectImageSecondSection} 
                            />
                          </VStack>
                          <Divider my={5} />
                        </FormControl>
                      </SimpleGrid>
                    </Center>
                  </Card>
                )}

                {amountSections >= 3 && (
                  <Card bg={bg} boxShadow={cardShadow} mb='20px' px={3} py={3}>
                    <Text
                      color={textColorPrimary}
                      fontWeight='bold'
                      fontSize='lg'
                      mb='5px'
                    >
                      Third section
                    </Text>

                    <Center>
                      <SimpleGrid columns={{ base: 1, md: 1, lg: 1, xl: 1 }} spacing={5} w={'40%'} justifyContent={'center'} alignItems={'center'}>
                        <Heading size='md' mt={5} textAlign={'center'}>4 - Now choose the third image of the section</Heading>
                        <Text mt={5} color={'red'} fontSize='sm' textAlign={'center'}>
                          Warning: We recommend upload images with high resolution for a best performance! Minimum 640 x 480.
                        </Text>
                        <FormControl>
                          <VStack spacing={4} mt={5}>
                            <DropzoneGlobal 
                              imagePrevious={`https://techsoluctionscold.com.br/api-boats/uploads/news/${formDataNews.imageThirdSection}`} 
                              onFilesChange={handleSelectImageThirdSection} 
                            />
                          </VStack>
                          <Divider my={5} />
                        </FormControl>
                      </SimpleGrid>
                    </Center>
                  </Card>
                )}

                <Card bg={bg} boxShadow={cardShadow} mb='20px' px={3} py={3}>
                  <Text
                    color={textColorPrimary}
                    fontWeight='bold'
                    fontSize='lg'
                    mb='5px'
                  >
                    Preview of the news
                  </Text>

                  <Stack w="100%" height="auto" align="center" mt={5}>
                    <Center w="100%" height="auto">
                      <Box w="100%" height="auto" borderRadius={10}>
                        <Image
                          src={'https://img.freepik.com/free-vector/kayak-adventure-background-design_52683-72306.jpg?size=626&ext=jpg&ga=GA1.1.1657272551.1708124618&semt=ais'}
                          alt=""
                          w="100%"
                          maxH={{ base: 300, md: 400 }}
                          objectFit="cover"
                          borderRadius={10}
                        />
                      </Box>
                    </Center>
                  </Stack>

                  <Heading size={'2xl'} mt={10}>{formDataNews.title}</Heading>
                  <Text color={textColorSecondary} fontSize='md' me='26px' mt={3}>
                    {formDataNews.subtitle}
                  </Text>

                  <Divider my={5} />

                  <Text color="gray.500" fontSize='xl' me='26px' mt={4}>
                    {formDataNews.introduce}
                  </Text>

                  <Center w="70%" height="auto" mx={'auto'} my={5} justifyContent="center">
                    <Box w="100%" height="auto" borderRadius={10}>
                      <Image
                        src={imageMainNews.length > 0 ? imageMainNews[0].preview : `https://techsoluctionscold.com.br/api-boats/uploads/news/${formDataNews.imageMainNews}`}
                        w="100%"
                        maxH={{ base: 300, md: 400, lg: 500 }}
                        objectFit="cover"
                        borderRadius={10}
                      />
                    </Box>
                  </Center>

                  <Text color="gray.500" fontSize='xl' me='26px' mt={4}>
                    {formDataNews.textDivisor}
                  </Text>

                  <MiniSection
                    imagePosition={'right'}
                    firstTextOfComponent={formDataNews.textOne}
                    secondTextOfComponent={formDataNews.textTwo}
                    image={imageUpdatedFirstSection.length > 0 ? imageUpdatedFirstSection[0].preview : `https://techsoluctionscold.com.br/api-boats/uploads/news/${formDataNews.imageFirstSection}`}
                  />

                  {amountSections >= 2 && (
                    <MiniSection
                      imagePosition={'left'}
                      firstTextOfComponent={formDataNews.textThree}
                      secondTextOfComponent={formDataNews.textFour}
                      image={imageUpdatedSecondSection.length > 0 ? imageUpdatedSecondSection[0].preview : `https://techsoluctionscold.com.br/api-boats/uploads/news/${formDataNews.imageSecondSection}`}
                    />
                  )}

                  {amountSections >= 3 && (
                    <MiniSection
                      imagePosition={'right'}
                      firstTextOfComponent={formDataNews.textFive}
                      secondTextOfComponent={formDataNews.textSix}
                      image={imageUpdatedThirdSection.length > 0 ? imageUpdatedThirdSection[0].preview : `https://techsoluctionscold.com.br/api-boats/uploads/news/${formDataNews.imageThirdSection}`}
                    />
                  )}

                  <Text color="gray.500" fontSize='xl' me='26px' mt={8}>
                    {formDataNews.conclusion}
                  </Text>

                  <Heading size={'lg'} mt={10}>See another news</Heading>
                  <Text color={textColorSecondary} fontSize='md' me='26px' mt={3}>
                    Fill out this information to expose your boat to more potential buyers as they search.
                  </Text>
                  <Divider my={5} />

                  <motion.div
                    initial={{ opacity: 0, x: 150 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 150 }}
                    transition={{ duration: 0.8 }}
                  >
                    <SimpleGrid columns={{ base: 1, md: 2, lg: 2, xl: 4 }} spacing={2} my={4}>
                      {listNews.map((news, index) => (
                        <CardLatestNews
                          key={index}
                          title={news.title}
                          description={news.description}
                          image={news.image}
                          date={'15 mar 2024'}
                        />
                      ))}
                    </SimpleGrid>
                  </motion.div>
                </Card>

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
                          NEWS ABOUT BOATS ON THE MARKET
                        </Text>

                        <Text
                          color={textColorPrimary}
                          fontWeight='thin'
                          fontSize='sm'
                          textAlign={'left'}
                        >
                          Now you can publish and updated the news about your boats
                        </Text>
                      </Stack>

                      <Button bg='yellow.200' isLoading={isLoading} onClick={handleUpdateNews}>
                        Update news
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
