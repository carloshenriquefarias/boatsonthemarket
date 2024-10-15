
import {
  Box, Button, FormLabel, Heading, useColorModeValue,
  Flex, Stack, Text, Image, VStack, FormControl, InputGroup,
} from "@chakra-ui/react";

import { useState } from 'react';

import landscape from "../assets/landscape.jpg";
import logosite from "../assets/logosite.png";

import DefaultAuth from "../components/DefaultAuth";
import InputLogin from "../components/InputLogin";
import Header from "../components/Header";

import * as yup from 'yup'
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup"

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useNavigate } from "react-router-dom";
import { toastApiResponse } from "../components/Toast";

type FormDataProps = {
  newPassword: string;
  confirmPassword: string;
}

export default function ForgotMyPassword() {

  const navigate = useNavigate();
  const textColor = useColorModeValue("navy.700", "gray.100");
  const textColorSecondary = "gray.400";

  const [isLoading, setIsLoading] = useState(false);

  const signInFormSchema = yup.object().shape({
    newPassword: yup.string().required('The new password is required').min(6, 'minimum 6 characters'),
    confirmPassword: yup.string().required('Confirm your new password is required').min(6, 'minimum 6 characters'),
  });

  const { register, handleSubmit, formState } = useForm<FormDataProps>({
    resolver: yupResolver(signInFormSchema)
  });

  const { errors } = formState

  async function handleResetPassword({ newPassword, confirmPassword }: FormDataProps) {
    try {
      setIsLoading(true);

      if (newPassword === confirmPassword) {
        console.log('Resetting password...');
        await new Promise((resolve) => setTimeout(resolve, 2000));
        toastApiResponse(null, 'Password reset successful!');
        setIsLoading(false);
        navigate(`/login`);
        
      } else {
        console.error('Passwords do not match.');
        toastApiResponse(null, 'The passwords do not match! Please try again.');
        setIsLoading(false);
      }
  
    } catch (error) {
      console.error('Error:', error);
      toastApiResponse(error, 'It is not possible to reset your password at this time.');
    } finally {
      setIsLoading(false);
    }
  }  

  return (
    <Flex direction="column" height="100%" bg="white">
      <Header />
      <DefaultAuth illustrationBackground={landscape} image={landscape}>
        <Flex
          maxW={{ base: "100%", md: "max-content" }}
          w='100%'
          mx={{ base: "auto", lg: "0px" }}
          h='100%'
          alignItems='center'
          justifyContent='center'
          mb={{ base: "20px", md: "40px" }}
          px={{ base: "25px", md: "0px" }}
          mt={{ base: "20px", md: "1vh" }}
          flexDirection='column'
        // overflow={'auto'}
        >
          <VStack mx='auto' justifyContent='center' alignItems='center'>
            <Heading color={textColor} fontSize={['sm', 'md', '2xl']} mb='5px'>
              Change Your New Password
            </Heading>
            <Text mb='10px' ms='4px' color={textColorSecondary} fontWeight='400' fontSize='md'>
              Do not worry if you forgot your password, it is easy to recover!
            </Text>

            <Box
              w="150px"
              h="150px"
              display="flex"
              alignItems="center"
              justifyContent="center"
              mt={2}
            >
              <Image src={logosite} />
            </Box>

          </VStack>

          <Flex
            zIndex='2'
            direction='column'
            w={{ base: "100%", md: "420px" }}
            maxW='100%'
            background='transparent'
            borderRadius='15px'
            mx={{ base: "auto", lg: "unset" }}
            me='auto'
            mb={{ base: "20px", md: "auto" }}
          >
            <VStack px={'auto'} spacing={3} mb={0} mt={5}>
              <Stack w={'100%'} mb={0}>
                <FormControl>
                  <FormLabel>Insert your new password</FormLabel>
                  <InputGroup size={['md']}>
                    <InputLogin
                      placeholder='Confirm password'
                      name='newPassword'
                      error={errors?.newPassword}
                      register={register}
                      isPassword
                      options={{
                        required: 'É necessário informar uma senha.'
                      }}
                    />
                  </InputGroup>
                </FormControl>
              </Stack>

              <Stack w={'100%'} mb={3}>
                <FormLabel>Confirm your new password</FormLabel>
                <InputGroup size={['md']}>
                  <InputLogin
                    placeholder='Confirm password'
                    name='confirmPassword'
                    error={errors?.confirmPassword}
                    register={register}
                    isPassword
                    options={{
                      required: 'É necessário informar uma senha.'
                    }}
                  />
                </InputGroup>
              </Stack>

              <Button
                bg={'yellow.500'}
                w={'full'}
                height={'3rem'}
                mb={1}
                onClick={handleSubmit(handleResetPassword)}
                isLoading={isLoading}
              >
                Reset password
              </Button>
            </VStack>
          </Flex>

        </Flex>
        <ToastContainer />
      </DefaultAuth>
    </Flex>
  );
}

