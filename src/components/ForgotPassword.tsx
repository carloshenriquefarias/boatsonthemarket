import { FormControl, VStack, Text, SimpleGrid, Button } from "@chakra-ui/react";
import { useState } from "react";
import { toastApiResponse } from "./Toast";

import * as yup from 'yup'
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import InputLogin from "./InputLogin";

interface Props {
  onClick: () => void;
}

type FormDataProps = {
  email: string;
}

export default function ForgotPassword({ onClick }: Props) {

  const [isLoadingResetPassword, setIsLoadingResetPassword] = useState(false);

  const signInFormSchema = yup.object().shape({
    email: yup.string().required('E-mail is required').email('Invalid E-mail'),
  });

  const { register, handleSubmit, formState } = useForm<FormDataProps>({
    resolver: yupResolver(signInFormSchema)
  });

  const { errors } = formState

  async function handleResetPassword() {
    try {
      setIsLoadingResetPassword(true)

      toastApiResponse(null, 'Waiting for some minutes and check your email!');
      await new Promise((resolve) => setTimeout(resolve, 3000));
      setIsLoadingResetPassword(false);
      window.location.reload();

    } catch (error: any) {
      console.error('Error:', error);
      toastApiResponse(error, 'Have ocorred an error to conect to servidor, please try again later');
    }
  }

  return (
    <SimpleGrid>
      <VStack px={'auto'} spacing={3} mt={10} mb={5}>
        <FormControl>
          <InputLogin
            placeholder='Email'
            name='email'
            type={'email'}
            error={errors.email}
            register={register}
            options={{
              required: 'Email is required.',
            }}
          />
        </FormControl>

        <Button
          bg={'yellow.500'}
          w={'full'}
          height={'3rem'}
          mb={1}
          onClick={handleSubmit(handleResetPassword)}
          isLoading={isLoadingResetPassword}
        >
          Reset password
        </Button>
      </VStack>

      <VStack spacing={3} w={'100%'} mt={5} px={'auto'}>
        <Text fontSize="14" color="gray.700" textAlign='center'>Don´t you have access?</Text>
        <Button
          bg={'blue.200'}
          w={'full'}
          height={'3rem'}
          mb={1}
          color={'white'}
          onClick={onClick}
        >
          Register an account
        </Button>
      </VStack>
    </SimpleGrid>
  )
}