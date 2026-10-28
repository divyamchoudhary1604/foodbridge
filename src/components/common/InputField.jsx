import { forwardRef } from "react";

/**
 * Reusable Input Field component with accessibility and validation error support.
 * Fulfills syllabus: Lectures 55-60 (Reusable input components & validation strategies)
 */
const InputField = forwardRef(function InputField(
  {
    label,
    id,
    name,
    type = "text",
    value,
    onChange,
    onBlur,
    placeholder,
    error,
    helperText,
    required = false,
    disabled = false,
    autoComplete,
    className = "",
    min,
    max,
    step,
    ...props
  },
  ref
) {
  const inputId = id || `field-${name}`;
  const errorId = `${inputId}-error`;
  const helperId = `${inputId}-helper`;

  return (
    <div className={`form-group ${error ? "has-error" : ""} ${className}`}>
      {label && (
        <label htmlFor={inputId} className="form-label">
          {label} {required && <span className="required-star" aria-hidden="true">*</span>}
        </label>
      )}

      <input
        ref={ref}
        id={inputId}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={placeholder}
        disabled={disabled}
        required={required}
        autoComplete={autoComplete}
        min={min}
        max={max}
        step={step}
        aria-invalid={Boolean(error)}
        aria-describedby={
          error ? errorId : helperText ? helperId : undefined
        }
        className={`form-input ${error ? "input-error" : ""}`}
        {...props}
      />

      {error ? (
        <p id={errorId} className="error-message" role="alert">
          ⚠️ {error}
        </p>
      ) : helperText ? (
        <p id={helperId} className="helper-text">
          {helperText}
        </p>
      ) : null}
    </div>
  );
});

export default InputField;
