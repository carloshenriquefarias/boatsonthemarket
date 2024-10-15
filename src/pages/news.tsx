  import { Divider, Flex, Icon, SimpleGrid, useColorModeValue, Text, Button, VStack, Box, HStack }from '@chakra-ui/react';
  import { motion } from 'framer-motion';

  import Card from '../components/Card'
  import CardImage from '../components/CardImage';
  import Footer from '../components/Footer'
  import Header from '../components/Header'
  import ModalDelete from '../components/ModalDelete';

  import { BsFillPlusSquareFill } from "react-icons/bs";

  import { useNavigate } from 'react-router-dom';
  import { useEffect, useState } from 'react';
  import { useAuth } from '../hooks/useAuth';
  
  import { ToastContainer } from "react-toastify";
  import { toastApiResponse } from '../components/Toast';
  import "react-toastify/ReactToastify.min.css";  

  import { api } from '../services/api';
  
  export default function News() {
  
    const { user } = useAuth();

    const navigate = useNavigate();
    const textColorPrimary = useColorModeValue("secondaryGray.900", "white");
    const textColorSecondary = "gray.400";
    const bg = useColorModeValue("white", "navy.700");
    // const isValidUser = user !== null && user?.id !== '' && user?.name !== '' && user?.email !== '';
    // const email = isValidUser ? user?.email : null;
    const cardShadow = useColorModeValue(
      "0px 18px 40px rgba(112, 144, 176, 0.12)",
      "unset"
    );
  
    const [isModalOpenDeleteButton, setIsModalOpenDeleteButton] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [allNews, setAllNews] = useState<any[]>([]);
    const [newsStatusUpdated, setNewsStatusUpdated] = useState(false);
    const [newsIdToDelete, setNewsIdToDelete] = useState('');
    
    const openModalDeleteButton = (id: string) => {
      setNewsIdToDelete(id)
      setIsModalOpenDeleteButton(true);
    };
  
    const closeModalDeleteButton = () => {
      setIsModalOpenDeleteButton(false);
    };

    const fetchAllNews = async () => {
      try {
        setIsLoading(true);
        const response = await api.post('/news/list_news.php');
        const newsResponse = response.data;
        console.log('aqui as 20:38', newsResponse);
        setAllNews(newsResponse)
        setIsLoading(false);
    
      } catch (error) {
        console.error('Error:', error);
        toastApiResponse(error, 'It is not possible to load news details');
      }
    };

    async function handleDeleteNewsByID(newsId: string) {
      try {
        setIsLoading(true);
        const response = await api.post('/news/delete_news.php', { id: newsId });
        toastApiResponse(response, response.data.message);
  
        await new Promise((resolve) => setTimeout(resolve, 1000));
        closeModalDeleteButton()
        setIsLoading(false);
        navigate(`/admin`);
  
      } catch (error) {
        console.error('Error:', error);
        toastApiResponse(error, 'Have ocorred an error to conect to servidor, please try again later');
        await new Promise((resolve) => setTimeout(resolve, 3000));
        navigate(`/admin`);
      }
    };

    const handleClickEditNews = (newsId: string) => {
      navigate(`/newsEdit/${newsId}`);
    };

    function handleGoToRegisterNews() {
      navigate('/registerNews')
    }  

    useEffect(() => {
      fetchAllNews();
      setNewsStatusUpdated(false);
    }, [newsStatusUpdated]);
  
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
                    Boats news
                  </Text>
  
                  <Text color={textColorSecondary} fontSize="md" me="6px" mb="5px" mt={2}>
                    Register good news about your boat today
                  </Text>
                </Box>
  
                <Button bg='gray.50' w='auto' h={'80px'} onClick={handleGoToRegisterNews}>
                  <VStack pt={0}>
                    <Icon as={BsFillPlusSquareFill} color={'blue.300'} h='28px' w='28px' />
                    <Text color={'blue.300'} fontSize={['2xs', 'xs', 'sm', 'md']}>Register a news</Text>
                  </VStack>
                </Button>
              </HStack>
  
              <Divider />
            </SimpleGrid>
  
            <Card bg={bg} boxShadow={cardShadow} mb='20px' py={3} px={3} maxWidth={1480} w="100%" mx='auto' borderRadius={10}>
              <Text color={textColorSecondary} fontSize='md' mb='10px'>
                My news registered
              </Text>

              <motion.div
                initial={{ opacity: 0, x: 150 }}
                whileInView={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 150 }}
                transition={{ duration: 0.8 }}
              >
                <SimpleGrid columns={{ base: 1, md: 2, lg: 2, xl: 4 }} spacing={2} my={4}>
                  {/* {allNews.map((news, index) => ( */}
                  {allNews.sort((a, b) => b.id - a.id).map((news, index) => (
                    <CardImage
                      key={index}
                      mode="mode1"
                      title={news.title}
                      image={`https://techsoluctionscold.com.br/api-boats/uploads/news/${news.imageMainNews}`} 
                      onClickDelete={() => openModalDeleteButton(news.id)}
                      onClickEdit={() => handleClickEditNews(news.id)}
                    />
                  ))}
                </SimpleGrid>
              </motion.div>
            </Card>
  
            {isModalOpenDeleteButton && (
              <ModalDelete
                isOpen={isModalOpenDeleteButton}
                onClose={closeModalDeleteButton}
                onClick= {() => handleDeleteNewsByID(newsIdToDelete)}
                isLoading={isLoading}
                title={'Once you delete your news, there is no going back. Please be certain.'}
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