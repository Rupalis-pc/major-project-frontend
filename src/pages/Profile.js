import { useState } from "react";
import AddressBook from "./AddressBook";
import ProfileUI from "./ProfileUi";
import useProductContext from "../contexts/useContext";
import { products } from "./array";
import { Link } from "react-router-dom";

export default function Profile() {
  const searchParams = new URLSearchParams(window.location.search);
  const defaultSearch = searchParams.get("section", "address") || "profile";

  const { placedOrders, addedProductIds } =
    useProductContext();

  const [selectedSection, setSelectedSection] = useState(defaultSearch);
  const [showForm, setShowForm] = useState(false);

  function handleSelectedSection(section) {
    setSelectedSection(section);

    if (section === "address") {
      setShowForm(false); // hide form when coming back to Address Book
    }
  }

  const addedProducts = products.filter((product) =>
    addedProductIds.includes(product.productId)
  );
//   console.log("Placed orders:", placedOrders);

  return (
    <main className="bg-body-light p-4">
      <div className="container">
        <div className="row">
          <div className="col-md-3">
            <div className="border shadow-sm p-3 bg-white rounded">
              <div className="p-0 mb-3">
                <h5
                  role="button"
                  className={`text-decoration-none text-dark fw-bold mb-0`}
                  onClick={() => handleSelectedSection("profile")}
                >
                  My Profile
                </h5>
                <small className="text-muted">Rupali Sethia</small>
              </div>
              <ul className="list-unstyled">
                <li className="mb-2">
                  <button
                    type="button"
                    className={`btn btn-link text-decoration-none text-dark p-0 ${
                      selectedSection === "orders" ? "fw-semibold" : ""
                    }`}
                    onClick={() => handleSelectedSection("orders")}
                  >
                    My Orders
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    className={`btn btn-link text-decoration-none text-dark p-0 ${
                      selectedSection === "address" ? "fw-semibold" : ""
                    }`}
                    onClick={() => handleSelectedSection("address")}
                  >
                    Address Book
                  </button>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-md-9">
            <div className="container border shadow-sm p-3">
              {selectedSection === "profile" ? (
                <ProfileUI />
              ) : selectedSection === "orders" ? (
                placedOrders.length === 0 ? (
                  <div className="text-center py-5">
                    <h5>No orders</h5>
                  </div>
                ) : (
                  <div className="row g-4">
                    {placedOrders?.map((order, index) => (
                      <div className="col-md-12" key={index}>
                        <div className="card shadow-sm border">
                          <div className="card-body">
                            <div className="d-flex justify-content-between align-items-center mb-3">
                              <h6 className="mb-0 fw-semibold">
                                Order {order.orderId}
                              </h6>
                              <span className="badge bg-success">Placed</span>
                            </div>

                            <div className="row">
                              <div className="col-md-8">
                                <p className="mb-1">
                                  <strong>Products: </strong>
                                  {order.items.length} Products
                                </p>
                                <ul className="mb-1">
                                  {order.items.map((item, i) => (
                                    <li key={i}>
                                      {item.productName} × {item.quantity}
                                    </li>
                                  ))}
                                </ul>
                                <p className="mb-1">
                                  <strong>Total: </strong> ₹{order.total}
                                </p>
                                <p className="mb-0">
                                  <strong>Delivery Address:</strong>{" "}
                                  {order.address.firstName}{" "}
                                  {order.address.lastName},{" "}
                                  {order.address.address}, {order.address.city},{" "}
                                  {order.address.state} - {order.address.zip}
                                </p>
                              </div>
                              <div className="col-md-4 text-md-end">
                                <p className="mb-1 text-muted">
                                  Placed on: {order.date || "Just now"}
                                </p>
                                <Link
                                  to={`/order/${order.orderId}`}
                                  className="btn btn-outline-info btn-sm mt-2"
                                >
                                  View Details
                                </Link>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )
              ) : (
                <AddressBook showForm={showForm} setShowForm={setShowForm} />
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
