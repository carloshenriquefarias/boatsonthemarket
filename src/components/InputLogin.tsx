import {
  Box, Flex, FormControl, FormErrorMessage, FormLabel, IconButton,
  Input as ChakraInput, InputProps as ChakraInputProps, InputRightElement
} from '@chakra-ui/react';
import { useState } from 'react';
import { RegisterOptions, UseFormRegister } from 'react-hook-form';
import { IconType } from 'react-icons/lib';

import { RiEyeCloseLine, RiEyeLine } from 'react-icons/ri';

type InputProps = {
  label?: string;
  height?: string;
  name: string;
  error?: any;
  isPassword?: boolean;
  icon?: React.ReactNode | React.Component | IconType;
  register: UseFormRegister<any>;
  changeType?: () => void;
  options?: RegisterOptions;
} & ChakraInputProps

export default function InputLogin({ label, height, name, error, register, options, isPassword = false, icon, changeType, ...rest }: InputProps) {

  const [show, setShow] = useState(false);

  function handleClick() {
    show === true ? setShow(false) : setShow(true)
  }

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
            type={show ? 'text' : 'password'}
            autoComplete={"off"}
            height={height}
            _placeholder={{ color: 'gray.400' }}

            // _hover={{
            //   borderColor: 'blue.500'
            // }}

            {...register(name, options)}
            {...rest}
          />

          {(icon && !isPassword) && (
            <Box
              position={"absolute"}
              right={"12px"}
              top={label ? "46px" : "12px"}
              width={"24px"}
              height={"24px"}
              _focus={{
                fill: 'blue.500'
              }}
            >
              {icon as any}
            </Box>
          )}

          {(isPassword && !icon) && (
            <InputRightElement
              position={"absolute"}
              right={"8px"}
              width={"auto"}
              transition="180ms ease-in-out"
              _focus={{
                fill: 'blue.500'
              }}
            >
              {show ?
                <IconButton background={'transparent'} aria-label='show-password' w={'24px'} icon={<RiEyeLine />} onClick={handleClick} />
                :
                <IconButton background={'transparent'} aria-label='show-password' icon={<RiEyeCloseLine />} w={'24px'} onClick={handleClick} />
              }
            </InputRightElement>
          )}

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

// export { Input };