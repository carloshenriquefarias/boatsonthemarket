import {
  Text, useColorModeValue, Box, Input, SimpleGrid, Divider, FormControl, FormLabel,
  HStack, Button, VStack, Icon, Center, IconButton, Heading, Select, Stack, useBreakpointValue,
  CheckboxGroup,
  Checkbox
} from "@chakra-ui/react";

import { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";

import { FaTrashCan } from "react-icons/fa6";
import { LuImagePlus } from "react-icons/lu";
import { FaRegArrowAltCircleLeft } from "react-icons/fa";
import { useDropzone } from "react-dropzone";
import { useNavigate } from "react-router-dom";
import { useParams } from 'react-router-dom';

import { ToastContainer, toast } from "react-toastify";
import { toastApiResponse } from "./Toast";
import "react-toastify/ReactToastify.min.css";

import AccordionEngine from "./AccordionEngine";
import AccordionOtherInfo, { OtherInfo } from "./AccordionOtherInfo";
import BoatSelector from "./BoatCategorySelector";
import Card from "./Card";
import DropzoneMainImage from "./DropzoneMainImage";
import ModalDelete from "./ModalDelete";

import { api } from "../services/api";
import { BoatDataGlobal } from "../mock/motorYatchs";
import MiniGallery from "./Projects/MiniGallery";
import { allCountries } from "../mock/allCountries";
import TextEditor from "./TextEditor";

interface CustomFile extends File {
  preview: string;
}

export default function Projects() {

  const { user } = useAuth();
  const { id: boatId } = useParams<{ id: string }>();

  const boat_id = boatId;
  const bg = useColorModeValue("white", "navy.700");
  const cardShadow = useColorModeValue("0px 18px 40px rgba(112, 144, 176, 0.12)", "unset");
  const navigate = useNavigate();
  const textColorPrimary = useColorModeValue("secondaryGray.900", "white");
  const textColorSecondary = "gray.400";
  const isWideVersion = useBreakpointValue({ base: false, lg: true });

  const [isLoading, setIsLoading] = useState(false);
  const [imageMainBoat, setImageMainBoat] = useState([]);

  const [allEngines, setAllEngines] = useState([]);
  const [allImagesBoat, setAllImagesBoat] = useState<BoatDataGlobal[] | undefined>([]);
  const [engines, setEngines] = useState([]);

  const [isModalOpenDeleteButton, setIsModalOpenDeleteButton] = useState(false);
  const [imagesBoat, setImagesBoat] = useState<CustomFile[]>([]);
  const [newImagesBoat, setNewImagesBoat] = useState<CustomFile[]>([]);

  const [formData, setFormData] = useState<any>({
    nameBoat: '', yearBoat: '', maker: '', model: '',
    hullMaterial: '', boatCondition: '', hullType: '', length: '',
    boatType: '', boatCategory: '', boatDescription: '',
    engines,
    otherInfo: {},
    imageMainBoat: '', price: '', priceOrRequest:'', typeCoin: '', city: '', country: '', linkVideo: '',
    email: '', phone: '', fullName: '', address: '',
  });

  const handleContentChange = (newContent: any) => {
    setFormData((prevDetails: any) => ({
      ...prevDetails,
      boatDescription: newContent
    }));
  };

  const handleVisibilityChange = (isChecked: boolean) => {
    const newValue = isChecked ? '1' : '0';
    setFormData((prevDetails: any) => ({
      ...prevDetails,
      priceOrRequest: newValue
    }));
    // setPriceVisibility(newValue);
    // setFormFeaturesBoat(prev => ({ ...prev, priceOrRequest: newValue }));
  };

  const [otherInfo, setOtherInfo] = useState<OtherInfo[]>(
    [
      {
        hinNumber: '',
        bridgeClearance: '',
        designer: '',
        fuelCapacity: '',
        holding: '',
        freshWater: '',
        cruisingSpeed: '',
        loa: '',
        maxSpeed: '',
        beam: '',
        accommodations: '',
        mechanicalEquipment: '',
        navigationSystem: '',
        galleryEquipment: '',
        deckAndHull: '',
        additionalEquipment: '',
      },
    ]
  );

  const buttonsData = [
    { id: 1, label: "Power" },
    { id: 2, label: "Super yatch" },
    { id: 3, label: "Sail", },
    { id: 4, label: "PWC", },
    { id: 5, label: "Water toys", },
    { id: 6, label: "Commercial", },
  ];

  const [boatTypeId, setBoatTypeId] = useState(0);

  const findBoatTypeIdByLabel = (label: string) => {
    const button = buttonsData.find(button => button.label === label);
    return button ? button.id : 0;
  }

  const openModalDeleteButton = () => {
    setIsModalOpenDeleteButton(true);
  };

  const closeModalDeleteButton = () => {
    setIsModalOpenDeleteButton(false);
  };

  function handleGoToDashboard() {
    navigate('/dashboard')
  }

  async function handleDeleteBoatByID() {
    try {
      setIsLoading(true);
      const response = await api.post('/delete_boat_id.php', { id: boatId });
      toastApiResponse(response, response.data.message);

      await new Promise((resolve) => setTimeout(resolve, 1000));
      setIsLoading(false);
      navigate(`/dashboard`);

    } catch (error) {
      console.error('Error:', error);
      toastApiResponse(error, 'Have ocorred an error to conect to servidor, please try again later');
    }
  };

  async function fetchBoatDetails() {
    try {
      const response = await api.get(`/list_boat_by_id.php?id=${boatId}`);
      const boatDetails = response.data[0];

      let dataBoat = {
        nameBoat: boatDetails.nameBoat,
        yearBoat: boatDetails.yearBoat,
        maker: boatDetails.maker,
        model: boatDetails.model,

        boatDescription: boatDetails.boatDescription,
        hullMaterial: boatDetails.hullMaterial,
        boatCondition: boatDetails.boatCondition,
        hullType: boatDetails.hullType,
        length: boatDetails.length,
        boatType: boatDetails.boatType,
        boatCategory: boatDetails.boatCategory,

        engines: boatDetails.engines?.[0] || '',

        otherInfo: [{
          hinNumber: boatDetails.hinNumber,
          bridgeClearance: boatDetails.bridgeClearance,
          designer: boatDetails.designer,
          fuelCapacity: boatDetails.fuelCapacity,
          holding: boatDetails.holding,
          freshWater: boatDetails.freshWater,
          cruisingSpeed: boatDetails.cruisingSpeed,
          loa: boatDetails.loa,
          maxSpeed: boatDetails.maxSpeed,
          beam: boatDetails.beam,
          accommodations: boatDetails.accommodations,
          navigationSystem: boatDetails.navigationSystem,
          galleryEquipment: boatDetails.galleryEquipment,
          deckAndHull: boatDetails.deckAndHull,
          mechanicalEquipment: boatDetails.mechanicalEquipment,
          additionalEquipment: boatDetails.additionalEquipment,
        }],

        imageMainBoat: boatDetails.imageMainBoat?.[0]?.preview || '',
        price: boatDetails.price,
        priceOrRequest: boatDetails.priceOrRequest,
        typeCoin: boatDetails.typeCoin,
        city: boatDetails.city,
        country: boatDetails.country,
        linkVideo: boatDetails.linkVideo,

        email: boatDetails.email,
        phone: boatDetails.phone,
        fullName: boatDetails.fullName,
        address: boatDetails.address,
      }

      setFormData(dataBoat);
      setAllImagesBoat(response.data[0].images);
      setAllEngines(response.data[0].engines);

    } catch (error) {
      console.error('Error:', error);
      toastApiResponse(error, 'Have ocorred an error to conect to servidor, please try again later');
    }
  }

  //Dropzone
  const handleMainBoat = (updatedFiles: any) => {
    setImageMainBoat(updatedFiles)
  };

  // const maxFilesAllowed = planSelected ? plans.find((plan) => plan.id === planSelected)?.maxFiles || 5 : 5;
  const maxFilesAllowed = 10;
  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/png": [".png", ".jpg"],
      "text/html": [".html", ".htm"],
    },
    onDrop: (acceptedFiles, fileRejections) => {
      const totalFiles = imagesBoat.length + acceptedFiles.length;

      if (totalFiles > maxFilesAllowed) {
        // openModal();
      } else if (fileRejections.length > 0) {
        toast.error(`Error uploading files. Please make sure the file format is correct with png or jpg.`);
      } else {
        const updatedFiles: CustomFile[] = acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        );
        setNewImagesBoat([...newImagesBoat, ...updatedFiles]);
        setImagesBoat([...imagesBoat, ...updatedFiles]);
      }
    },
  });

  const handleDeleteBoatNewArray = (imageToRemove: CustomFile) => {
    const updatedImages = newImagesBoat.filter((image) => image !== imageToRemove);
    toastApiResponse(null, 'Boat deleted successfully');
    setNewImagesBoat(updatedImages);
  };

  const handleValuesChange = (values: any) => {
    setEngines(values);
  };

  const handleSelectCategory = (category: string, buttonLabel: string) => {
    setFormData((prevFormBoatDetails: any) => ({
      ...prevFormBoatDetails,
      boatType: buttonLabel,
      boatCategory: category,
    }));
  };

  const [allDataBoat, setAllDataBoat] = useState({
    engines,
  });

  function UpdatedInfo(newFormData: any, otherInfoEdit: any, allDataBoat: any) {
    if (newFormData && newFormData.otherInfo) {

      if (allDataBoat) {
        newFormData.engines = allDataBoat;
      }

      newFormData.otherInfo[0].hinNumber = otherInfoEdit.hinNumber;
      newFormData.otherInfo[0].designer = otherInfoEdit.designer;
      newFormData.otherInfo[0].fuelCapacity = otherInfoEdit.fuelCapacity;
      newFormData.otherInfo[0].holding = otherInfoEdit.holding;
      newFormData.otherInfo[0].freshWater = otherInfoEdit.freshWater;
      newFormData.otherInfo[0].cruisingSpeed = otherInfoEdit.cruisingSpeed;
      newFormData.otherInfo[0].loa = otherInfoEdit.loa;
      newFormData.otherInfo[0].maxSpeed = otherInfoEdit.maxSpeed;
      newFormData.otherInfo[0].beam = otherInfoEdit.beam;
      newFormData.otherInfo[0].accommodations = otherInfoEdit.accommodations;
      newFormData.otherInfo[0].galleryEquipment = otherInfoEdit.galleryEquipment;
      newFormData.otherInfo[0].deckAndHull = otherInfoEdit.deckAndHull;
      newFormData.otherInfo[0].mechanicalEquipment = otherInfoEdit.mechanicalEquipment;
      newFormData.otherInfo[0].additionalEquipment = otherInfoEdit.additionalEquipment;
      newFormData.otherInfo[0].bridgeClearance = otherInfoEdit.bridgeClearance;
      newFormData.otherInfo[0].navigationSystem = otherInfoEdit.navigationSystem;

      return newFormData;

    } else {
      return newFormData;
    }
  };

  async function handleSaveChanges(boat_id: string) {
    try {
      setIsLoading(true);

      // console.log('formData 16:10', formData)
      // return;

      const newFormData = formData;
      const allUpdateBoatInfo = UpdatedInfo(newFormData, otherInfo[0], allDataBoat.engines);

      const response = await api.post(`/update_boats.php?boat_id=${boat_id}`, allUpdateBoatInfo);

      const formImage = new FormData();
      formImage.append("id_boat", boat_id);

      newImagesBoat.forEach((file, index) => {
        const imageFile = new File([file as Blob], `image_${index}.jpg`, { type: file.type });
        formImage.append("files[]", imageFile);
      });

      if (imageMainBoat.length > 0) {
        const imageFile = new File([imageMainBoat[0]], 'image_main_boat.jpg', { type: (imageMainBoat[0] as any).type });
        formImage.append('imageMainBoat', imageFile);
      }

      const responseImages = await api.post('/update_boat_images.php', formImage, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (responseImages?.data) {
        toastApiResponse(response, response.data.message);
      }

      await new Promise((resolve) => setTimeout(resolve, 2000));
      setIsLoading(false);
      navigate(`/dashboard`);

    } catch (error) {
      console.error('Error:', error);
      toastApiResponse(error, 'Have ocorred an error to conect to servidor, please try again later');
      await new Promise((resolve) => setTimeout(resolve, 3000));
      navigate(`/dashboard`);
    }
  }

  useEffect(() => {
    setBoatTypeId(findBoatTypeIdByLabel(formData.boatType));
  }, [formData.boatType]);

  useEffect(() => {
    setAllDataBoat({
      engines,
    });
  }, [engines]);

  useEffect(() => {
    fetchBoatDetails();
  }, [boatId]);

  return (
    <>
      {user?.id ? (
        <Card mb={{ base: "0px", "2xl": "10px" }} width="100%" mx="auto" maxWidth={1480}>
          <HStack justifyContent={'space-between'} alignItems={'center'} px={3}>
            <Box justifyContent={'flex-start'} alignItems={'center'}>
              <Text
                color={textColorPrimary}
                fontWeight='bold'
                fontSize='2xl'
                mt='5px'
                mb='5px'
              >
                Edit my boats
              </Text>

              <Text color={textColorSecondary} fontSize='md' me='26px' mb='15px'>
                If you are not satisfected with your boat, here you can edit and change it so many times you want.
              </Text>
            </Box>

            <Button bg='gray.50' w='auto' h={'80px'} onClick={handleGoToDashboard}>
              <VStack p={1}>
                <Icon as={FaRegArrowAltCircleLeft} color={'blue.300'} h='28px' w='28px' />
                <Text color={'blue.300'} fontSize={['2xs', 'xs', 'sm', 'md']}>
                  {isWideVersion ? 'Back to dashboard' : 'Back'}
                </Text>
              </VStack>
            </Button>
          </HStack>

          <Divider />

          <Card bg={bg} boxShadow={cardShadow} mb='20px' px={3} py={3}>
            <Text
              color={textColorPrimary}
              fontWeight='bold'
              fontSize='lg'
              mt='5px'
              mb='10px'
            >
              Basic Information
            </Text>

            <SimpleGrid columns={{ base: 1, md: 2, lg: 2, xl: 2 }} spacing={5}>
              <FormControl>
                <FormLabel>Name</FormLabel>
                <Input
                  type='text'
                  name='nameBoat'
                  variant='filled'
                  placeholder='Filled'
                  value={formData.nameBoat}
                  onChange={(e) => setFormData({ ...formData, nameBoat: e.target.value })}
                />
              </FormControl>

              <FormControl>
                <FormLabel>Year</FormLabel>
                <Select
                  name='yearBoat'
                  variant='filled'
                  placeholder='Filled'
                  value={formData.yearBoat}
                  onChange={(e) => setFormData({ ...formData, yearBoat: e.target.value })}
                >
                  {Array.from({ length: new Date().getFullYear() - 1900 + 1 }, (_, index) => (
                    <option key={index} value={1900 + index}>
                      {1900 + index}
                    </option>
                  ))}
                </Select>
              </FormControl>

              <FormControl>
                <FormLabel>Maker</FormLabel>
                <Input
                  type='text'
                  name='maker'
                  variant='filled'
                  placeholder='Filled'
                  value={formData.maker}
                  onChange={(e) => setFormData({ ...formData, maker: e.target.value })}
                />
              </FormControl>

              <FormControl>
                <FormLabel>Model</FormLabel>
                <Input
                  type='text'
                  name='model'
                  variant='filled'
                  placeholder='Filled'
                  value={formData.model}
                  onChange={(e) => setFormData({ ...formData, model: e.target.value })}
                />
              </FormControl>
            </SimpleGrid>
          </Card>

          <Card bg={bg} boxShadow={cardShadow} mb='20px' px={3} py={3}>
            <Text
              color={textColorPrimary}
              fontWeight='bold'
              fontSize='lg'
            >
              Details about the boat
            </Text>

            <SimpleGrid columns={{ base: 1, md: 1, lg: 1, xl: 1 }} spacing={5}>
              <VStack mt={3}>
                <FormControl>
                  <FormLabel>Condition</FormLabel>
                  <Select
                    variant='filled'
                    id="category"
                    value={formData.boatCondition}
                    onChange={(e) => setFormData({ ...formData, boatCondition: e.target.value })}
                  >
                    <option value={formData.boatCondition}>{formData.boatCondition}</option>
                    <option value='All New'>All New</option>
                    <option value='New Available'>New - Available for Order</option>
                    <option value='Used'>Used</option>
                    <option value='Insurance Salvage'>Insurance Salvage</option>
                  </Select>
                </FormControl>

                <FormControl>
                  <FormLabel>Hull material</FormLabel>
                  <Select
                    variant='filled'
                    id='hullMaterial'
                    value={formData.hullMaterial}
                    onChange={(e) => setFormData({ ...formData, hullMaterial: e.target.value })}
                  >
                    <option value={formData.hullMaterial}>{formData.hullMaterial}</option>
                    <option value='Composite'>Composite</option>
                    <option value='Aluminium'>Aluminium</option>
                    <option value='Fribeglass'>Fribeglass</option>
                    <option value='Carbon Fibre'>Carbon Fribe</option>
                    <option value='PVC'>PVC</option>
                    <option value='Hypalon'>Hipalon</option>
                    <option value='Wood'>Wood</option>
                    <option value='Steel'>Steel</option>
                    <option value='Other'>Other</option>
                  </Select>
                </FormControl>

                <FormControl mt={3}>
                  <BoatSelector
                    onSelectCategory={handleSelectCategory}
                    boatTypeId={boatTypeId}
                    boatTypeName={formData.boatType}
                    boatCategoryName={formData.boatCategory}
                  />
                </FormControl>

              </VStack>

              <VStack mt={3}>
                <FormControl>
                  <FormLabel>Hull Type</FormLabel>
                  <Select
                    id='hullType'
                    variant='filled'
                    value={formData.hullType}
                    onChange={(e) => setFormData({ ...formData, hullType: e.target.value })}
                  >
                    <option id='0' value={formData.hullType}>{formData.hullType}</option>
                    <option value='VShape'>V Shape</option>
                    <option value='Deep V'>Deep V</option>
                    <option value='Plaining'>Plaining</option>
                    <option value='Semi Plaining'>Semi Plaining</option>
                    <option value='Displacement'>Displacement</option>
                    <option value='SemiDisplacement'>Semi Displacement</option>
                    <option value='Multi Hull'>Multi Hull</option>
                    <option value='Round Bottom'>Round Bottom</option>
                    <option value='Flat Bottom'>Flat Bottom</option>
                    <option value='Bulbous Bow'>Bulbous Bow</option>
                    <option value='Inverted Bow'>Inverted Bow</option>
                  </Select>
                </FormControl>

                <FormControl>
                  <FormLabel>Length (Feet)</FormLabel>
                  <Input
                    type='number'
                    variant='filled'
                    name='length'
                    value={formData.length}
                    onChange={(e) => setFormData({ ...formData, length: e.target.value })}
                  />
                </FormControl>
              </VStack>

              <VStack mt={3}>
                <Box w="100%" maxWidth={'100%'} h={'100%'} marginX="auto" mt={2}>
                  <div>
                    <FormLabel>Boat description</FormLabel>
                    <TextEditor
                      content={formData.boatDescription}
                      setContent={handleContentChange}
                      placeholder="Type something amazing about your boat..."
                    />
                  </div>
                </Box>
              </VStack>
            </SimpleGrid>

            <SimpleGrid columns={{ base: 1, md: 1, lg: 1, xl: 1 }} spacing={0}>
              <AccordionEngine
                onValuesChange={handleValuesChange}
                dataEnginesToEdit={allEngines}
              />
            </SimpleGrid>

            {
              (formData.otherInfo && Object.keys(formData.otherInfo).length > 0) ?
                <SimpleGrid columns={{ base: 1, md: 1, lg: 1, xl: 1 }} spacing={0}>
                  <AccordionOtherInfo
                    dataOtherInfoToEdit={formData.otherInfo}
                    otherInfo={otherInfo}
                    setOtherInfo={setOtherInfo}
                  />
                </SimpleGrid>
              : null
            }

          </Card>

          <Card bg={bg} boxShadow={cardShadow} mb='20px' px={3} py={3}>
            <Text
              color={textColorPrimary}
              fontWeight='bold'
              fontSize='lg'
              mb='5px'
            >
              Location and price
            </Text>

            <VStack 
              alignItems="flex-start" 
              justifyContent={'flex-start'} 
              w={isWideVersion ? '50%':'100%'} 
              bg={'lightcyan'} 
              padding={4} 
              borderRadius={10}
              mt={4}
            >
              <FormControl display="flex" alignItems="center" mt={2}>
                <FormLabel htmlFor="video-switch" mb="0" fontWeight={'bold'}>
                  Fill in all the information marked in Red
                </FormLabel>
              </FormControl>

              <Box display="flex" alignItems="flex-start" justifyContent={'flex-start'}>
                <CheckboxGroup colorScheme="blue">
                  <Stack spacing={2} display="flex" alignItems="flex-start" justifyContent={'flex-start'}>
                    <Checkbox
                      isChecked={formData.priceOrRequest === '1'}
                      onChange={(e) => handleVisibilityChange(e.target.checked)}
                    >
                      Price on Request
                    </Checkbox>
                    <Text mt={0} fontSize="sm">By checking this box, your price will be hidden on the description page</Text>
                    <Text mt={0} fontSize="sm">An estimated price of your boat still mandatory for ranking your ad on search results</Text>
                  </Stack>
                </CheckboxGroup>
              </Box>
            </VStack>

            <SimpleGrid columns={{ base: 1, md: 1, lg: 2, xl: 2 }} spacing={5} mt={5}>
              <VStack>
                <HStack w='100%' spacing={3}>
                  <FormControl>
                    <FormLabel>Price</FormLabel>
                    <Input
                      type='text'
                      name='price'
                      variant='filled'
                      placeholder='Filled'
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    />
                  </FormControl>

                  <FormControl>
                    <FormLabel>Currency</FormLabel>
                    <Select
                      id='typecoin'
                      variant='filled'
                      value={formData.typeCoin}
                      onChange={(e) => setFormData({ ...formData, typeCoin: e.target.value })}
                    >
                      <option id='0' value=''></option>
                      <option id='2' value='DOLARS'>$ Dollar</option>
                      <option id='3' value='EUROS'>€ Euro</option>
                      <option id='4' value='POUNDS'> £ British Pounds</option>
                    </Select>
                  </FormControl>
                </HStack>

                <FormControl>
                  <FormLabel>City</FormLabel>
                  <Input
                    type='text'
                    name='city'
                    variant='filled'
                    placeholder='Filled'
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  />
                </FormControl>
              </VStack>

              <VStack>
                <FormControl>
                  <FormLabel>Country</FormLabel>
                  <Select
                    id='country'
                    variant='filled'
                    value={formData.country}
                    onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                  >
                    {allCountries.map((country) => (
                      <option key={country.id} value={country.name}>{country.name}</option>
                    ))}
                  </Select>
                </FormControl>

                <FormControl>
                  <FormLabel>Link video</FormLabel>
                  <Input
                    type='text'
                    name='linkVideo'
                    variant='filled'
                    placeholder='Filled'
                    value={formData.linkVideo}
                    onChange={(e) => setFormData({ ...formData, linkVideo: e.target.value })}
                  />
                </FormControl>
              </VStack>
            </SimpleGrid>
          </Card>

          <Card bg={bg} boxShadow={cardShadow} mb='20px' px={3} py={3}>
            <Text
              color={textColorPrimary}
              fontWeight='bold'
              fontSize='lg'
              mb='5px'
            >
              My personal data
            </Text>

            <SimpleGrid columns={{ base: 1, md: 1, lg: 2, xl: 2 }} spacing={5}>
              <VStack>
                <FormControl>
                  <FormLabel>Email</FormLabel>
                  <Input
                    type='text'
                    name='email'
                    variant='filled'
                    placeholder='Filled'
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </FormControl>

                <FormControl>
                  <FormLabel>Phone number</FormLabel>
                  <Input
                    type='text'
                    name='phone'
                    variant='filled'
                    placeholder='Filled'
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </FormControl>
              </VStack>

              <VStack>
                <FormControl>
                  <FormLabel>Full name</FormLabel>
                  <Input
                    type='text'
                    name='fullName'
                    variant='filled'
                    placeholder='Filled'
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Address</FormLabel>
                  <Input
                    type='text'
                    name='address'
                    variant='filled'
                    placeholder='Filled'
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  />
                </FormControl>
              </VStack>
            </SimpleGrid>
          </Card>

          <Card bg={bg} boxShadow={cardShadow} mb='20px' px={3} py={3}>
            <Text
              color={textColorPrimary}
              fontWeight='bold'
              fontSize='lg'
              mb='5px'
            >
              Images and details about the boat
            </Text>

            <Center>
              <SimpleGrid columns={{ base: 1, md: 1, lg: 1, xl: 1 }} spacing={5} w={isWideVersion ? '40%' : '95%'} justifyContent={'center'} alignItems={'center'}>
                <Heading size='md' mt={5} textAlign={'center'}>Main image boat</Heading>
                <Text mt={5} color={'red'} fontSize='sm' textAlign={'center'}>
                  Warning: We recommend upload images with high resolution for a best performance! Minimum 640 x 480.
                </Text>
                <FormControl>
                  <VStack spacing={4} mt={5}>
                    <DropzoneMainImage imagesBoat={allImagesBoat} onFilesChange={handleMainBoat} />
                  </VStack>
                  <Divider my={5} />
                </FormControl>
              </SimpleGrid>
            </Center>
          </Card>

          <Card bg={bg} boxShadow={cardShadow} mb='20px' px={3} py={3}>
            <Heading size='md' mt={8} textAlign={'center'}>
              Currently images boat which you are showing up for the costumers
            </Heading>

            <VStack spacing={4} mt={8}>
              <Box w="100%">
                <MiniGallery
                  allImagesBoat={allImagesBoat}
                  boatId={boat_id}
                  setAllImagesBoat={setAllImagesBoat}
                />
              </Box>
            </VStack>
            <Divider my={5} />
          </Card>

          {(newImagesBoat) &&
            <Card bg={bg} boxShadow={cardShadow} mb='20px' px={3} py={3}>
              <Center>
                <SimpleGrid columns={{ base: 1, md: 1, lg: 1, xl: 1 }} spacing={5} w={isWideVersion ? '40%' : '95%'} justifyContent={'center'} alignItems={'center'}>
                  <Heading size='md' mt={5} textAlign='center'>
                    Click on the button below to add new images of your boat
                  </Heading>

                  <Text mt={5} color='red' fontSize='sm' textAlign='center'>
                    Warning: We recommend uploading images with high resolution for the best performance! Minimum 640 x 480.
                  </Text>

                  <FormControl>
                    <VStack spacing={4} mt={5}>
                      <>
                        <Center w='100%'>
                          <Box
                            {...getRootProps({ className: "dropzone" })}
                            p={4}
                            borderWidth={2}
                            borderColor="blue.300"
                            borderStyle="dashed"
                            borderRadius="md"
                            textAlign="center"
                            w='100%'
                            cursor={'pointer'}
                          >
                            <input {...getInputProps()} />
                            <Icon as={LuImagePlus} fontSize="5xl" color={'gray.300'} />
                            <Text> Select the new images about your boat</Text>
                          </Box>
                        </Center>

                        <Box w="100%" mt={3}>
                          {(newImagesBoat) &&
                            newImagesBoat.map((image, index) => (
                              <Box
                                key={`new-${index}`}
                                borderWidth="1px"
                                borderRadius="lg"
                                p={1} m={2}
                                position="relative"
                              >
                                <IconButton
                                  aria-label="Excluir"
                                  bg="red"
                                  size="sm"
                                  onClick={() => handleDeleteBoatNewArray(image)}
                                  position="absolute"
                                  top={2}
                                  right={2}
                                  zIndex={1}
                                >
                                  <Box color="white">
                                    <FaTrashCan />
                                  </Box>
                                </IconButton>

                                <Box position="relative">
                                  <img src={image.preview} width="100%" height="100%" />
                                </Box>
                              </Box>
                            ))
                          }
                        </Box>
                      </>
                    </VStack>
                    <Divider my={5} />
                  </FormControl>
                </SimpleGrid>
              </Center>
            </Card>
          }

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
                    UPDATE BOAT INFORMATION
                  </Text>

                  <Text
                    color={textColorPrimary}
                    fontWeight='thin'
                    fontSize='sm'
                    textAlign={'left'}
                  >
                    You have updated the information about your boats, come back whenever you can
                  </Text>
                </Stack>

                <Button bg='yellow.200' onClick={() => handleSaveChanges(boat_id ?? '')} isLoading={isLoading} fontSize={['xs', 'sm', 'md']}>
                  {isWideVersion ? 'Save changes' : 'Save'}
                </Button>
              </HStack>
            </SimpleGrid>
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
                    DELETE BOAT
                  </Text>

                  <Text
                    color={textColorPrimary}
                    fontWeight='thin'
                    fontSize='sm'
                    textAlign={'left'}
                  >
                    Once you delete your boat, there is no going back. Please be certain.
                  </Text>
                </Stack>

                <Button bg='red.400' color={'white'} onClick={openModalDeleteButton} fontSize={['xs', 'sm', 'md']}>
                  {isWideVersion ? 'Delete boat' : 'Delete'}
                </Button>

                {isModalOpenDeleteButton && (
                  <ModalDelete
                    isOpen={isModalOpenDeleteButton}
                    onClose={closeModalDeleteButton}
                    onClick={handleDeleteBoatByID}
                    isLoading={isLoading}
                    title={'Once you delete your boat, there is no going back. Please be certain.'}
                  />
                )}
              </HStack>
            </SimpleGrid>
          </Card>
          <ToastContainer />
        </Card>
      ) : (
        null
      )}
    </>
  );
}
