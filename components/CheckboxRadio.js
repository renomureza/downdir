const Input = ({ label, name, ...rest }) => {
  return (
    <div className="flex items-center">
      <input
        name={name}
        id={name}
        type="radio"
        className="text-blue-600 border-gray-300 border w-4 h-4 rounded-full appearance-none p-0 inline-block select-none flex-shrink-0 bg-white focus:ring-blue-500 focus:ring-2 focus:outline-2 focus:outline-transparent focus:outline-offset-2 focus:ring-offset-2 focus:ring-offset-white transition"
        {...rest}
      />
      <label
        htmlFor={name}
        className="ml-2 block text-sm font-medium text-gray-700"
      >
        {label}
      </label>
    </div>
  );
};

const CheckboxRadio = ({ label, onChange, value, options }) => {
  return (
    <fieldset>
      <legend className="font-medium text-sm text-gray-900">{label}</legend>
      <div className="mt-2 flex gap-8">
        {options.map((option) => (
          <Input
            key={option.name}
            onChange={onChange}
            checked={value === option.value}
            {...option}
          />
        ))}
      </div>
    </fieldset>
  );
};

export default CheckboxRadio;
