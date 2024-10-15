import {
  Button, Text, SimpleGrid, Stack, VStack, HStack, Box,
  Divider, Icon, useBreakpointValue, useColorModeValue, Flex, Spinner, Center, Image
} from "@chakra-ui/react";

import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import React from "react";

import { api } from "../services/api";
import { BoatDataGlobal } from '../mock/motorYatchs';

import { toastApiResponse } from "../components/Toast";
import "react-toastify/ReactToastify.min.css";

import { FaRegFaceSadCry } from "react-icons/fa6";
import { IoBoatSharp } from "react-icons/io5";
import { FaHome, FaCity, FaRegArrowAltCircleLeft } from "react-icons/fa";
import { IoConstruct } from "react-icons/io5";
import { IoTimer } from "react-icons/io5";
import { MdDirectionsBoatFilled } from "react-icons/md";
import { GiMorgueFeet } from "react-icons/gi";

import CardBoat from "../components/CardBoat";
import Header from "../components/Header";
import Footer from "../components/Footer";

interface AdType3 {
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

type PlanOrder = 'ENHANCED' | 'CLASSIC' | 'FREE LIMITED TIME';

export default function ListBoatByUser() {

  const navigate = useNavigate();

  const { userID } = useParams();
  const storedUserID = localStorage.getItem('userID') || ''; 

  const textColorPrimary = useColorModeValue("secondaryGray.900", "white");
  const textColorSecondary = "gray.400";
  const isWideVersion = useBreakpointValue({ base: false, lg: true });
  const boxHeight = useBreakpointValue({ base: '4rem', md: '8rem', lg: '12rem' });

  const [loading, setLoading] = useState(true);
  const [boats, setBoats] = useState<BoatDataGlobal[]>([]);
  const [filteredBoats, setFilteredBoats] = useState<BoatDataGlobal[]>([]);
  const [adsType3, setAdsType3] = useState<AdType3[]>([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [userFullName, setUserFullName] = useState('');
  
  const validAds = adsType3.filter(ads => !ads.is_date_expired && ads.is_active === '1');

  const [currentBoats, setCurrentBoats] = useState<BoatDataGlobal[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const recordsPerPage = 12;

  const generateCardInfoItems = (boat: any) => [
    { icon: MdDirectionsBoatFilled, title: 'Boat Type', value: boat.boatType },
    { icon: GiMorgueFeet, title: 'Boat Length', value: `${boat.length} feet` },
    { icon: IoConstruct, title: 'Maker', value: boat.maker },
    { icon: FaCity, title: 'City', value: boat.city },
    { icon: FaHome, title: 'Country', value: boat.country },
    { icon: IoTimer, title: 'Year of fabrication', value: boat.yearBoat },
  ];

  function scrollToTop() {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth' // Isso garante que a rolagem seja suave.
    });
  }

  function updateCurrentBoats(pageNumber: any) {
    const startIndex = (pageNumber - 1) * recordsPerPage;
    const newCurrentBoats = filteredBoats.slice(startIndex, startIndex + recordsPerPage);
    setCurrentBoats(newCurrentBoats);
    setCurrentPage(pageNumber);
    scrollToTop();
  }

  const fetchAllAds = async () => {
    try {
      const response = await api.post('/ads/list_ads.php');
      const adsResponse = response.data;
      const adsType3 = adsResponse.filter((ad: { type_ads: string }) => ad.type_ads === '3');

      return { adsType3 };
    } catch (error) {
      console.error('Error:', error);
      toastApiResponse(error, 'It is not possible to load boat details');
      return { adsType3: [] };
    }
  };

  const fetchData = async () => {
    const { adsType3 } = await fetchAllAds();
    setAdsType3(adsType3);
  };

  async function fetchAndSortAllBoats(userID: string) {
    try {
      setLoading(true);

      const response = await api.get(`/list_boat_by_user_id.php?id=${userID}`);
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
        }
        );

      const groupedByPlan = sortedBoats.reduce((result: any, boat: any) => {
        const planCategory = boat.planSelected;
        result[planCategory] = result[planCategory] || [];
        result[planCategory].push(boat);
        return result;
      }, {} as Record<string, BoatDataGlobal[]>);

      const finalSortedBoats = Object.values(groupedByPlan).flat();
      setBoats(finalSortedBoats as BoatDataGlobal[]);

      setTimeout(() => {
        setLoading(false);
      }, 1000);

    } catch (error) {
      console.error('Error:', error);
      toastApiResponse(error, 'It is not possible to load boat details');
    }
  }

