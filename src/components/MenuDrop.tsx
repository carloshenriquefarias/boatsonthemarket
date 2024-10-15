import { Flex, Text, Icon, Link, Menu, MenuButton, MenuList, MenuItem, useColorModeValue } from '@chakra-ui/react';
import { BiChevronDown } from 'react-icons/bi';

const MenuContainer = () => {
  return (
    <Flex
      w="auto"
      h="auto"
      justifyContent="center"
      alignItems="flex-start"
    >
      <DropDownMenu />
    </Flex>
  );
};

const dropdownLinks = [
  {
    name: 'Adverts terms and conditions',
    path: '#'
  },
  {
    name: 'Boats terms and conditions',
    path: '#'
  },
  {
    name: 'Terms of use',
    path: '#'
  }
];

const DropDownMenu = () => {
  return (
    <Menu autoSelect={false} isLazy>
      {({ isOpen, onClose }) => (
        <>
          <MenuButton _hover={{ color: 'yellow.600' }}>
            <Flex alignItems="center" fontWeight="bold" pb={2}>
              <Text color={'gray.50'} fontWeight={'thin'} fontSize={'sm'}>Terms</Text>
              <Icon
                as={BiChevronDown}
                h={5}
                w={5}
                ml={1}
                transition="all .25s ease-in-out"
                transform={isOpen ? 'rotate(180deg)' : ''}
                color={'gray.50'}
              />
            </Flex>
          </MenuButton>
          <MenuList
            bg={useColorModeValue('rgb(255, 255, 255)', 'rgb(26, 32, 44)')}
            border="none"
            boxShadow={useColorModeValue(
              '2px 4px 6px 2px rgba(160, 174, 192, 0.6)',
              '2px 4px 6px 2px rgba(9, 17, 28, 0.6)'
            )}
          >
            {dropdownLinks.map((link, index) => (
              <MenuLink key={index} name={link.name} path={link.path} onClose={onClose} />
            ))}
          </MenuList>
        </>
      )}
    </Menu>
  );
};

interface MenuLinkProps {
  name: string;
  path: string;
  onClose: () => void;
}

const MenuLink = ({ name, path, onClose }: MenuLinkProps) => {
  return (
    <Link href={path} onClick={() => onClose()}>
      <MenuItem _hover={{ color: 'blue.400', bg: useColorModeValue('gray.200', 'gray.700') }}>
        <Text>{name}</Text>
      </MenuItem>
    </Link>
  );
};

export default MenuContainer;