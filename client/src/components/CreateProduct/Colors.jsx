import Select from "react-select";

const Colors = (props) => {
  
  const options = [
    ...props.color.map((element) => ({
      label: element.name,
      value: element.name,
    })),
  ];
  

  return (
    <div>
      <Select
        options={options}
        styles={{
          control: (provided) => ({
            ...provided,
            height:'41px',
            width: 'full',
            padding: 'p-2.5',
            borderRadius: '0.5rem',
            backgroundColor: ' bg-gray-50 dark:bg-stone-900 dark:border-gray-600 dark:text-black',
            fontSize:'0.875rem',
          }),
          placeholder:(provided) => ({
            ...provided,
            color:'#939ba9'
          })
        }}
        placeholder="Select colors"
        id="category"
        className={`bg-gray-50 dark:bg-stone-900 dark:border-gray-600`}
        value={
          options.find((option) => option.value === props.selectedColor) || null
        }
        onChange={(selectedOption) => {
          props.onSelectColor(selectedOption ? selectedOption.value : null);
        }}
      />
    </div>
  );
};

export default Colors;