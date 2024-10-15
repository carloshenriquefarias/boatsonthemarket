import { Box, Button, FormControl, InputGroup, Stack, VStack, Text, FormErrorMessage, 
Flex, Center, IconButton } from "@chakra-ui/react";
import { useState } from "react";

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import * as yup from 'yup'
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { useDropzone } from "react-dropzone";
import { BsTrash } from "react-icons/bs";

import { HSeparator } from "./Separator";
// import { api } from "../services/api";
import InputLogin from "./InputLogin";
import { toastApiResponse } from "./Toast";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

interface CustomFile extends File {
  preview: string;
}

type FormDataProps = {
  photo?: string | any;
  name: string;
  email: string;
  password: string;
  password_confirm: string;
}

interface FormRegisterProps {
  onClick: () => void;
}

export default function NewAccount({ onClick }: FormRegisterProps) {

  const { signUp } = useAuth();

  const [isLoading, setIsLoading] = useState(false);
  const [files, setFiles] = useState<CustomFile[]>([]);

  const navigate = useNavigate();

  const { getRootProps, getInputProps } = useDropzone({
    maxFiles: 1,
    accept: {
      "image/png": [".png", ".jpg"],
      "text/html": [".html", ".htm"],
    },
    onDrop: (acceptedFiles) => {
      const updatedFiles: CustomFile[] = acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      );
      setFiles(updatedFiles);
    },
  });

  const removeFile = (fileToRemove: CustomFile) => {
    const updatedFiles = files.filter((file) => file !== fileToRemove);
    setFiles(updatedFiles);
  };

  const Preview = files.map((file) => (
    <Box key={file.name} borderWidth="1px" borderRadius="lg" p={1} m={2} position="relative">
      <IconButton
        aria-label="Excluir"
        bg="red.500"
        size="xs"
        onClick={() => removeFile(file)}
        position="absolute"
        top={0}
        right={0}
        zIndex={1}
      >
        <Box color="white">
          <BsTrash />
        </Box>
      </IconButton>

      <Box
        position="relative"
        w="100px"
        h="100px"
        bg="gray.500"
        display="flex"
        alignItems="center"
        justifyContent="center"
        cursor={'pointer'}
        overflow="hidden"  
      >
        {file.type.startsWith("image/") ? (
          <img
            src={file.preview}
            alt={file.name}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        ) : (
          <iframe src={file.preview} title={file.name} width="100%" height="100%" />
        )}
      </Box>
    </Box>
  ));

  const NewAccountFormSchema = yup.object().shape({
    // photo: yup
    //   .mixed()
    //   .test('photoRequired', 'Photo is required', () => {
    //     return !!files.length;
    //   }),
    name: yup.string().required('Insert your name'),
    email: yup.string().required('Insert your email').email('Invalid E-mail'),
    password: yup.string().required('Password is required').min(6, 'minimum 6 characters'),
    password_confirm: yup.string()
      .required('Confirm password.')
      .oneOf([yup.ref('password')], 'The confirmation password are not correct. Try again')
  });

  const { register, handleSubmit, formState } = useForm<FormDataProps>({
    resolver: yupResolver(NewAccountFormSchema)
  });

  const { errors } = formState

  async function handleSignUp({ name, email, password, password_confirm }: FormDataProps) {
    try {
      setIsLoading(true);
      await signUp(name, email, password, password_confirm );
      await new Promise((resolve) => setTimeout(resolve, 2000));    
      setIsLoading(false);  

    } catch (error: any) {
      console.error('Error:', error);
      toastApiResponse(error, 'Have ocorred an error to conect to servidor, please try again later');

    } finally {
      navigate(`/editprofile`);
    }
  }

  return (
    <Stack
      spacing="4"
      w="100%"
      h="90%"
      borderRadius={8}
    >
      <FormControl isInvalid={!!errors.photo} mt={5}>
        <VStack spacing={4}>
          <Center w='80%'>
            <Box
              {...getRootProps({ className: "dropzone" })}
              w="80px"
              h="80px"
              borderRadius="full"
              borderStyle="dashed"
              borderColor="blue.300"
              bg="gray.100"
              display="flex"
              alignItems="center"
              justifyContent="center"
              borderWidth={2}
              cursor={'pointer'}
            >
              <input {...getInputProps()} />
              {Preview}
            </Box>
          </Center>
        </VStack>
        {errors.photo && typeof errors.photo.message === 'string' && (
          <FormErrorMessage fontSize={'xs'} justifyContent={'center'} textAlign={'center'} mt={5}>
            {errors.photo.message}
          </FormErrorMessage>
        )}
      </FormControl>

      <Text fontSize="sm" fontWeight="thin" mt={3} textAlign={'center'}>
        {files.length === 1 ? 'This is your image selected' : 'Select your photo'}
      </Text>

      <VStack px={'auto'} spacing={3}>
        <Stack w={'100%'}>
          <FormControl>
            <InputLogin
              placeholder='Full name'
              name='name'
              type={'text'}
              error={errors.name}
              register={register}
              options={{
                required: 'Insert your name.',
              }}
            />
          </FormControl>
        </Stack>

        <Stack w={'100%'}>
          <FormControl>
            <InputLogin
              placeholder='Email'
              name='email'
              type={'email'}
              error={errors.email}
              register={register}
              options={{
                required: 'Insert your email.',
              }}
            />
          </FormControl>
        </Stack>

        <Stack w={'100%'}>
          <InputGroup size={['md']}>
            <InputLogin
              placeholder='Password'
              name='password'
              error={errors?.password}
              register={register}
              isPassword
              options={{
                required: 'Insert your password'
              }}
            />
          </InputGroup>
        </Stack>

        <Stack w={'100%'}>
          <InputGroup size={['md']}>
            <InputLogin
              placeholder='Confirm your password'
              name='password_confirm'
              error={errors?.password_confirm}
              register={register}
              isPassword
              options={{
                required: 'É necessário confirmar a senha.'
              }}
            />
          </InputGroup>
        </Stack>

        <Button
          bg={'yellow.200'}
          type='submit'
          w={'full'}
          height={'3rem'}
          mb={1}
          _hover={{ bg: 'gray.500' }}
          color={'blue.200'}
          onClick={handleSubmit(handleSignUp)}
          isLoading={isLoading}
        >
          Register an account
        </Button>
      </VStack>

      <Flex align='center' mt={5}>
        <HSeparator />
        <Text color='gray.400' mx='14px'>
          or
        </Text>
        <HSeparator />
      </Flex>

      <VStack px={'auto'} spacing={3} pt={5}>
        <Text fontSize="14" color="gray.700" textAlign='center'>Have you already an account?</Text>
        <Button
          bg={'blue.200'}
          _hover={{ bg: 'gray.500' }}
          w={'full'}
          height={'3rem'}
          mb={1}
          color={'white'}
          onClick={onClick}
        // isLoading={isLoading}
        >
          Already registered
        </Button>
      </VStack>
      <ToastContainer />
    </Stack>
  )
}