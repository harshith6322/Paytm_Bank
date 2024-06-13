/* eslint-disable react/prop-types */
function Button({ label, onClick }) {
  return (
    <button
      onClick={onClick}
      type="button"
      className=" w-full text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mt-5 "
    >
      {label}
    </button>
  );
}

export default Button;
