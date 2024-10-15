import { FormControl, FormErrorMessage, FormLabel, Select as ChakraSelect, 
    SelectProps as ChakraSelectProps } from "@chakra-ui/react";
import {forwardRef, ForwardRefRenderFunction} from 'react';
import {FieldError} from 'react-hook-form';

interface SelectProps extends ChakraSelectProps{
    name: string;
    label?: string;
    error?: FieldError;
    option: any;
}

const SelectBase: ForwardRefRenderFunction<HTMLSelectElement, SelectProps> 
= ({name, label, error=undefined, option, ...rest}: SelectProps, ref) =>{

    return (
        <FormControl isInvalid={!!error}> 
            {!! label && <FormLabel htmlFor={name}>{label}</FormLabel> }

            <ChakraSelect 
                name={name} 
                id={name}
                focusBorderColor='orange.500'
                bg="gray.900"
                variant="filled"
                _hover={{
                    bg: 'gray.900'
                }}
                ref={ref}
                size="lg"
                {...rest}                
            >   
                <option disabled selected ></option>
                {option}
                
            </ChakraSelect>
            {!!error && (
                <FormErrorMessage>
                    {error.message}
                </FormErrorMessage>
            )}           
            
        </FormControl> 
    );
}

export const Select = forwardRef(SelectBase);