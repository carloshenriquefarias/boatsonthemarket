import {
  Text, useColorModeValue, Box, SimpleGrid, Divider, FormControl,
  HStack, Button, VStack, Icon, Stack, Flex, FormLabel, Switch, Input,
} from "@chakra-ui/react";
import { motion } from 'framer-motion';

import Card from "../components/Card";
import Footer from '../components/Footer'
import Header from '../components/Header'
import InputLogin from "../components/InputLogin";

import { useState } from "react";
import { useAuth } from "../hooks/useAuth";

import { FaRegArrowAltCircleLeft } from "react-icons/fa";;
import { useNavigate } from "react-router-dom";

import { ToastContainer } from "react-toastify";
import { toastApiResponse } from "../components/Toast";
import "react-toastify/ReactToastify.min.css";

import * as yup from 'yup'
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup"
import CardPlan from "../components/CardPlan";

interface PlanProps {
  name: string;
  description: string;
  item: string;
  price: string;
  imagesAllowed: number;
  videoAmount: number;
}

interface Plan {
  id: string;
  name: string;
  description: string;
  item: string[];
  price: string;
  isOnSale?: boolean;
  maxFiles: number;
  video: number;
}

export default function RegisterPlan() {

  const { user } = useAuth();

  const bg = useColorModeValue("white", "navy.700");
  const cardShadow = useColorModeValue("0px 18px 40px rgba(112, 144, 176, 0.12)", "unset");
  const navigate = useNavigate();
  const textColorPrimary = useColorModeValue("secondaryGray.900", "white");
  const textColorSecondary = "gray.400";

  const [isLoading, setIsLoading] = useState(false);
  const [isOnSale, setIsOnSale] = useState(false);
  const [formDataPlan, setFormDataPlan] = useState<any>({ isOnSale, expirationPlan: '' });

  const handleSwitchChange = (isChecked: any) => {
    setIsOnSale(isChecked);
  };

  const planFormSchema = yup.object().shape({
    name: yup.string().required('Please enter the plan name'),
    description: yup.string().required('Please enter the plan description'),
    item: yup.string().required('Please enter the plan description'),
    price: yup.string().required('Please enter the plan price'),
    imagesAllowed: yup.number().required('Please enter the maximum number of photos for the plan'),
    videoAmount: yup.number().required('Please enter the amount of video per plan'),
  });

  const { register, handleSubmit, formState } = useForm<PlanProps>({
    resolver: yupResolver(planFormSchema)
  });

  const { errors } = formState

  const dataListPlan: Plan[] = [
    {
      id: '1',
      name: 'MASTER',
      description: 'This plan there are all benefits of the another plans, incluing photo ilimited and and time',
      item: ['Photos unlimited', '30 weeks on duration', 'Always on top of page', 'Hight on page', '3 Video', 'Full description', 'Carousel', 'Slider top'],
      price: 'U$ 85,00',
      isOnSale: false,
      maxFiles: 30,
      video: 3,
    },
  ]

  // const handleInputChanges = (e: React.ChangeEvent<HTMLInputElement>, fieldName: string) => {
  //   const { value } = e.target;
  //   setFormDataPlan((prevFormData: any) => ({
  //     ...prevFormData,
  //     [fieldName]: value,
  //   }));
  // };

  const handleGoToPortalPlan = () => {
    navigate(`/plans`);
  };

  async function handleSavePlan(formData: PlanProps) {
    try {
      setIsLoading(true);
      const { name, description, item, price, imagesAllowed, videoAmount } = formData;
      const expirationPlanToSend = isOnSale && formDataPlan.expirationPlan !== '' ? formDataPlan.expirationPlan : '';

      const specificFormDataValues = [
        formDataPlan.item1,
        formDataPlan.item2,
        formDataPlan.item3,
        formDataPlan.item4,
        formDataPlan.item5,
        formDataPlan.item6,
        formDataPlan.item7
      ];
      const nonEmptyValues = specificFormDataValues.filter(value => value !== '');
      const itemArray = [item, ...nonEmptyValues];

      const dataPlan = {
        name: name,
        isOnSale: isOnSale,
        expirationPlan: expirationPlanToSend,
        price: price,
        description: description,
        item: itemArray,
        imagesAllowed: imagesAllowed,
        videoAmount: videoAmount
      };

      console.log('10:55', dataPlan);

      // const response = await api.post('/delete_boat_id.php', dataPlan);
      // toastApiResponse(response, response.data.message);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setIsLoading(false);
      handleGoToPortalPlan();

    } catch (error: any) {
      console.error('Error:', error);
      toastApiResponse(error, 'An error occurred while connecting to the server. Please try again later.');
    }
  }

  return (
    <>
      {user?.is_admin == '1' ? (
        <Flex direction="column" height="100%" bg="white">
          <Header />

          <Flex width="100%" my="6" mx="auto" px="6" maxWidth={1600}>
            <Card mb={{ base: "0px", "2xl": "10px" }} width="100%" mx="auto" maxWidth={1480}>
              <motion.div
                initial={{ opacity: 0, x: -150 }}
                whileInView={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -150 }}
                transition={{ duration: 1 }}
              >
                <SimpleGrid
                  columns={{ base: 1, md: 1, lg: 1 }}
                  spacing={3}
                  w="100%"
                  maxWidth={1480}
                  mx='auto'
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
                        Register a new plan
                      </Text>

                      <Text color={textColorSecondary} fontSize="md" me="6px" mb="5px" mt={2}>
                        Insert the new data of your plan
                      </Text>
                    </Box>

                    <Button bg='gray.50' w='auto' h={'80px'} onClick={handleGoToPortalPlan}>
                      <VStack pt={0}>
                        <Icon as={FaRegArrowAltCircleLeft} color={'blue.300'} h='28px' w='28px' />
                        <Text color={'blue.300'} fontSize={['2xs', 'xs', 'sm', 'md']}>Portal my plans</Text>
                      </VStack>
                    </Button>
                  </HStack>

                  <Divider />
                </SimpleGrid>
              </motion.div>

              <Card bg={bg} boxShadow={cardShadow} mb='20px' px={3} py={3}>
                <Text
                  color={textColorPrimary}
                  fontWeight='bold'
                  fontSize='lg'
                  mt='5px'
                >
                  Details about the plan
                </Text>
              </Card>

              <Card bg={bg} boxShadow={cardShadow} mb='20px' px={3} py={3}>
                <FormControl >
                  <FormLabel>The plan is on sale?</FormLabel>
                  <Stack direction='row' mt={4}>
                    <Switch
                      colorScheme='teal'
                      size='lg'
                      isChecked={isOnSale}
                      onChange={(e) => handleSwitchChange(e.target.checked)}
                    />
                  </Stack>
                </FormControl>

                <SimpleGrid columns={{ base: 1, md: 2, lg: 2, xl: 2 }} spacing={5} my={2}>
                  {isOnSale && (
                    <>
                      <FormControl>
                        <FormLabel>Expiration date of the plan</FormLabel>
                        <Input
                          type='date'
                          name='expirationPlan'
                          variant='outline'
                          placeholder='Date expiration plan'
                          value={formDataPlan.expirationPlan}
                          onChange={(e) => setFormDataPlan({ ...formDataPlan, expirationPlan: e.target.value })}
                        />
                      </FormControl>

                      <FormControl>
                        <FormLabel>Sale price</FormLabel>
                        <InputLogin
                          placeholder='Price'
                          name='price'
                          type="text"
                          error={errors?.price}
                          register={register}
                          options={{
                            required: 'É necessário informar o price.'
                          }}
                        />
                      </FormControl>
                    </>
                  )}
                </SimpleGrid>
              </Card>

              <Card bg={bg} boxShadow={cardShadow} mb='20px' px={3} py={3}>
                <FormControl mt={3}>
                  <FormLabel>The plan name</FormLabel>
                  <Stack direction='row'>
                    <Switch
                      colorScheme='teal'
                      size='lg'
                      isChecked={isOnSale}
                      onChange={(e) => handleSwitchChange(e.target.checked)}
                    />
                  </Stack>
                </FormControl>

                <SimpleGrid columns={{ base: 1, md: 2, lg: 2, xl: 2 }} spacing={5} mt={3}>
                  <FormControl>
                    <FormLabel>Name plan</FormLabel>
                    <InputLogin
                      placeholder='Name plan'
                      name='name'
                      type="text"
                      error={errors?.name}
                      register={register}
                      options={{
                        required: 'É necessário informar o nome do plano.'
                      }}
                    />
                  </FormControl>

                  <FormControl>
                    <FormLabel>Price</FormLabel>
                    <InputLogin
                      placeholder='Price'
                      name='price'
                      type="text"
                      error={errors?.price}
                      register={register}
                      options={{
                        required: 'É necessário informar o price.'
                      }}
                    />
                  </FormControl>
                </SimpleGrid>
              </Card>

              <Card bg={bg} boxShadow={cardShadow} mb='20px' px={3} py={3}>
                <FormControl >
                  <FormLabel>Photos</FormLabel>
                  <Stack direction='row' mt={4}>
                    <Switch
                      colorScheme='teal'
                      size='lg'
                      isChecked={isOnSale}
                      onChange={(e) => handleSwitchChange(e.target.checked)}
                    />
                  </Stack>
                </FormControl>

                <SimpleGrid columns={{ base: 1, md: 2, lg: 2, xl: 2 }} spacing={5} mt={3}>
                  <FormControl>
                    <FormLabel>Number of photos</FormLabel>
                    <InputLogin
                      placeholder='Item'
                      name='item'
                      type="text"
                      error={errors?.item}
                      register={register}
                      options={{
                        required: 'É necessário informar o nome do item.'
                      }}
                    />
                  </FormControl>

                  <FormControl>
                    <FormLabel>Images allowed per plan</FormLabel>
                    <InputLogin
                      placeholder='Images allowed'
                      name='imagesAllowed'
                      type="number"
                      error={errors?.imagesAllowed}
                      register={register}
                      options={{
                        required: 'É necessário informar a quantidade de imagens.'
                      }}
                    />
                  </FormControl>
                </SimpleGrid>
              </Card>

              <Card bg={bg} boxShadow={cardShadow} mb='20px' px={3} py={3}>
                <FormControl >
                  <FormLabel>Duration</FormLabel>
                  <Stack direction='row' mt={4}>
                    <Switch
                      colorScheme='teal'
                      size='lg'
                      isChecked={isOnSale}
                      onChange={(e) => handleSwitchChange(e.target.checked)}
                    />
                  </Stack>
                </FormControl>

                <SimpleGrid columns={{ base: 1, md: 1, lg: 2, xl: 2 }} spacing={5} my={3}>
                  <FormControl>
                    <FormLabel>Plan duration</FormLabel>
                    <InputLogin
                      placeholder='duration'
                      name='imagesAllowed'
                      type="number"
                      error={errors?.imagesAllowed}
                      register={register}
                      options={{
                        required: 'É necessário informar a quantidade de imagens.'
                      }}
                    />
                  </FormControl>

                  <FormControl>
                    <FormLabel>Weeks</FormLabel>
                    <InputLogin
                      placeholder='video Amount'
                      name='videoAmount'
                      type="number"
                      error={errors?.videoAmount}
                      register={register}
                      options={{
                        required: 'É necessário informar o nome do item.'
                      }}
                    />
                  </FormControl>
                </SimpleGrid>
              </Card>

              <Card bg={bg} boxShadow={cardShadow} mb='20px' px={3} py={3}>
                <FormControl >
                  <FormLabel>Videos</FormLabel>
                  <Stack direction='row' mt={4}>
                    <Switch
                      colorScheme='teal'
                      size='lg'
                      isChecked={isOnSale}
                      onChange={(e) => handleSwitchChange(e.target.checked)}
                    />
                  </Stack>
                </FormControl>

                <SimpleGrid columns={{ base: 1, md: 1, lg: 2, xl: 2 }} spacing={5} my={3}>
                  <FormControl>
                    <FormLabel>Number of videos</FormLabel>
                    <InputLogin
                      placeholder='videos'
                      name='imagesAllowed'
                      type="number"
                      error={errors?.imagesAllowed}
                      register={register}
                      options={{
                        required: 'É necessário informar a quantidade de imagens.'
                      }}
                    />
                  </FormControl>

                  <FormControl>
                    <FormLabel>Videos</FormLabel>
                    <InputLogin
                      placeholder='video Amount'
                      name='videoAmount'
                      type="number"
                      error={errors?.videoAmount}
                      register={register}
                      options={{
                        required: 'É necessário informar o nome do item.'
                      }}
                    />
                  </FormControl>
                </SimpleGrid>
              </Card>

              <Card bg={bg} boxShadow={cardShadow} mb='20px' px={3} py={3}>

                <SimpleGrid columns={{ base: 1, md: 1, lg: 1, xl: 1 }} spacing={5} my={3}>
                  <FormControl>
                    <FormLabel>Description</FormLabel>
                    <InputLogin
                      placeholder='Description'
                      name='description'
                      type="text"
                      error={errors?.description}
                      register={register}
                      options={{
                        required: 'É necessário informar a descricao do plano.'
                      }}
                    />
                  </FormControl>
                </SimpleGrid>
              </Card>

              <Card bg={bg} boxShadow={cardShadow} mb='20px' px={3} py={3}>
                <Text
                  color={textColorPrimary}
                  fontWeight='bold'
                  fontSize='lg'
                  textAlign={'left'}
                  mb={5}
                >
                  Plan preview
                </Text>

                {dataListPlan.map(plan => (
                  <CardPlan
                    key={plan.id}
                    plan={plan}
                  />
                ))}
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
                        PLANS ABOUT BOATS ON THE MARKET
                      </Text>

                      <Text
                        color={textColorPrimary}
                        fontWeight='thin'
                        fontSize='sm'
                        textAlign={'left'}
                      >
                        Now you can publish and updated the plans about your boats
                      </Text>
                    </Stack>

                    <Button bg='yellow.200' isLoading={isLoading} onClick={handleSubmit((data) => handleSavePlan(data))}>
                      Publish plan
                    </Button>

                  </HStack>
                </SimpleGrid>
              </Card>

              <ToastContainer />
            </Card>
          </Flex>

          <Footer />
        </Flex>
      ) : (
        navigate('/')
      )}
    </>
  );
}
