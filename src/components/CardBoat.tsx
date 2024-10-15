import { Box, HStack, Text, VStack, Image, useTheme, Button, SimpleGrid, Icon, Tooltip } from "@chakra-ui/react";

import { MdDisabledByDefault } from "react-icons/md";
import { RiCheckboxCircleFill } from "react-icons/ri";
import { IoIosPricetags } from "react-icons/io";

import ItemCardBoat from "./ItemCardBoat";
import boatDefault from "../assets/defaultBoat.png"
import { formatPriceWithCurrency } from "../helpers/changeCoin";

export interface CardBoatProps {
  id?: string;
  imageMainBoat: string;
  is_active?: string;
  nameBoat?: string;
  boatCategory: string;
  length: string;
  yearBoat?: string;
  maker?: string;
  city: string;
  country?: string;
  priceOrRequest?: string;
  price?: string;
  typeCoin?: string;
  onClick?: () => void;
  titleButton?: string;
  titleButtonRenewPlan?: string;
  titleButtonStatusPlan?: string;
  buttonStatusColor?: string;
  onClickRenewPlan?: () => void;
  onClickStatusPlan?: () => void;
  onClickGoToMyBoat?: () => void;
  showSecondButton?: boolean;
  showThirdButton?: boolean;
  dateExpiratePlan?: string;
  finalDate?: string;
  titlePlan?: string;
  cardInfoItems: { icon: React.ElementType; title: string; value: string }[];
  is_date_expired?: boolean;
  show_tooltip?: boolean;
}

