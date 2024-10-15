import React, { useEffect, useState } from 'react';
import { SimpleGrid, Select, VStack, FormControl, FormLabel, Icon } from '@chakra-ui/react';
import ButtonType from './ButtonType';
import commercialShip from '../assets/commercialShip.png'
import superYacht from '../assets/superYacht.png'
import jetSki from '../assets/JetSki.png'
import waterToys from '../assets/waterToys.png'
import sailBoat from '../assets/sailBoat.png'
import motorYacht from '../assets/motorYacht.png'
import { FaAsterisk } from "react-icons/fa";

interface BoatType {
  id: number;
  label: string;
  image: string;
  height: string;
  width: string;
  categories: string[];
}

interface ButtonType {
  id: number;
  label: string;
  image: string;
}

interface BoatSelectorProps {
  onSelectCategory: (category: string, buttonLabel: string, buttonId?: number) => void;
  boatTypeId?: number; 
  boatTypeName?: string;
  boatCategoryName?: string;
}

const boatTypes: BoatType[] = [
  { 
    id: 1, 
    label: 'Power', 
    image: motorYacht, 
    height: '2rem', 
    width: '5rem',
    categories: [
      'Aft Cabin',
      'Airboat',
      'Aluminium Fish',
      'Antique and Classic',
      'Barge',
      'Bass',
      'Bay',
      'Beach Catamaran',
      'Bowrider',
      'Canal and River Cruiser',
      'Catamaran',
      'Centre Cockpit',
      'Centre Console',
      'Commercial Boat',
      'Convertible',
      'Cruiser',
      'Cuddy Cabin',
      'Deck',
      'Deck Saloon',
      'Dinghy',
      'Dive',
      'Downeast',
      'Dragger',
      'Dual Console',
      'Express Cruiser',
      'Flats',
      'Flybridge',
      'Freshwater Fishing',
      'High Performance',
      'House',
      'Inflatable',
      'Jet',
      'Jon',
      'Llaut',
      'Motor Yacht',
      'Motorsailer',
      'Multi-Hull',
      'Narrowboat',
      'Other (Power)',
      'Pilothouse',
      'Pontoon',
      'Power Catamaran',
      'Rigid Inflatable Boats (RIB)',
      'Runabout',
      'Saltwater Fishing',
      'Schooner',
      'Ski and Wakeboard',
      'Skiff',
      'Sports Cruiser',
      'Sports Fishing',
      'Tender (Power)',
      'Trawler',
      'Trimaran',
      'Tug',
      'Unspecified',
      'Utility Boat',
      'Walkaround',
    ],
  },
  { 
    id: 2, 
    label: 'Super yatch', 
    image: superYacht, 
    height: '2rem', 
    width: '5rem',
    categories: [
      'Antique and Classic',
      'High Performance',
      'Giga Yacht',
      'Mega Yacht',
      'Super Yacht',
      'Motor Yacht',
      'Motorsailer',
      'Multi-Hull',
    ],
  },
  { 
    id: 3, 
    label: 'Sail', 
    image: sailBoat, 
    height: '2rem', 
    width: '4rem',
    categories: [
      'Aft Cabin',
      'Antique and Classic',
      'Barge',
      'Beach Catamaran',
      'Bowrider',
      'Catamaran',
      'Centre Cockpit',
      'Cruiser',
      'Cutter',
      'Daysailer',
      'Deck Saloon',
      'Dinghy',
      'Gulet',
      'Motorsailer',
      'Multi-Hull',
      'Other',
      'Performance Sailing Boat',
      'Pilothouse (Sail)',
      'Racer',
      'Racer/Cruiser',
      'Schooner',
      'Sloop',
      'Trimaran',
      'Unspecified',
      'Yawl',
      'Ketch',
    ],
  },
  { 
    id: 4, 
    label: 'PWC', 
    image: jetSki, 
    height: '2rem', 
    width: '5rem',
    categories: [
      'Air Chair',
      'Airboat',
      'Aquabike',
      'Bass',
      'Canoe',
      'Canoe Polo Boat',
      'Catamaran',
      'Dinghy',
      'Dinghy (Power)',
      'Dinghy (Sail)',
      'Dinghy (Unpowered)',
      'Dragon Boat',
      'Flats',
      'Hoverboard (Water)',
      'Hydrobike',
      'Hydrocycle',
      'Hydrofoil Board',
      'Inflatable',
      'Inflatable Boat',
      'Inflatable Kayak',
      'Inflatable Stand-Up Paddleboard',
      'Jet Ski',
      'Jon Boat',
      'Kitesurfing Board',
      'Kayak',
      'Other (Power)',
      'Outboard Skiff',
      'Outrigger Canoe',
      'Paddleboard',
      'Personal Sailboat',
      'Personal Watercraft',
      'Pontoon',
      'Rowboat',
      'Rowing Shell',
      'Sailing Canoe',
      'Sailing Kayak',
      'Sit-down PWC',
      'Stand-up PWC',
      'Surf Ski',
      'Tender (Power)',
      'Trimaran',
      'Unspecified',
      'Utility Boat',
      'Water Scooter',
      'Water Tricycle',
      'Waterbike',
      'WaveRunner',
      'Windsurfer',
    ],
  },
  { 
    id: 5, 
    label: 'Water toys',
    image: waterToys, 
    height: '2rem', 
    width: '4rem', 
    categories: [
      'Aquaglide Runway',
      'Aquaglide Supertramp',
      'Clear-Bottom Boats',
      'Clear-Bottom Canoes',
      'Clear-Bottom Floating Platforms',
      'Clear-Bottom Inflatable Boats',
      'Clear-Bottom Kayaks',
      'E-foils',
      'Electric Jet Skis',
      'Electric Surfboards',
      'Floating Lounge Chairs',
      'Floating Trampoline',
      'Giant Inflatable Chess Set',
      'Giant Inflatable Twister Game',
      'Human-sized Hamster Wheel',
      'Inflatable Basketball Hoop',
      'Inflatable Climbing Wall',
      'Inflatable Disco Dance Floor',
      'Inflatable Floating Bar',
      'Inflatable Floating Cinema',
      'Inflatable Floating Disco Dance Floor',
      'Inflatable Floating Obstacle Course',
      'Inflatable Floating Yoga Mats',
      'Inflatable Human Bowling',
      'Inflatable Jet Ski Docks',
      'Inflatable Jet Ski Ramps',
      'Inflatable Kayaks',
      'Inflatable Lounge Islands',
      'Inflatable Paddleboards',
      'Inflatable Rock Climbing Mountain',
      'Inflatable Slide',
      'Inflatable Snorkeling Park',
      'Inflatable Totem Poles',
      'Inflatable Twister Game',
      'Inflatable Volleyball Court',
      'Inflatable Water Hammocks',
      'Inflatable Water Mat',
      'Inflatable Water Polo Field',
      'Inflatable Water Slingshot',
      'Inflatable Water Teeter-Totter',
      'Inflatable Water Totem Poles',
      'Inflatable Water Volleyball Net',
      'Jet Surfboards',
      'Seabobs',
      'Sea Pools',
      'Stand Up Paddle Boards',
      'Submersibles with Transparent Hulls',
      'Towables',
      'Transparent Paddleboards',
      'Underwater Drones with Cameras',
      'Underwater Led Light Show',
      'Underwater Observation Bubbles',
      'Underwater Sea Walk Helmets',
      'Water-based Ziplines',
    ],
  },
  { 
    id: 6, 
    label: 'Commercial', 
    image: commercialShip, 
    height: '2rem', 
    width: '5rem',
    categories: [
      'Container Ship',
      'Bulk Carrier',
      'Tanker Ship',
      'Ro-Ro Ship (Roll-on/Roll-off)',
      'General Cargo Ship',
      'Fishing Vessel',
      'LNG Carrier (Liquefied Natural Gas)',
      'LPG Carrier (Liquefied Petroleum Gas)',
      'Passenger Ship',
      'Cruise Ship',
      'Ferry',
      'Tugboat',
      'Research Vessel',
      'Icebreaker',
      'Offshore Support Vessel',
      'Dredger',
      'Submersible Heavy-Lift Ship',
      'Livestock Carrier',
      'Yacht',
      'Hovercraft',
      'Cable Layer',
      'Fireboat',
      'Hospital Ship',
      'Ore Carrier',
      'Salvage Tug',
      'Survey Vessel',
      'Dive Support Vessel',
      'Pilot Boat',
      'Ballast Tanker',
      'Training Ship',
      'Car Carrier',
      'Heavy Lift Ship',
      'Rolling Lift Ship',
      'Wind Turbine Installation Vessel',
      'Container/Ro-Ro Ship',
      'Cement Carrier',
      'Chemical Tanker',
      'Floating Production Storage and Offloading (FPSO) Vessel',
      'Hydrofoil Ship',
      'Steamship',
    ],
  },
];

