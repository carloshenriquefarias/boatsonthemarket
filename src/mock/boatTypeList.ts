import { TbHorseToy } from "react-icons/tb";
import { GiSailboat, GiFishingBoat, GiBoatPropeller } from "react-icons/gi";
import { IoIosBoat } from "react-icons/io";

export const boatTypeList = [
  {
    id: '1',
    title: 'SUPER',
    boatType: 'super yatch',
    fullName: 'Super yatch',
    icon: IoIosBoat,
    subtitle: 'YATCHS',
    // description: 'Find here in this category the list of super yatchs that are available',
    image: "./images/NewSuperYacht.jpg",
  },
  {
    id: '2',
    title: 'MOTOR',
    boatType: 'power',
    fullName: 'Motor yatch',
    icon: GiBoatPropeller,
    subtitle: 'YATCHS',
    // description: 'Find here in this category the list of motor yatchs that are available',
    image: "./images/NewMotorYacht.jpg",
  },
  {
    id: '3',
    title: 'SAILING',
    boatType: 'sail',
    fullName: 'Sailing yatch',
    icon: GiSailboat,
    subtitle: 'YATCHS',
    // description: 'Find here in this category the list of sailing yatchs that are available',
    image: "./images/NewSailingYacht.jpg",
  },
  {
    id: '4',
    title: 'PERSONAL ',
    icon: GiFishingBoat,
    fullName: 'PWC',
    boatType: 'PWC',
    subtitle: 'WATER CRAFT',
    // description: 'Find here in this category the list of personal water that are available',
    image: "./images/NewPWC.jpg",
  },
  {
    id: '5',
    title: 'WATER',
    boatType: 'water toys',
    fullName: 'Water toys',
    icon: TbHorseToy,
    subtitle: 'TOYS',
    // description: 'Find here in this category the list of water toys that are available',
    image: "./images/NewWaterToys.jpg",
  },
  {
    id: '6',
    title: 'COMMERCIAL',
    boatType: 'commercial',
    fullName: 'Commercial',
    icon: IoIosBoat,
    subtitle: 'SHIPS',
    // description: 'Find here in this category the list of water toys that are available',
    image: "./images/NewCommercial.jpg",
  }
];
