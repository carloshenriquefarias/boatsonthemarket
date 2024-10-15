import React, { useState } from 'react';
import { Select } from '@chakra-ui/react';

const MultiSelectComponent = ({ onSelect } : any) => {
  const [option1, setOption1] = useState('');
  const [option2, setOption2] = useState('');
  const [option3, setOption3] = useState('');

  const handleSelect1 = (value: any) => {
    setOption1(value);
  };

  const handleSelect2 = (value: any) => {
    setOption2(value);
  };

  const handleSelect3 = (value: any) => {
    setOption3(value);
  };

  React.useEffect(() => {
    onSelect({ option1, option2, option3 });
  }, [option1, option2, option3, onSelect]);

  return (
    <div>
      <Select value={option1} onChange={(e) => handleSelect1(e.target.value)}>
        {/* Opções para o select 1 */}
      </Select>
      <Select value={option2} onChange={(e) => handleSelect2(e.target.value)}>
        {/* Opções para o select 2 */}
      </Select>
      <Select value={option3} onChange={(e) => handleSelect3(e.target.value)}>
        {/* Opções para o select 3 */}
      </Select>
    </div>
  );
};

export default MultiSelectComponent;
