import { Center, Image } from "@chakra-ui/react";
import logo from '../assets/logov4.png'

export function Logo() {
  return (    
    <Center width={["10.75rem", "12.75rem", "15.75rem"]}>
      <Image
        src={logo}
        width={'auto'}
        objectFit="fill"
        alignSelf={'center'}
        justifySelf={'center'}
      />
    </Center>    
  )
}
