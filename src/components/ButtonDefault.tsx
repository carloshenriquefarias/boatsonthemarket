import { Button as ChakraButton, ButtonProps as ChakraButtonProps } from '@chakra-ui/react';

type ButtonProps = ChakraButtonProps 

export function ButtonDefault({ children, ...rest }: ButtonProps) {
  return (
    <ChakraButton
      color="white"
      fontSize="md"
      size="md"
      colorScheme="green"
      cursor={'pointer'}
      {...rest}
    >
      {children}
    </ChakraButton>
  );
}