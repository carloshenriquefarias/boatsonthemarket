// import { Button, VStack, Text, Center, Image } from "@chakra-ui/react";

// function ButtonType({ id, label, image, isSelected, onClick, width, height} : any) {
//   return (
//     <Button
//       id={id}
//       w="100%"
//       h="10vh"
//       bg={isSelected ? "lightblue" : "white"}
//       color={isSelected ? "gray.300" : "gray.400"}
//       onClick={() => {
//         onClick(label);
//       }}
//       borderWidth={isSelected ? "3px" : "1px"}
//       borderColor={isSelected ? "blue.300" : "gray.400"}
//     >
//       <VStack>
//         <Text>{label}</Text>
//         <Center width={["4rem", "5rem", "6rem"]}>
//           <Image
//             src={image}
//             width={width}
//             height={height}
//             objectFit="fill"
//             alignSelf={'center'}
//             justifySelf={'center'}
//           />
//         </Center>  
//       </VStack>
//     </Button>
//   );
// }

// export default ButtonType;

import React from 'react';
import { Button, VStack, Text, Center, Image, ImageProps } from "@chakra-ui/react";

interface ButtonTypeProps {
  id: any;
  label: string;
  image?: React.ReactNode; // Aceita qualquer nó React, incluindo componentes de imagem ou ícones
  isSelected: boolean;
  onClick: (label: string) => void;
  width?: ImageProps['width'];
  height?: ImageProps['height'];
  iconSize?: string; // Adicionado para especificar o tamanho do ícone
}

function ButtonType({ id, label, image, isSelected, onClick, width, height, iconSize }: ButtonTypeProps) {
  return (
    <Button
      id={id}
      w="100%"
      h="10vh"
      bg={isSelected ? "lightblue" : "white"}
      color={isSelected ? "gray.300" : "gray.400"}
      onClick={() => onClick(label)}
      borderWidth={isSelected ? "3px" : "1px"}
      borderColor={isSelected ? "blue.300" : "gray.400"}
    >
      <VStack>
        <Text>{label}</Text>
        <Center width={["4rem", "5rem", "6rem"]}>
          {typeof image === "string" ? (
            <Image
              src={image}
              width={width}
              height={height}
              objectFit="fill"
              alignSelf={'center'}
              justifySelf={'center'}
            />
          ) : (
            <Center width={width || iconSize || "1rem"} height={height || iconSize || "1rem"}>
              {image}
            </Center>
          )}
        </Center>  
      </VStack>
    </Button>
  );
}

export default ButtonType;


