'use client'
import { Box, Image, SimpleGrid, useBreakpointValue } from "@chakra-ui/react";

import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';

import { api } from "../services/api";
import { BoatDataGlobal } from "../mock/motorYatchs";
// import { motion } from "framer-motion";
import { toastApiResponse } from "./Toast";

import CarouselSlider from "./CarouselSlider";
import React from "react";

type PlanOrder = 'ENHANCED' | 'CLASSIC' | 'FREE LIMITED TIME';

interface AdType1 {
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

export default function BoxCarousel() {

  const navigate = useNavigate();
  const isWideVersion = useBreakpointValue({ base: false, md: false, lg: false, xl: true });

  const [boats, setBoats] = useState<BoatDataGlobal[]>([]);
  const [adsType1, setAdsType1] = useState<AdType1[]>([]);

  const allMainImages = boats
    .filter((boat: any) => boat.is_date_expired === false)
    .filter((boat) => boat.is_active === '1')
    .map(({ images, nameBoat, price, priceOrRequest, typeCoin, id, planSelected }) => ({
      src: `https://techsoluctionscold.com.br/api-boats/uploads/boats_images/${images[0]}`,
      nameBoat,
      price,
      priceOrRequest,
      typeCoin,
      boatId: id,
      planSelected: planSelected as PlanOrder,
    }))
    .slice(0, 20) // Limita o número de elementos processados a 20
    .sort((a, b) => {
      const planOrder: Record<PlanOrder, number> = { 'ENHANCED': 0, 'CLASSIC': 1, 'FREE LIMITED TIME': 2 };

      return planOrder[a.planSelected] - planOrder[b.planSelected];
    })
  ;

  async function fetchAllBoats() {
    try {
      const response = await api.post('/list_all_boats.php');
      setBoats(response.data);

    } catch (error) {
      console.error('Error:', error);
      toastApiResponse(error, 'It is not possible to load boat details');
    }
  }

  const fetchAllAds = async () => {
    try {
      const response = await api.post('/ads/list_ads.php');
      const adsResponse = response.data;
      const adsType1 = adsResponse.filter((ad: { type_ads: string }) => ad.type_ads === '1');
  
      return {adsType1};
    } catch (error) {
      console.error('Error:', error);
      toastApiResponse(error, 'It is not possible to load boat details');
      return { adsType1: []};
    }
  };

  const fetchData = async () => {
    const { adsType1} = await fetchAllAds();
    setAdsType1(adsType1);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleClickGoCardBoatDetails = (boatId: string) => {
    navigate(`/cardBoatDetails/${boatId}`);
  };

  useEffect(() => {
    fetchAllBoats()
  }, [])

  return (
    // <motion.div
    //   initial={{ opacity: 0, x: 150 }}
    //   whileInView={{ opacity: 1, x: 0 }}
    //   exit={{ opacity: 0, x: 150 }}
    //   transition={{ duration: 0.8 }}
    // >


      


    // </motion.div>

      <>
        {isWideVersion ? (
          <SimpleGrid
          templateColumns={{ base: '1fr', sm: '1fr', md: '1fr', lg: '70% 30%' }}
          columns={{ base: 1, md: 1, lg: 2 }}
          spacing={3}
          w={'100%'}
          height={'auto'}
          mt={10}
          marginX="auto"
          maxWidth={1480}
        >
          <Box w={{ base: "100%", md: "100%" }} height={{ base: '25rem', md: '31rem', lg: '37rem' }} cursor={'pointer'} borderRadius={10}>          
            <CarouselSlider 
              images={allMainImages} 
              height={{ base: '25rem', md: '31rem', lg: '37rem' }}
              onImageClick={(index) => handleClickGoCardBoatDetails(allMainImages[index].boatId)} 
            />
          </Box>
  
          <SimpleGrid columns={1} spacing={3} w='100%'>
            {adsType1
              .filter((ads: any) => !ads.is_date_expired && ads.is_active === '1')
              .map((ads, index) => (
                <React.Fragment key={index}>
                  <a href={ads.links_ads} target="_blank" rel="noopener noreferrer">
                    <Box w={{ base: "100%", md: "100%" }} h="100%" cursor={'pointer'}>
                      <Image
                        src={`https://techsoluctionscold.com.br/api-boats/uploads/ads/${ads.image_main_ads}`}
                        alt=""
                        borderRadius={5}
                        // objectFit="cover"
                        width="28rem"
                        height="18rem"
                      />
                    </Box>
                  </a>
                </React.Fragment>
              ))}
          </SimpleGrid>
  
        </SimpleGrid>
        ) : (
          <SimpleGrid
            // templateColumns={{ base: '1fr', lg: '70% 30%' }}
            // columns={{ base: 1, lg: 2 }}
            // spacing={6}
            w="100%"
            height="auto"
            mt={10}
            mx="auto"
            maxWidth={1480}
          >
            <Box
              w="100%"
              height={{ base: '25rem', md: '31rem', lg: '37rem' }}
              cursor="pointer"
              borderRadius={10}
            >
              <CarouselSlider
                images={allMainImages}
                height={{ base: '25rem', md: '31rem', lg: '37rem' }}
                onImageClick={(index) => handleClickGoCardBoatDetails(allMainImages[index].boatId)}
              />
            </Box>
    
            <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={4} w="100%" mt={5}>
              {adsType1
                .filter((ads) => !ads.is_date_expired && ads.is_active === '1')
                .map((ads, index) => (
                  <a href={ads.links_ads} key={index} target="_blank" rel="noopener noreferrer">
                    <Box
                      w="100%"
                      h="100%"
                      cursor="pointer"
                      borderRadius={5}
                      overflow="hidden"
                    >
                      <Image
                        src={`https://techsoluctionscold.com.br/api-boats/uploads/ads/${ads.image_main_ads}`}
                        alt={`Advertisement ${index + 1}`}
                        // objectFit="fill"
                        w="100%"
                        h="20rem"
                        display="-webkit-inline-box"
                        style={{display: '-webkit-inline-box', width: '100%'}}
                      />
                    </Box>
                  </a>
                ))}
            </SimpleGrid>
          </SimpleGrid>
        )}
      </>    
  );
};

