import React, { useEffect} from 'react';
import { Accordion, AccordionItem, AccordionButton,
  AccordionPanel, AccordionIcon, FormControl, FormLabel, Input, VStack, HStack, Textarea,
  // Box,
} from '@chakra-ui/react';
// import TextEditor from './TextEditor';

export interface OtherInfo {
  hinNumber: string;
  bridgeClearance: string;
  designer: string;
  fuelCapacity: string;
  holding: string;
  freshWater: string;
  cruisingSpeed: string;
  loa: string;
  maxSpeed: string;
  beam: string;
  accommodations: string;
  mechanicalEquipment: string;
  navigationSystem: string;
  galleryEquipment: string;
  deckAndHull: string;
  additionalEquipment: string;
}

interface AccordionOtherInfoProps {
  dataOtherInfoToEdit?: OtherInfo[];
  otherInfo?: any
  setOtherInfo?: any
}

const AccordionOtherInfo: React.FC<AccordionOtherInfoProps> = ({ otherInfo, setOtherInfo, dataOtherInfoToEdit }) => {
  
  // const [contentAccomodation, setContentAccomodation] = useState('');
  // const [formBoatDetails, setFormBoatDetails] = useState({
  //   accommodations: contentAccomodation,
  // });

  // console.log('formBoatDetails', formBoatDetails)
  
  const handleInputChange = (index: number, fieldName: keyof OtherInfo, value: string) => {
    setOtherInfo((prevInfo: any) => [
      ...prevInfo.slice(0, index),
      { ...prevInfo[index], [fieldName]: value },
      ...prevInfo.slice(index + 1),
    ]);
  };

  // const handleContentChange = (newContent: any) => {
  //   setContentAccomodation(newContent);
  //   setFormBoatDetails(prevDetails => ({
  //     ...prevDetails,
  //     accommodations: newContent,
  //   }));
  // };

  useEffect(() => {
    if (dataOtherInfoToEdit) {
      setOtherInfo(dataOtherInfoToEdit);
    }
  }, []);

  return (
    <Accordion allowMultiple w={'100%'} mt={5}>
      <AccordionItem>
        <h2>
          <AccordionButton>
            <HStack justifyContent={'space-between'} alignItems={'center'} w={'100%'}>
              <span style={{ marginRight: '10px' }}>Other information (Optional)</span>
            </HStack>
            <AccordionIcon />
          </AccordionButton>
        </h2>
        <AccordionPanel>
          <VStack w={'100%'}>
            <FormControl mt={2}>
              <FormLabel>12 Digit HIN</FormLabel>
              <Input
                type="text"
                name='hinNumber'
                value={otherInfo[0].hinNumber}
                onChange={(e) => handleInputChange(0, 'hinNumber', e.target.value)}
              />
            </FormControl>

            <FormControl mt={2}>
              <FormLabel>Bridge Clearance (feet)</FormLabel>
              <Input
                type="number"
                name='bridgeClearance'
                value={otherInfo[0].bridgeClearance}
                onChange={(e) => handleInputChange(0, 'bridgeClearance', e.target.value)}
              />
            </FormControl>

            <FormControl mt={2}>
              <FormLabel>Designer</FormLabel>
              <Input
                type="text"
                name='designer'
                value={otherInfo[0].designer}
                onChange={(e) => handleInputChange(0, 'designer', e.target.value)}
              />
            </FormControl>

            <FormControl mt={2}>
              <FormLabel>Fuel Capacity (US Gallons)</FormLabel>
              <Input
                type="number"
                name='fuelCapacity'
                value={otherInfo[0].fuelCapacity}
                onChange={(e) => handleInputChange(0, 'fuelCapacity', e.target.value)}
              />
            </FormControl>

            <FormControl mt={2}>
              <FormLabel>Holding Tank (US Gallons)</FormLabel>
              <Input
                type="number"
                name='holding'
                value={otherInfo[0].holding}
                onChange={(e) => handleInputChange(0, 'holding', e.target.value)}
              />
            </FormControl>

            <FormControl mt={2}>
              <FormLabel>Fresh Water (US Gallons)</FormLabel>
              <Input
                type="number"
                name='freshWater'
                value={otherInfo[0].freshWater}
                onChange={(e) => handleInputChange(0, 'freshWater', e.target.value)}
              />
            </FormControl>

            <FormControl mt={2}>
              <FormLabel>Cruising Speed (knots)</FormLabel>
              <Input
                type="number"
                name='cruisingSpeed'
                value={otherInfo[0].cruisingSpeed}
                onChange={(e) => handleInputChange(0, 'cruisingSpeed', e.target.value)}
              />
            </FormControl>

            <FormControl mt={2}>
              <FormLabel>LOA (feet)</FormLabel>
              <Input
                type="number"
                name='loa'
                value={otherInfo[0].loa}
                onChange={(e) => handleInputChange(0, 'loa', e.target.value)}
              />
            </FormControl>

            <FormControl mt={2}>
              <FormLabel>Max Speed (knots)</FormLabel>
              <Input
                type="number"
                name='maxSpeed'
                value={otherInfo[0].maxSpeed}
                onChange={(e) => handleInputChange(0, 'maxSpeed', e.target.value)}
              />
            </FormControl>

            <FormControl mt={2}>
              <FormLabel>Beam (feet)</FormLabel>
              <Input
                type="number"
                name='beam'
                value={otherInfo[0].beam}
                onChange={(e) => handleInputChange(0, 'beam', e.target.value)}
              />
            </FormControl>

            <FormControl mt={2}>
              <FormLabel>Accommodations</FormLabel>
              <Textarea
                placeholder="Typing your accommodations here..."
                size="lg"
                name='accommodations'
                value={otherInfo[0].accommodations}
                onChange={(e) => handleInputChange(0, 'accommodations', e.target.value)}
              />
            </FormControl>

            {/* <Box w="100%" maxWidth={'100%'} h={'auto'} marginX="auto" mt={2}>
              <div>
                <FormLabel>Accommodations</FormLabel>
                <TextEditor
                  content={contentAccomodation}
                  setContent={handleContentChange}
                  placeholder="Type something amazing about your accommodations..."
                />
              </div>
            </Box> */}

            <FormControl mt={2}>
              <FormLabel>Navigation System</FormLabel>
              <Textarea
                placeholder="Typing your navigation system here..."
                size="lg"
                name='navigationSystem'
                value={otherInfo[0].navigationSystem}
                onChange={(e) => handleInputChange(0, 'navigationSystem', e.target.value)}
              />
            </FormControl>

            <FormControl mt={2}>
              <FormLabel>Galley Equipment</FormLabel>
              <Textarea
                placeholder="Typing your gallery equipment here..."
                size="lg"
                name='galleryEquipment'
                value={otherInfo[0].galleryEquipment}
                onChange={(e) => handleInputChange(0, 'galleryEquipment', e.target.value)}
              />
            </FormControl>

            <FormControl mt={2}>
              <FormLabel>Deck and Hull Equipment</FormLabel>
              <Textarea
                placeholder="Typing your deck and hull here..."
                size="lg"
                name='deckAndHull'
                value={otherInfo[0].deckAndHull}
                onChange={(e) => handleInputChange(0, 'deckAndHull', e.target.value)}
              />
            </FormControl>

            <FormControl mt={2}>
              <FormLabel>Mechanical Equipment</FormLabel>
              <Textarea
                placeholder="Typing your mechanical equipment here..."
                size="lg"
                name='mechanicalEquipment'
                value={otherInfo[0].mechanicalEquipment}
                onChange={(e) => handleInputChange(0, 'mechanicalEquipment', e.target.value)}
              />
            </FormControl>

            <FormControl mt={2}>
              <FormLabel>Additional Equipment</FormLabel>
              <Textarea
                placeholder="Typing your additional equipment here..."
                size="lg"
                name='additionalEquipment'
                value={otherInfo[0].additionalEquipment}
                onChange={(e) => handleInputChange(0, 'additionalEquipment', e.target.value)}
              />
            </FormControl>
          </VStack>
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
};

export default AccordionOtherInfo;