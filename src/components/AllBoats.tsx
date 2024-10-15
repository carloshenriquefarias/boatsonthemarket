import {
  Button, Text, Select, SimpleGrid, Stack, VStack, HStack, Box,
  Divider, Icon, Modal, ModalBody, ModalCloseButton, ModalContent,
  ModalHeader, ModalOverlay, useColorModeValue, FormControl, useBreakpointValue,
  Flex, Heading, FormLabel, Input, Spinner, Center, Image
} from "@chakra-ui/react";

import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from "react";

import { BoatDataGlobal } from '../mock/motorYatchs';

import { toast, ToastContainer } from "react-toastify";
import { toastApiResponse } from "./Toast";
import "react-toastify/ReactToastify.min.css";

import { FaRegFaceSadCry } from "react-icons/fa6";
import { GrPowerReset } from "react-icons/gr";
import { IoBoatSharp } from "react-icons/io5";
import { FaHome, FaCity, FaSearch } from "react-icons/fa";
import { IoConstruct } from "react-icons/io5";
import { IoTimer } from "react-icons/io5";
import { MdDirectionsBoatFilled } from "react-icons/md";
import { GiMorgueFeet } from "react-icons/gi";
import { SiQuicklook } from "react-icons/si";

import { api } from "../services/api";

import BoatSelector from "./BoatCategorySelector";
import Card from "./Card";
import CardBoat from "./CardBoat";
import React from "react";
import { allCountries } from "../mock/allCountries";

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

