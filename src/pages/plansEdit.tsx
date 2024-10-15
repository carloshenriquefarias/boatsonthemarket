import {
  Text, useColorModeValue, Box, SimpleGrid, Divider, FormControl,
  HStack, Button, VStack, Icon, Stack, Flex, FormLabel, Switch, Input, RadioGroup, Radio
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

interface PlanProps {
  name: string;
  description: string;
  item: string;
  price: string;
  imagesAllowed: number;
  videoAmount: number;
}

export default function PlansEdit() {

  const initialFormData = {
    amountItemSelected: 5,
    name: 'Power plan',
    description: 'This plan is one example',
    price: '500',
    imagesAllowed: 10,
    videoAmount: 1,
    isOnSale: false,
    expirationPlan: '10/01/2016',
    item: [
      'Initial value for item one',
      'Initial value for item two',
      'Initial value for item three',
      'Initial value for item four',
      'Initial value for item five',
      'Initial value for item six',
      // 'Initial value for item seven',
    ]
  };

  const { user } = useAuth();

  const bg = useColorModeValue("white", "navy.700");
  const cardShadow = useColorModeValue("0px 18px 40px rgba(112, 144, 176, 0.12)", "unset");
  const navigate = useNavigate();
  const textColorPrimary = useColorModeValue("secondaryGray.900", "white");
  const textColorSecondary = "gray.400";

  const [isLoading, setIsLoading] = useState(false);
  const [isOnSale, setIsOnSale] = useState(initialFormData.isOnSale);
  const [amountItem, setAmountItem] = useState(initialFormData.amountItemSelected);
  const [formDataPlan, setFormDataPlan] = useState<any>({ isOnSale, initialFormData });

  const [expirationDate, setExpirationDate] = useState(initialFormData.expirationPlan);

  // Função para lidar com a mudança de data
  const handleInputChangesDate: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const { name, value } = e.target;
    setFormDataPlan((prevFormData: any) => ({
      ...prevFormData,
      [name]: value,
    }));
    setExpirationDate(value);
  };

  const handleSwitchChange = (isChecked: any) => {
    setIsOnSale(isChecked);
  };

  const [formDataPlanItem, setFormDataPlanItem] = useState({
    item1: initialFormData.item[1],
    item2: initialFormData.item[2],
    item3: initialFormData.item[3],
    item4: initialFormData.item[4],
    item5: initialFormData.item[5],
    item6: initialFormData.item[6],
    item7: initialFormData.item[7],
  });

  const handleInputChanges = (e: React.ChangeEvent<HTMLInputElement>, fieldName: string) => {
    const { value } = e.target;
    setFormDataPlanItem(prevFormData => ({
      ...prevFormData,
      [fieldName]: value,
    }));
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

  const handleGoToPortalPlan = () => {
    navigate(`/plans`);
  };

  const handleRadioChange = (value: any) => {
    const selectedAmount = Number(value);
    setAmountItem(selectedAmount);
  };

  async function handleSavePlan(formData: PlanProps) {
    try {
      setIsLoading(true);
      const { name, description, item, price, imagesAllowed, videoAmount } = formData;
      const expirationPlanToSend = isOnSale && formDataPlan.expirationPlan !== '' ? formDataPlan.expirationPlan : '';
      console.log(expirationPlanToSend)

      const specificFormDataValues = [
        formDataPlanItem.item1,
        formDataPlanItem.item2,
        formDataPlanItem.item3,
        formDataPlanItem.item4,
        formDataPlanItem.item5,
        formDataPlanItem.item6,
        formDataPlanItem.item7
      ];
      const nonEmptyValues = specificFormDataValues.filter(value => value !== '');
      const itemArray = [item, ...nonEmptyValues];

      const dataPlan = {
        name: name,
        isOnSale: isOnSale,
        expirationPlan: expirationDate,
        price: price,
        description: description,
        item: itemArray,
        imagesAllowed: imagesAllowed,
        videoAmount: videoAmount
      };

      console.log('11:47', dataPlan);

      // const response = await api.post('/delete_boat_id.php', dataPlan);
      // toastApiResponse(response, response.data.message);
       toastApiResponse(null, 'Your data plan has been updated successfully');
      await new Promise((resolve) => setTimeout(resolve, 2000));
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
                        Edit your boat plan
                      </Text>

                      <Text color={textColorSecondary} fontSize="md" me="6px" mb="5px" mt={2}>
                        Insert the new data to update your plan
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

                <SimpleGrid columns={{ base: 1, md: 2, lg: 2, xl: 2 }} spacing={2} my={3}>
                  <RadioGroup onChange={handleRadioChange} value={amountItem.toString()} color={'red'} mt={0}>
                    <FormLabel color={'red'}>
                      Please, before you get start creating your new plan, select the way you want for it
                    </FormLabel>
                    <Stack direction='row' spacing={5}>
                      {Array.from({ length: 7 }).map((_, index) => (
                        <Radio key={index} value={(index + 1).toString()} colorScheme='red'>{index + 1}</Radio>
                      ))}
                    </Stack>
                  </RadioGroup>
                </SimpleGrid>

                <SimpleGrid columns={{ base: 1, md: 2, lg: 2, xl: 2 }} spacing={5} my={3}>
                  <FormControl>
                    <FormLabel>The plan is on sale?</FormLabel>
                    <Stack direction='row'>
                      <Switch
                        colorScheme='teal'
                        size='lg'
                        isChecked={isOnSale}
                        onChange={(e) => handleSwitchChange(e.target.checked)}
                      />
                    </Stack>
                  </FormControl>

                  {isOnSale === true && (
                    <FormControl>
                      <FormLabel>Expiration date of the plan</FormLabel>
                      <Input
                        type='date'
                        name='expirationPlan'
                        variant='filled'
                        defaultValue={initialFormData.expirationPlan}
                        placeholder='Date expiration plan'
                        value={expirationDate}
                        onChange={handleInputChangesDate}
                      />
                    </FormControl>
                  )}
                </SimpleGrid>

                <SimpleGrid columns={{ base: 1, md: 2, lg: 2, xl: 2 }} spacing={5}>
                  <FormControl>
                    <FormLabel>Name plan</FormLabel>
                    <InputLogin
                      placeholder='Name plan'
                      name='name'
                      type="text"
                      variant='filled'
                      defaultValue={initialFormData.name}
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
                      variant='filled'
                      defaultValue={initialFormData.price}
                      error={errors?.price}
                      register={register}
                      options={{
                        required: 'É necessário informar o price.'
                      }}
                    />
                  </FormControl>

                  <FormControl>
                    <FormLabel>Item default (This item is required)</FormLabel>
                    <InputLogin
                      placeholder='Item'
                      name='item'
                      type="text"
                      variant='filled'
                      defaultValue={initialFormData.item[0]}
                      error={errors?.item}
                      register={register}
                      options={{
                        required: 'É necessário informar o nome do item.'
                      }}
                    />
                  </FormControl>

                  <>
                    {Array.from({ length: amountItem }).map((_, index) => (
                      <div key={index}>
                        <FormControl>
                          <FormLabel>{`Optional item ${index + 1}`}</FormLabel>
                          <Input
                            type='text'
                            name={`item${index + 1}`}
                            variant='filled'
                            placeholder={`Item ${index + 1}`}
                            value={formDataPlanItem[`item${index + 1}` as keyof typeof formDataPlanItem]}
                            onChange={(e) => handleInputChanges(e, `item${index + 1}`)}
                          />
                        </FormControl>
                      </div>
                    ))}
                  </>
                </SimpleGrid>

                <SimpleGrid columns={{ base: 1, md: 1, lg: 2, xl: 2 }} spacing={5} my={3}>
                  <FormControl>
                    <FormLabel>Images allowed per plan</FormLabel>
                    <InputLogin
                      placeholder='Images allowed'
                      name='imagesAllowed'
                      type="number"
                      variant='filled'
                      defaultValue={initialFormData.imagesAllowed}
                      error={errors?.imagesAllowed}
                      register={register}
                      options={{
                        required: 'É necessário informar a quantidade de imagens.'
                      }}
                    />
                  </FormControl>

                  <FormControl>
                    <FormLabel>Video amount</FormLabel>
                    <InputLogin
                      placeholder='video Amount'
                      name='videoAmount'
                      type="number"
                      variant='filled'
                      defaultValue={initialFormData.videoAmount}
                      error={errors?.videoAmount}
                      register={register}
                      options={{
                        required: 'É necessário informar o nome do item.'
                      }}
                    />
                  </FormControl>
                </SimpleGrid>

                <SimpleGrid columns={{ base: 1, md: 1, lg: 1, xl: 1 }} spacing={5} my={3}>
                  <FormControl>
                    <FormLabel>Description</FormLabel>
                    <InputLogin
                      placeholder='Description'
                      name='description'
                      type="text"
                      variant='filled'
                      defaultValue={initialFormData.description}
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
