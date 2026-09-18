import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/form.css";

/**
 * DonateFood Page – Controlled Form
 *
 * A form where donors can post surplus food.
 * Uses useState for all form fields as a single object.
 * Uses useRef to auto-focus the first input on page load.
 *
 * Props:
 * - onAddDonation: function called with the new donation object
 */
function DonateFood({ onAddDonation }) {
  const navigate = useNavigate();

  // useRef to focus the first input field when the page loads
  const donorNameRef = useRef(null);

  // Auto-focus the donor name input when component mounts
  useEffect(() => {
    if (donorNameRef.current) {
      donorNameRef.current.focus();
    }
  }, []);

  // Form data state – one object holds all field values
  const [formData, setFormData] = useState({
    donorName: "",
    foodName: "",
    category: "",
    quantity: "",
    unit: "",
    location: "",
    phone: "",
    expiry: "",
    description: "",
  });

  // State to hold validation error messages
  const [errors, setErrors] = useState({});

  // State to show success message after submission
  const [showSuccess, setShowSuccess] = useState(false);

  /**
   * handleChange – updates the correct field in formData
   * Uses the input's "name" attribute to know which field to update
   */
  function handleChange(event) {
    const { name, value } = event.target;

    // Update the specific field while keeping other fields unchanged
    setFormData({ ...formData, [name]: value });

    // Clear the error for this field when user starts typing
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  }

  /**
   * validateForm – checks all required fields and returns errors object
   * Returns true if form is valid, false otherwise
   */
  function validateForm() {
    const newErrors = {};

    if (!formData.donorName.trim()) {
      newErrors.donorName = "Donor name is required";
    }

    if (!formData.foodName.trim()) {
      newErrors.foodName = "Food name is required";
    }

    if (!formData.category) {
      newErrors.category = "Please select a category";
    }

    if (!formData.quantity || Number(formData.quantity) <= 0) {
      newErrors.quantity = "Quantity must be greater than 0";
    }

    if (!formData.unit.trim()) {
      newErrors.unit = "Unit is required (e.g., plates, packets)";
    }

    if (!formData.location.trim()) {
      newErrors.location = "Location is required";
    }

    // Phone validation: must be 10 digits
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (formData.phone.trim().length < 10) {
      newErrors.phone = "Phone number must be at least 10 digits";
    }

    if (!formData.expiry) {
      newErrors.expiry = "Expiry date and time is required";
    }

    setErrors(newErrors);

    // If there are no errors, the form is valid
    const isValid = Object.keys(newErrors).length === 0;
    return isValid;
  }

  /**
   * handleSubmit – creates a new donation and calls onAddDonation
   */
  function handleSubmit(event) {
    // Prevent page refresh on form submit
    event.preventDefault();

    // Validate the form first
    const isValid = validateForm();
    if (!isValid) {
      return;
    }

    // Create a new donation object
    const newDonation = {
      id: Date.now(), // Use current timestamp as a unique id
      donorName: formData.donorName.trim(),
      foodName: formData.foodName.trim(),
      category: formData.category,
      quantity: Number(formData.quantity),
      unit: formData.unit.trim(),
      location: formData.location.trim(),
      phone: formData.phone.trim(),
      expiry: formData.expiry,
      description: formData.description.trim(),
      status: "Available", // New donations are always "Available"
    };

    // Call the parent function to add this donation
    onAddDonation(newDonation);

    // Clear the form
    setFormData({
      donorName: "",
      foodName: "",
      category: "",
      quantity: "",
      unit: "",
      location: "",
      phone: "",
      expiry: "",
      description: "",
    });

    // Show success message
    setShowSuccess(true);

    // Hide success message after 3 seconds
    setTimeout(() => {
      setShowSuccess(false);
    }, 3000);
  }

  return (
    <main className="form-page">
      <div className="form-container">
        <div className="form-card">
          <h1>🍲 Donate Food</h1>
          <p className="form-subtitle">
            Fill in the details about your surplus food to help feed those in
            need
          </p>

          {/* Success message shown after donation is submitted */}
          {showSuccess && (
            <div className="success-message">
              ✅ Donation posted successfully! Thank you for your generosity.
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate>
            {/* Donor Name */}
            <div className="form-group">
              <label htmlFor="donorName">
                Donor Name <span className="required-star">*</span>
              </label>
              <input
                ref={donorNameRef}
                id="donorName"
                type="text"
                name="donorName"
                className={`form-input ${errors.donorName ? "input-error" : ""}`}
                placeholder="e.g., Green Leaf Restaurant"
                value={formData.donorName}
                onChange={handleChange}
              />
              {errors.donorName && (
                <p className="field-error">{errors.donorName}</p>
              )}
            </div>

            {/* Food Name */}
            <div className="form-group">
              <label htmlFor="foodName">
                Food Name <span className="required-star">*</span>
              </label>
              <input
                id="foodName"
                type="text"
                name="foodName"
                className={`form-input ${errors.foodName ? "input-error" : ""}`}
                placeholder="e.g., Vegetable Rice"
                value={formData.foodName}
                onChange={handleChange}
              />
              {errors.foodName && (
                <p className="field-error">{errors.foodName}</p>
              )}
            </div>

            {/* Category */}
            <div className="form-group">
              <label htmlFor="category">
                Category <span className="required-star">*</span>
              </label>
              <select
                id="category"
                name="category"
                className={`form-select ${errors.category ? "input-error" : ""}`}
                value={formData.category}
                onChange={handleChange}
              >
                <option value="">Select category</option>
                <option value="Meals">Meals</option>
                <option value="Bakery">Bakery</option>
                <option value="Fruits">Fruits</option>
                <option value="Packaged Food">Packaged Food</option>
              </select>
              {errors.category && (
                <p className="field-error">{errors.category}</p>
              )}
            </div>

            {/* Quantity and Unit (side by side) */}
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="quantity">
                  Quantity <span className="required-star">*</span>
                </label>
                <input
                  id="quantity"
                  type="number"
                  name="quantity"
                  className={`form-input ${errors.quantity ? "input-error" : ""}`}
                  placeholder="e.g., 25"
                  value={formData.quantity}
                  onChange={handleChange}
                  min="1"
                />
                {errors.quantity && (
                  <p className="field-error">{errors.quantity}</p>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="unit">
                  Unit <span className="required-star">*</span>
                </label>
                <input
                  id="unit"
                  type="text"
                  name="unit"
                  className={`form-input ${errors.unit ? "input-error" : ""}`}
                  placeholder="e.g., plates, packets"
                  value={formData.unit}
                  onChange={handleChange}
                />
                {errors.unit && (
                  <p className="field-error">{errors.unit}</p>
                )}
              </div>
            </div>

            {/* Location */}
            <div className="form-group">
              <label htmlFor="location">
                Pickup Location <span className="required-star">*</span>
              </label>
              <input
                id="location"
                type="text"
                name="location"
                className={`form-input ${errors.location ? "input-error" : ""}`}
                placeholder="e.g., Sector 17, Chandigarh"
                value={formData.location}
                onChange={handleChange}
              />
              {errors.location && (
                <p className="field-error">{errors.location}</p>
              )}
            </div>

            {/* Phone */}
            <div className="form-group">
              <label htmlFor="phone">
                Phone Number <span className="required-star">*</span>
              </label>
              <input
                id="phone"
                type="tel"
                name="phone"
                className={`form-input ${errors.phone ? "input-error" : ""}`}
                placeholder="e.g., 9876543210"
                value={formData.phone}
                onChange={handleChange}
              />
              {errors.phone && (
                <p className="field-error">{errors.phone}</p>
              )}
            </div>

            {/* Expiry Date/Time */}
            <div className="form-group">
              <label htmlFor="expiry">
                Expiry Date & Time <span className="required-star">*</span>
              </label>
              <input
                id="expiry"
                type="datetime-local"
                name="expiry"
                className={`form-input ${errors.expiry ? "input-error" : ""}`}
                value={formData.expiry}
                onChange={handleChange}
              />
              {errors.expiry && (
                <p className="field-error">{errors.expiry}</p>
              )}
            </div>

            {/* Description (optional) */}
            <div className="form-group">
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                name="description"
                className="form-textarea"
                placeholder="Add any additional details about the food..."
                value={formData.description}
                onChange={handleChange}
                rows="4"
              />
            </div>

            {/* Submit Button */}
            <button type="submit" className="primary-button form-submit-button">
              🍲 Post Donation
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}

export default DonateFood;
