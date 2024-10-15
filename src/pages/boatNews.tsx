import { Text, useColorModeValue, Box, SimpleGrid, Divider, Center, Heading, Stack, Image, Flex } from "@chakra-ui/react";
import { motion } from 'framer-motion';
import { CardLatestNews } from "../components/CardLatestNews";

import Card from "../components/Card";
import Footer from '../components/Footer'
import Header from '../components/Header'
import MiniSection from "../components/MiniSection";

import { ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.min.css";
import { useNavigate, useParams } from "react-router-dom";
import { api } from "../services/api";
import { useEffect, useState } from "react";
import { toastApiResponse } from "../components/Toast";

interface NewsData {
  id: string;
  amountSections: string;
  title: string;
  subtitle: string;
  introduce: string;
  textDivisor: string;
  textOne: string;
  textTwo: string;
  textThree: string;
  textFour: string;
  textFive: string;
  textSix: string;
  conclusion: string;
  imageMainNews: string;
  imageFirstSection: string;
  imageSecondSection: string;
  imageThirdSection: string;
}

export default function BoatNews() {

  const { id: newsId } = useParams<{ id: string }>();

  const bg = useColorModeValue("white", "navy.700");
  const cardShadow = useColorModeValue("0px 18px 40px rgba(112, 144, 176, 0.12)", "unset");
  const navigate = useNavigate();
  const textColorSecondary = "gray.400";

  const [allNews, setAllNews] = useState<any[]>([]);
  const [currentlyDataNews, setCurrentlyDataNews] = useState<NewsData | null>(null);

  const handleGoToBoatNews = (newsId: string) => {
    navigate(`/boatNews/${newsId}`);
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

  const fetchCurrentlyNews = async () => {
    try {
      const response = await api.post('/news/list_news.php');
      const newsResponse = response.data;
      const foundCurrentlyNews = newsResponse.find((item: any) => item.id === newsId);
      setCurrentlyDataNews(foundCurrentlyNews);

    } catch (error) {
      console.error('Error:', error);
      toastApiResponse(error, 'It is not possible to load news details');
    }
  };

  useEffect(() => {    
    fetchCurrentlyNews();
    fetchAllNews();
    if (newsId) {
      handleGoToBoatNews(newsId)
    }
  }, [newsId])

  return (
    <Flex direction="column" height="100%" bg="white">
      <Header />

      <Stack w="100%" height="auto" align="center">
        <Center w="100%" height="auto">
          <Box w="100%" height="auto">
            <Image
              src={'https://img.freepik.com/free-vector/kayak-adventure-background-design_52683-72306.jpg?size=626&ext=jpg&ga=GA1.1.1657272551.1708124618&semt=ais'}
              alt=""
              w="100%"
              maxH={{ base: 300, md: 400 }}
              objectFit="cover"
            />
          </Box>
        </Center>
      </Stack>

      <SimpleGrid 
        columns={{ base: 1, md: 1, lg: 1 }} 
        spacing={3}
        w="100%"
        maxWidth={1500}
        mx='auto'
        px={3}
      >
        <Card bg={bg} boxShadow={cardShadow} my='10px' px={5}>
          <Heading size={'2xl'} mt={5}>{currentlyDataNews?.title}</Heading>

          <Text color={textColorSecondary} fontSize='md' me='26px' mt={3}>
            {currentlyDataNews?.subtitle}
          </Text>

          <Divider my={5} />

          <Text color="gray.500" fontSize='xl' me='26px' mt={4}>
            {currentlyDataNews?.introduce}
          </Text>

          <Center w="70%" height="auto" mx={'auto'} my={5} justifyContent="center">
            <Box w="100%" height="auto" borderRadius={10}>
              <Image
                src={`https://techsoluctionscold.com.br/api-boats/uploads/news/${currentlyDataNews?.imageMainNews}`}
                alt=""
                w="100%"
                maxH={{ base: 300, md: 400, lg: 500 }}
                objectFit="cover"
                borderRadius={10}
              />
            </Box>
          </Center>

          <Text color="gray.500" fontSize='xl' me='26px' mt={4}>
            {currentlyDataNews?.textDivisor}
          </Text>

          <MiniSection
            imagePosition={'right'}
            firstTextOfComponent={currentlyDataNews?.textOne}
            secondTextOfComponent={currentlyDataNews?.textTwo}
            image={`https://techsoluctionscold.com.br/api-boats/uploads/news/${currentlyDataNews?.imageFirstSection}`}
          />

          { currentlyDataNews?.amountSections == '2' && (
            <MiniSection
              imagePosition={'left'}
              firstTextOfComponent={currentlyDataNews?.textThree}
              secondTextOfComponent={currentlyDataNews?.textFour}
              image={`https://techsoluctionscold.com.br/api-boats/uploads/news/${currentlyDataNews?.imageSecondSection}`}
            />
          )}

          { currentlyDataNews?.amountSections == '3' && (
            <MiniSection
              imagePosition={'right'}
              firstTextOfComponent={currentlyDataNews?.textFive}
              secondTextOfComponent={currentlyDataNews?.textSix}
              image={`https://techsoluctionscold.com.br/api-boats/uploads/news/${currentlyDataNews?.imageThirdSection}`}
            />
          )}

          <Text color="gray.500" fontSize='xl' me='26px' mt={8}>
            {currentlyDataNews?.conclusion}
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
            <SimpleGrid columns={{ base: 1, md: 2, lg: 2, xl: 4 }} spacing={3} my={4}>
              {allNews.map((news, index) => (
                <CardLatestNews
                  key={index}
                  title={news.title}
                  description={news.subtitle}
                  image={`https://techsoluctionscold.com.br/api-boats/uploads/news/${news?.imageMainNews}`}
                  onClick={() => handleGoToBoatNews(news.id)}
                  date="07 mar 2024"
                />
              ))}
            </SimpleGrid>
          </motion.div>
        </Card>
      </SimpleGrid>
      <ToastContainer />
      <Footer />
    </Flex>
  );
}
