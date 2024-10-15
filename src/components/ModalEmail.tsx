import { Button, FormControl, FormLabel, Heading, Modal, ModalBody, ModalCloseButton, ModalContent,
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

interface ModalEmailProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
}

type FormDataProps = {
  name: string;
  email: string;
  message: string;
  company_name: string;
}

export default function ModalEmail({ isOpen, onClose, title }: ModalEmailProps) {

  const initialRef = React.useRef(null)
  const finalRef = React.useRef(null)
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  async function handleGoHome() {
    setIsLoading(true)
    await new Promise(resolve => setTimeout(resolve, 500));
    navigate('/');
    setIsLoading(false)
  }

  const ModalEmailFormSchema = yup.object().shape({
    name: yup.string().required('Insert your name'),
    email: yup.string().required('Insert your email').email('Invalid E-mail'),
    message: yup.string().required('Insert your message'),
    company_name: yup.string().required('Insert your company'),
  });

  const { register, handleSubmit, formState } = useForm<FormDataProps>({
    resolver: yupResolver(ModalEmailFormSchema)
  });

  const { errors } = formState

  async function handleSendEmail({ name, email, message, company_name }: FormDataProps) {
    setIsLoading(true);

    try {
      const response = await api.post('/send_email/send_email_contact.php', {
        full_name: name,
        email: email,
        company_name: company_name,
        message: message,
      });

      if (response?.data) {
        toast.success(response.data.message, {
          position: "top-center",
          autoClose: 2000,
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
          Our team will reply to your request as soon as possible.
        </Heading>
        <ModalCloseButton color="gray.700" />

        <ModalBody py={4}>
          <VStack px={'auto'} spacing={3}>
            <Stack w={'100%'}>
              <FormControl>
                <FormLabel color="gray.700">Full name</FormLabel>
                <InputLogin
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
                <FormLabel color="gray.700">Email</FormLabel>
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
                <FormLabel color="gray.700">Company name</FormLabel>
                <InputLogin
                  name='company_name'
                  type={'text'}
                  error={errors.company_name}
                  register={register}
                  options={{
                    required: 'Insert your company name.',
                  }}
                />
              </FormControl>
            </Stack>

            <Stack w={'100%'}>
              <FormControl>
                <FormLabel color="gray.700">Message</FormLabel>
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