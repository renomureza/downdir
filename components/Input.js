const Input = ({ label, name, ...rest }) => {
  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">
        {label}{" "}
        {rest.required && (
          <span aria-hidden="true" className="text-red-500">
            *
          </span>
        )}
      </label>
      <input
        id={name}
        name={name}
        className="text-sm shadow-sm border-gray-300 rounded-md w-full block mt-2 
    appearance-none bg-white border py-2 px-3
    focus:ring-blue-500 focus:border-blue-500 focus:ring-2 focus:outline-2 focus:outline-transparent focus:outline-offset-2 focus:shadow-sm
    transition
    "
        {...rest}
      />
    </div>
  );
};

export default Input;
