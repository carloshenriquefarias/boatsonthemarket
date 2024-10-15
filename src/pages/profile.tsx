
import {
  Box,
  Button,
  FormLabel,
  Heading,
  Link,
  Switch,
  useColorModeValue,
} from "@chakra-ui/react";

import { Flex, Stack, Text, Image, VStack, FormControl, InputGroup, HStack } from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import landscape from "../assets/landscape.jpg";
import logosite from "../assets/logosite.png";
import DefaultAuth from "../components/DefaultAuth";
import ForgotPassword from "../components/ForgotPassword";
import InputLogin from "../components/InputLogin";

import * as yup from 'yup'
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup"

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NewAccount from "../components/NewAccount";
import { useNavigate } from 'react-router-dom';

type FormDataProps = {
  email: string;
  password: string;
}

export default function Profile() {
  const textColor = useColorModeValue("navy.700", "gray.100");
  const textColorSecondary = "gray.400";
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  // const { signIn } = useAuth();
  // const router = useRouter();
  // const { sizes } = useTheme();

  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [showRegisterForm, setShowRegisterForm] = useState(false);

  const handleForgotPassword = () => {
    setShowForgotPassword(true);
  };

  // const handleHidePassword = () => {
  //   setShowForgotPassword(false);
  // };

  const OriginalState = () => {
    setShowRegisterForm(!showRegisterForm)
    setShowForgotPassword(false);
  };

  function handleClickRegisterMyBoat() {
    navigate('/registerBoatBasic');
  }

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
      console.log(email, password);
      handleClickRegisterMyBoat()
      // await signIn(email, password);

      toast.success('Seu login foi realizado com sucesso!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });

      setIsLoading(false);
      return

      // handleGoHome()

    } catch (error) {

      // const isAppError = error instanceof AppError
      // const title = isAppError ? error.message : 'Não foi possível entrar agora! Tente mais tarde!'
      const title = 'Não foi possível entrar agora! Tente mais tarde!'

      toast.error(title, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });

    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    setTimeout(() => { }, 3000)
  }, [])

  return (
    <DefaultAuth illustrationBackground={landscape} image={landscape}>
      <Flex
        maxW={{ base: "100%", md: "max-content" }}
        w='100%'
        mx={{ base: "auto", lg: "0px" }}
        // me='auto'
        h='100%'
        alignItems='center'
        justifyContent='center'
        mb={{ base: "20px", md: "40px" }}
        px={{ base: "25px", md: "0px" }}
        mt={{ base: "20px", md: "5vh" }}
        flexDirection='column'
        // overflow={'auto'}
        // bg='red'
      >
        <VStack mx='auto' justifyContent='center' alignItems='center'>
          <Text
            mb='5px'
            // ms='4px'
            color={textColorSecondary}
            fontWeight='400'
            fontSize='sm'
          >
            Before select your plan, please login our plataform
          </Text>
          <Heading color={textColor} fontSize='36px' mb='5px'>
            Super Boats
          </Heading>
          <Text
            mb='10px'
            ms='4px'
            color={textColorSecondary}
            fontWeight='400'
            fontSize='sm'
          >
            This is your space to sell, buy or rent your boat...
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
                    {/* <Checkbox pr={10} value='password' color="gray.500" size='sm'>
                      Remember my password
                    </Checkbox> */}
                    <FormControl display='flex' alignItems='left' gap={1}>
                      <Switch size={'sm'} id='email-alerts' />
                      <FormLabel htmlFor='email-alerts' mb='0' fontSize={'sm'}>
                        Remember me
                      </FormLabel>
                    </FormControl>

                    <Box w='40%'>
                    <Link
                      href="#"
                      onClick={handleForgotPassword}
                    >
                      <Text color="blue.500" fontSize="sm" mb={3} fontFamily="body" mt={3}>
                        Forgot password
                      </Text>
                    </Link>
                    </Box>
                  </HStack>

                  <VStack p={'auto'} spacing={3} mt={10}>
                    <Text fontSize="14" color="gray.700" textAlign='center'>
                      Don´t you have access?
                    </Text>

                    {/* <ButtonDefault
                      title="Criar uma conta"
                      size="total"
                      variant="default"
                      onClick={() => setShowRegisterForm(!showRegisterForm)}
                    // isLoading={isLoading}
                    /> */}

                    <Button
                      bg={'blue.200'}
                      w={'full'}
                      height={'3rem'}
                      mb={1}
                      color={'white'}
                      onClick={() => setShowRegisterForm(!showRegisterForm)}
                    >
                      Register an account
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
    </DefaultAuth>
  );
}

