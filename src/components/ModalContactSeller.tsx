import {
  Button, FormControl, FormLabel, Heading, Modal, ModalBody, ModalCloseButton, ModalContent,
  ModalFooter, ModalHeader, ModalOverlay, Stack, VStack
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import React, { useState } from "react";

import "react-toastify/ReactToastify.min.css";
import { api } from "../services/api";

import * as yup from 'yup'
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import InputLogin from "./InputLogin";

interface ModalContactSellerProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  email_owner_boat?: string;
}

type FormDataProps = {
  fullName: string;
  email: string;
  phone_number: string;
  message: string;
  email_owner_boat?: string;
}

export default function ModalContactSeller({ isOpen, onClose, title, email_owner_boat }: ModalContactSellerProps) {

  const initialRef = React.useRef(null)
  const finalRef = React.useRef(null)
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const boatOwnerEmail = email_owner_boat

  async function handleGoHome() {
    setIsLoading(true)
    await new Promise(resolve => setTimeout(resolve, 2000));
    navigate('/listBoat');
    setIsLoading(false)
  }

  const ModalEmailFormSchema = yup.object().shape({
    fullName: yup.string().required('Insert your name'),
    email: yup.string().required('Insert your email').email('Invalid E-mail'),
    phone_number: yup.string().required('Insert your phone number'),
    message: yup.string().required('Insert your message'),
  });

  const { register, handleSubmit, formState } = useForm<FormDataProps>({
    resolver: yupResolver(ModalEmailFormSchema)
  });

  const { errors } = formState

  async function handleSendEmail({ fullName, email, message, phone_number }: FormDataProps) {
    setIsLoading(true);

    const data = {
      full_name: fullName,
      email: email,
      phone: phone_number,
      message: message,
      email_own_boat: boatOwnerEmail
    };

    console.log('data 21:27', data);
    // return

    try {
      const response = await api.post('/send_email/send_email_own_boat.php', {
        full_name: fullName,
        email: email,
        phone: phone_number,
        message: message,
        email_own_boat: boatOwnerEmail
      });

      console.log('chegou aqui ');

      if (response?.data) {
        toast.success('Seu email foi enviado com sucesso! Aguarde a resposta do vendedor!', {
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

      console.log('acabou ');

      onClose();
      setIsLoading(false);
      handleGoHome();

    } catch (error) {
      setIsLoading(true);

      toast.error('It is not possible to send this message. Please try later!', {
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
    <Modal
      initialFocusRef={initialRef}
      finalFocusRef={finalRef}
      isOpen={isOpen}
      onClose={onClose}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader color="gray.700">{title}</ModalHeader>
        <Heading color="blue.400" fontSize={'sm'} px={6}>
          Make a connection with the owner of this boat e deal with him all details!
        </Heading>
        <ModalCloseButton color="gray.700" />

        <ModalBody pb={6}>
          <VStack px={'auto'} spacing={3}>
            <Stack w={'100%'}>
              <FormControl>
                <FormLabel color="gray.700">Full name</FormLabel>
                <InputLogin
                  name='fullName'
                  type={'text'}
                  error={errors.fullName}
                  register={register}
                  options={{
                    required: 'Insert your name.',
                  }}
                />
              </FormControl>
            </Stack>

            <Stack w={'100%'}>
              <FormControl>
                <FormLabel color="gray.700">Insert your email</FormLabel>
                <InputLogin
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
              <FormControl>
                <FormLabel color="gray.700">Phone number</FormLabel>
                <InputLogin
                  name='phone_number'
                  type={'text'}
                  // height={"14rem"}
                  error={errors.phone_number}
                  register={register}
                  options={{
                    required: 'Insert your phone number.',
                  }}
                />
              </FormControl>
            </Stack>

            <Stack w={'100%'}>
              <FormControl>
                <FormLabel color="gray.700">Message to seller</FormLabel>
                <InputLogin
                  name='message'
                  type={'text'}
                  height={"14rem"}
                  error={errors.message}
                  register={register}
                  options={{
                    required: 'Insert your message.',
                  }}
                />
              </FormControl>
            </Stack>
          </VStack>
        </ModalBody>

        <ModalFooter gap={3}>
          <Button onClick={onClose} bg="red.300" color={'white'}>Return</Button>
          <Button
            bg='blue.300'
            color={'white'}
            type='submit'
            mr={3}
            isLoading={isLoading}
            onClick={handleSubmit(handleSendEmail)}
          >
            Send Email
          </Button>
        </ModalFooter>
      </ModalContent>
      <ToastContainer />
    </Modal>
  )
}