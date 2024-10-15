import Select from 'react-select';
import makeAnimated from 'react-select/animated';

const MultiSelectComponent = ({ options }: any) => {
  const animatedComponents = makeAnimated();

  return (
    <Select 
      defaultValue={[options[0]]}
      components={animatedComponents}
      isMulti
      options={options}
      // onChange={(item) => setSelectedOptions(item)}
      className="select"
      isClearable={true}
      isSearchable={true}
      isDisabled={false}
      isLoading={false}
      isRtl={false}
      closeMenuOnSelect={false}
    />
  );
};

export default MultiSelectComponent;
