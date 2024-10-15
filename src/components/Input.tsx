import { FormControl, FormErrorMessage, FormLabel, Input as ChakraInput, 
    InputProps as ChakraInputProps } from "@chakra-ui/react";
import {forwardRef, ForwardRefRenderFunction} from 'react';
import {FieldError} from 'react-hook-form';

interface InputProps extends ChakraInputProps{
    name: string;
    label?: string;
    error?: FieldError;
}

const InputBase: ForwardRefRenderFunction<HTMLInputElement, InputProps> 
    = ({name, label, error=undefined, ...rest}: InputProps, ref) =>{

    return (
        <FormControl isInvalid={!!error}> 
            {!! label && <FormLabel htmlFor={name}>{label}</FormLabel> }

            <ChakraInput 
                name={name} 
                id={name}
                focusBorderColor='blue.200'
                bg="gray.50"
                variant="filled"
                _hover={{
                    bg: 'gray.50'
                }}
                ref={ref}
                size="lg"
                {...rest}
            />
            {!!error && (
                <FormErrorMessage>
                    {error.message}
                </FormErrorMessage>
            )}
            
        </FormControl> 
    );
}

export const Input = forwardRef(InputBase);