import { useEffect, useState } from "react";
import useProductContext from "../contexts/useContext";
import { toast } from "react-toastify";

function AddressForm({ setShowForm, editId, setEditId }) {
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
    if (editId !== null) {
      const toEdit = address.find((adr) => adr._id == editId);
      if (toEdit) setFormData(toEdit);
    }
  }, [editId, address]);

  function handleAddressSubmit(event) {
    event.preventDefault();

    const url =
      editId !== null
        ? `https://major-project-backend-liart.vercel.app/address/update/${editId}`
        : `https://major-project-backend-liart.vercel.app/address`;

    fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then(() => {
        const updatedAddress =
          editId !== null
            ? address.map((adr, i) => (adr._id === editId ? formData : adr)) //update only the selected address in the array
            : [...address, formData]; //append the new address

        setAddress(updatedAddress);

        toast.info(
          editId !== null
            ? "Address updated successfully!"
            : "Address added successfully!"
        );
      })
      .catch(() => {
        toast.error("Something went wrong. Please try again.");
      });

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

    setEditId(null);
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
          {editId !== null ? "Update Address" : "Save Address"}
        </button>
        <button
          type="button"
          className="btn btn-info"
          onClick={() => {
            setShowForm(false);
            setEditId("");
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
  const [editId, setEditId] = useState(null);

  function handleEditAddress(id) {
    setEditId(id);
    setShowForm(true);
  }

  function handleDeleteAddress(id) {
    console.log(id);
    fetch(`https://major-project-backend-liart.vercel.app/address/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then(() => {
        setAddress(address.filter((adr, i) => adr._id !== id));
        toast.info("Address deleted.");
      })
      .catch(() => toast.error("Failed to delete address."));
  }

  return (
    <div>
      {showForm ? (
        <AddressForm
          setShowForm={setShowForm}
          editId={editId}
          setEditId={setEditId}
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
                      onClick={() => handleEditAddress(addr._id)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-link"
                      onClick={() => handleDeleteAddress(addr._id)}
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
