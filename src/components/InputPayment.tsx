import {
    Flex, FormControl, FormErrorMessage, FormLabel,
    Input as ChakraInput, InputProps as ChakraInputProps,
  } from '@chakra-ui/react';
  import { RegisterOptions, UseFormRegister } from 'react-hook-form';
  import { IconType } from 'react-icons/lib';
  
  type InputProps = {
    label?: string;
    name: string;
    error?: any;
    isPassword?: boolean;
    icon?: React.ReactNode | React.Component | IconType;
    register: UseFormRegister<any>;
    changeType?: () => void;
    options?: RegisterOptions;
  } & ChakraInputProps
  
  export default function InputPayment({ label, name, error, register, options, changeType, ...rest }: InputProps) {
  
    return (
      <FormControl isInvalid={!!error}>
        <Flex flexDir='column' gap='2px' {...rest}>
          <>
            {label && (
              <FormLabel fontWeight={500} htmlFor={name}>{label}</FormLabel>
            )}
  
            <ChakraInput
              size='md'
              focusBorderColor='blue.500'
              fontSize='sm'
              type={'text'}
              autoComplete={"off"}
  
              _placeholder={{ color: 'gray.400' }}
  
  
              {...register(name, options)}
              {...rest}
            />
  
            {!!error && (
              <FormErrorMessage fontSize='0.7rem' alignItems='center' marginTop='0.3rem' color='red'>
                <>
                  {error.message}
                </>
              </FormErrorMessage>
            )}
          </>
        </Flex>
      </FormControl>
    );
}