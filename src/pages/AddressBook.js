import { useEffect, useState } from "react";
import useProductContext from "../contexts/useContext";

function AddressForm({ setShowForm, editIndex, setEditIndex }) {

  
  const { address, setAddress } = useProductContext();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    address: "",
    address2: "",
    city: "",
    state: "",
    zip: "",
  });

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData({ ...formData, [name]: value });
  }

  useEffect(() => {
    if (editIndex !== null && address[editIndex]) {
      setFormData(address[editIndex]);
    }
  }, [editIndex, address]);

  function handleAddressSubmit(event) {
    event.preventDefault();
    const updatedAddress =
      editIndex !== null
        ? address.map((adr, i) => (i === editIndex ? formData : adr))
        : [...address, formData];

    setAddress(updatedAddress);
    setShowForm(false);
    resetForm();
  }

  // console.log(formData);

  function resetForm() {
    setFormData({
      firstName: "",
      lastName: "",
      address: "",
      address2: "",
      city: "",
      state: "",
      zip: "",
    });

    setEditIndex(null);
    setShowForm(false);
  }

  return (
    <form className="row g-3" onSubmit={handleAddressSubmit}>
      <div className="col-md-6">
        <label>First Name</label>
        <input
          name="firstName"
          type="text"
          className="form-control"
          value={formData.firstName}
          onChange={handleChange}
          required
        />
      </div>
      <div className="col-md-6">
        <label>Last Name</label>
        <input
          name="lastName"
          type="text"
          className="form-control"
          value={formData.lastName}
          onChange={handleChange}
          required
        />
      </div>
      <div className="col-12">
        <label>Address</label>
        <input
          name="address"
          type="text"
          className="form-control"
          placeholder="1234 Main St"
          value={formData.address}
          onChange={handleChange}
          required
        />
      </div>
      <div className="col-12">
        <label>Address 2</label>
        <input
          name="address2"
          type="text"
          className="form-control"
          placeholder="Apartment, studio, or floor"
          value={formData.address2}
          onChange={handleChange}
        />
      </div>
      <div className="col-md-6">
        <label>City</label>
        <input
          name="city"
          type="text"
          className="form-control"
          value={formData.city}
          onChange={handleChange}
          required
        />
      </div>
      <div className="col-md-4">
        <label>State</label>
        <input
          name="state"
          type="text"
          className="form-control"
          value={formData.state}
          onChange={handleChange}
          required
        />
      </div>
      <div className="col-md-2">
        <label>Zip</label>
        <input
          name="zip"
          type="text"
          className="form-control"
          value={formData.zip}
          onChange={handleChange}
          required
        />
      </div>
      <div className="col-12 d-flex gap-2">
        <button type="submit" className="btn btn-info">
          {editIndex !== null ? "Update Address" : "Save Address"}
        </button>
        <button
          type="button"
          className="btn btn-info"
          onClick={() => {
            setShowForm(false);
            setEditIndex("");
          }}
        >
          Cancel
        </button>
      </div>
    </form>
  );
}

export default function AddressBook({ showForm, setShowForm }) {
  const { address, setAddress } = useProductContext();
  const [editIndex, setEditIndex] = useState(null);

  function handleEditAddress(index) {
    setEditIndex(index);
    setShowForm(true);
  }

  function handleDeleteAddress(index) {
    console.log(index);

    setAddress(address.filter((adr, i) => i !== index));
  }

  return (
    <div>
      {showForm ? (
        <AddressForm
          setShowForm={setShowForm}
          editIndex={editIndex}
          setEditIndex={setEditIndex}
        />
      ) : (
        <div>
          <div className="d-flex justify-content-between align-items-center mb-3">
            <div>
              <h5 className="mb-0">Address Book</h5>
              <small className="text-muted">Save or Update Address</small>
            </div>
            <button
              className="btn btn-sm btn-info"
              onClick={() => setShowForm(true)} // It shows adderess form As want add new add
            >
              Add New Address
            </button>
          </div>

          {address.length === 0 ? (
            <div className="text-center text-muted py-4">No address saved.</div>
          ) : (
            <ul className="list-group">
              {address.map((addr, index) => (
                <li
                  key={index}
                  className="list-group-item d-flex justify-content-between align-items-start"
                >
                  <div>
                    <div>
                      <strong>
                        {addr.firstName} {addr.lastName}
                      </strong>
                    </div>
                    <div>
                      {addr.address}
                      {addr.address2 && `, ${addr.address2}`}
                    </div>
                    <div>
                      {addr.city}, {addr.state} - {addr.zip}
                    </div>
                  </div>
                  <div>
                    <button
                      className="btn btn-link"
                      onClick={() => handleEditAddress(index)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-link"
                      onClick={() => handleDeleteAddress(index)}
                    >
                      Delete
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
