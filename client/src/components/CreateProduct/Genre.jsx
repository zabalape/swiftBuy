import Select from "react-select";

const Genre = (props) => {
  
  const options = [
    ...props.genres.map((element) => ({
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
        placeholder="Select genre"
        id="category"
        className={`bg-gray-50 dark:bg-stone-900 dark:border-gray-600`}
        value={
          props.selectedGenre
            ? { label: props.selectedGenre, value: props.selectedGenre }
            : null
        }
        onChange={(selectedOption) => {
          props.onSelectGenre(selectedOption.value);
        }}
      />
    </div>
  );
};

export default Genre;