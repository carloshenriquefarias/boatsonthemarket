import { Container, Box, chakra, Text, SimpleGrid, Flex, Button, Icon } from '@chakra-ui/react';
import { motion } from 'framer-motion';
export interface IFeature {
  heading: string;
  content: string;
  titleButton: string;
  icon: React.ElementType;
  onClick: () => void;
}
interface CardStatsProps {
  features: IFeature[];
}

const CardStats: React.FC<CardStatsProps> = ({ features }) => {
  return (
    <Container maxW="7xl" p={{ base: 5, md: 10 }}>
      <SimpleGrid columns={{ base: 1, sm: 2, md: 2, lg: 4, xl: 4 }} placeItems="center" spacing={4} mb={4}>
        {features.map((feature, index) => (
          <motion.div whileHover={{ translateY: -5 }}>
            <Box
              key={index}
              bg={'lightblue'}
              p={6}
              rounded="lg"
              textAlign="center"
              pos="relative"
              mt={5}
            >
              <Flex
                p={2}
                w={50}
                height={50}
                color="white"
                bgGradient="linear(to-br, #228be6, #15aabf)"
                rounded="md"
                marginInline="auto"
                pos="absolute"
                left={0}
                right={0}
                top="-1.5rem"
                boxShadow="lg"
                align="center"
                justify="center"
              >
                <Icon as={feature.icon}/>               
              </Flex>

              <chakra.h3 fontWeight="bold" fontSize={['sm', 'md', 'lg', 'xl', '2xl']} mt={6} color={'blue.500'}>
                {feature.heading}
              </chakra.h3>

              <Text fontSize={['2xs', 'xs', 'sm', 'md']} my={4} color={'blue.500'}>
                {feature.content}
              </Text>

              <Button bg='yellow.500' color={'white'} onClick={feature.onClick} fontSize={['2xs', 'xs', 'sm', 'md']}>
                {feature.titleButton}
              </Button>
            </Box>
          </motion.div>
        ))}
      </SimpleGrid>
    </Container>
  );
};

export default CardStats;