
import { Box, Button, FormLabel, Heading, Link, Switch, useColorModeValue,
  Flex, Stack, Text, Image, VStack, FormControl, InputGroup, HStack
} from "@chakra-ui/react";

import { useState } from 'react';

import landscape from "../assets/landscape.jpg";
import logosite from "../assets/logosite.png";

import DefaultAuth from "../components/DefaultAuth";
import ForgotPassword from "../components/ForgotPassword";
import InputLogin from "../components/InputLogin";
import Header from "../components/Header";
import NewAccount from "../components/NewAccount";

import * as yup from 'yup'
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup"

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { toastApiResponse } from "../components/Toast";

type FormDataProps = {
  email: string;
  password: string;
}

export default function Login() {

  const { signIn } = useAuth();

  const navigate = useNavigate();
  const textColor = useColorModeValue("navy.700", "gray.100");
  const textColorSecondary = "gray.400";

  const [isLoading, setIsLoading] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [showRegisterForm, setShowRegisterForm] = useState(false);

  const handleForgotPassword = () => {
    setShowForgotPassword(true);
  };

  const OriginalState = () => {
    setShowRegisterForm(!showRegisterForm)
    setShowForgotPassword(false);
  };

  const signInFormSchema = yup.object().shape({
    email: yup.string().required('Insert your email').email('Invalid E-mail'),
    password: yup.string().required('Password is required').min(6, 'minimum 6 characters'),
  });

  const { register, handleSubmit, formState } = useForm<FormDataProps>({
    resolver: yupResolver(signInFormSchema)
  });

  const { errors } = formState

  async function handleSignIn({ email, password }: FormDataProps) {
    try {
      setIsLoading(true)      
      const res = await signIn(email, password);
      
      if (res?.success === true) {
        toastApiResponse(null, 'Login successful!');
        await new Promise((resolve) => setTimeout(resolve, 2000));
        navigate(`/dashboard`);
      } else {
        toastApiResponse('error', res.message); 
      }
      setIsLoading(false);

    } catch (error: any) {
      console.error('Error:', error);
      setIsLoading(false);
      toastApiResponse(error, 'Invalid credentials');      
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
            <Heading color={textColor} fontSize='36px' mb='5px'>
              Boats On The Market
            </Heading>
            <Text mb='10px' ms='4px' color={textColorSecondary} fontWeight='400' fontSize='md'>
              This is your best space to sell your boat...
            </Text>

            {!showRegisterForm && (
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
            )}
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
            {!showRegisterForm ? (
              <>
                {!showForgotPassword && (
                  <VStack px={'auto'} spacing={3} mb={3} mt={5}>
                    <Stack w={'100%'} mb={3}>
                      <FormControl>
                        <InputLogin
                          placeholder='Email'
                          name='email'
                          type={'email'}
                          error={errors.email}
                          register={register}
                          options={{
                            required: 'É necessário informar um email.',
                          }}
                        />
                      </FormControl>
                    </Stack>

                    <Stack w={'100%'} mb={3}>
                      <InputGroup size={['md']}>
                        <InputLogin
                          placeholder='Password'
                          name='password'
                          error={errors?.password}
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
                      onClick={handleSubmit(handleSignIn)}
                      isLoading={isLoading}
                    >
                      Sign In
                    </Button>
                  </VStack>
                )}

                {!showForgotPassword ? (
                  <>
                    <HStack alignItems="center" justifyContent="space-between" px={'auto'}>
                      <FormControl display='flex' alignItems='left' gap={1}>
                        <Switch size={'sm'} id='email-alerts' />
                        <FormLabel htmlFor='email-alerts' mb='0' fontSize={'sm'}>
                          Remember Me
                        </FormLabel>
                      </FormControl>

                      <Box w='40%'>
                        <Link
                          href="#"
                          onClick={handleForgotPassword}
                        >
                          <Text color="blue.500" fontSize="sm" mb={3} fontFamily="body" mt={3}>
                            Forgot Password
                          </Text>
                        </Link>
                      </Box>
                    </HStack>

                    <VStack p={'auto'} spacing={3} mt={10}>
                      <Text fontSize="14" color="gray.700" textAlign='center'>
                        Don't Have An Account Yet, Sign Up Here
                      </Text>

                      <Button
                        bg={'blue.200'}
                        w={'full'}
                        height={'3rem'}
                        mb={1}
                        color={'white'}
                        onClick={() => setShowRegisterForm(!showRegisterForm)}
                      >
                        Register Your Account
                      </Button>
                    </VStack>
                  </>

                ) : (
                  <ForgotPassword onClick={() => setShowRegisterForm(!showRegisterForm)} />
                )}
              </>

            ) : (
              <NewAccount onClick={OriginalState} />
            )
            }
          </Flex>
        </Flex>
        <ToastContainer />
      </DefaultAuth>
    </Flex>
  );
}

