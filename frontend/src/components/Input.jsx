/* eslint-disable react/prop-types */
function Input({ input, placeholder, type, onChange }) {
  return (
    <div>
      <div className="text-left capitalize text-lg font-medium py-2">
        {input}
      </div>
      <input
        type={type}
        placeholder={placeholder}
        className=" w-full border-[0.2px] px-3 outline-none h-[35px] rounded-lg  bg-slate-300  border-slate-600"
        onChange={onChange}
      />
    </div>
  );
}

export default Input;