  const handleClickGoCardBoatDetails = (boatId: string) => {
    navigate(`/cardBoatDetails/${boatId}`);
  };

  const PaginationControls: React.FC<{
    currentPage: number,
    totalPages: number,
    setCurrentPage: (page: number) => void,
    updateCurrentPayments: (page: number) => void
  }> = ({ currentPage, totalPages, setCurrentPage, updateCurrentPayments }) => {

    const numPageButtons = 5;
    const halfPageRange = Math.floor(numPageButtons / 2);

    let startPage = Math.max(1, currentPage - halfPageRange);
    let endPage = Math.min(totalPages, startPage + numPageButtons - 1);

    if (endPage - startPage + 1 < numPageButtons) {
      startPage = Math.max(1, endPage - numPageButtons + 1);
    }

    const pages = Array.from({ length: (endPage - startPage + 1) }, (_, i) => startPage + i);

    return (
      <Flex justifyContent="center" alignItems="center" p={4} gap={2}>
        <Button onClick={() => {
          setCurrentPage(1);
          updateCurrentPayments(1);
        }} disabled={currentPage === 1}>&laquo;</Button>

        {pages.map(page => (
          <Button
            key={page}
            colorScheme={page === currentPage ? "blue" : "gray"}
            onClick={() => {
              setCurrentPage(page);
              updateCurrentPayments(page);
            }}
          >
            {page}
          </Button>
        ))}

        <Button onClick={() => {
          setCurrentPage(totalPages);
          updateCurrentPayments(totalPages);
        }} disabled={currentPage === totalPages}>&raquo;
        </Button>
      </Flex>
    );
  };

