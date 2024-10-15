import { VStack, HStack, Button, Input, Accordion, AccordionItem, AccordionButton, 
  AccordionPanel, AccordionIcon, FormControl, FormLabel, Select, Box 
} from '@chakra-ui/react';

import { useEffect, useState } from 'react';
import { FaTrashCan } from 'react-icons/fa6';

interface Engine {
  id: number;
  engineType: string;
  fuelType: string;
  engineMaker: string;
  engineModel: string;
  horsepower: string;
  engineHours: string;
}

interface AccordionEngineListProps {
  onValuesChange: (values: any[]) => void;
  dataEnginesToEdit?: Engine[];
}

const AccordionEngine: React.FC<AccordionEngineListProps> = ({ onValuesChange, dataEnginesToEdit }) => { 
  const [accordionList, setAccordionList] = useState<Engine[]>(
    dataEnginesToEdit || [
    {
      id: 1,
      engineType: '',
      fuelType: '',
      engineMaker: '',
      engineModel: '',
      horsepower: '',
      engineHours: '',
    },
    ]
  );

  const adicionarAccordion = () => {
    const newAccordion = {
      id: accordionList.length + 1,
      engineType: '',
      fuelType: '',
      engineMaker: '',
      engineModel: '',
      horsepower: '',
      engineHours: '',
    };
    setAccordionList([...accordionList, newAccordion]);
  };

  const excluirAccordion = (id: any) => {
    const newList = accordionList.filter((accordion) => accordion.id !== id);
    setAccordionList(newList);
  };

  const handleInputChange = (id: number, fieldName: string, value: string) => {
    const newList = accordionList.map((accordion) =>
      accordion.id === id ? { ...accordion, [fieldName]: value } : accordion
    );
    setAccordionList(newList);
  };

  useEffect(() => {
    if (dataEnginesToEdit) {
      setAccordionList(dataEnginesToEdit);
    }
  }, [dataEnginesToEdit]);

  useEffect(() => {
    onValuesChange(accordionList);
  }, [accordionList, onValuesChange]);

  return (
    <Accordion allowMultiple={true} w={'100%'} mt={5} defaultIndex={[0]}>
      <AccordionItem w={'100%'}>
        <h2>
          <AccordionButton>
            <HStack justifyContent={'space-between'} alignItems={'center'} w={'100%'}>
              <span style={{ marginRight: '10px' }}>Engines (Optional)</span>
            </HStack>
            <AccordionIcon />
          </AccordionButton>
        </h2>
        <AccordionPanel>
          {accordionList.map((accordion) => (
            <AccordionItem key={accordion.id}>
              <h2>
                <AccordionButton bg={'gray.50'}>
                  <HStack justifyContent={'space-between'} alignItems={'center'} w={'100%'}>
                    <span style={{ marginRight: '10px' }}>Engine {accordion.id}</span>
                    <Button onClick={() => excluirAccordion(accordion.id)} bg={'gray.50'} _hover={{backgroundColor: 'red.200'}}>
                      <Box color="red.400"> <FaTrashCan /> </Box>
                    </Button>
                  </HStack>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel>
                <VStack w={'100%'}>
                  <FormControl>
                    <FormLabel>Engine Type</FormLabel>
                    <Select
                      value={accordion.engineType}
                      onChange={(e) => handleInputChange(accordion.id, 'engineType', e.target.value)}
                    >
                      <option value=''></option>
                      <option value='Eletric'>Eletric</option>
                      <option value='Inboard'>Inboard</option>
                      <option value='Outboard'>Outboard</option>
                      <option value='Other'>Other</option>
                    </Select>
                  </FormControl>

                  <FormControl>
                    <FormLabel>Fuel Type</FormLabel>
                    <Select
                      value={accordion.fuelType}
                      onChange={(e) => handleInputChange(accordion.id, 'fuelType', e.target.value)}
                    >
                      <option value=''></option>
                      <option value='Diesel'>Diesel</option>
                      <option value='Eletric'>Eletric</option>
                      <option value='Petrol'>Petrol</option>
                      <option value='LPG'>LPG</option>
                      <option value='Other'>Other</option>
                    </Select>
                  </FormControl>

                  <FormControl mt={2}>
                     <FormLabel>Engine Maker</FormLabel>
                    <Input
                      type="text"
                      name='Engine maker'
                      value={accordion.engineMaker}
                      onChange={(e) => handleInputChange(accordion.id, 'engineMaker', e.target.value)}
                    />
                  </FormControl>

                  <FormControl mt={2}>
                    <FormLabel>Engine Model</FormLabel>
                    <Input
                      type="text"
                      name='Engine model'
                      value={accordion.engineModel}
                      onChange={(e) => handleInputChange(accordion.id, 'engineModel', e.target.value)}
                    />
                  </FormControl>

                  <HStack w='100%' mt={2} spacing={3}>
                     <FormControl>
                      <FormLabel>Horsepower (HP)</FormLabel>
                     <Input
                        type='number'
                        name='horsepower'
                        value={accordion.horsepower}
                        onChange={(e) => handleInputChange(accordion.id, 'horsepower', e.target.value)}
                      />
                    </FormControl>

                    <FormControl>
                      <FormLabel>Engine Hours</FormLabel>
                      <Input
                        type='number'
                        name='engineHours'
                        value={accordion.engineHours}
                        onChange={(e) => handleInputChange(accordion.id, 'engineHours', e.target.value)}
                      />
                    </FormControl>
                  </HStack>
                </VStack>
              </AccordionPanel>
            </AccordionItem>
          ))}
          <AccordionPanel>
            <Button onClick={adicionarAccordion} bg={'green.100'} w={'100%'}>
              Add new engine
            </Button>
          </AccordionPanel>
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
}

export default AccordionEngine;

