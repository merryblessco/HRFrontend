// InputField.tsx
import React from "react";

interface InputFieldProps {
  label?: string;
  id: string;
  placeholder?: string;
  name: string;
  type?: string;
  value: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  required?: boolean;
  readOnly?: boolean;
  error?: string | false | any;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  placeholder,
  id,
  name,
  type = "text",
  value,
  onChange,
  onBlur,
  required = false,
  readOnly = false,
  error = "",
}) => {
  return (
    <div className="mb-4">
      <label htmlFor={id} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <input
        placeholder={placeholder}
        type={type}
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        required={required}
        readOnly={readOnly}
        className={`mt-1 block w-full px-3 py-2 border-[.8px] ${
          error ? "border-red-500" : "border-gray-300"
        } shadow-sm  focus:ring-primary-500 focus:border-primary-500 sm:text-sm flex-grow mr-2 p-2 border-[.8px] border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary-1`}
      />
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
};

export default InputField;
