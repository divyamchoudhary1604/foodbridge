import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import InputField from "../components/common/InputField";
import SelectField from "../components/common/SelectField";
import TextareaField from "../components/common/TextareaField";
import { useFood } from "../context/FoodContext";
import { useToast } from "../context/ToastContext";
import "../styles/form.css";

function DonateFood() {
  const navigate = useNavigate();
  const { addFood } = useFood();
  const { showToast } = useToast();

  const [formData, setFormData] = useState({
    donorName: "",
    foodName: "",
    category: "",
    quantity: "",
    unit: "meals",
    location: "",
    phone: "",
    expiry: "",
    description: ""
  });

  const [errors, setErrors] = useState({});

  const donorInputRef = useRef(null);

  useEffect(() => {
    if (donorInputRef.current) {
      donorInputRef.current.focus();
    }
  }, []);

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Real-time error clearance
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  }

  function validateForm() {
    const newErrors = {};

    if (!formData.donorName.trim()) {
      newErrors.donorName = "Donor name is required";
    }

    if (!formData.foodName.trim()) {
      newErrors.foodName = "Food name is required";
    }

    if (!formData.category) {
      newErrors.category = "Please choose a food category";
    }

    if (!formData.quantity || Number(formData.quantity) <= 0) {
      newErrors.quantity = "Please enter a valid positive quantity";
    }

    if (!formData.location.trim()) {
      newErrors.location = "Pickup address is required";
    }

    // Phone regex / length validation
    const phoneClean = formData.phone.replace(/\D/g, "");
    if (phoneClean.length < 10) {
      newErrors.phone = "Phone number must be at least 10 digits";
    }

    if (!formData.expiry) {
      newErrors.expiry = "Expiry date is required for safety";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (!validateForm()) {
      showToast("Please correct the errors in the form", "error");
      return;
    }

    const newDonation = addFood(formData);
    showToast("Donation listing published successfully! 🍲", "success");
    navigate(`/food/${newDonation.id}`);
  }

  const categoryOptions = [
    "Cooked Meals",
    "Bakery & Bread",
    "Fruits & Vegetables",
    "Packaged & Canned",
    "Dairy",
    "Beverages"
  ];

  const unitOptions = ["meals", "portions", "kg", "packets", "boxes", "liters"];

  return (
    <main className="form-page">
      <div className="form-container">
        <div className="form-card" style={{ maxWidth: "680px" }}>
          <h1>🍲 Donate Surplus Food</h1>
          <p className="form-subtitle">
            Share good surplus food with local NGOs and volunteers
          </p>

          <form onSubmit={handleSubmit} noValidate>
            <InputField
              ref={donorInputRef}
              label="Donor / Organization Name"
              name="donorName"
              placeholder="e.g. Green Leaf Cafe or Ananya Roy"
              value={formData.donorName}
              onChange={handleChange}
              error={errors.donorName}
              required
            />

            <InputField
              label="Food Item Name"
              name="foodName"
              placeholder="e.g. Fresh Vegetable Biryani or Bread Loaves"
              value={formData.foodName}
              onChange={handleChange}
              error={errors.foodName}
              required
            />

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
              <SelectField
                label="Food Category"
                name="category"
                options={categoryOptions}
                placeholder="Choose category"
                value={formData.category}
                onChange={handleChange}
                error={errors.category}
                required
              />

              <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "8px" }}>
                <InputField
                  label="Quantity"
                  name="quantity"
                  type="number"
                  placeholder="e.g. 25"
                  value={formData.quantity}
                  onChange={handleChange}
                  error={errors.quantity}
                  required
                />
                <SelectField
                  label="Unit"
                  name="unit"
                  options={unitOptions}
                  placeholder=""
                  value={formData.unit}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
              <InputField
                label="Pickup Location"
                name="location"
                placeholder="e.g. 12 Park Street, Block B"
                value={formData.location}
                onChange={handleChange}
                error={errors.location}
                required
              />

              <InputField
                label="Contact Phone"
                name="phone"
                type="tel"
                placeholder="e.g. 9876543210"
                value={formData.phone}
                onChange={handleChange}
                error={errors.phone}
                required
              />
            </div>

            <InputField
              label="Best Before / Expiry Time"
              name="expiry"
              type="datetime-local"
              value={formData.expiry}
              onChange={handleChange}
              error={errors.expiry}
              helperText="Specify when the food must be consumed or picked up"
              required
            />

            <TextareaField
              label="Pickup Instructions & Notes"
              name="description"
              placeholder="e.g. Packed in food-grade foil containers, entrance from side gate."
              value={formData.description}
              onChange={handleChange}
              rows={3}
              maxLength={250}
            />

            <button
              type="submit"
              className="primary-button form-submit-button"
              style={{ width: "100%", marginTop: "16px" }}
            >
              🚀 Publish Food Donation
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}

export default DonateFood;
