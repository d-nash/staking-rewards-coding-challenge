import React, { useEffect, useState } from "react";
import { FieldError } from "./types";

interface FormControlProps {
  name: string;
  label: string;
  value: string;
  defaultValue?: string;
  validate: (value: string) => FieldError;
  onChange: (name: string, value: string, error: FieldError) => void;
  renderFormField?: (fieldProps: any) => React.ReactNode;
}

export const FormControl = ({
  name,
  label,
  value,
  validate,
  onChange,
  renderFormField
}: FormControlProps) => {
  const [errorMessage, setErrorMessage] = useState("");

  const handleFieldChange = (newValue: string) => {
    const newErrorMessage = validate(newValue);
    setErrorMessage(newErrorMessage || "");
    onChange(name, newValue, newErrorMessage);
  };

  useEffect(() => {
    onChange(name, value, validate(value));
  }, [name, value]);

  return (
    <div className={`form-control ${errorMessage ? "error" : ""}`}>
      <label htmlFor={name}>{label}: </label>
      {renderFormField ? (
        renderFormField({
          name,
          value,
          onChange: (e: { target: { value: string } }) => {
            handleFieldChange(e.target.value);
          }
        })
      ) : (
        <input
          type="text"
          value={value}
          name={name}
          onChange={(e) => handleFieldChange(e.target.value)}
        />
      )}
      {errorMessage ? <span className="error">{errorMessage}</span> : <></>}
    </div>
  );
};
