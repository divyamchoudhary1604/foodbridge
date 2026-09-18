import { useState } from "react";

/**
 * EditDonationModal Component
 *
 * A simple modal form that lets the user edit a donation's details.
 * It appears as an overlay on top of the Dashboard page.
 *
 * Props:
 * - donation: the donation object to edit
 * - onSave: function called with the updated donation object
 * - onClose: function called to close the modal
 */
function EditDonationModal({ donation, onSave, onClose }) {
  // Create a copy of the donation to edit without changing the original
  const [editData, setEditData] = useState({
    foodName: donation.foodName,
    quantity: donation.quantity,
    unit: donation.unit,
    location: donation.location,
    status: donation.status,
  });

  // Update the editData state when user types in any field
  function handleChange(event) {
    const { name, value } = event.target;
    setEditData({ ...editData, [name]: value });
  }

  // When the user clicks Save, merge edited fields with original donation
  function handleSubmit(event) {
    event.preventDefault();

    // Create updated donation by combining original with edited fields
    const updatedDonation = {
      ...donation,
      foodName: editData.foodName,
      quantity: Number(editData.quantity),
      unit: editData.unit,
      location: editData.location,
      status: editData.status,
    };

    onSave(updatedDonation);
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      {/* Stop click inside modal from closing it */}
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <h2>Edit Donation</h2>

        <form onSubmit={handleSubmit}>
          {/* Food Name */}
          <div className="form-group">
            <label htmlFor="edit-foodName">Food Name</label>
            <input
              id="edit-foodName"
              type="text"
              name="foodName"
              className="form-input"
              value={editData.foodName}
              onChange={handleChange}
              required
            />
          </div>

          {/* Quantity and Unit */}
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="edit-quantity">Quantity</label>
              <input
                id="edit-quantity"
                type="number"
                name="quantity"
                className="form-input"
                value={editData.quantity}
                onChange={handleChange}
                min="1"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="edit-unit">Unit</label>
              <input
                id="edit-unit"
                type="text"
                name="unit"
                className="form-input"
                value={editData.unit}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* Location */}
          <div className="form-group">
            <label htmlFor="edit-location">Location</label>
            <input
              id="edit-location"
              type="text"
              name="location"
              className="form-input"
              value={editData.location}
              onChange={handleChange}
              required
            />
          </div>

          {/* Status */}
          <div className="form-group">
            <label htmlFor="edit-status">Status</label>
            <select
              id="edit-status"
              name="status"
              className="form-select"
              value={editData.status}
              onChange={handleChange}
            >
              <option value="Available">Available</option>
              <option value="Accepted">Accepted</option>
              <option value="Completed">Completed</option>
            </select>
          </div>

          {/* Action buttons */}
          <div className="modal-actions">
            <button type="button" className="secondary-button" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="primary-button">
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditDonationModal;
