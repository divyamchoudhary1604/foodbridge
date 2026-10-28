import { forwardRef } from "react";

/**
 * Reusable Textarea component with character counter and error handling.
 * Fulfills syllabus: Lectures 55-60 (Reusable input components)
 */
const TextareaField = forwardRef(function TextareaField(
  {
    label,
    id,
    name,
    value,
    onChange,
    onBlur,
    placeholder,
    error,
    helperText,
    required = false,
    disabled = false,
    rows = 3,
    maxLength,
    className = "",
    ...props
  },
  ref
) {
  const textareaId = id || `field-${name}`;
  const errorId = `${textareaId}-error`;

  return (
    <div className={`form-group ${error ? "has-error" : ""} ${className}`}>
      <div className="label-wrapper">
        {label && (
          <label htmlFor={textareaId} className="form-label">
            {label} {required && <span className="required-star" aria-hidden="true">*</span>}
          </label>
        )}
        {maxLength && (
          <span className="char-count">
            {(value || "").length}/{maxLength}
          </span>
        )}
      </div>

      <textarea
        ref={ref}
        id={textareaId}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={placeholder}
        disabled={disabled}
        required={required}
        rows={rows}
        maxLength={maxLength}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? errorId : undefined}
        className={`form-textarea ${error ? "input-error" : ""}`}
        {...props}
      />

      {error ? (
        <p id={errorId} className="error-message" role="alert">
          ⚠️ {error}
        </p>
      ) : helperText ? (
        <p className="helper-text">{helperText}</p>
      ) : null}
    </div>
  );
});

export default TextareaField;
