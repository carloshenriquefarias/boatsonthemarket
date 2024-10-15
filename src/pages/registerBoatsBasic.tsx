import {
  Box, Center, Flex, Heading, VStack, Text, Divider, Button, Input, FormControl, FormLabel,
  Stack, HStack, Icon, Card, CardBody, Checkbox, SimpleGrid, Select, useBreakpointValue,
  Step, StepDescription, StepIcon, StepIndicator, StepNumber, StepSeparator,
  StepStatus, StepTitle, Stepper, useSteps, IconButton, Switch, CheckboxGroup, Progress
} from '@chakra-ui/react';

import { BsCreditCard } from "react-icons/bs";
import { BsCreditCardFill } from "react-icons/bs";
import { FaRegArrowAltCircleRight, FaRegArrowAltCircleLeft } from "react-icons/fa";
import { FaTrashCan } from "react-icons/fa6";
import { FcOk } from "react-icons/fc";
import { LuImagePlus } from "react-icons/lu";
import { FaAsterisk } from "react-icons/fa";

import { useAuth } from "../hooks/useAuth";
import { useDropzone } from "react-dropzone";
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/ReactToastify.min.css";

import AccordionEngine from '../components/AccordionEngine';
import AccordionOtherInfo, { OtherInfo } from '../components/AccordionOtherInfo';
import AllRights from '../components/AllRights'
import ButtonType from '../components/ButtonType';
import BoatForm from '../components/FormBasicInformation';
import BoatSelector from '../components/BoatCategorySelector';
import Header from '../components/Header';
import ModalMaxFiles from '../components/ModalMaxFiles';
// import MultiSelectComponent from '../components/MultSelect';

import { api } from '../services/api';
import { plans } from '../mock/planList';
import { toastApiResponse } from '../components/Toast';
import { allCountries } from '../mock/allCountries';
import TextEditor from '../components/TextEditor';
import { IoIosBoat } from 'react-icons/io';

interface CustomFile extends File {
  preview: string;
}

const steps = [
  { id: '1', title: 'Step 1', description: 'Plans' },
  { id: '2', title: 'Step 2', description: 'Information' },
  { id: '3', title: 'Step 3', description: 'Details' },
  { id: '4', title: 'Step 4', description: 'Images' },
  { id: '5', title: 'Step 5', description: 'My Data' },
  { id: '6', title: 'Step 6', description: 'Payment' },
]

