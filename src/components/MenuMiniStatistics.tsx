import { Icon } from '@chakra-ui/react';
import { motion } from 'framer-motion';

import IconBox from '../components/IconBox'
import MiniStatistics from '../components/MiniStatistics'

export default function MenuMiniStatistics({ bg, icon, name, value }: any) {
  return (
    <motion.div whileHover={{ translateY: -5 }}>
      <MiniStatistics
        bg={bg}
        _hover={"0 0 0 5px cyan"}
        startContent={
          <IconBox
            w='56px' h='56px'
            icon={
              <Icon w='32px' h='32px' as={icon} color={'gray.500'} />
            }
          />
        }
        name={name}
        value={value}
      />
    </motion.div>
  );
};