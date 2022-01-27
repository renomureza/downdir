import Spinner from "./Spinner";

const Button = ({ children, isLoading, ...restProps }) => {
  return (
    <button
      {...restProps}
      className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition"
    >
      {isLoading ? <Spinner /> : children}
    </button>
  );
};

export default Button;