export default function CardBoat({
  is_active,
  showSecondButton,
  showThirdButton,
  onClick,
  imageMainBoat,
  nameBoat,
  priceOrRequest,
  price,
  typeCoin,
  titleButton,
  titleButtonRenewPlan,
  titleButtonStatusPlan,
  onClickRenewPlan,
  onClickStatusPlan,
  onClickGoToMyBoat,
  buttonStatusColor,
  dateExpiratePlan,
  titlePlan,
  cardInfoItems,
  is_date_expired,
  show_tooltip,
}: CardBoatProps) {

  const { colors, sizes } = useTheme();

  const tooltipContent = (
    <VStack align="center" spacing={1}>
      {titlePlan &&
        <>
          <Box fontSize="lg" fontWeight="bold" textAlign={'center'} >
            {is_date_expired === true ? 'This plan has expired! Renew now!' : `Plan selected: ${titlePlan}`}
          </Box>
          <Box fontSize="md" fontWeight="bold">
            {is_date_expired === true ? null : `IT WILL EXPIRE IN: ${dateExpiratePlan} DAYS`}
          </Box>
        </>
      }
    </VStack>
  );

  return (
    <SimpleGrid
      bg={'blue.200'}
      columns={{ base: 1, md: 1 }}
      spacing={3}
      borderColor={'gray.200'}
      borderWidth={'1px'}
      transition="all 0.25s"
      transitionTimingFunction="spring(1 100 10 10)"
      _hover={{ transform: "translateY(-4px)", shadow: "xl" }}
      borderRadius={5}
    >
      <VStack
        w={['100%']}
        h={'auto'}
        justifyContent='center'
        alignItems='flex-start'
        px={2}
        bg={is_date_expired === false ? 'blue.500' : 'red.900'}
        _hover={{ boxShadow: is_date_expired === false ? "0 0 0 5px cyan" : "0 0 0 5px red" }}
        borderRadius={5}
      >
        <>
          <Box
            w="100%"
            h="20vh"
            display="flex"
            alignItems="center"
            justifyContent="center"
            mt={2}
            position="relative"
          >
            {is_date_expired === false && is_active === '0' ? (
              <VStack
                top={0}
                h="100%"
                w="100%"
                justifyContent="center"
                alignItems="center"
                position="absolute"
                zIndex={1}
              >
                <Box bg="gray.500" h="100%" w="100%" opacity={0.7} rounded="md" />
                <Text
                  fontFamily="heading"
                  fontSize="lg"
                  color="gray.100"
                  position="absolute"
                  zIndex={2}
                >
                  AD DISABLED
                </Text>
              </VStack>
            ) : is_date_expired === true ? (
              <VStack
                top={0}
                h="100%"
                w="100%"
                justifyContent="center"
                alignItems="center"
                position="absolute"
                zIndex={1}
              >
                <Box bg="gray.500" h="100%" w="100%" opacity={0.7} rounded="md" />
                <Text
                  fontFamily="heading"
                  fontSize="lg"
                  color="gray.100"
                  position="absolute"
                  zIndex={2}
                >
                  PLAN EXPIRED
                </Text>
              </VStack>
            ) : null}

            <Image
              src={imageMainBoat ? imageMainBoat : boatDefault}
              alt=""
              w="auto"
              height="100%"
              objectFit="cover"
              borderRadius={5}
            />
          </Box>

          {show_tooltip === true ? (
            <Tooltip
              label={tooltipContent}
              hasArrow placement="top"
              fontSize="lg"
              bg={is_date_expired === true ? 'red.500' : 'green.500'}
              color="white"
              borderRadius="md"
            >
              <VStack
                w={['100%']}
                h={'auto'}
                gap={2}
                opacity={is_date_expired === true ? 0.2 : 1}
              >
                <HStack justifyContent='space-between' alignItems='center' w='100%'>
                  {nameBoat === '' ?
                    <Box height={7} width={'auto'}></Box>
                    :
                    <Text color={"gray.200"} fontSize={["sm", "md", "lg"]} autoCapitalize="">
                      {nameBoat}
                    </Text>
                  }

                  {dateExpiratePlan && (
                    <HStack>
                      <Button
                        bg={buttonStatusColor}
                        w={'auto'}
                        size={'xs'}
                        px={1}
                        height={'2rem'}
                        fontSize={["2xs", "sm", "md"]}
                        onClick={() => !is_date_expired && onClickStatusPlan?.()}
                        leftIcon={
                          is_active === '0' ? (
                            <MdDisabledByDefault color={colors.red[500]} size={sizes[4]} />
                          ) : (
                            <RiCheckboxCircleFill color={colors.blue[500]} size={sizes[4]} />
                          )
                        }
                        disabled={is_date_expired}
                      >
                        {titleButtonStatusPlan}
                      </Button>
                    </HStack>
                  )}
                </HStack>

                {cardInfoItems.map((item, index) => (
                  <ItemCardBoat
                    key={index}
                    items={[
                      {
                        icon: item.icon,
                        title: item.title,
                        value: item.value,
                      },
                    ]}
                  />
                ))}

                <HStack justifyContent='space-between' alignItems='center' w='100%'>
                  <HStack justifyContent='space-between' alignItems='center' w='100%'>
                    <HStack>
                      <Icon as={IoIosPricetags} color={"yellow.500"} />
                      <Text fontSize={["xl", "2xl"]} fontWeight="bold" color='yellow.500' textAlign='left'>
                        {priceOrRequest === '1' ? 'Price on request' : formatPriceWithCurrency(typeCoin || 'DOLARS', price || '0')}
                      </Text>
                    </HStack>
                  </HStack>
                </HStack>
              </VStack>
            </Tooltip>
          ) : (
            <VStack
              w={['100%']}
              h={'auto'}
              gap={2}
              opacity={is_date_expired === true ? 0.2 : 1}
            >
              <HStack justifyContent='space-between' alignItems='center' w='100%'>
                {nameBoat === '' ?
                  <Box height={7} width={'auto'}></Box>
                  :
                  <Text color={"gray.200"} fontSize={["sm", "md", "lg"]} autoCapitalize="">
                    {nameBoat}
                  </Text>
                }

                {dateExpiratePlan && (
                  <HStack>
                    <Button
                      bg={buttonStatusColor}
                      w={'auto'}
                      size={'xs'}
                      px={1}
                      height={'2rem'}
                      fontSize={["2xs", "sm", "md"]}
                      onClick={() => !is_date_expired && onClickStatusPlan?.()}
                      leftIcon={
                        is_active === '0' ? (
                          <MdDisabledByDefault color={colors.red[500]} size={sizes[4]} />
                        ) : (
                          <RiCheckboxCircleFill color={colors.blue[500]} size={sizes[4]} />
                        )
                      }
                      disabled={is_date_expired}
                    >
                      {titleButtonStatusPlan}
                    </Button>
                  </HStack>
                )}
              </HStack>

              {cardInfoItems.map((item, index) => (
                <ItemCardBoat
                  key={index}
                  items={[
                    {
                      icon: item.icon,
                      title: item.title,
                      value: item.value,
                    },
                  ]}
                />
              ))}

              <HStack justifyContent='space-between' alignItems='center' w='100%'>
                <HStack justifyContent='space-between' alignItems='center' w='100%'>
                  <HStack>
                    <Icon as={IoIosPricetags} color={"yellow.500"} />
                    <Text fontSize={["xl", "2xl"]} fontWeight="bold" color='yellow.500' textAlign='left'>
                      {priceOrRequest === '1' ? 'Price on request' : formatPriceWithCurrency(typeCoin || 'DOLARS', price || '0')}
                    </Text>
                  </HStack>
                </HStack>
              </HStack>
            </VStack>
          )}
        </>

        {showThirdButton && (
          <Button
            bg={'cyan'}
            w={'full'}
            height={'2.5rem'}
            mb={showThirdButton ? 1 : 5}
            onClick={(onClickGoToMyBoat)}
          >
            See my boat
          </Button>
        )}

        <Button
          bg={is_date_expired === false ? 'yellow.500' : 'red.200'}
          w={'full'}
          height={'2.5rem'}
          mb={showSecondButton ? 1 : 5}
          onClick={(onClick)}
        >
          {titleButton}
        </Button>

        {showSecondButton && (
          <Button
            bg={'lightblue'}
            w={'full'}
            height={'2.5rem'}
            mb={5}
            onClick={(onClickRenewPlan)}
          >
            {titleButtonRenewPlan}
          </Button>
        )}
      </VStack>
    </SimpleGrid>
  );
}
