'use client'
import {
  Box, Heading, Tab, TabList, TabPanel, TabPanels, Tabs, Table, Tr, Tbody, Td,
  Center, VStack, Text, Divider, useBreakpointValue, HStack, SimpleGrid, Stack
} from "@chakra-ui/react";

import { useParams } from 'react-router-dom';
import { useEffect, useState } from "react";

import { api } from "../services/api";
import { BoatDataGlobal } from '../mock/motorYatchs';
import { motion } from "framer-motion";
import { toastApiResponse } from "./Toast";
import { formatPriceWithCurrency } from "../helpers/changeCoin";

import Gallery from "./Gallery";
import TextViewer from "./TextViewer";
import Loading from "./Loading";

export default function TabsBoat() {

  const { id: boatId } = useParams<{ id: string }>();

  const [allDataBoat, setAllDataBoat] = useState<BoatDataGlobal[] | undefined>();
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);

  // const [muted, setMuted] = useState(true);
  // const videoRef = useRef<HTMLIFrameElement | null>(null);

  const boatCurrency = allDataBoat?.find((dataBoat) => dataBoat.id === boatId);
  const [contents, setContents] = useState([
    { title: "General Description", content: "" },
    { title: "Technical Specifications", content: "" },
    { title: "Owner's Comments", content: "" },
    { title: "Additional Information", content: "" },
    { title: "Other Details", content: "" }
  ]);

  const videoHeight = useBreakpointValue({ base: '20rem', md: '30rem', lg: '40rem' });
  const feet = 0.3048;
  const litres = 3.785;

  // const handleToggleMute = () => {
  //   setMuted((prevMuted) => !prevMuted);
  // };

  // const ConvertStringToHTML = ({ content }: any) => {
  //   return (
  //     <div dangerouslySetInnerHTML={{ __html: content }} />
  //   );
  // };  

  async function fetchBoatDetails() {
    setLoading(true);
    try {
      const response = await api.get(`/list_boat_by_id.php?id=${boatId}`);
      setAllDataBoat(response.data);
     
      setTimeout(() => {
        setLoading(false);
      }, 1000);

    } catch (error) {
      console.error('Error:', error);
      toastApiResponse(error, 'It is not possible to load boat details');
    }
  };

  function formatYouTubeUrl(url: any) {
    if (!url) return ''; // Retorna uma string vazia se o URL for falso
    const id = url.split('v=')[1]; // Assume formato "watch"
    const embedUrl = `https://www.youtube.com/embed/${id}`;
    return embedUrl;
  }

  function VideoPlayer({ videoUrl, videoHeight }: any) {
    const formattedUrl = formatYouTubeUrl(videoUrl);

    return (
      <Box mt={5} mb={5} w="100%" height={videoHeight} bg='gray.700'>
        <iframe
          width="100%"
          height="100%"
          src={formattedUrl}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          title="YouTube Video"
        ></iframe>
      </Box>
    );
  };

  useEffect(() => {
    if (boatCurrency?.boatDescription) {
      setContent(boatCurrency.boatDescription);
    }
  }, [boatCurrency]);

  useEffect(() => {
    if (boatCurrency) {
      setContents([
        { title: "Accommodations", content: boatCurrency.accommodations || "" },
        { title: " Navigation System", content: boatCurrency.navigationSistem || "" },
        { title: "Galley Equipment", content: boatCurrency.galleryEquipment || "" },
        { title: "Deck and Hull", content: boatCurrency.deckAndHull || "" },
        { title: "Mechanical Equipment", content: boatCurrency.mechanicalEquipment || "" },
        { title: "Additional Equipment", content: boatCurrency.additionalEquipment || "" },
      ]);
    }
  }, [boatCurrency]);

  useEffect(() => {
    fetchBoatDetails();
  }, [boatId]);

  if (!boatCurrency) {
    return <Text color={'white'}>This boat can not be found!</Text>;
  }

  return (
    <>
      {loading ?
        <Stack spacing={2} my={20} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Loading/>
        </Stack>
        :
        <div>
          <motion.div
            initial={{ opacity: 0, x: -150 }}
            whileInView={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -150 }}
            transition={{ duration: 1 }}
          >
            <Center w="100%" maxWidth={1000} marginX="auto" mt={5}>
              <VStack>
                <Heading>{boatCurrency.nameBoat}</Heading>
                <Text fontSize='lg' me='26px' textAlign={'center'} fontWeight={'bold'}>
                  {boatCurrency.boatCondition} / {boatCurrency.boatType} / {boatCurrency.boatCategory}
                </Text>
                <Divider my={5} />
              </VStack>
            </Center>
          </motion.div>

          <Center w="100%" maxWidth={1000} h={'auto'} marginX="auto" mt={2}>
            <Gallery />
          </Center>

          {/* <Center w="100%" maxWidth={1000} h={'auto'} marginX="auto" mt={2}>
        <div>
          <h1>Multi-Editor Page</h1>
          <form onSubmit={handleSubmit}>
            {contents.map((content, index) => (
              <ReusableEditor
                key={index}
                placeholder={`Escreva algo para o Editor ${index + 1}...`}
                content={content}
                setContent={(newContent: any) => handleSetContent(index, newContent)}
              />
            ))}
            <button type="submit">Enviar Formulário</button>
          </form>
        </div>
      </Center> */}


          {/* <Center w="100%" maxWidth={1000} h={'auto'} marginX="auto" mt={2}>
        <div>
          <h1>Editor Section</h1>
          <EditorComponent
            content={content}
            setContent={setContent}
            placeholder="Type something amazing..."
            handleSave={handleSave}
          />
        </div>
      </Center> */}

          <SimpleGrid
            columns={{ base: 1 }}
            spacing={2}
            alignItems="left"
            justifyContent="flex-start"
            w="100%"
            maxWidth={1000}
            marginX="auto"
            mt={5}
            px={4}
          >
            <Heading fontSize='xl' mt={0}>{boatCurrency.nameBoat}</Heading>

            {boatCurrency.priceOrRequest === '1' ?
              <HStack justifyContent='flex-start' alignItems='center' w={'100%'}>
                <Heading fontSize={["md", "lg"]} mt={0} color='gray.500'>
                  Price on request
                </Heading>
              </HStack>
              :
              <HStack justifyContent='flex-start' alignItems='center' w={'100%'}>
                <Heading fontSize={["md", "lg"]} mt={0} color='gray.500'>
                  Price:
                </Heading>
                <Heading fontSize={["md", "lg"]} mt={0} color='gray.500'>
                  {formatPriceWithCurrency(boatCurrency.typeCoin || 'DOLARS', boatCurrency.price || '0')}
                </Heading>
              </HStack>
            }

            <Heading fontSize='lg' mt={0} color='gray.500'>Maker: {boatCurrency.maker}</Heading>
            <Heading fontSize='lg' mt={0} color='gray.500'>Model: {boatCurrency.model}</Heading>
            <Heading fontSize='lg' mt={0} color='gray.500'>Location: {boatCurrency.city} | {boatCurrency.country}</Heading>
            <Heading fontSize='lg' mt={0} color='gray.500'>Announced in: {boatCurrency.date_registed}</Heading>
          </SimpleGrid>

          <Tabs w="100%" maxWidth={1000} justifyContent={'center'} alignItems={'center'} marginX="auto" mt={5}>
            <motion.div
              initial={{ opacity: 0, y: -50 }}
              whileInView={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 150 }}
              transition={{ duration: 0.8 }}
            >
              <Tabs isManual variant='enclosed'>
                <TabList>
                  <Tab fontSize={['2xs', 'xs', 'sm', "md", "lg"]}>DESCRIPTION</Tab>
                  <Tab fontSize={['2xs', 'xs', 'sm', "md", "lg"]}>MAIN DETAILS</Tab>

                  {boatCurrency.engines && boatCurrency.engines.length > 0 ?
                    <Tab fontSize={['2xs', 'xs', 'sm', "md", "lg"]}>ENGINES</Tab>
                    : null
                  }

                  {boatCurrency.linkVideo === '' ? null :
                    <Tab fontSize={['2xs', 'xs', 'sm', "md", "lg"]}>VIDEO</Tab>
                  }
                </TabList>

                <TabPanels>
                  <TabPanel>
                    <Box my={5} w={'100%'} height={'auto'} bg={'white'} gap={3}>
                      <Heading fontSize='lg' my={2}>Boat description:</Heading>
                      <TextViewer content={content} />
                    </Box>

                    <VStack spacing={2}>
                      {contents.map((item, index) => (
                        item.content && (
                          <Box key={index} my={2} w="100%" height="auto" bg="white" gap={0}>
                            <Heading fontSize="lg" my={3}>{item.title}</Heading>
                            <TextViewer content={item.content} />
                          </Box>
                        )
                      ))}
                    </VStack>

                    {/* <Table size='md'>
                  <Tbody>
                    {boatCurrency.accommodations && boatCurrency.accommodations !== '' ?
                      <Tr>
                        <Td fontWeight={'bold'}>Accommodations</Td>
                        <Td>{boatCurrency.accommodations}</Td>
                      </Tr>
                      : null
                    }

                    {boatCurrency.navigationSistem && boatCurrency.navigationSistem !== '' ?
                      <Tr>
                        <Td fontWeight={'bold'}>Navigation System</Td>
                        <Td>{boatCurrency.navigationSistem}</Td>
                      </Tr>
                      : null
                    }

                    {boatCurrency.galleryEquipment && boatCurrency.galleryEquipment !== '' ?
                      <Tr>
                        <Td fontWeight={'bold'}>Galley Equipment</Td>
                        <Td>{boatCurrency.galleryEquipment}</Td>
                      </Tr>
                      : null
                    }

                    {boatCurrency.deckAndHull && boatCurrency.deckAndHull !== '' ?
                      <Tr>
                        <Td fontWeight={'bold'}>Deck and Hull Equipment</Td>
                        <Td>{boatCurrency.deckAndHull}</Td>
                      </Tr>
                      : null
                    }

                    {boatCurrency.mechanicalEquipment && boatCurrency.mechanicalEquipment !== '' ?
                      <Tr>
                        <Td fontWeight={'bold'}>Mechanical Equipment</Td>
                        <Td>{boatCurrency.mechanicalEquipment}</Td>
                      </Tr>
                      : null
                    }

                    {boatCurrency.additionalEquipment && boatCurrency.additionalEquipment !== '' ?
                      <Tr>
                        <Td fontWeight={'bold'}>Additional Equipment</Td>
                        <Td>{boatCurrency.additionalEquipment}</Td>
                      </Tr>
                      : null
                    }

                  </Tbody>
                </Table> */}
                  </TabPanel>

                  <TabPanel>
                    <Box mt={5} mb={5}>
                      <Table size='md'>
                        <Tbody>
                          {boatCurrency.boatType ?
                            <Tr>
                              <Td fontWeight={'bold'}>Boat Type:</Td>
                              <Td>{boatCurrency.boatType}</Td>
                            </Tr>
                            : null
                          }

                          {boatCurrency.boatCategory ?
                            <Tr>
                              <Td fontWeight={'bold'}>Category:</Td>
                              <Td>{boatCurrency.boatCategory}</Td>
                            </Tr>
                            : null
                          }

                          {boatCurrency.boatCondition ?
                            <Tr>
                              <Td fontWeight={'bold'}>Condition:</Td>
                              <Td>{boatCurrency.boatCondition}</Td>
                            </Tr>
                            : null
                          }

                          {boatCurrency.hullMaterial ?
                            <Tr>
                              <Td fontWeight={'bold'}>Hull Material</Td>
                              <Td>{boatCurrency.hullMaterial}</Td>
                            </Tr>
                            : null
                          }

                          {boatCurrency.hullType ?
                            <Tr>
                              <Td fontWeight={'bold'}>Hull Type</Td>
                              <Td>{boatCurrency.hullType}</Td>
                            </Tr>
                            : null
                          }

                          {boatCurrency.length ?
                            <Tr>
                              <Td fontWeight={'bold'}>Length</Td>
                              <Td>
                                {boatCurrency.length} feet /
                                {(parseFloat(boatCurrency.length) * feet).toFixed(2)} metres
                              </Td>
                            </Tr>
                            : null
                          }

                          {boatCurrency.beam ?
                            <Tr>
                              <Td fontWeight={'bold'}>Beam (feet)</Td>
                              <Td>
                                {boatCurrency.beam} feet /
                                {(parseFloat(boatCurrency.beam) * feet).toFixed(2)} metres
                              </Td>
                            </Tr>
                            : null
                          }

                          {boatCurrency.loa ?
                            <Tr>
                              <Td fontWeight={'bold'}>LOA</Td>
                              <Td>
                                {boatCurrency.loa} feet /
                                {(parseFloat(boatCurrency.loa) * feet).toFixed(2)} metres
                              </Td>
                            </Tr>
                            : null
                          }

                          {boatCurrency.bridgeClearance ?
                            <Tr>
                              <Td fontWeight={'bold'}>Bridge Clearance (feet)</Td>
                              <Td>
                                {boatCurrency.bridgeClearance} feet /
                                {(parseFloat(boatCurrency.bridgeClearance) * feet).toFixed(2)} metres
                              </Td>
                            </Tr>
                            : null
                          }

                          {boatCurrency.cruisingSpeed ?
                            <Tr>
                              <Td fontWeight={'bold'}>Cruising speed (knots)</Td>
                              <Td>{boatCurrency.cruisingSpeed} knots</Td>
                            </Tr>
                            : null
                          }

                          {boatCurrency.maxSpeed ?
                            <Tr>
                              <Td fontWeight={'bold'}>Max speed (knots)</Td>
                              <Td>{boatCurrency.maxSpeed} knots</Td>
                            </Tr>
                            : null
                          }

                          {boatCurrency.fuelCapacity ?
                            <Tr>
                              <Td fontWeight={'bold'}>Fuel capacity</Td>
                              <Td>
                                {boatCurrency.fuelCapacity} gallons /
                                {(parseFloat(boatCurrency.fuelCapacity) * litres).toFixed(2)} litres
                              </Td>
                            </Tr>
                            : null
                          }

                          {boatCurrency.freshWater ?
                            <Tr>
                              <Td fontWeight={'bold'}>Fresh water</Td>
                              <Td>
                                {boatCurrency.freshWater} gallons /
                                {(parseFloat(boatCurrency.freshWater) * litres).toFixed(2)} litres
                              </Td>
                            </Tr>
                            : null
                          }

                          {boatCurrency.holding ?
                            <Tr>
                              <Td fontWeight={'bold'}>Holding</Td>
                              <Td>
                                {boatCurrency.holding} gallons /
                                {(parseFloat(boatCurrency.holding) * litres).toFixed(2)} litres
                              </Td>
                            </Tr>
                            : null
                          }

                          {boatCurrency.designer ?
                            <Tr>
                              <Td fontWeight={'bold'}>Designer</Td>
                              <Td>{boatCurrency.designer}</Td>
                            </Tr>
                            : null
                          }

                          {boatCurrency.hinNumber ?
                            <Tr>
                              <Td fontWeight={'bold'}>12 Digit HIN</Td>
                              <Td>{boatCurrency.hinNumber}</Td>
                            </Tr>
                            : null
                          }

                          {boatCurrency.deckAndHull ?
                            <Tr>
                              <Td fontWeight={'bold'}>Deck and Hull Equipment</Td>
                              <Td>{boatCurrency.deckAndHull}</Td>
                            </Tr>
                            : null
                          }
                        </Tbody>
                      </Table>
                    </Box>
                  </TabPanel>

                  {boatCurrency.engines && boatCurrency.engines.length > 0 ?
                    <TabPanel>
                      <Box mt={5} mb={5}>
                        {boatCurrency.engines.map((engine) => (
                          <Table size='md' mt={5}>
                            <Tbody key={engine.id} mt={5}>
                              <Heading fontSize='lg' mb={5}>ENGINE {engine.id}</Heading>
                              <Tr>
                                <Td fontWeight={'bold'}>Engine Type</Td>
                                <Td>{engine.engineType}</Td>
                              </Tr>

                              <Tr>
                                <Td fontWeight={'bold'}>Engine maker</Td>
                                <Td>{engine.engineMaker}</Td>
                              </Tr>

                              <Tr>
                                <Td fontWeight={'bold'}>Engine model</Td>
                                <Td>{engine.engineModel}</Td>
                              </Tr>

                              <Tr>
                                <Td fontWeight={'bold'}>Horsepower</Td>
                                <Td>{engine.horsepower}</Td>
                              </Tr>

                              <Tr>
                                <Td fontWeight={'bold'}>Engine hours</Td>
                                <Td>{engine.engineHours}</Td>
                              </Tr>
                            </Tbody>
                          </Table>
                        ))}
                      </Box>
                    </TabPanel>
                    : null
                  }

                  {/* {boatCurrency.linkVideo === '' ? null :
                <TabPanel>
                  <Box mt={5} mb={5} w="100%" height={videoHeight} bg='gray.700'>
                    <iframe
                      ref={videoRef}
                      width="100%"
                      height="100%"
                      // src="https://www.youtube.com/embed/23mfq-R5J3o"
                      src={boatCurrency.linkVideo}
                      allow="autoplay; encrypted-media"
                      allowFullScreen
                      title="YouTube Video"
                    ></iframe>
                    {!muted && <button onClick={handleToggleMute}>Ativar Som</button>}
                  </Box>
                </TabPanel>
              } */}

                  {boatCurrency.linkVideo === '' ? null :
                    <TabPanel>
                      <VideoPlayer videoUrl={boatCurrency.linkVideo} videoHeight={videoHeight} />
                    </TabPanel>
                  }

                </TabPanels>
              </Tabs>
            </motion.div>
          </Tabs>
        </div>
      }
    </>
  );
}
