'use client'
import { Box, Divider, Text, SimpleGrid } from "@chakra-ui/react";
import { motion } from "framer-motion";
// import { useNavigate } from 'react-router-dom';
// import { CardLatestNews } from "./CardLatestNews";
import CardAds from "./CardAds";
import { toastApiResponse } from "./Toast";
import { api } from "../services/api";
import { useEffect, useState } from "react";
import React from "react";

interface AdType2 {
  id: string;
  links_ads: string;
  image_main_ads: string;
  price: string;
  start_date: string;
  due_date: string;
  type_ads: string;
  is_active: string;
  is_date_expired: boolean;
}

// const cardBoatLatestNews = [
//   {
//     id: '1',
//     // image: "./images/boat4.png",
//     image: 'https://static.vecteezy.com/ti/vetor-gratis/p1/2372071-chines-vermelho-dragao-barco-festival-conceito-modelo-vetor.jpg',
//     title: 'Festival do dragao 2024',
//     description: 'This is a wonderful boat and can sail between the seven seas. You can see a lot of things, including finding out your happiness',
//     date: '12 Fev 2024'
//   },
//   {
//     id: '2',
//     // image: "./images/boat2.png",
//     image: 'https://static.vecteezy.com/ti/vetor-gratis/p1/2372071-chines-vermelho-dragao-barco-festival-conceito-modelo-vetor.jpg',
//     title: 'Festival do dragao 2024',
//     description: 'This is a wonderful boat and can sail between the seven seas. You can see a lot of things, including finding out your happiness',
//     date: '10 Jun 2024'
//   },
//   {
//     id: '3',
//     // image: "./images/boat3.png",
//     image: 'https://static.vecteezy.com/ti/vetor-gratis/p1/2372071-chines-vermelho-dragao-barco-festival-conceito-modelo-vetor.jpg',
//     title: 'Festival do dragao 2024',
//     description: 'This is a wonderful boat and can sail between the seven seas. You can see a lot of things, including finding out your happiness',
//     date: '22 Sep 2024'
//   },
//   {
//     id: '4',
//     // image: "./images/boat1.png",
//     image: 'https://static.vecteezy.com/ti/vetor-gratis/p1/2372071-chines-vermelho-dragao-barco-festival-conceito-modelo-vetor.jpg',
//     title: 'Festival do dragao 2024',
//     description: 'This is a wonderful boat and can sail between the seven seas. You can see a lot of things, including finding out your happiness',
//     date: '16 Abr 2024'
//   },
//   {
//     id: '5',
//     // image: "./images/boat3.png",
//     image: 'https://static.vecteezy.com/ti/vetor-gratis/p1/2372071-chines-vermelho-dragao-barco-festival-conceito-modelo-vetor.jpg',
//     title: 'Festival do dragao 2024',
//     description: 'This is a wonderful boat and can sail between the seven seas. You can see a lot of things, including finding out your happiness',
//     date: '07 Mar 2024'
//   },
//   {
//     id: '6',
//     // image: "./images/boat1.png",
//     image: 'https://static.vecteezy.com/ti/vetor-gratis/p1/2372071-chines-vermelho-dragao-barco-festival-conceito-modelo-vetor.jpg',
//     title: 'Festival do dragao 2024',
//     description: 'This is a wonderful boat and can sail between the seven seas. You can see a lot of things, including finding out your happiness',
//     date: '15 Mar 2024'
//   },
//   {
//     id: '7',
//     // image: "./images/boat1.png",
//     title: 'Festival do dragao 2024',
//     image: 'https://static.vecteezy.com/ti/vetor-gratis/p1/2372071-chines-vermelho-dragao-barco-festival-conceito-modelo-vetor.jpg',
//     description: 'This is a wonderful boat and can sail between the seven seas. You can see a lot of things, including finding out your happiness',
//     date: '17 Fev 2024'
//   },
//   {
//     id: '8',
//     // image: "./images/boat1.png",
//     image: 'https://static.vecteezy.com/ti/vetor-gratis/p1/2372071-chines-vermelho-dragao-barco-festival-conceito-modelo-vetor.jpg',
//     title: 'Festival do dragao 2024',
//     description: 'This is a wonderful boat and can sail between the seven seas. You can see a lot of things, including finding out your happiness',
//     date: '25 Dez 2023'
//   }
// ];

