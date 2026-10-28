import { forwardRef } from "react";

/**
 * Reusable Select Field component with accessibility and validation error support.
 * Fulfills syllabus: Lectures 55-60 (Reusable input components)
 */
const SelectField = forwardRef(function SelectField(
  {
    label,
    id,
    name,
    value,
    onChange,
    onBlur,
    options = [],
    placeholder = "Select an option",
    error,
    helperText,
    required = false,
    disabled = false,
    className = "",
    ...props
  },
  ref
) {
  const selectId = id || `field-${name}`;
  const errorId = `${selectId}-error`;

  return (
    <div className={`form-group ${error ? "has-error" : ""} ${className}`}>
      {label && (
        <label htmlFor={selectId} className="form-label">
          {label} {required && <span className="required-star" aria-hidden="true">*</span>}
        </label>
      )}

      <select
        ref={ref}
        id={selectId}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        disabled={disabled}
        required={required}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? errorId : undefined}
        className={`form-select ${error ? "input-error" : ""}`}
        {...props}
      >
        {placeholder && <option value="">{placeholder}</option>}
        {options.map((opt) => {
          const optValue = typeof opt === "string" ? opt : opt.value;
          const optLabel = typeof opt === "string" ? opt : opt.label;
          return (
            <option key={optValue} value={optValue}>
              {optLabel}
            </option>
          );
        })}
      </select>

      {error && (
        <p id={errorId} className="error-message" role="alert">
          ⚠️ {error}
        </p>
      )}
    </div>
  );
});

export default SelectField;