export default function AllBoats() {

  const navigate = useNavigate();
  const storedBoatType = (localStorage.getItem('boatType') || '').toString();
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);
  const textColorPrimary = useColorModeValue("secondaryGray.900", "white");
  const textColorSecondary = "gray.400";
  const isWideVersion = useBreakpointValue({ base: false, lg: true });
  const bg = useColorModeValue("white", "navy.700");
  const cardShadow = useColorModeValue("0px 18px 40px rgba(112, 144, 176, 0.12)", "unset");
  const boxHeight = useBreakpointValue({ base: '4rem', md: '8rem', lg: '12rem' });

  const initialState = {
    boatType: "", boatCategory: '', hullMaterial: "", country: "", hullType: "", maker: '', 
    typeCoin: '', model: '', linkVideo: false, lengthStart: '', lengthEnd: '', 
    priceStart: '', priceEnd: '', yearStart: '', yearEnd: '', condition: '',
  };

  const [loading, setLoading] = useState(true);
  const [formBoatDetails, setFormBoatDetails] = useState(initialState);
  const [selectedBoatConditionButton, setSelectedBoatConditionButton] = useState('');
  const [selectedMediaButton, setSelectedMediaButton] = useState(false);

  const [boats, setBoats] = useState<BoatDataGlobal[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filteredBoats, setFilteredBoats] = useState<BoatDataGlobal[]>([]);
  const [adsType3, setAdsType3] = useState<AdType3[]>([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [boatTypeId, setBoatTypeId] = useState(0);
  const validAds = adsType3.filter(ads => !ads.is_date_expired && ads.is_active === '1');

  const [currentBoats, setCurrentBoats] = useState<BoatDataGlobal[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const recordsPerPage = 20;

  const buttonsData = [
    { id: '5', label: "All condition", value: '' },
    { id: '1', label: "New available order", value: 'New available' },
    { id: '2', label: "New boat", value: 'New' },
    { id: '3', label: "Used", value: 'Used' },
    { id: '4', label: "Insurance salvage", value: 'Insurance salvage' },
  ];

  // Definição dos botões
  const buttonsMedia = [
    { id: '1', label: "All boats", status: false },
    { id: '2', label: "Only boats with video", status: true },
  ];

  const generateCardInfoItems = (boat: any) => [
    { icon: MdDirectionsBoatFilled, title: 'Boat Type', value: boat.boatType }, // Water toys / PWC apenas TIRAR BOAT TYPE E COLOCAR O MODEL
    { icon: GiMorgueFeet, title: 'Boat Length', value: `${boat.length} feet` }, //TIRAR TODA A FRASE E O ICONE
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

  const handleMaker = (event: any) => {
    setFormBoatDetails({ ...formBoatDetails, maker: event.target.value });
  };

  const handleModel = (event: any) => {
    setFormBoatDetails({ ...formBoatDetails, model: event.target.value });
  };

  const handleTypeCoin = (event: any) => {
    setFormBoatDetails({ ...formBoatDetails, typeCoin: event.target.value });
  };

  const handlePriceChange = (field: any, value: any) => {
    const numValue = Number(value);
    if (!isNaN(numValue)) {
      setFormBoatDetails(prevState => ({
        ...prevState,
        [field]: numValue
      }));
    }
  };

  const handleNumericChange = (field: any, value: any) => {
    const numValue = Number(value);
    if (!isNaN(numValue)) {
      setFormBoatDetails(prevState => ({
        ...prevState,
        [field]: numValue
      }));
    }
  };

  const handleCountry = (event: any) => {
    setFormBoatDetails({ ...formBoatDetails, country: event.target.value });
  };

  const handleHullMaterial = (event: any) => {
    setFormBoatDetails({ ...formBoatDetails, hullMaterial: event.target.value });
  };

  const handleHullType = (event: any) => {
    setFormBoatDetails({ ...formBoatDetails, hullType: event.target.value });
  };

  const handleMedia = (status: boolean) => {
    setSelectedMediaButton(status);
    setFormBoatDetails(prevState => ({
      ...prevState,
      linkVideo: status
    }));
  };

  const resetFilters = () => {
    setFormBoatDetails(initialState);
    setSelectedMediaButton(false);
    setSelectedBoatConditionButton('');
    setBoatTypeId(0);
  };  

  async function handleAdvancedFilter({ }) {
    setIsLoading(true);

    try {
      const response = await api.post('/filters_boats/advanced_filter.php', formBoatDetails);

      if (response?.data) {
        toast.warning('We are searching for registers...', {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored"
        });
      } else {
        throw new Error();
      }

      setFilteredBoats(response.data);
      resetFilters();
      closeModal();

      setIsLoading(false);

    } catch (error) {
      setIsLoading(true);

      toast.error('It is not possible to find this register now. Please try later!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  };

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

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  async function fetchAndSortAllBoats() {
    try {
      setLoading(true);

      // const response = await api.post('/list_all_boats.php');
      const response = await api.post('/list_all_boats.php',
        JSON.stringify({
          boatType: storedBoatType,
          // limit: 
        })
      );

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

  const handleClickGoCardBoatDetails = (boatId: string) => {
    navigate(`/cardBoatDetails/${boatId}`);
  };

  const handleSelectCategory = (category: string, buttonLabel: string) => {
    setFormBoatDetails((prevFormBoatDetails) => ({
      ...prevFormBoatDetails,
      boatType: buttonLabel,
      boatCategory: category,
    }));
  };

  const handleSelectedCondition = (id: string, value: string) => {
    setSelectedBoatConditionButton(id);
    setFormBoatDetails(prevState => ({
      ...prevState,
      boatCondition: value
    }));
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

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentImageIndex(prevIndex => (prevIndex + 1) % validAds.length);
    }, 8000);

    return () => clearInterval(intervalId);
  }, [validAds.length]);

  useEffect(() => {
    fetchAndSortAllBoats();
  }, [])

  useEffect(() => {
    setFilteredBoats(boats);
  }, [boats]);

  useEffect(() => {
    const newTotalPages = Math.ceil(filteredBoats.length / recordsPerPage);
    setTotalPages(newTotalPages);
    updateCurrentBoats(1);
  }, [filteredBoats]);

  return (
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
                List all boats
              </Text>
            </HStack>

            <Text color={textColorSecondary} fontSize="md" mt={2}>
              Perform accuracy analysis and make the best decisions for you and your business.
            </Text>
          </Box>

          <HStack justifyContent={'center'} alignItems={'center'}>
            <Button bg='gray.50' w='auto' h={'80px'} onClick={openModal}>
              <VStack pt={0}>
                <Icon as={SiQuicklook} color={'blue.300'} h='28px' w='28px' />
                <Text color={'blue.300'} fontSize={['2xs', 'xs', 'sm', 'md']}>
                  {isWideVersion && 'Advanced search'}
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
                      priceOrRequest= {boat.priceOrRequest}
                      price={boat.priceOrRequest === '1' ? 'Price on request' : boat.price}
                      titleButton='See details'
                      onClick={() => handleClickGoCardBoatDetails(boat.id)}
                      showSecondButton={false}
                      is_date_expired={boat.is_date_expired}
                      show_tooltip={false}
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

      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isModalOpen}
        onClose={closeModal}
        size={'3xl'}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader color="gray.700">Perform your advanced search</ModalHeader>
          <HStack w="100%" mt={1} px={6}>
            <Icon as={IoBoatSharp} fontSize="xl" />
            <Text color="gray.300" fontSize={'sm'}>
              The filter will reply to your request as soon as possible
            </Text>
          </HStack>

          <Box w="100%" mt={4} px={6}>
            <Divider borderColor="gray.400" borderWidth='0.5px' ></Divider>
          </Box>
          <ModalCloseButton color="gray.700" />

          <ModalBody pb={6} mt={2}>
            <Card
              bg={bg}
              boxShadow={cardShadow}
              mb='20px'
              pb={5}
              maxWidth={1480}
              w="100%"
              mx='auto'
              borderRadius={10}
            >
              <VStack spacing={2} w={isWideVersion ? '90%' : '90%'} mx='auto'>
                <Heading size='md' justifyContent={'flex-start'} alignItems={'flex-start'} mt={5}>
                  Basic features
                </Heading>

                <BoatSelector onSelectCategory={handleSelectCategory} boatTypeId={boatTypeId}/>

                <Stack direction="column" mt={2} spacing={2} w={'full'}>
                  <Text fontWeight={'normal'}>Maker</Text>
                  <Select id='maker' defaultValue='' value={formBoatDetails.maker} onChange={handleMaker}>
                    <option value="">All makers</option>
                    <option value="Honda">Honda</option>
                    <option value="Yamaha">Yamaha</option>
                    <option value="Mercury">Mercury</option>
                    <option value="Suzuki">Suzuki</option>
                  </Select>
                </Stack>

                <Stack direction="column" mt={2} spacing={2} w={'full'}>
                  <Text fontWeight={'normal'}>Model of maker</Text>
                  <FormControl>
                    <Input
                      name='Model'
                      placeholder="Insert model"
                      type="text"
                      value={formBoatDetails.model}
                      onChange={handleModel}
                    />
                  </FormControl>
                </Stack>

                <FormControl mt={2}>
                  <FormLabel>Condition</FormLabel>
                  <SimpleGrid columns={{ base: 1, md: 3, lg: 5 }} spacing={2} w="100%">
                    {buttonsData.map((button) => {
                      const isSelected = selectedBoatConditionButton === button.id;
                      return (
                        <Button
                          key={button.id}
                          w={'auto'}
                          h={'3rem'}
                          bg={isSelected ? "lightblue" : "white"}
                          color={isSelected ? "gray.300" : "gray.400"}
                          borderWidth={isSelected ? "3px" : "1px"}
                          borderColor={isSelected ? "blue.300" : "gray.400"}
                          onClick={() => handleSelectedCondition(button.id, button.value)}
                          fontSize={['xs', 'sm']}
                          textAlign={'center'}
                          whiteSpace={'normal'}
                          overflow={'hidden'}
                        >
                          {button.label}
                        </Button>
                      );
                    })}
                  </SimpleGrid>
                </FormControl>
              </VStack>
            </Card>

            <Card
              bg={bg}
              boxShadow={cardShadow}
              mb='20px'
              pb={5}
              px={3}
              maxWidth={1480}
              w="100%"
              mx='auto'
              borderRadius={10}
            >
              <VStack spacing={2} w={isWideVersion ? '90%' : '90%'} mx='auto'>
                <Heading size='md' justifyContent={'flex-start'} alignItems={'flex-start'} mt={5}>
                  Specifics features
                </Heading>

                <Stack direction="column" mt={2} spacing={2} w={'full'}>
                  <Text fontWeight={'normal'}>Currency</Text>
                  <Select
                    id='typecoin'
                    defaultValue=''
                    value={formBoatDetails.typeCoin}
                    onChange={handleTypeCoin}
                  >
                    <option id='0' value=''></option>
                    <option id='2' value='DOLARS'>$ Dollar</option>
                    <option id='3' value='EUROS'>€ Euro</option>
                    <option id='4' value='POUNDS'> £ British Pounds</option>
                  </Select>
                </Stack>

                <Stack direction="column" my={3} spacing={2} w={'full'}>
                  <Text fontWeight={'bold'} mb={1}>Insert between the price of boat</Text>
                  <HStack w='100%' spacing={1}>
                    <FormControl>
                      <Input
                        name='Start price'
                        placeholder="Minimum price"
                        type="number"
                        value={formBoatDetails.priceStart}
                        onChange={e => handlePriceChange('priceStart', e.target.value)}
                      />
                    </FormControl>

                    <FormControl>
                      <Input
                        name='Final price'
                        placeholder="Maximum price"
                        type="number"
                        value={formBoatDetails.priceEnd}
                        onChange={e => handlePriceChange('priceEnd', e.target.value)}
                      />
                    </FormControl>
                  </HStack>
                </Stack>

                <Stack direction="column" my={3} spacing={2} w={'full'}>
                  <Text fontWeight={'bold'} mb={1}>Insert between the year of boat</Text>
                  <HStack w='100%' spacing={1}>
                    <FormControl>
                      <Select
                        name='Initial year'
                        value={formBoatDetails.yearStart}
                        onChange={e => handleNumericChange('yearStart', e.target.value)}
                        placeholder="Select starting year"
                      >
                        {Array.from({ length: new Date().getFullYear() - 1900 + 1 }, (_, index) => (
                          <option key={index} value={1900 + index}>
                            {1900 + index}
                          </option>
                        ))}
                      </Select>
                    </FormControl>

                    <FormControl>
                      <Select
                        name='Final year'
                        value={formBoatDetails.yearEnd}
                        onChange={e => handleNumericChange('yearEnd', e.target.value)}
                        placeholder="Select final year"
                      >
                        {Array.from({ length: new Date().getFullYear() - 1900 + 1 }, (_, index) => (
                          <option key={index} value={1900 + index}>
                            {1900 + index}
                          </option>
                        ))}
                      </Select>
                    </FormControl>
                  </HStack>
                </Stack>

                <Stack direction="column" my={1} spacing={2} w={'full'}>
                  <Text fontWeight={'bold'} mb={1}>Insert your length of boat</Text>
                  <HStack w='100%' spacing={1}>
                    <FormControl>
                      <Input
                        name='Start length'
                        placeholder="Minimum length"
                        type="number"
                        value={formBoatDetails.lengthStart}
                        onChange={e => handleNumericChange('lengthStart', e.target.value)}
                      />
                    </FormControl>

                    <FormControl>
                      <Input
                        name='Final length'
                        placeholder="Maximum length"
                        type="number"
                        value={formBoatDetails.lengthEnd}
                        onChange={e => handleNumericChange('lengthEnd', e.target.value)}
                      />
                    </FormControl>
                  </HStack>
                </Stack>
              </VStack>
            </Card>

            <Card
              bg={bg}
              boxShadow={cardShadow}
              mb='20px'
              pb={5}
              px={3}
              maxWidth={1480}
              w="100%"
              mx='auto'
              borderRadius={10}
            >
              <VStack spacing={2} w={isWideVersion ? '90%' : '90%'} mx='auto'>
                <Heading size='md' justifyContent={'flex-start'} alignItems={'flex-start'} mt={5}>
                  Advanced features
                </Heading>

                <FormControl>
                  <FormLabel>Country</FormLabel>
                  <Select id='country' value={formBoatDetails.country} onChange={handleCountry}>
                    {allCountries.map((country) => (
                      <option key={country.id} value={country.name}>{country.name}</option>
                    ))}
                  </Select>
                </FormControl>

                <FormControl>
                  <FormLabel>Hull material</FormLabel>
                  <Select id='hullMaterial' value={formBoatDetails.hullMaterial} onChange={handleHullMaterial}>
                    <option value=''></option>
                    <option value='composite'>Composite</option>
                    <option value='Aluminium'>Aluminium</option>
                    <option value='Fribe glass'>Fribeglass</option>
                    <option value='Carbon fibre'>Carbon Fribe</option>
                    <option value='PVC'>PVC</option>
                    <option value='Hypalon'>Hipalon</option>
                    <option value='Wood'>Wood</option>
                    <option value='Steel'>Steel</option>
                    <option value='Other'>Other</option>
                  </Select>
                </FormControl>

                <FormControl>
                  <FormLabel>Hull Type</FormLabel>
                  <Select id='hullType' defaultValue='' value={formBoatDetails.hullType} onChange={handleHullType}>
                    <option id='0' value=''></option>
                    <option value='VShape'>V Shape</option>
                    <option value='DeepV'>Deep V</option>
                    <option value='Plaining'>Plaining</option>
                    <option value='Semi plaining'>Semi Plaining</option>
                    <option value='Displacement'>Displacement</option>
                    <option value='Semi displacement'>Semi Displacement</option>
                    <option value='Multi hull'>Multi Hull</option>
                    <option value='Round bottom'>Round Bottom</option>
                    <option value='Flat bottom'>Flat Bottom</option>
                    <option value='Bulbous bow'>Bulbous Bow</option>
                    <option value='Inverted bow'>Inverted Bow</option>
                  </Select>
                </FormControl>

                <FormControl mt={2}>
                  <FormLabel>Media</FormLabel>
                  <SimpleGrid columns={{ base: 1, md: 2 }} spacing={2} w="100%">
                    {buttonsMedia.map((button) => {
                      const isSelected = selectedMediaButton === button.status;
                      return (
                        <Button
                          key={button.id}
                          w={'auto'}
                          minH={'3rem'}
                          bg={isSelected ? "lightblue" : "white"}
                          color={isSelected ? "gray.300" : "gray.400"}
                          borderWidth={isSelected ? "3px" : "1px"}
                          borderColor={isSelected ? "blue.300" : "gray.400"}
                          onClick={() => handleMedia(button.status)}
                          fontSize={['xs', 'sm']}
                          textAlign={'center'}
                          whiteSpace={'normal'}
                          overflow={'hidden'}
                        >
                          {button.label}
                        </Button>
                      );
                    })}
                  </SimpleGrid>
                </FormControl>

                <HStack alignItems={'center'} justifyContent={'center'} my={8}>
                  <Button leftIcon={<GrPowerReset />} bg='gray.200' onClick={resetFilters}>
                    Reset filters
                  </Button>
                  <Button leftIcon={<FaSearch />} bg='yellow.200' onClick={handleAdvancedFilter} isLoading={isLoading}>
                    Search boats
                  </Button>
                </HStack>
              </VStack>
            </Card>
          </ModalBody>

        </ModalContent>
        <ToastContainer />
      </Modal>
    </VStack>
  )
}