const BoatSelector: React.FC<BoatSelectorProps> = ({ onSelectCategory, boatTypeId, boatTypeName, boatCategoryName }: any) => {
  const [selectedBoatType, setSelectedBoatType] = useState<BoatType | null>(null);  
  const [selectedBoatTypeButton, setSelectedBoatTypeButton] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);  

  const handleButtonAndBoatTypeClick = (buttonId: number, boatLabel: string) => {
    const selectedType = boatTypes.find((type) => type.label === boatLabel);    
    if (selectedType) {
      onSelectCategory('', selectedType.label, buttonId);
      setSelectedBoatType(selectedType);
      setSelectedBoatTypeButton(buttonId);
    } else {
      console.error("No boat type found with the label:", boatLabel);
      setSelectedBoatType(null);
      setSelectedBoatTypeButton(null);
    }
  };

  const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const categoryValue = event.target.value;
    setSelectedCategory(categoryValue);
    if (selectedBoatTypeButton !== null && selectedBoatType !== null) {
      onSelectCategory(categoryValue, selectedBoatType.label, selectedBoatTypeButton);
    }
  };

  useEffect(() => {
    if (!selectedBoatType) {
      const selectedType = boatTypes.find((type) => type.label === boatTypeName);
      setSelectedBoatType(selectedType ?? null);
    }
  }, [boatTypeName, selectedBoatType]);  

  return (
    <VStack spacing={4} w={'100%'}>
      <FormControl>
        <FormLabel>Boat type <Icon as={FaAsterisk} color="red.500" boxSize="10px" /></FormLabel>
          <SimpleGrid columns={{ base: 2, md: 2, lg: 3 }} spacing={3} w={'100%'}>
            {boatTypes.map((button) => (
              <ButtonType
                key={button.id}
                width={button.width}
                height={button.height}
                id={button.id}
                label={button.label}
                image={button.image}
                isSelected={selectedBoatTypeButton === button.id || boatTypeId === button.id}
                onClick={() => handleButtonAndBoatTypeClick(button.id, button.label)}
              />
            ))}
          </SimpleGrid>
        </FormControl>

        {selectedBoatType && (
          <FormControl>
            <FormLabel>Boat category <Icon as={FaAsterisk} color="red.500" boxSize="10px" /> </FormLabel>
            <Select
              placeholder="Select boat category"
              value={selectedCategory || boatCategoryName}
              onChange={handleCategoryChange}
            >
              {selectedBoatType?.categories.map((category) => (
                <option key={category} value={category} >
                  {category}
                </option>
              ))}
            </Select>
          </FormControl>          
        )} 
    </VStack>
  );
};

export default BoatSelector;