export default function RegisterBoatsBasic() {

  // Global consts
  const { activeStep, setActiveStep } = useSteps({ index: 0, count: steps.length });
  const { user } = useAuth();

  const user_id = user?.id;
  const isWideVersion = useBreakpointValue({ base: false, lg: true });
  const isLastStep = activeStep === steps.length - 1;
  const navigate = useNavigate();
  const textColorSecondary = "gray.400";

  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingButtonBack, setIsLoadingButtonBack] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const buttonsPayment = [
    { id: "1", label: "Debit card", image: <BsCreditCard /> },
    { id: "2", label: "Credit card", image: <BsCreditCardFill /> },
  ];

  //Data from PlanSelected - Step 0
  const [planSelected, setPlanSelected] = useState<string | null>(null);

  //Data from FormBoatBasicInfo - Step 1
  const [formBoatBasicInfo, setFormBoatBasicInfo] = useState({
    nameBoat: "", yearBoat: "", maker: "", model: "",
  });

  //Data from formBoatDetails - Step 2
  const [engines, setEngines] = useState([]);
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

  const [content, setContent] = useState('');
  const [formBoatDetails, setFormBoatDetails] = useState({
    boatType: "", boatCondition: "",
    hullMaterial: "", hullType: "", length: '', boatDescription: content,
  });

  //Data from formBoatDetails - Step 3
  const [imagesBoat, setImagesBoat] = useState<CustomFile[]>([]);
  const [typeCoin, setTypeCoin] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [priceVisibility, setPriceVisibility] = useState('0');
  const [formFeaturesBoat, setFormFeaturesBoat] = useState({
    linkVideo: '', typeCoin, city, country, price: '',
  });
  const [isVideoEnabled, setIsVideoEnabled] = useState(false);
  const [file, setFile] = useState<CustomFile | null>(null);

  //Data from PersonalData - Step 4
  const [formPersonalData, setFormPersonalData] = useState({
    email: '', phone: '', fullName: '', address: '',
  });

  //Data from PaymentData - Step 5
  const [paymentType, setPaymentType] = useState(null);
  const [formPaymentData, setFormPaymentData] = useState({
    cardNumber: '', expireDateCard: '', cvv: '', zipCode: '', paymentType: '',
  });

  const [uploadProgress, setUploadProgress] = useState({
    total: imagesBoat.length,
    uploaded: 0
  });

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  // const optionsMultSelect = [
  //   { value: 'SuperBoat', label: 'Super Boat' },
  //   { value: 'Yatchs', label: 'Yatchs' },
  //   { value: 'WaterToys', label: 'Water Toys' },
  //   { value: 'PWC', label: 'PWC' },
  //   { value: 'MotorBoat', label: 'MotorBoat' },
  // ]

  //Data from PlanSelected - Step 0

  const handlePlanSelected = (planId: string) => {
    const selectedPlan = plans.find((plan) => plan.id === planId);

    if (selectedPlan) {
      const planName = selectedPlan.id;
      setPlanSelected(planId);

      console.log('Plano Selecionado:', planName);
    }
  };

  function PlanButton({ plan, planSelected, handlePlanSelected }: {
    plan: {
      id: string;
      name: string;
      description: string;
      item: string[];
      price: string;
      isOnSale?: boolean;
      is_active?: boolean;
      maxFiles: number;
      video: number;
      saleEndDate: string;
    };
    planSelected: string | null;
    handlePlanSelected: (planId: string) => void;
  }) {
    const isSelected = planSelected === plan.id;

    return (
      <Card
        id={plan.id}
        maxW='lg'
        height={'auto'}
        borderWidth={isSelected ? "3px" : "1px"}
        borderColor={isSelected ? "blue.300" : "gray.400"}
        bg={isSelected ? "lightblue" : "white"}
        w="100%"
        colorScheme="teal"
        variant="outline"
        cursor={'pointer'}
        onClick={() => handlePlanSelected(plan.id)}
        transition="all 0.25s"
        transitionTimingFunction="spring(1 100 10 10)"
        _hover={{ transform: "translateY(-4px)", shadow: "xl", borderColor: "blue.300", bg: 'lightblue', borderWidth: "3px" }}
      >
        <CardBody>
          <Box
            bg={plan.isOnSale ? 'yellow.200' : 'blue.300'}
            w='100%'
            mb={3}
            h='7vh'
            display='flex'
            alignItems='center'
            justifyContent='center'
            borderRadius={5}
          >
            {plan.isOnSale ? (
              <Stack w='100%' gap={1} pb={3}>
                <Heading fontSize={["md", "lg"]} textAlign='center' color='blue.500' pt={3}>
                  ON SALE NOW {plan.name}
                </Heading>

                <Text fontSize={["xs", "sm"]} textAlign='center' color='blue.500'>
                  {'This offer ends at '} {plan.saleEndDate} {'! Get now!'}
                </Text>
              </Stack>
            ) : (
              <Heading fontSize={["md", "lg"]} textAlign='center' color='white'>
                {plan.name}
              </Heading>
            )}
          </Box>

          <Stack mt='6'>
            <Stack w='100%'>
              <Text fontSize={["xs", "sm"]}>{plan.description}</Text>
            </Stack>
            <Box w='100%' mb={3} h='5vh' display='flex' alignItems='center' justifyContent='center'>
              <Heading fontSize={["xl", "2xl"]} textAlign='center' color={'blue.500'}>{plan.price}</Heading>
            </Box>

            <Divider />

            <VStack p={6} spacing={4} alignItems="flex-start">
              <Text fontSize="sm" fontWeight="semibold">WHAT'S INCLUDED</Text>
              {plan.item.map((item, index) => (
                <HStack key={index} spacing={3}>
                  <Icon as={FcOk} h={4} w={4} color="green.500" />
                  <Text fontSize="sm" color="gray.500">
                    {item}
                  </Text>
                </HStack>
              ))}
            </VStack>
          </Stack>
        </CardBody>
      </Card>
    );
  }

  function PlanDetails({ plan }: { plan: { id: string; name: string; description: string; item: string[]; price: string } | null }) {
    if (!plan) {
      return (
        <Box>Select one plan to see the details.</Box>
      );
    }

    return (
      <Card id={'1'} cursor="pointer" bg='gray.50' mt={5} w='100%'>
        <CardBody>
          <Heading size='md' textAlign='center' color={'blue.500'} mb={4}>YOUR SELECTED PLAN:</Heading>
          <Box bg='blue.300' w='100%' mb={3} h='5vh' display='flex' alignItems='center' justifyContent='center'>
            <Heading size='md' textAlign='center' color={'white'}>{plan.name}</Heading>
          </Box>

          <Stack mt='6'>
            <Text textAlign={'center'}>{plan.description}</Text>
            <Box w='100%' mb={3} h='5vh' display='flex' alignItems='center' justifyContent='center'>
              <Heading size='xl' textAlign='center' color={'blue.500'}>{plan.price}</Heading>
            </Box>
          </Stack>
        </CardBody>
      </Card>
    );
  }

  //Data from FormBoatBasicInfo - Step 1

  const handleInputChanges = (e: any) => {
    const { name, value } = e.target;
    if (name === 'yearBoat' && value.length > 4) {
      return;
    }
    setFormBoatBasicInfo((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  //Data from formBoatDetails - Step 2

  const handleSelectCategory = (category: string, buttonLabel: string) => {
    setFormBoatDetails((prevFormBoatDetails) => ({
      ...prevFormBoatDetails,
      boatType: buttonLabel,
      boatCategory: category,
    }));
  };

  const handleSelectCondition = (event: any) => {
    setFormBoatDetails({ ...formBoatDetails, boatCondition: event.target.value });
  };

  const handleHullMaterial = (event: any) => {
    setFormBoatDetails({ ...formBoatDetails, hullMaterial: event.target.value });
  };

  const handleHullType = (event: any) => {
    setFormBoatDetails({ ...formBoatDetails, hullType: event.target.value });
  };

  const handleInputChangeLength = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormBoatDetails((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleContentChange = (newContent: any) => {
    setContent(newContent);
    setFormBoatDetails(prevDetails => ({
      ...prevDetails,
      boatDescription: newContent
    }));
  };

  const handleValuesChange = (values: any) => {
    setEngines(values);
  };

  //Data from formBoatDetails - Step 3

  const { getRootProps: getRootProps1, getInputProps: getInputProps1 } = useDropzone({
    maxFiles: 1,
    accept: {
      'image/jpeg': ['.jpeg', '.jpg'],
      'image/png': ['.png']
    },
    onDrop: (acceptedFiles) => {
      const imageFile = acceptedFiles[0];

      if (!imageFile) return;

      // Check for image dimensions
      const image = new Image();
      image.src = URL.createObjectURL(imageFile);
      image.onload = () => {
        if (image.width > 1920 || image.height > 1080) {
          toast.error('This photo is bigger than 1920 x 1080 pixels, so please select a small image!');
          return;
        }

        if (imageFile.size > 5242880) { // 5MB in bytes,
          toast.error('This photo is bigger than 5MB, so please select a small image!');
          return;
        }

        const updatedFile = Object.assign(imageFile, {
          preview: URL.createObjectURL(imageFile),
        });

        setFile(updatedFile);
      };
    },
  });

  const removeImageBoatMain = () => {
    URL.revokeObjectURL(file!.preview);
    setFile(null);
  };

  // const maxFilesAllowed = planSelected ? plans.find((plan) => plan.id === planSelected)?.maxFiles || 1000 : 1000;
  // const { getRootProps, getInputProps } = useDropzone({
  //   accept: {
  //     "image/png": [".png", ".jpg"],
  //     "text/html": [".html", ".htm"],
  //   },
  //   onDrop: (acceptedFiles, fileRejections) => {
  //     const totalFiles = imagesBoat.length + acceptedFiles.length;

  //     if (totalFiles > maxFilesAllowed) {
  //       openModal();
  //     } else if (fileRejections.length > 0) {
  //       toast.error(`Error uploading files. Please make sure the file format is correct with png or jpg.`);
  //     } else {
  //       const updatedFiles: CustomFile[] = acceptedFiles.map((file) =>
  //         Object.assign(file, {
  //           preview: URL.createObjectURL(file),
  //         })
  //       );
  //       setImagesBoat([...imagesBoat, ...updatedFiles]);
  //     }
  //   },
  // });

  const maxFilesAllowed = planSelected ? plans.find((plan) => plan.id === planSelected)?.maxFiles || 1000 : 1000;
  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/png": [".png", ".jpg"],
      "text/html": [".html", ".htm"],
    },
    onDrop: (acceptedFiles, fileRejections) => {
      const totalFiles = imagesBoat.length + acceptedFiles.length;

      if (totalFiles > maxFilesAllowed) {
        openModal();
        return;
      }

      if (fileRejections.length > 0) {
        toast.error(`Error uploading files. Please make sure the file format is correct with png or jpg.`);
        return;
      }

      acceptedFiles.forEach((file) => {
        const reader = new FileReader();
        reader.onload = (event) => {
          const result = event.target?.result;
          
          if (result) {
            const image = new Image();
            image.src = result as string;
      
            image.onload = () => {
              if (image.width > 1920 || image.height > 1080) {
                toast.error('This photo is bigger than 1920 x 1080 pixels, so please select a smaller image!');
                return;
              }
      
              if (file.size > 5242880) { // 5MB in bytes
                toast.error('This photo is bigger than 5MB, so please select a smaller image!');
                return;
              }
      
              // Se a imagem passar pelas verificações, adicione-a ao estado
              const updatedFile = Object.assign(file, {
                preview: URL.createObjectURL(file),
              });
              setImagesBoat((prevFiles) => [...prevFiles, updatedFile]);
            };
          } else {
            toast.error('Failed to load image. Please try again.');
          }
        };
        reader.readAsDataURL(file);
      });      
    },
  });


  const removeFile = (fileToRemove: CustomFile) => {
    const updatedFiles = imagesBoat.filter((file) => file !== fileToRemove);
    setImagesBoat(updatedFiles);
  };

  const Preview = imagesBoat.map((file) => (
    <Box key={file.name} borderWidth="1px" borderRadius="lg" p={1} m={2} position="relative">
      <IconButton
        aria-label="Excluir"
        bg="red"
        size="sm"
        onClick={() => removeFile(file)}
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
        {file.type.startsWith("image/") ? (
          <img src={file.preview} alt={file.name} width="100%" height="100%" />
        ) : (
          <iframe src={file.preview} title={file.name} width="100%" height="300px" />
        )}
      </Box>
    </Box>
  ));

  const handleInputChangeFeatures = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormFeaturesBoat((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleSelectTypeCoin = (event: any) => {
    setTypeCoin(event.target.value);
    setFormFeaturesBoat({ ...formFeaturesBoat, typeCoin: event.target.value });
  };

  const handleSelectCity = (event: any) => {
    setCity(event.target.value);
    setFormFeaturesBoat({ ...formFeaturesBoat, city: event.target.value });
  };

  const handleSelectCountry = (event: any) => {
    setCountry(event.target.value);
    setFormFeaturesBoat({ ...formFeaturesBoat, country: event.target.value });
  };

  const handleVisibilityChange = (isChecked: boolean) => {
    const newValue = isChecked ? '1' : '0';
    setPriceVisibility(newValue);
    setFormFeaturesBoat(prev => ({ ...prev, priceOrRequest: newValue }));
  };

  const toggleVideoInput = (event: any) => {
    setIsVideoEnabled(event.target.checked);
  };

  //Data from PersonalData - Step 4

  const handleInputChangePersonalData = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormPersonalData((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  //Data from PaymentData - Step 5

  const handleButtonPayment = (buttonId: any, label: any) => {
    setPaymentType(buttonId);
    setFormPaymentData({ ...formPaymentData, paymentType: label });
  };

  // const handleInputChangePaymentData = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const { name, value } = e.target;
  //   setFormPaymentData((prevForm) => ({
  //     ...prevForm,
  //     [name]: value,
  //   }));
  // };

  const handleCardNumberChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let { value } = event.target;
    value = value.replace(/\D/g, '');
    value = value.slice(0, 16).replace(/(\d{4})(?=\d)/g, '$1 ');
    setFormPaymentData(prev => ({
      ...prev,
      cardNumber: value
    }));
  };

  const handleExpDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let { value } = event.target;
    value = value.replace(/\D/g, '');
    value = value.slice(0, 4).replace(/(\d{2})(\d{2})/, '$1/$2');
    setFormPaymentData(prev => ({
      ...prev,
      expireDateCard: value
    }));
  };

  const handleCVVChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let { value } = event.target;
    value = value.replace(/\D/g, '').slice(0, 3); // Apenas 3 dígitos
    setFormPaymentData(prev => ({
      ...prev,
      cvv: value
    }));
  };

  const handleZipChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let { value } = event.target;
    value = value.replace(/\D/g, '').slice(0, 5);
    setFormPaymentData(prev => ({
      ...prev,
      zipCode: value
    }));
  };

  // All data from formBoat

  const [allDataBoat, setAllDataBoat] = useState({
    user_id,
    planSelected,
    ...formBoatDetails,
    engines,
    otherInfo,
    ...formBoatBasicInfo,
    // imagesBoat,
    // imageMainBoat,
    ...formFeaturesBoat,
    ...formPersonalData,
    ...formPaymentData,
  });

  async function handleNext() {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));

    const { yearBoat, maker, model } = formBoatBasicInfo;
    const { boatType, boatCondition, length, boatDescription } = formBoatDetails;
    const { typeCoin, city, country, price } = formFeaturesBoat;
    const { email, fullName } = formPersonalData;

    if (activeStep === 0) {
      if (planSelected === null) {
        toastApiResponse(null, 'Please, select a plan!');

      } else if (activeStep < steps.length - 1) {
        setActiveStep(activeStep + 1);
      } else {
        toast.error('Please, fill all fields correctly!');
      }
    } else if (activeStep === 1) {
      if (yearBoat.trim() === '' || maker.trim() === '' || model.trim() === '') {
        let errorMessage = 'Please fill the following fields: ';
        const fields = [];

        if (yearBoat.trim() === '') {
          fields.push('Year of Boat');
        }
        if (maker.trim() === '') {
          fields.push('Maker');
        }
        if (model.trim() === '') {
          fields.push('Model');
        }

        errorMessage += fields.join(', ');

        toast.error(errorMessage, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      } else {
        if (activeStep < steps.length - 1) {
          setActiveStep(activeStep + 1);
        }
      }

    } else if (activeStep === 2) {
      if (length.trim() === '' || boatType === '' || boatDescription.trim() === '' || boatCondition === '') {
        let errorMessage = 'Please fill the following fields: ';
        const fields = [];

        if (length.trim() === '') {
          fields.push('Length of Boat');
        }
        if (boatType === '') {
          fields.push('Boat Type');
        }
        if (boatDescription.trim() === '') {
          fields.push('Boat Description');
        }
        if (boatCondition === '') {
          fields.push('Boat Condition');
        }

        errorMessage += fields.join(', ');

        toast.error(errorMessage, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      } else {
        if (activeStep < steps.length - 1) {
          setActiveStep(activeStep + 1);
        }
      }

    } else if (activeStep === 3) {
      if (!/^\d+$/.test(price.trim()) || typeCoin === '' || city === '' || country === '') {
        let errorMessage = 'Please fill the following fields correctly: ';
        const fields = [];

        if (!/^\d+$/.test(price.trim())) {
          fields.push('Price');
        }
        if (typeCoin === '') {
          fields.push('Type of Coin');
        }
        if (city === '') {
          fields.push('City');
        }
        if (country === '') {
          fields.push('Country');
        }

        errorMessage += fields.join(', ');

        toast.error(errorMessage, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      } else {
        if (activeStep < steps.length - 1) {
          setActiveStep(activeStep + 1);
        }
      }

    } else if (activeStep === 4) {
      if (email.trim() === '' || fullName.trim() === '' || !/^\S+@\S+\.\S+$/.test(email)) {
        let errorMessage = 'Please fill the following fields correctly: ';
        const fields = [];

        if (email.trim() === '') {
          fields.push('Email');
        } else if (!/^\S+@\S+\.\S+$/.test(email)) {
          fields.push('Valid Email Address');
        }
        if (fullName.trim() === '') {
          fields.push('Full Name');
        }

        errorMessage += fields.join(', ');

        toast.error(errorMessage, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      } else {
        if (activeStep < steps.length - 1) {
          setActiveStep(activeStep + 1);
        }
      }
    }

    setIsLoading(false);
  }

  async function handleBack() {
    setIsLoadingButtonBack(true)
    await new Promise(resolve => setTimeout(resolve, 1000));
    if (activeStep > 0) {
      setActiveStep(activeStep - 1);
    }
    setIsLoadingButtonBack(false)
  };

  async function handleSelectPlan() {
    if (activeStep > 2) {
      setActiveStep(activeStep - 3);
    }
  };

  function handleGoDashboard() {
    navigate('/dashboard');
  }

  async function handleSaveData() {
    setIsLoading(true);
    const { cardNumber, expireDateCard, cvv, paymentType } = formPaymentData;
    const imageMainBoat = file

    // console.log('allDataBoat 15:40', allDataBoat)
    // console.log('allDataBoat 15:40', imagesBoat)
    // console.log('allDataBoat 15:40', imageMainBoat)
    // setIsLoading(false);
    // return

    if (planSelected === '6') { // The free plan has id 6
      try {
        const responseBoats = await api.post('/register_boats.php', allDataBoat);
        const idBoat = responseBoats.data.id;

        if (imageMainBoat) {
          const formImage = new FormData();
          formImage.append("id_boat", idBoat);
          const imageFile = new File([imageMainBoat], 'image_main_boat.jpg', { type: (imageMainBoat as any).type });
          formImage.append('imageMainBoat', imageFile);

          const responseMainImage = await api.post('/register_boats_images.php', formImage, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });

          if (!responseMainImage?.data) {
            throw new Error('Failed to upload main boat image');
          }
        }

        if (imagesBoat && imagesBoat.length > 0) {
          for (const [index, file] of imagesBoat.entries()) {
            const formImages = new FormData();
            formImages.append("id_boat", idBoat);
            const imageFile = new File([file as Blob], `image_${index}.jpg`, { type: file.type });
            formImages.append("files[]", imageFile);

            const responseImages = await api.post('/register_boats_images.php', formImages, {
              headers: {
                'Content-Type': 'multipart/form-data',
              },
            });

            if (!responseImages?.data) {
              throw new Error(`Failed to upload image ${index + 1}`);
            }

            setUploadProgress(prevProgress => ({
              ...prevProgress,
              uploaded: prevProgress.uploaded + 1
            }));
          }

          await new Promise((resolve) => setTimeout(resolve, 2000));
          console.log('chegou aqui as 16:57');
          toastApiResponse(null, 'Your free access is available now! Enjoy Boats on the market');
        }

        setIsLoading(false);
        await new Promise((resolve) => setTimeout(resolve, 2000));
        toastApiResponse(null, 'Your free access is available now! Enjoy Boats on the market');
        console.log('chegou aqui as 16:58');
        handleGoDashboard();

      } catch (error) {
        console.error('Error:', error);
        toastApiResponse(error, 'An error occurred while connecting to the server, please try again later');
        setIsLoading(false);
        navigate(`/registerBoatBasic`);
      }

    } else {
      if (
        paymentType.trim() !== '' &&
        cardNumber.trim() !== '' &&
        expireDateCard.trim() !== '' &&
        cvv.trim() !== ''
        // zipCode.trim() !== ''
      ) {
        try {
          const responseBoats = await api.post('/register_boats.php', allDataBoat);
          const idBoat = responseBoats.data.id;

          const formImage = new FormData();
          formImage.append("id_boat", idBoat);

          imagesBoat.forEach((file, index) => {
            const imageFile = new File([file as Blob], `image_${index}.jpg`, { type: file.type });
            formImage.append("files[]", imageFile);
          });

          // if (imageMainBoat.length > 0) {
          //   const imageFile = new File([imageMainBoat[0]], 'image_main_boat.jpg', { type: (imageMainBoat[0] as any).type });
          //   formImage.append('imageMainBoat', imageFile);
          // }

          if (imageMainBoat) {
            const imageFile = new File([imageMainBoat], 'image_main_boat.jpg', { type: (imageMainBoat as any).type });
            formImage.append('imageMainBoat', imageFile);
          }

          const responseImages = await api.post('/register_boats_images.php', formImage, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });

          if (responseImages?.data) {
            toastApiResponse(null, 'Your payment was successfull! Wellcome to boats on the market');
          }

          await new Promise((resolve) => setTimeout(resolve, 2000));
          setIsLoading(false);
          handleGoDashboard();

        } catch (error) {
          console.error('Error:', error);
          toastApiResponse(error, 'Have ocorred an error to conect to servidor, please try again later');
          await new Promise((resolve) => setTimeout(resolve, 3000));
          navigate(`/registerBoatBasic`);
        }
      } else {
        let errorMessage = 'Please fill the following fields correctly: ';
        const fields = [];

        if (paymentType === '') {
          fields.push('Payment Type');
        }
        if (cardNumber === '') {
          fields.push('Card Number');
        }
        if (expireDateCard === '') {
          fields.push('Expiration Date (MM/YY format)');
        }
        if (cvv === '') {
          fields.push('CVV');
        }

        setIsLoading(false);

        errorMessage += fields.join(', ');

        toast.error(errorMessage, {
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
  }

  useEffect(() => {
    setAllDataBoat({
      user_id,
      planSelected,
      ...formBoatDetails,
      engines,
      otherInfo,
      ...formBoatBasicInfo,
      // imagesBoat,
      // imageMainBoat,
      ...formFeaturesBoat,
      ...formPersonalData,
      ...formPaymentData,
    });
  }, [user_id, formBoatDetails, formBoatBasicInfo, // imagesBoat, imageMainBoat, 
    engines, otherInfo, planSelected, formFeaturesBoat, formPersonalData, formPaymentData]
  );

  return (
    <>
      {user?.id ? (
        <>
          <Flex direction="column" height="100%" bg="white" justifyContent='center' alignItems='center'>
            <Header />

            {isWideVersion && (
              <Box w='100%' mt={10} px={'10rem'} fontSize={['xs', 'sm', 'md']}>
                <Stepper size={['md']} index={activeStep} >
                  {steps.map((step, index) => (
                    <Step key={index} onClick={() => setActiveStep(index)}>
                      <StepIndicator>
                        <StepStatus
                          complete={<StepIcon />}
                          incomplete={<StepNumber />}
                          active={<StepNumber />}
                        />
                      </StepIndicator>

                      <Box flexShrink='0' fontSize={['xs', 'sm', 'md']}>
                        <StepTitle>{step.title}</StepTitle>
                        <StepDescription>{step.description}</StepDescription>
                      </Box>

                      <StepSeparator />
                    </Step>
                  ))}
                </Stepper>
              </Box>
            )}

            <Center bg="white" w="100%" maxWidth={1080} mt={5} mb={5} px={2}>
              <VStack w='100%'>
                <Stack w='100%' mt={10}>
                  <form>
                    {activeStep === 0 && (
                      <VStack spacing={2} w='100%' mx='auto'>
                        <Heading color={textColorSecondary}>Step 1</Heading>

                        <Heading>Select the best plan for you</Heading>

                        <Text color={textColorSecondary} fontSize={['xs', 'sm', 'md']} me='26px'>
                          Pick a plan that best matches quality and performance to your Ad
                        </Text>

                        <Divider my={5} w={'50%'} />

                        <VStack alignItems="center" justifyContent={'center'} w={'50%'} bg={'lightcyan'} padding={2} borderRadius={10}>
                          <FormControl display="flex" alignItems="center" mt={0} justifyContent={'center'}>
                            <FormLabel htmlFor="video-switch" mb="0" fontWeight={'bold'} textAlign={'center'}>
                              Select the free plan below and click Next
                            </FormLabel>
                          </FormControl>
                        </VStack>

                        <SimpleGrid columns={{ base: 1, md: 1 }} spacing={5} mt={3}>
                          {plans.filter((plan: any) => plan.is_active === true)
                            .map((plan, index) => (
                              <PlanButton
                                key={index}
                                plan={plan}
                                planSelected={planSelected}
                                handlePlanSelected={handlePlanSelected}
                              />
                            ))
                          }
                        </SimpleGrid>
                      </VStack>
                    )}

                    {activeStep === 1 && (
                      <VStack spacing={2} w={isWideVersion ? '60%' : '100%'} mx='auto'>
                        <Heading color={textColorSecondary}>Step 2</Heading>
                        <BoatForm formData={formBoatBasicInfo} handleInputChange={handleInputChanges} />
                      </VStack>
                    )}

                    {activeStep === 2 && (
                      <VStack spacing={2} w={isWideVersion ? '60%' : '100%'} mx='auto'>
                        <Heading color={textColorSecondary}>Step 3</Heading>

                        <Heading>It's all in the details</Heading>

                        <Text color={textColorSecondary} fontSize='md' me='26px'>
                          Fill out this information to expose your ad to more potential buyers as they search.
                        </Text>

                        <Divider my={5} />

                        <Heading size='md' mt={2}>Main details</Heading>

                        <VStack w={isWideVersion ? '80%' : '100%'} mt={0} px={2}>
                          <VStack w='100%'>
                            <BoatSelector onSelectCategory={handleSelectCategory} />

                            {/* <FormControl>
                              <FormLabel color={'red.400'}>Sub category (PERGUNTAR AO ALAN SOBRE ISSO)</FormLabel>
                              <MultiSelectComponent options={optionsMultSelect} />
                            </FormControl> */}

                            <FormControl>
                              <FormLabel>Condition <Icon as={FaAsterisk} color="red.500" boxSize="10px" /> </FormLabel>
                              <Select id="category" value={formBoatDetails.boatCondition} onChange={handleSelectCondition}>
                                <option value=''></option>
                                <option value='New'>New</option>
                                <option value='New available'>New - Available for Order</option>
                                <option value='Used'>Used</option>
                                <option value='Insurance salvage'>Insurance Salvage</option>
                                <option value='Ex-Charter'>Ex-Charter</option>
                              </Select>
                            </FormControl>

                            <FormControl>
                              <FormLabel>{formBoatDetails.boatType === 'Water toys' ? 'Material' : 'Hull Material'}</FormLabel>
                              <Select id='hullMaterial' value={formBoatDetails.hullMaterial} onChange={handleHullMaterial}>
                                <option value=''></option>
                                <option value='Composite'>Composite</option>
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

                            {formBoatDetails.boatType === 'Water toys' ? null :
                              <FormControl>
                                <FormLabel>Hull Type</FormLabel>
                                <Select id='hullType' defaultValue='' value={formBoatDetails.hullType} onChange={handleHullType}>
                                  <option id='0' value=''></option>
                                  <option value='VShape'>V Shape</option>
                                  <option value='Deep V'>Deep V</option>
                                  <option value='Plaining'>Plaining</option>
                                  <option value='Semi plaining'>Semi Plaining</option>
                                  <option value='Displacement'>Displacement</option>
                                  <option value='Semi displacement'>Semi Displacement</option>
                                  <option value='Multi hull'>Multi Hull</option>
                                  <option value='Round bottom'>Round Bottom</option>
                                  <option value='Flat bottom'>Flat Bottom</option>
                                  <option value='Bulbous bow'>Bulbous Bow</option>
                                  <option value='Inverted bow'>Inverted Bow</option>
                                  <option value='Other'>Other</option>
                                </Select>
                              </FormControl>
                            }

                            <FormControl mt={2}>
                              <FormLabel>Length (feet) <Icon as={FaAsterisk} color="red.500" boxSize="10px" /> </FormLabel>
                              <Input
                                type='number'
                                name='length'
                                value={formBoatDetails.length}
                                onChange={handleInputChangeLength}
                              />
                            </FormControl>

                            <Box w="100%" maxWidth={'100%'} h={'auto'} marginX="auto" mt={2}>
                              <div>
                                <FormLabel>Description <Icon as={FaAsterisk} color="red.500" boxSize="10px" /> </FormLabel>
                                <TextEditor
                                  content={content}
                                  setContent={handleContentChange}
                                  placeholder="Type something amazing about your boat..."
                                />
                              </div>
                            </Box>

                            <Heading size='sm' mt={5}>Optional details</Heading>

                            <AccordionEngine onValuesChange={handleValuesChange} />

                            {formBoatDetails.boatType === 'Water toys' ? null :
                              <AccordionOtherInfo otherInfo={otherInfo} setOtherInfo={setOtherInfo} />
                            }

                          </VStack>
                        </VStack>
                      </VStack>
                    )}

                    {activeStep === 3 && (
                      <VStack spacing={2} w={isWideVersion ? '60%' : '95%'} mx='auto'>
                        <Heading color={textColorSecondary}>Step 4</Heading>
                        <Heading>Let's Show Case Your Ad</Heading>
                        <Text mt={5} color={textColorSecondary} fontSize='md' me='26px' textAlign={'center'}>
                          Great photos, your contact information, and a detailed description are key in increasing inquiries to your listing.
                        </Text>

                        <Divider mt={5} />

                        <Heading size='md' mt={5} textAlign={'left'}>Add Here Your Main Image</Heading>
                        <Heading size='md' mt={5} textAlign={'left'} color={'red'}>Warning:</Heading>
                        <Text mt={5} color={'gray.900'} fontSize='sm' textAlign={'center'}>
                          Your main image must be on horizontal orientation position only. We recommend upload images with high resolution for a best performance! Minimum 640 x 480 | Maximum 1920 x 1080.
                        </Text>

                        <FormControl>
                          <VStack spacing={4} mt={5}>
                            <Box pb={5} w='100%'>
                              <Center w='100%'>
                                <Box
                                  {...getRootProps1({ className: "dropzone" })}
                                  p={4}
                                  borderWidth={2}
                                  borderColor="blue.300"
                                  borderStyle="dashed"
                                  borderRadius="md"
                                  textAlign="center"
                                  w='100%'
                                  cursor={'pointer'}
                                >
                                  <input {...getInputProps1()} />
                                  <Icon as={IoIosBoat} fontSize="5xl" color={'gray.300'} />
                                  <Text> Add Here Your Main Image</Text>
                                </Box>
                              </Center>

                              {file && (
                                <Box mt={4} position="relative">
                                  <img src={file.preview} alt="Preview" style={{ width: '100%', borderRadius: '10px' }} />
                                  <IconButton
                                    aria-label="Delete Image"
                                    icon={<FaTrashCan />}
                                    colorScheme="red"
                                    position="absolute"
                                    right="10px"
                                    top="10px"
                                    onClick={removeImageBoatMain}
                                  />
                                </Box>
                              )}
                            </Box>
                          </VStack>

                          <Divider my={5} />

                          <Heading size='md' mt={8} textAlign={'center'}>
                            Select all images you want to show on your ad
                          </Heading>

                          <Text mt={5} color={'gray.900'} fontSize='sm' textAlign={'center'}>
                            Your main image can be on horizontal or vertical orientation. We recommend upload images with high resolution for a best performance! Minimum 640 x 480 | Maximum 1920 x 1080.
                          </Text>

                          <VStack spacing={4} mt={8}>
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
                                <Text> Add here all your images</Text>
                              </Box>
                            </Center>

                            <Box w="100%">
                              <Text fontSize="sm" mt={5} fontWeight="thin" textAlign={'center'}>
                                Images Preview
                              </Text>
                              <Box display="flex" flexWrap="wrap">
                                {Preview}
                              </Box>
                            </Box>
                          </VStack>
                        </FormControl>

                        <Divider my={5} />

                        {isModalOpen && (
                          <ModalMaxFiles
                            isOpen={isModalOpen}
                            onClose={closeModal}
                            selectPlan={handleSelectPlan}
                            title={`Your plan selected allows ONLY ${maxFilesAllowed} FILES. So if you want to add more photos, CHANGE YOUR PLAN...`}
                          />
                        )}

                        <Heading size='md' mb={3}>Price and Location</Heading>

                        <VStack alignItems="flex-start" justifyContent={'flex-start'} w={'100%'} bg={'lightcyan'} padding={4} borderRadius={10}>
                          <FormControl display="flex" alignItems="center" mt={2}>
                            <FormLabel htmlFor="video-switch" mb="0" fontWeight={'bold'}>
                              Fill in all the information marked in Red
                            </FormLabel>
                          </FormControl>

                          <Box display="flex" alignItems="flex-start" justifyContent={'flex-start'}>
                            <CheckboxGroup colorScheme="blue">
                              <Stack spacing={2} display="flex" alignItems="flex-start" justifyContent={'flex-start'}>
                                <Checkbox
                                  isChecked={priceVisibility === '1'}
                                  onChange={(e) => handleVisibilityChange(e.target.checked)} // aqui, verificamos o estado do checkbox com e.target.checked
                                >
                                  Price on Request
                                </Checkbox>
                                <Text mt={0} fontSize="sm">By checking this box, your price will be hidden on the description page</Text>
                                <Text mt={0} fontSize="sm">An estimated price of your boat still mandatory for ranking your ad on search results</Text>
                              </Stack>
                            </CheckboxGroup>
                          </Box>
                        </VStack>

                        <HStack w='100%' mt={4} spacing={3}>
                          <FormControl>
                            <FormLabel>Price <Icon as={FaAsterisk} color="red.500" boxSize="10px" /> </FormLabel>
                            <Input
                              type='number'
                              name='price'
                              value={formFeaturesBoat.price}
                              onChange={handleInputChangeFeatures}
                            />
                          </FormControl>

                          <FormControl>
                            <FormLabel>Currency <Icon as={FaAsterisk} color="red.500" boxSize="10px" /></FormLabel>
                            <Select id="typecoin" defaultValue="" value={typeCoin} onChange={handleSelectTypeCoin}>
                              <option id='0' value=''></option>
                              <option id='2' value='DOLARS'>$ Dollar</option>
                              <option id='3' value='EUROS'>€ Euro</option>
                              <option id='4' value='POUNDS'> £ British Pounds</option>
                            </Select>
                          </FormControl>
                        </HStack>

                        <FormControl mt={2}>
                          <FormLabel>City/Town <Icon as={FaAsterisk} color="red.500" boxSize="10px" /></FormLabel>
                          <Input
                            type='text'
                            name='city'
                            value={city}
                            onChange={handleSelectCity}
                          />
                        </FormControl>

                        <FormControl>
                          <FormLabel>Country <Icon as={FaAsterisk} color="red.500" boxSize="10px" /></FormLabel>
                          <Select
                            value={country}
                            onChange={handleSelectCountry}
                            placeholder="Select a country"
                          >
                            {allCountries.map((country) => (
                              <option key={country.id} value={country.name}>{country.name}</option>
                            ))}
                          </Select>
                        </FormControl>

                        {/* {planSelected === '6' ? null : ( */}
                        <>
                          <FormControl display="flex" alignItems="center" mt={2}>
                            <FormLabel htmlFor="video-switch" mb="0">
                              Do you have a video link for this ad?
                            </FormLabel>
                            <Switch id="video-switch" onChange={toggleVideoInput} isChecked={isVideoEnabled} />
                          </FormControl>

                          {isVideoEnabled && (
                            <FormControl mt={4}>
                              <FormLabel>Video Link/URL</FormLabel>
                              <Input
                                type="text"
                                name="linkVideo"
                                value={formFeaturesBoat.linkVideo}
                                onChange={handleInputChangeFeatures}
                              />
                            </FormControl>
                          )}
                        </>
                        {/* )} */}
                      </VStack>
                    )}

                    {activeStep === 4 && (
                      <VStack spacing={2} w={isWideVersion ? '60%' : '95%'} mx='auto'>
                        <Heading color={textColorSecondary}>Step 5</Heading>
                        <Heading>Let's connect you with the buyer.</Heading>
                        <Text color={textColorSecondary} fontSize='md' me='26px'>
                          Time to check out and start getting noticed!
                        </Text>
                        <Divider my={2} />

                        <FormControl mt={5}>
                          <FormLabel>Your Email <Icon as={FaAsterisk} color="red.500" boxSize="10px" /> </FormLabel>
                          <Input
                            type='email'
                            name='email'
                            value={formPersonalData.email}
                            onChange={handleInputChangePersonalData}
                          />
                        </FormControl>

                        <FormControl mt={2}>
                          <FormLabel>Contact Phone (Optional)</FormLabel>
                          <Input
                            type='text'
                            name='phone'
                            value={formPersonalData.phone}
                            onChange={handleInputChangePersonalData}
                          />
                        </FormControl>

                        <FormControl mt={2}>
                          <FormLabel>Full Name <Icon as={FaAsterisk} color="red.500" boxSize="10px" /> </FormLabel>
                          <Input
                            type='text'
                            name='fullName'
                            value={formPersonalData.fullName}
                            onChange={handleInputChangePersonalData}
                          />
                        </FormControl>

                        <FormControl mt={2}>
                          <FormLabel>Address (Optional)</FormLabel>
                          <Input
                            type='text'
                            name='address'
                            value={formPersonalData.address}
                            onChange={handleInputChangePersonalData}
                          />
                        </FormControl>
                      </VStack>
                    )}

                    {activeStep === 5 && (
                      <VStack spacing={2} w={isWideVersion ? '60%' : '95%'} mx='auto'>
                        <Heading color={textColorSecondary}>Step 6</Heading>
                        <Heading>Let´s post your listing</Heading>
                        <Text color={textColorSecondary} fontSize='md' me='26px'>
                          Insert your personal data to finish the payment process
                        </Text>
                        <Divider my={3} />

                        {planSelected === '6' ? null : (
                          <>
                            <FormControl>
                              <FormLabel>Payment Type <Icon as={FaAsterisk} color="red.500" boxSize="10px" /></FormLabel>
                              <SimpleGrid columns={{ base: 1, md: 2, lg: 2 }} spacing={3}>
                                {buttonsPayment.map((button) => (
                                  <ButtonType
                                    key={button.id}
                                    id={button.id}
                                    label={button.label}
                                    image={button.image}
                                    isSelected={paymentType === button.id}
                                    onClick={() => handleButtonPayment(button.id, button.label)}
                                  />
                                ))}
                              </SimpleGrid>
                            </FormControl>

                            <FormControl mt={2}>
                              <FormLabel>Cardholder Name <Icon as={FaAsterisk} color="red.500" boxSize="10px" /></FormLabel>
                              <Input
                                type='text'
                                name='cardholderName'
                              // value={formPaymentData.cardNumber}
                              // onChange={handleCardNumberChange}
                              />
                            </FormControl>

                            <FormControl mt={2}>
                              <FormLabel>Card Number <Icon as={FaAsterisk} color="red.500" boxSize="10px" /></FormLabel>
                              <Input
                                type='text'
                                name='cardNumber'
                                value={formPaymentData.cardNumber}
                                onChange={handleCardNumberChange}
                              />
                            </FormControl>

                            <HStack w='100%' mt={2} spacing={3}>
                              <FormControl>
                                <FormLabel>Expire Date <Icon as={FaAsterisk} color="red.500" boxSize="10px" /></FormLabel>
                                <Input
                                  type='text'
                                  name='expireDateCard'
                                  value={formPaymentData.expireDateCard}
                                  onChange={handleExpDateChange}
                                />
                              </FormControl>

                              <FormControl>
                                <FormLabel>CVV <Icon as={FaAsterisk} color="red.500" boxSize="10px" /></FormLabel>
                                <Input
                                  type='text'
                                  name='cvv'
                                  value={formPaymentData.cvv}
                                  onChange={handleCVVChange}
                                />
                              </FormControl>
                            </HStack>

                            <FormControl>
                              <FormLabel>Zip Code</FormLabel>
                              <Input
                                type='text'
                                name='zipCode'
                                value={formPaymentData.zipCode}
                                onChange={handleZipChange}
                              />
                            </FormControl>

                            <HStack mt={4} bg='gray.50' display='flex' spacing={5} justifyContent='center' w='100%' h='auto' px={4}>
                              <Checkbox value='confirm' color={'gray.500'} fontSize={['2xs', 'xs', 'sm']} spacing={5}>
                                I confirm that I have the right to use the photographs in this listing and the information is complete and accurate to the best of my knowledge, that I am legally authorized to sell this boat, and that I have read and agreed to the For Sale by Owner Terms and Conditions.
                              </Checkbox>
                            </HStack>
                          </>
                        )}

                        {uploadProgress.uploaded > 0 ? null :
                          <PlanDetails plan={plans.find((plan) => plan.id === planSelected) || null} />
                        }

                        {uploadProgress.uploaded > 0 &&
                          <Box mt={5} justifyContent={'center'} alignItems={'center'} w={'100%'}>
                            <Heading fontSize={['md', 'lg']} color={textColorSecondary} mb={4} textAlign={'center'}>
                              Uploaded {uploadProgress.uploaded}/{imagesBoat.length} images
                            </Heading>

                            <Progress
                              size='lg'
                              hasStripe
                              value={(uploadProgress.uploaded / imagesBoat.length) * 100}
                              colorScheme="blue"
                              isAnimated
                            />

                            <Heading color={textColorSecondary} my={4} textAlign={'center'}>
                              {((uploadProgress.uploaded / imagesBoat.length) * 100).toFixed(0)}%
                            </Heading>
                          </Box>
                        }
                      </VStack>
                    )}
                  </form>
                </Stack>

                <Box mt={4} display='flex' justifyContent='center' w={isWideVersion ? '50%' : '80%'} gap={2}>
                  <Button isLoading={isLoadingButtonBack} onClick={handleBack} disabled={activeStep === 0} w={isWideVersion ? '30%' : '100%'} h='6vh'>
                    <HStack>
                      <Icon as={FaRegArrowAltCircleLeft} fontSize="2xl" />
                      <Text fontSize={['sm', 'md']}>Back</Text>
                    </HStack>
                  </Button>

                  <Button
                    onClick={isLastStep ? handleSaveData : handleNext}
                    bg={isLastStep ? 'yellow.200' : 'blue.300'}
                    color={isLastStep ? 'blue.300' : 'white'}
                    disabled={activeStep === steps.length - 1}
                    isLoading={isLoading}
                    _hover={{ bg: isLastStep ? 'yellow.300' : 'blue.400' }}
                    w={isWideVersion ? '30%' : '100%'}
                    h='6vh'
                  >
                    <HStack>
                      <Text fontSize={['sm', 'md']}> {isLastStep ? 'Send' : 'Next'}</Text>
                      <Icon as={FaRegArrowAltCircleRight} fontSize="2xl" />
                    </HStack>

                  </Button>
                </Box>                
              </VStack>
            </Center>

            <Divider borderColor="gray.200" mb={5} mt={10} w='60%'></Divider>
          </Flex>

          <AllRights />
          <ToastContainer />
        </>
      ) : (
        null
      )}
    </>
  )
}