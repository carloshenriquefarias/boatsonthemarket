import { Divider, Flex, Icon, SimpleGrid, useColorModeValue, Text, Button, VStack, Box, HStack, Select, 
  FormControl, FormLabel, Stack, Input, Heading, useBreakpointValue, 
} from '@chakra-ui/react';

import Card from '../components/Card'
import BoatSelector from '../components/BoatCategorySelector';
import Footer from '../components/Footer'
import Header from '../components/Header'

import { useNavigate } from 'react-router-dom';

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.min.css";

import { useState } from 'react';
import { ImArrowLeft } from "react-icons/im";
import { api } from '../services/api';

export default function AdvancedFilter() {

  const bg = useColorModeValue("white", "navy.700");
  const cardShadow = useColorModeValue("0px 18px 40px rgba(112, 144, 176, 0.12)", "unset");
  const navigate = useNavigate();
  const textColorPrimary = useColorModeValue("secondaryGray.900", "white");
  const textColorSecondary = "gray.400";

  const [selectedBoatConditionButton, setSelectedBoatConditionButton] = useState('1');
  const [selectedMediaButton, setSelectedMediaButton] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
  })

  const initialState = {
    boatType: "", hullMaterial: "", country: "", hullType: "", maker: '',
    lengthStart: '', lengthEnd: '', priceStart: '', priceEnd: '', yearStart: '', yearEnd: '',
  };

  const [formBoatDetails, setFormBoatDetails] = useState(initialState);

  const resetFilters = () => {
    setFormBoatDetails(initialState);
  };

  const buttonsData = [
    { id: '1', label: "New available order", value:'New available'},
    { id: '2', label: "New boat", value:'New'},
    { id: '3', label: "Used", value:'Used'},
    { id: '4', label: "Insurance salvage", value:'Insurance salvage'},
  ];

  const buttonsMedia = [
    { id: '1', label: "All boats", status: false},
    { id: '2', label: "Only boats with video", status: true},
  ];
  
  const handleBackAllBoats = () => {
    navigate('/listBoat/');
  };

  const handleSelectCategory = (category: string, buttonLabel: string) => {
    setFormBoatDetails((prevFormBoatDetails) => ({
      ...prevFormBoatDetails,
      boatType: buttonLabel,
      boatCategory: category,
    }));
  };

  const handleMaker = (event: any) => {
    setFormBoatDetails({ ...formBoatDetails, maker: event.target.value });
  };

  const handleSelectedCondition = (id: string, value: string) => {
    setSelectedBoatConditionButton(id);
    setFormBoatDetails(prevState => ({
      ...prevState,
      boatCondition: value
    }));
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

  const goBackAllBoats = () => {
    navigate('/listBoat/');
  };

  async function handleAdvancedFilter({}) {
    // setIsLoading(true)
    console.log('chegou aqui as 14:39 =>', formBoatDetails);
    return


    try {
      const response = await api.post('/filters_boats/advanced_filter.php', formBoatDetails);
      console.log('chegou aqui as 12:37 =>', response);
      return

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

      setIsLoading(false);
      goBackAllBoats();

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
  }

  return (
    <>
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
                Advanced filter
              </Text>

              <Text color={textColorSecondary} fontSize="md" me="6px" mb="5px" mt={2}>
                This place you can search all data and informations about the available boats
              </Text>
            </Box>

            <Button bg='gray.50' w='auto' h={'80px'} onClick={handleBackAllBoats}>
              <VStack pt={0}>
                <Icon as={ImArrowLeft} color={'blue.300'} h='28px' w='28px' />
                <Text color={'blue.300'} fontSize={['2xs', 'xs', 'sm', 'md']}>Back to list boat</Text>
              </VStack>
            </Button>
          </HStack>

          <Divider />
        </SimpleGrid>

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
          <VStack spacing={2} w={isWideVersion ? '50%' : '90%'} mx='auto'>
            <Heading size='md' justifyContent={'flex-start'} alignItems={'flex-start'} mt={5}>
              Basic features
            </Heading>

            <BoatSelector onSelectCategory={handleSelectCategory} />

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

            <FormControl mt={2}>
              <FormLabel>Condition</FormLabel>
              <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={2} w="100%">
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
          <VStack spacing={2} w={isWideVersion ? '50%' : '90%'}  mx='auto'>
            <Heading size='md' justifyContent={'flex-start'} alignItems={'flex-start'} mt={5}>
              Specifics features
            </Heading>                

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
                  <Input
                    name='Start year'
                    placeholder="Minimum year"
                    type="number"
                    value={formBoatDetails.yearStart}
                    onChange={e => handleNumericChange('yearStart', e.target.value)}
                  />
                </FormControl>

                <FormControl>
                  <Input
                    name='Final year'
                    placeholder="Maximum year"
                    type="number"
                    value={formBoatDetails.yearEnd}
                    onChange={e => handleNumericChange('yearEnd', e.target.value)}
                  />
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
          <VStack spacing={2} w={isWideVersion ? '50%' : '90%'}  mx='auto'>
            <Heading size='md' justifyContent={'flex-start'} alignItems={'flex-start'} mt={5}>
              Advanced features
            </Heading>  

            <FormControl>
              <FormLabel>Country</FormLabel>
              <Select id='country' value={formBoatDetails.country} onChange={handleCountry}>
                <option value=''></option>
                <option value='brazil'>Brazil</option>
                <option value='argentina'>Argentina</option>
                <option value='germany'>Germany</option>
                <option value='usa'>USA</option>
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
              <Button bg='gray.200' onClick={resetFilters}>
                Reset filters
              </Button>
              <Button bg='yellow.200' onClick={handleAdvancedFilter} isLoading={isLoading}>
                Search boats
              </Button>
            </HStack>
          </VStack>
        </Card>

        <ToastContainer />
        <Footer />
      </Flex>
    </>
  )
}