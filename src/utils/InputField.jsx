import React from "react";

const InputField = ({ label, name, type, placeholder, value, onChange }) => (
  <div>
    <label className="text-gray-800  text-sm mb-2 block">{label}</label>
    <input
      name={name}
      type={type}
      className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-2.5 rounded-md focus:bg-transparent outline-blue-500 transition-all"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      required
    />
  </div>
);

export default InputField;