  function handleGoListBoat() {
    navigate('/listBoat')
  }

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (userID) {
      fetchAndSortAllBoats(userID);
    } else if (storedUserID) {
      fetchAndSortAllBoats(storedUserID);
    }
  }, [userID, storedUserID]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentImageIndex(prevIndex => (prevIndex + 1) % validAds.length);
    }, 8000);

    return () => clearInterval(intervalId);
  }, [validAds.length]);

  useEffect(() => {
    setFilteredBoats(boats);
  }, [boats]);

  useEffect(() => {
    const newTotalPages = Math.ceil(filteredBoats.length / recordsPerPage);
    setTotalPages(newTotalPages);
    updateCurrentBoats(1);
  }, [filteredBoats]);

  useEffect(() => {
    if (currentBoats.length > 0) {
      setUserFullName(currentBoats[0].fullName || 'Unknown User');
    }
  }, [currentBoats]);  

  return (

    <Flex direction="column" height="100%" bg="white">
      <Header />

      <SimpleGrid
        columns={{ base: 1, md: 1, lg: 1 }}
        spacing={3}
        w="100%"
        maxWidth={1480}
        mx='auto'
        mt={5}
      >

        <VStack spacing="3" width={'auto'} maxWidth={1480} justifyContent={'center'} alignItems={'center'}>
          <SimpleGrid
            columns={{ base: 1, md: 1, lg: 1 }}
            spacing={3}
            w="100%"
            maxWidth={1480}
            mb={0}
          >
            <HStack justifyContent={'space-between'} alignItems={'center'} px={3}>
              <Box justifyContent={'flex-start'} alignItems={'center'} gap={5}>
                <HStack>
                  <Icon as={IoBoatSharp} fontSize={["md", "lg", "xl"]} />
                  <Text
                    color={textColorPrimary}
                    fontWeight="bold"
                    fontSize={["md", "lg", "xl", '2xl']}
                    textAlign="left"
                  >
                    This is the {userFullName}s´ boats store
                  </Text>
                </HStack>

                <Text color={textColorSecondary} fontSize="md" mt={2}>
                  See all types of items available by {userFullName}! Enjoy this list of products!
                </Text>
              </Box>

              <HStack justifyContent={'center'} alignItems={'center'}>
                <Button bg='gray.50' w='auto' h={'80px'} onClick={handleGoListBoat}>
                  <VStack pt={0}>
                    <Icon as={FaRegArrowAltCircleLeft} color={'blue.300'} h='28px' w='28px' />
                    <Text color={'blue.300'} fontSize={['2xs', 'xs', 'sm', 'md']}>
                      {isWideVersion && 'Back to listboat'}
                    </Text>
                  </VStack>
                </Button>
              </HStack>
            </HStack>

            <Divider />
          </SimpleGrid>

          <Box w={{ base: "100%", md: "100%" }} h={boxHeight} my={2}>
            {validAds.length > 0 && (
              <Flex direction="column" align="center">
                <a href={validAds[currentImageIndex].links_ads} target="_blank" rel="noopener noreferrer">
                  <Image
                    src={`https://techsoluctionscold.com.br/api-boats/uploads/ads/${validAds[currentImageIndex].image_main_ads}`}
                    alt={`Ad image for ${validAds[currentImageIndex].id}`}
                    w="100%"
                    h={boxHeight}
                    objectFit="contain"
                    borderRadius="lg"
                    p={0.4}
                  />
                </a>
              </Flex>
            )}
          </Box>

          {loading ?
            <Stack spacing={2} my={3} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <Spinner
                thickness='4px'
                speed='0.65s'
                emptyColor='gray.200'
                color='blue.500'
                size='xl'
              />
            </Stack>
            :
            <div>
              {currentBoats.length === 0 && loading === false ? (
                <Center flexDirection="column" height="20vh">
                  <Text fontSize="xl" marginBottom="4">
                    Sorry, this boat was not found!
                  </Text>

                  <Box fontSize="48px" color="gray.500">
                    <FaRegFaceSadCry />
                  </Box>

                  <Button
                    colorScheme='facebook'
                    color={'gray.50'}
                    my={5}
                    _hover={{ backgroundColor: "gray.200" }}
                    fontSize="sm"
                    justifyContent="center"
                    alignItems="center"
                    size={'md'}
                    onClick={() => { setFilteredBoats(boats) }}
                  >
                    Go back to list boat
                  </Button>
                </Center>
              ) : (
                <SimpleGrid columns={{ base: 2, md: 3, lg: 3, xl: 4 }} spacing={3} maxWidth={1480} px={2} w={'100%'}>
                  {currentBoats.map((boat, index) => (
                    <React.Fragment key={index}>
                      {boat.is_active === "1" && boat.is_date_expired !== true ? (
                        <CardBoat
                          id={boat.id}
                          cardInfoItems={generateCardInfoItems(boat)}
                          is_active={boat.is_active}
                          imageMainBoat={`https://techsoluctionscold.com.br/api-boats/uploads/boats_images/${boat.images[0]}`}
                          nameBoat={boat.nameBoat}
                          boatCategory={boat.boatType}
                          length={boat.length}
                          maker={boat.maker}
                          yearBoat={boat.yearBoat}
                          city={boat.city}
                          country={boat.country}
                          typeCoin={boat.typeCoin}
                          price={boat.price}
                          titleButton='See details'
                          onClick={() => handleClickGoCardBoatDetails(boat.id)}
                          showSecondButton={false}
                          is_date_expired={boat.is_date_expired}
                        />
                      ) : null}
                    </React.Fragment>
                  ))}
                </SimpleGrid>
              )}
            </div>
          }

          <PaginationControls
            currentPage={currentPage}
            totalPages={totalPages}
            setCurrentPage={setCurrentPage}
            updateCurrentPayments={updateCurrentBoats}
          />

        </VStack>
      </SimpleGrid>

      <Footer />
    </Flex>
  )
}

