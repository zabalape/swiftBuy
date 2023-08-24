import Select from "react-select";

const Sizes = (props) => {
  
  const options = [
    { label: "Select sizes", value: "", isDisabled: true },
    ...props.sizes.map((element) => ({
      label: element,
      value: element,
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
        placeholder="Select sizes"
        id="sizes"
        className={`bg-gray-50 dark:bg-stone-900 dark:border-gray-600`}
        value={
          options.find((option) => option.value === props.selectedSize) || null
        }
        onChange={(selectedOption) => {
          props.onSelectSize(selectedOption ? selectedOption.value : null);
        }}
      />
    </div>
  );
};

export default Sizes;