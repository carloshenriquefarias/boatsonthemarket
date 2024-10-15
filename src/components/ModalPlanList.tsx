import {
  Box, Button, Checkbox, Divider, FormControl, FormLabel, HStack, Input, Modal, ModalBody, ModalCloseButton, ModalContent,
  ModalFooter, ModalHeader, ModalOverlay, Stack, Text, VStack
} from "@chakra-ui/react";

import { Card, CardBody, Heading, Icon, SimpleGrid } from "@chakra-ui/react";
import { FcOk } from "react-icons/fc";
import { plans } from '../mock/planList';

import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import React, { useState } from "react";

import "react-toastify/ReactToastify.min.css";
import { api } from "../services/api";
import { toastApiResponse } from "./Toast";
import { FaAsterisk } from "react-icons/fa";
import ButtonType from "./ButtonType";
import { BsCreditCard, BsCreditCardFill } from "react-icons/bs";

interface ModalPlanListProps {
  isOpen: boolean;
  onClose: () => void;
  boat_id: string;
  recharge: () => void;
}

export default function ModalPlanList({ isOpen, onClose, boat_id, recharge }: ModalPlanListProps) {

  const initialRef = React.useRef(null)
  const finalRef = React.useRef(null)
  const navigate = useNavigate();

  const [showRegisterForm, setShowRegisterForm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [planSelected, setPlanSelected] = useState<string | null>(null);

  const [selectedPlanData, setSelectedPlanData] = useState<{
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
  } | null>(null);

  const [formData, setFormData] = React.useState({
    userPlan: selectedPlanData,
    boat_id: boat_id
  });

  const buttonsPayment = [
    { id: "1", label: "Debit card", image: <BsCreditCard /> },
    { id: "2", label: "Credit card", image: <BsCreditCardFill /> },
  ];

  const [paymentType, setPaymentType] = useState(null);
  const [formPaymentData, setFormPaymentData] = useState({
    cardNumber: '', expireDateCard: '', cvv: '', zipCode: '', paymentType: '', cardHolderName: '',
  });

  const handleButtonPayment = (buttonId: any, label: any) => {
    setPaymentType(buttonId);
    setFormPaymentData({ ...formPaymentData, paymentType: label });
  };

  const handleCardNumberChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let { value } = event.target;
    value = value.replace(/\D/g, ''); // Remove qualquer coisa que não seja número
    // Limita a entrada a 16 dígitos e formata em grupos de 4
    value = value.slice(0, 16).replace(/(\d{4})(?=\d)/g, '$1 ');
    setFormPaymentData(prev => ({
      ...prev,
      cardNumber: value
    }));
  };

  const handleCardHolderName = (event: React.ChangeEvent<HTMLInputElement>) => {
    let { value } = event.target;
    setFormPaymentData(prev => ({
      ...prev,
      cardHolderName: value
    }));
  };

  const handleExpDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let { value } = event.target;
    value = value.replace(/\D/g, ''); // Remove caracteres não numéricos
    // Limita a entrada a 4 dígitos e insere uma barra após os dois primeiros dígitos
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
    value = value.replace(/\D/g, '').slice(0, 5); // Apenas 5 dígitos
    setFormPaymentData(prev => ({
      ...prev,
      zipCode: value
    }));
  };

  const OriginalState = () => {
    setShowRegisterForm(!showRegisterForm)
  };

  function GoToPayment() {
    if (selectedPlanData !== null) {
      setShowRegisterForm(!showRegisterForm)
    } else {
      toast.error('Please, select one plan!', {
        position: "top-center",
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

  async function handleCloseModal() {
    setIsLoading(true)
    await new Promise(resolve => setTimeout(resolve, 3000));
    toast.success('Your payment was succsseful!', {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });

    onClose();
    navigate('/dashboard');
    setIsLoading(false)
  }

  async function handleFreePlan() {

    const planID = formData.userPlan?.id;

    try {

      if (selectedPlanData !== null) {

        setIsLoading(true);

        const response = await api.post(`/update_plan.php?boat_id=${boat_id}`,
          { planSelected: planID }
        );

        recharge()
        toastApiResponse(response, response.data.message);
        await new Promise(resolve => setTimeout(resolve, 1000));

        setIsLoading(false);
        handleCloseModal();
        navigate('/dashboard');

      } else {
        toast.info('Please, select your new plan!', {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      }

    } catch (error) {
      console.error('Error:', error);
      toastApiResponse(error, 'Have ocorred an error to conect to servidor, please try again later');
    }
  }

  async function handleSaveData() {

    const { cardNumber, cvv, expireDateCard, paymentType } = formPaymentData;

    if (paymentType.trim() !== '' || cardNumber.trim() !== '' || expireDateCard.trim() !== '' || cvv.trim() !== '') {
      let errorMessage = 'Please fill the following fields correctly: ';
      const fields = [];

      if (paymentType.trim() === '') {
        fields.push('paymentType');
      }

      if (cardNumber.trim() === '') {
        fields.push('cardNumber');
      }

      if (expireDateCard.trim() === '') {
        fields.push('Full Name');
      }

      if (cvv.trim() === '') {
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
    }

    const { userPlan } = formData;
    const saveData = {
      userPlan
    }
    console.log('ta aqui as 16:04', saveData);
    const planID = formData.userPlan?.id;

    try {
      setIsLoading(true)

      const response = await api.post(`/update_plan.php?boat_id=${boat_id}`,
        { planSelected: planID }
      );

      recharge()
      toastApiResponse(response, response.data.message);
      await new Promise(resolve => setTimeout(resolve, 1000));

      setIsLoading(false);
      handleCloseModal();
      navigate('/dashboard');


    } catch (error) {
      console.error('Error:', error);
      toastApiResponse(error, 'Have ocorred an error to conect to servidor, please try again later');
    }
  }

  const handlePlanSelected = (planId: string) => {
    const selectedPlan = plans.find((plan) => plan.id === planId);

    if (selectedPlan) {
      setPlanSelected(planId);
      setFormData({ ...formData, userPlan: selectedPlan });
      setSelectedPlanData(selectedPlan);
    }
  };

  const hasPlanIdSix = plans.some(plan => plan.id === '6' && plan.is_active === true);
  const buttonAction = hasPlanIdSix ? 'Renew my plan' : 'Go to payment';

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

            <VStack px={3} spacing={4} alignItems="flex-start">
              <Text fontSize="sm" fontWeight="semibold">
                WHAT'S INCLUDED
              </Text>
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
      <Card id={'1'} bg='gray.50' mt={5} w='100%' h='auto'>
        <CardBody>
          <Heading size='sm' textAlign='center' color={'blue.500'} mb={4}>YOUR SELECTED PLAN:</Heading>
          <Box bg='lightblue' w='100%' mb={3} h='5vh' display='flex' alignItems='center' justifyContent='center'>
            <Heading size='sm' textAlign='center' color={'blue.500'}>{plan.name}</Heading>
          </Box>

          <Stack mt='5'>
            <Box w='100%' mb={1} h='auto' display='flex' alignItems='center' justifyContent='center'>
              <Heading size='md' textAlign='center' color={'blue.500'}>{plan.price}</Heading>
            </Box>
          </Stack>
        </CardBody>
      </Card>
    );
  }

  return (
    <Modal
      initialFocusRef={initialRef}
      finalFocusRef={finalRef}
      isOpen={isOpen}
      onClose={onClose}
      size={showRegisterForm ? 'xl' : 'full'}
    >
      <ModalOverlay />

      {!showRegisterForm ? (
        <ModalContent>
          <ModalHeader color="gray.700">Select your new plan</ModalHeader>
          <ModalCloseButton color="gray.700" />

          <Text top={-5} ml={6} color="gray.200" fontSize={'sm'}>
            The avaliable plans are these ones:
          </Text>

          <Box ml={6} w={'94%'} justifyContent={'center'} alignItems={'center'}>
            <Divider mt={2} />
          </Box>

          <ModalBody mt={5}>
            <>
              <VStack spacing={2} w='100%' mx='auto' pb={3} px={3}>
                <SimpleGrid columns={{ base: 1, md: 2, lg: 2, xl: 4 }} spacing={5}>
                  {plans
                    .filter((plan: any) => plan.is_active === true)
                    .map((plan, index) => (
                      <PlanButton
                        key={index}
                        plan={plan}
                        planSelected={planSelected}
                        handlePlanSelected={handlePlanSelected}
                      />
                    ))}
                </SimpleGrid>
              </VStack>
            </>
          </ModalBody>

          <ModalFooter gap={3}>
            <Button onClick={onClose} bg="red.300" color={'white'}>Return</Button>
            <Button
              disabled={!selectedPlanData}
              bg='blue.300'
              color={'white'}
              mr={3}
              isLoading={isLoading}
              onClick={hasPlanIdSix ? handleFreePlan : GoToPayment}
            >
              {buttonAction}
            </Button>

          </ModalFooter>

        </ModalContent>
      ) : (

        <ModalContent>
          <ModalHeader color="gray.700">Select your payment</ModalHeader>
          <ModalCloseButton color="gray.700" />

          <Text top={-10} ml={6} color="gray.200" fontSize={'xs'}>
            Now it´s time to perform your payment and enjoy the new features.
          </Text>

          <Box ml={6} w={'94%'} justifyContent={'center'} alignItems={'center'}>
            <Divider mt={2} />
          </Box>

          <ModalBody mt={5}>
            <VStack spacing={2} w='100%' mx='auto'>
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
                    value={formPaymentData.cardHolderName}
                    onChange={handleCardHolderName}
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

                <PlanDetails plan={plans.find((plan) => plan.id === planSelected) || null} />
              </>
            </VStack>
          </ModalBody>

          <ModalFooter gap={3}>
            <Button onClick={OriginalState} bg="red.300" color={'white'}>Return</Button>
            <Button type="submit" bg='blue.300' color={'white'} mr={3} isLoading={isLoading} onClick={handleSaveData}>
              Confirm payment
            </Button>
          </ModalFooter>
        </ModalContent>
      )
      }
      <ToastContainer />
    </Modal>
  )
}