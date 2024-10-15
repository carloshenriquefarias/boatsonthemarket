
import { Accordion, AccordionItem, AccordionButton, AccordionPanel, AccordionIcon, Box } from '@chakra-ui/react';
interface AccordionBoatProps {
    title: string;
    text?: string;
    table?: React.ReactNode; 
}

export default function AccordionBoat({title, text, table} : AccordionBoatProps) {
    return (
        <Accordion allowToggle>
            <AccordionItem>
                <h2>
                    <AccordionButton>
                        <Box as="span" flex='1' textAlign='left'>
                            {title}
                        </Box>
                        <AccordionIcon />
                    </AccordionButton>
                </h2>

                <AccordionPanel pb={4}>
                    {text}
                </AccordionPanel>

                <AccordionPanel pb={4}>
                    {table}
                </AccordionPanel>
            </AccordionItem>
        </Accordion>
    );
}