const LatestNews = () => {
  // const navigate = useNavigate();

  const [adsType2, setAdsType2] = useState<AdType2[]>([]);
  // const [allNews, setAllNews] = useState<any[]>([]);

  // const handleGoToBoatNews = (newsId: string) => {
  //   navigate(`/boatNews/${newsId}`);
  // };

  // const fetchAllNews = async () => {
  //   try {
  //     const response = await api.post('/news/list_news.php');
  //     const newsResponse = response.data;
  //     console.log(newsResponse, 'news 10:12');
  //     setAllNews(newsResponse)
  
  //   } catch (error) {
  //     console.error('Error:', error);
  //     toastApiResponse(error, 'It is not possible to load news details');
  //   }
  // };

  const fetchAllAds = async () => {
    try {
      const response = await api.post('/ads/list_ads.php');
      const adsResponse = response.data;
      const adsType2 = adsResponse.filter((ad: { type_ads: string }) => ad.type_ads === '2');
  
      return {adsType2};
    } catch (error) {
      console.error('Error:', error);
      toastApiResponse(error, 'It is not possible to load boat details');
      return { adsType2: []};
    }
  };

  const fetchData = async () => {
    const { adsType2} = await fetchAllAds();
    setAdsType2(adsType2);
  };

  useEffect(() => {
    fetchData();
    // fetchAllNews();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 0.8 }}
    >
      <Box
        h="auto"
        w={'100%'}
        maxWidth={1480}
        display="flex"
        flexDirection="column"
        marginX="auto"
        mt={10}
      >
        <Box w={{ base: "100%", md: "100%" }} h="auto">
          <Text fontSize={['sm', 'md', 'lg', 'xl']} fontWeight={'bold'} color={'blue.400'} mt={0}>
            ANNOUCEMENTS
          </Text>

          <Divider borderColor="blue.400" mt={4} mb={6}></Divider>

          <Box w={{ base: "100%", md: "100%" }} h="100%">
            <SimpleGrid columns={{ base: 2, sm: 2, md: 3, lg: 3, xl: 6 }} spacing={2}>
              {adsType2
              .filter((ads: any) => !ads.is_date_expired && ads.is_active === '1')
              .map((ads, index) => (
                <React.Fragment key={index}>
                  <a href={ads.links_ads} target="_blank" rel="noopener noreferrer">
                    <CardAds 
                      image={`https://techsoluctionscold.com.br/api-boats/uploads/ads/${ads.image_main_ads}`} 
                      key={ads.id} 
                    />
                  </a>
                </React.Fragment>
              ))}
            </SimpleGrid>
          </Box>
        </Box>

        {/* <HStack mb={2} mt={10}>
          <Text fontSize={['sm', 'md', 'lg', 'xl']} fontWeight={'bold'} color={'blue.400'}>LATEST NEWS</Text>
          <Text fontSize={['sm', 'md', 'lg', 'xl']} fontWeight={'hairline'} color={'gray.500'}>|</Text>
          <Text fontSize={['sm', 'md', 'lg', 'xl']} fontWeight={'hairline'} color={'gray.500'}>ALL</Text>
          <Text fontSize={['sm', 'md', 'lg', 'xl']} fontWeight={'hairline'} color={'gray.500'}>SUPERYATCH</Text>
          <Text fontSize={['sm', 'md', 'lg', 'xl']} fontWeight={'hairline'} color={'gray.500'}>LIFESTYLE</Text>
        </HStack> */}

        {/* <Divider borderColor="blue.400" mb={2}></Divider> */}

        {/* <SimpleGrid
          templateColumns={{ base: '1fr', md: '100% 0%' }}
          columns={{ base: 1, md: 2 }}
          spacing={3}
          w={'100%'}
          height={'auto'}
          mt={5}
          marginX="auto"
          maxWidth={1480}
        >
          <Box w={{ base: "100%", md: "100%" }} h="auto">
            <SimpleGrid columns={{ base: 1, sm: 1, md: 2, lg: 4, xl: 4 }} spacing={4}>
              {allNews.sort((a, b) => b.id - a.id).map((news, index) => (
                <CardLatestNews
                  key={index}
                  image={`https://techsoluctionscold.com.br/api-boats/uploads/news/${news.imageMainNews}`}
                  title={news.title}
                  date={'25/04/2024'}
                  description={news.subtitle}
                  onClick={() => handleGoToBoatNews(news.id)}
                />
              ))}
            </SimpleGrid>
          </Box>
        </SimpleGrid> */}
      </Box>
    </motion.div>
  );
};

export default LatestNews;
