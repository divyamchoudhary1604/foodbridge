import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/form.css";

function DonateFood({ onAddDonation }) {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    donorName: "",
    foodName: "",
    category: "",
    quantity: "",
    unit: "",
    location: "",
    phone: "",
    expiry: "",
    description: ""
  });

  const [errors, setErrors] = useState({});

  const [success, setSuccess] = useState(false);

  const donorInput = useRef(null);

  useEffect(() => {
    donorInput.current.focus();
  }, []);


  function handleChange(e) {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value
    });
  }


  function validateForm() {
    const newErrors = {};

    if (!formData.donorName.trim())
      newErrors.donorName = "Donor name is required";

    if (!formData.foodName.trim())
      newErrors.foodName = "Food name is required";

    if (!formData.category)
      newErrors.category = "Please select a category";

    if (!formData.quantity || Number(formData.quantity) <= 0)
      newErrors.quantity = "Enter a valid quantity";

    if (!formData.unit.trim())
      newErrors.unit = "Unit is required";

    if (!formData.location.trim())
      newErrors.location = "Location is required";

    if (formData.phone.trim().length < 10)
      newErrors.phone = "Enter a valid phone number";

    if (!formData.expiry)
      newErrors.expiry = "Expiry date is required";

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  }


  function handleSubmit(e) {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const newDonation = {
      id: Date.now(),
      ...formData,
      quantity: Number(formData.quantity),
      status: "Available"
    };

    onAddDonation(newDonation);

    setFormData({
      donorName: "",
      foodName: "",
      category: "",
      quantity: "",
      unit: "",
      location: "",
      phone: "",
      expiry: "",
      description: ""
    });

    setSuccess(true);

    setTimeout(() => {
      setSuccess(false);
    }, 3000);
  }


  return (
    <main className="form-page">

      <div className="form-container">

        <div className="form-card">

          <h1>🍲 Donate Food</h1>

          <p>
            Fill in the details about your surplus food
          </p>

          {success && (
            <div className="success-message">
              ✅ Donation posted successfully!
            </div>
          )}

          <form onSubmit={handleSubmit}>

            <div className="form-group">
              <label>Donor Name *</label>

              <input
                ref={donorInput}
                name="donorName"
                value={formData.donorName}
                onChange={handleChange}
                placeholder="e.g. Green Leaf Restaurant"
              />

              {errors.donorName && (
                <p>{errors.donorName}</p>
              )}
            </div>

            <div className="form-group">
              <label>Food Name *</label>

              <input
                name="foodName"
                value={formData.foodName}
                onChange={handleChange}
                placeholder="e.g. Vegetable Rice"
              />

              {errors.foodName && (
                <p>{errors.foodName}</p>
              )}
            </div>

            <div className="form-group">
              <label>Category *</label>

              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
              >
                <option value="">Select category</option>
                <option value="Meals">Meals</option>
                <option value="Bakery">Bakery</option>
                <option value="Fruits">Fruits</option>
                <option value="Packaged Food">
                  Packaged Food
                </option>
              </select>

              {errors.category && (
                <p>{errors.category}</p>
              )}
            </div>

            <div className="form-row">

              <div className="form-group">
                <label>Quantity *</label>

                <input
                  type="number"
                  name="quantity"
                  value={formData.quantity}
                  onChange={handleChange}
                  placeholder="25"
                />

                {errors.quantity && (
                  <p>{errors.quantity}</p>
                )}
              </div>

              <div className="form-group">
                <label>Unit *</label>

                <input
                  name="unit"
                  value={formData.unit}
                  onChange={handleChange}
                  placeholder="plates"
                />

                {errors.unit && (
                  <p>{errors.unit}</p>
                )}
              </div>

            </div>

            <div className="form-group">
              <label>Pickup Location *</label>

              <input
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="e.g. Sector 17, Chandigarh"
              />

              {errors.location && (
                <p>{errors.location}</p>
              )}
            </div>

            <div className="form-group">
              <label>Phone Number *</label>

              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                pattern="[6-9][0-9]{9}"
                placeholder="9876543210"
              />

              {errors.phone && (
                <p>{errors.phone}</p>
              )}
            </div>

            <div className="form-group">
              <label>Expiry Date & Time *</label>

              <input
                type="datetime-local"
                name="expiry"
                value={formData.expiry}
                onChange={handleChange}
              />

              {errors.expiry && (
                <p>{errors.expiry}</p>
              )}
            </div>

            <div className="form-group">
              <label>Description</label>

              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Additional details..."
              />
            </div>

            <button type="submit">
              🍲 Post Donation
            </button>

          </form>

        </div>

      </div>

    </main>
  );
}

export default DonateFood;
