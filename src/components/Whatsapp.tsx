import { Button, Icon, Text } from '@chakra-ui/react';
import { IoLogoWhatsapp } from "react-icons/io";

function openWhatsApp() {
  const phoneNumber = '1234567890';
  const whatsappLink = `https://wa.me/${phoneNumber}`;
  window.open(whatsappLink, '_blank');
}

export default function WhatsApp() {
  return (
    <div>
      <Button onClick={openWhatsApp} colorScheme="green" size={'md'} gap={3}>
        <Icon as={IoLogoWhatsapp} />
        <Text>Whatsapp</Text> 
      </Button>
    </div>
  );
}
