'use client'
import { Box, Button, Divider, HStack, SimpleGrid, Stack, Text, useBreakpointValue } from '@chakra-ui/react';

import { useNavigate } from 'react-router-dom';
import { useAuth } from "../hooks/useAuth";
import { useEffect, useState } from 'react';

import { api } from '../services/api';

import { toastApiResponse } from './Toast';
import "react-toastify/ReactToastify.min.css";

import { BoatDataGlobal } from '../mock/motorYatchs';

import CardBoat from './CardBoat';
import React from 'react';

import { FaHome, FaCity } from "react-icons/fa";
import { IoConstruct } from "react-icons/io5";
import { IoTimer } from "react-icons/io5";
import { MdDirectionsBoatFilled } from "react-icons/md";
import { GiMorgueFeet } from "react-icons/gi";
import Loading from './Loading';

type PlanOrder = 'ENHANCED' | 'CLASSIC' | 'FREE LIMITED TIME';

export default function ListCardBoat() {

  const { user } = useAuth();

  const generateCardInfoItems = (boat: any) => [
    { icon: MdDirectionsBoatFilled, title: 'Boat Type', value: boat.boatType },
    { icon: GiMorgueFeet, title: 'Boat Length', value: `${boat.length} feet` },
    { icon: IoConstruct, title: 'Maker', value: boat.maker },
    { icon: FaCity, title: 'City', value: boat.city },
    { icon: FaHome, title: 'Country', value: boat.country },
    { icon: IoTimer, title: 'Year of fabrication', value: boat.yearBoat },
    // { icon: IoConstruct, title: 'Plan selected', value: boat.planSelected },
  ];

  const [boats, setBoats] = useState<BoatDataGlobal[]>([]);
  const [loading, setLoading] = useState(true);

  const columns = useBreakpointValue({ base: 2, md: 2, lg: 3, xl: 4 });
  const navigate = useNavigate();

  async function fetchAndSortAllBoats() {
    setLoading(true);
    try {

      const response = await api.post('/list_all_boats.php');
      const boats = response.data;

      const createImageMainBoatUrl = (image: any) => `https://techsoluctionscold.com.br/api-boats/uploads/boats_images/${image}`;

      const sortedBoats = boats
        .filter((boat: any) => boat.is_date_expired === false)
        .filter((boat: any) => boat.is_active === '1')
        .map((boat: any) => ({
          ...boat,
          imageMainBoat: createImageMainBoatUrl(boat.images[0]),
        }))
        .sort((a: any, b: any) => {
          const planOrder: Record<PlanOrder, number> = { 'ENHANCED': 0, 'CLASSIC': 1, 'FREE LIMITED TIME': 2 };

          const planA = a.planSelected as PlanOrder | undefined;
          const planB = b.planSelected as PlanOrder | undefined;

          if (planA && planB) {
            const orderDifference = planOrder[planA] - planOrder[planB];

            if (orderDifference !== 0) {
              return orderDifference;
            } else {
              return a.id.localeCompare(b.id);
            }
          } else {
            return 0;
          }
        })
      ;

      const groupedByPlan = sortedBoats.reduce((result: any, boat: any) => {
        const planCategory = boat.planSelected;
        result[planCategory] = result[planCategory] || [];
        result[planCategory].push(boat);
        return result;
      }, {} as Record<string, BoatDataGlobal[]>);

      // const finalSortedBoats = Object.values(groupedByPlan).flat();
      const finalSortedBoats = Object.values(groupedByPlan).flat().reverse();
      setBoats(finalSortedBoats as BoatDataGlobal[]);

      setTimeout(() => {
        setLoading(false);
      }, 1000);

    } catch (error) {
      console.error('Error:', error);
      toastApiResponse(error, 'It is not possible to load boat details');
    }
  }

  const handleClickGoListBoatByType = (boatType: string) => {
    localStorage.setItem('boatType', boatType);
    navigate('/listBoat');
  };

  function handleClickGoSellMyBoat() {
    { user ? navigate('/registerBoatBasic') : navigate('/login') }
  }

  const handleClickGoCardBoatDetails = (boatId: string) => {
    navigate(`/cardBoatDetails/${boatId}`);
  };

  useEffect(() => {
    fetchAndSortAllBoats();
  }, []);

  return (
    <>
      {loading ?
        <Stack spacing={2} my={20} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Loading />
        </Stack>
        :
        <HStack
          bg="white"
          w="100%"
          maxWidth={1480}
          h={'auto'}
          align="center"
          justifyContent="space-between"
          marginX="auto"
          mt={10}
          spacing={5}
        >
          <Box bg="white" w="100%" h={'auto'}>
            <HStack>
              <Text fontSize={'xl'} fontWeight={'hairline'} color={'blue.400'}>FEATURED YATCHS</Text>
              <Text fontSize={'xl'} fontWeight={'bold'} color={'blue.500'}>FOR SALE & CHARTER</Text>
            </HStack>

            <Divider borderColor="blue.400" mb={5} mt={3}></Divider>

            {/* <SimpleGrid columns={columns} spacing={3}>
          {boats.map((boat, index) => (
            <React.Fragment key={index}>
              <CardBoat
                cardInfoItems={generateCardInfoItems(boat)}
                id={boat.id}
                is_active={boat.is_active}
                imageMainBoat={boat.imageMainBoat}
                nameBoat={boat.nameBoat}
                boatCategory={boat.boatType}
                length={boat.length}
                maker={boat.maker}
                yearBoat={boat.yearBoat}
                city={boat.city}
                country={boat.country}
                price={boat.price}
                titleButton='See details'
                onClick={() => handleClickGoCardBoatDetails(boat.id)}
                showSecondButton={false}
                is_date_expired={boat.is_date_expired}
              />
            </React.Fragment>
          ))}
        </SimpleGrid> */}

            <SimpleGrid columns={columns} spacing={3}>
              {boats.slice(0, 20).map((boat, index) => (
                <React.Fragment key={index}>
                  <CardBoat
                    cardInfoItems={generateCardInfoItems(boat)}
                    id={boat.id}
                    is_active={boat.is_active}
                    imageMainBoat={boat.imageMainBoat}
                    nameBoat={boat.nameBoat}
                    boatCategory={boat.boatType}
                    length={boat.length}
                    maker={boat.maker}
                    yearBoat={boat.yearBoat}
                    city={boat.city}
                    country={boat.country}
                    price={boat.price}
                    titleButton='See details'
                    onClick={() => handleClickGoCardBoatDetails(boat.id)}
                    showSecondButton={false}
                    is_date_expired={boat.is_date_expired}
                    show_tooltip={false}
                  />
                </React.Fragment>
              ))}
            </SimpleGrid>


            <HStack mt={5} justifyContent={'center'} alignItems={'center'}>
              <Button bg={'gray.100'} onClick={handleClickGoSellMyBoat} w={'25%'}>
                <Text fontSize={['2xs', 'xs', 'sm', "md", "lg"]} fontWeight={'hairline'} color={'blue.400'}>
                  SELL MY BOAT
                </Text>
              </Button>

              <Button bg={'gray.100'} onClick={() => handleClickGoListBoatByType('')} w={'25%'}>
                <Text fontSize={['2xs', 'xs', 'sm', "md", "lg"]} fontWeight={'hairline'} color={'blue.400'}>
                  SEE ALL BOATS
                </Text>
              </Button>
            </HStack>
          </Box>
        </HStack>
      }
    </>
  )
}
