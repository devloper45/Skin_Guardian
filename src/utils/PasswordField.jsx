import React from 'react'

const PasswordField = ({
    label,
    name,
    placeholder,
    value,
    onChange,
    showPassword,
    toggleShowPassword,
  }) => (
    <div>
      <label className="text-gray-800 text-sm mb-2 block">{label}</label>
      <div className="relative">
        <input
          name={name}
          type={showPassword ? "text" : "password"}
          className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-2.5 rounded-md focus:bg-transparent outline-blue-500 transition-all"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
        <button
          type="button"
          onClick={toggleShowPassword}
          className="absolute inset-y-0 right-3 flex items-center"
        >
          {showPassword ? "Hide" : "Show"}
        </button>
      </div>
    </div>
  );

export default PasswordField