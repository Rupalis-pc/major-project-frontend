import { Link } from "react-router-dom";
import useProductContext from "../contexts/useContext";
import { products } from "./array";
import { useState } from "react";

export default function Cart() {
  const [selectedAddressIndex, setSelectedAddressIndex] = useState(null);
  const { setPlacedOrders, clearCart } = useProductContext();

  const {
    addedProductIds,
    addToWishlist,
    deleteFromCart,
    increaseQuantity,
    getProductQuantity,
    decreaseQuantity,
    wishListProductIds,
    address,
  } = useProductContext();

  const addedProducts = products.filter((product) =>
    addedProductIds.includes(product.productId)
  );

  const allAddedProductPrice = addedProducts.reduce(
    (acc, curr) => acc + curr.mrp * getProductQuantity(curr.productId),
    0
  );

  const deliveryCharges = 120;

  const selectedAddressForCheckout = address[selectedAddressIndex];

  function handlePlaceOrder() {
    if (addedProducts.length === 0 || selectedAddressIndex === null) return;

    const newOrder = {
      orderId: Date.now(),
      items: addedProducts.map((product) => ({
        ...product,
        quantity: getProductQuantity(product.productId),
      })),
      total: allAddedProductPrice + deliveryCharges,
      address: selectedAddressForCheckout,
      date: new Date().toLocaleString(),
    };
    console.log("New order added:", newOrder);

    setPlacedOrders((prev) => [...prev, newOrder]);
    clearCart();
  }

  return (
    <main className="container">
      <div className="row justify-content-center">
        <div className="col-md-10">
          <h4 className="text-center">My Cart ({addedProductIds.length})</h4>
          {addedProducts.length === 0 ? (
            <div className="text-center py-4" style={{ height: "200px" }}>
              <p className="">Your shopping cart is empty!</p>
              <Link to="/" className="btn btn-info">
                Continue Shopping
              </Link>
            </div>
          ) : (
            <div className="row">
              <div className="col-md-7 py-4">
                <ul className="list-group">
                  {addedProducts.map((product) => (
                    <li className="list-group-item" key={product.productId}>
                      <div className="row g-4 py-4" style={{ width: "540px" }}>
                        <div className="col-md-5">
                          <Link
                            to={"/product/" + product.productId}
                            style={{ textDecoration: "none" }}
                          >
                            <img
                              src={product.productImage}
                              className="img-fluid rounded"
                              style={{
                                height: "220px",
                                width: "100%",
                                objectFit: "cover",
                              }}
                              alt={product.productName}
                            />
                          </Link>
                        </div>
                        <div className="col-md-7">
                          <div>
                            <Link
                              to={"/product/" + product.productId}
                              style={{ textDecoration: "none", color: "black" }}
                            >
                              <h5 className="mb-0">{product.productName}</h5>
                            </Link>
                            <p>({product.categoryType})</p>
                            <div className="d-flex gap-2 align-items-center mb-4">
                              <div>Qty: </div>
                              <div className="btn-group" role="group">
                                <button
                                  className="btn btn-outline-info btn-sm"
                                  onClick={() =>
                                    decreaseQuantity(product.productId)
                                  }
                                >
                                  -
                                </button>
                                <button
                                  className="btn btn-outline-info btn-sm"
                                  disabled
                                >
                                  {getProductQuantity(product.productId)}
                                </button>
                                <button
                                  onClick={() =>
                                    increaseQuantity(product.productId)
                                  }
                                  className="btn btn-outline-info btn-sm"
                                >
                                  +
                                </button>
                              </div>

                              <div>Rs. {product.productPrice}</div>
                            </div>
                            <div className="d-grid gap-2 col-10 ml-0">
                              <button
                                onClick={() =>
                                  deleteFromCart(product.productId)
                                }
                                className="btn btn-info"
                                type="button"
                              >
                                Remove From Cart
                              </button>
                              {wishListProductIds.find(
                                (id) => id === product.productId
                              ) ? (
                                <Link
                                  to="/wishlist"
                                  type="button"
                                  className="btn btn-info"
                                >
                                  Move to Wishlist
                                </Link>
                              ) : (
                                <button
                                  onClick={() =>
                                    addToWishlist(product.productId)
                                  }
                                  className="btn btn-info"
                                  type="button"
                                >
                                  Add To Wishlist
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="col-md-5 py-4">
                {addedProducts.length > 0 && (
                  <div className="card">
                    <div className="container py-4">
                      <p className="fw-bold">PRICE DETAILS</p>
                      <hr />
                      <div className="d-flex justify-content-between">
                        <p>Price ({addedProductIds.length} Product)</p>
                        <p>Rs. {allAddedProductPrice}</p>
                      </div>

                      <div className="d-flex justify-content-between">
                        <p>Delivery Charges</p>
                        <p>Rs. {deliveryCharges} </p>
                      </div>
                      <hr />
                      <div className="d-flex justify-content-between fw-bold mb-0">
                        <p>TOTAL AMOUNT</p>
                        <p>Rs. {allAddedProductPrice + deliveryCharges} </p>
                      </div>
                      <hr />
                      <div className="d-grid mb-3">
                        <label className="mb-2 fw-semibold">
                          Delivery Address
                        </label>

                        {address.length > 0 ? (
                          <>
                            <select
                              className="form-select mb-2"
                              onChange={(event) =>
                                setSelectedAddressIndex(event.target.value)
                              }
                            >
                              <option value="">Select address</option>
                              {address.map((addr, index) => (
                                <option key={index} value={index}>
                                  {addr.firstName} {addr.lastName},{" "}
                                  {addr.address}, {addr.city}, {addr.state} -{" "}
                                  {addr.zip}
                                </option>
                              ))}
                            </select>
                            {selectedAddressIndex !== null ? (
                              <div className="d-flex justify-content-between">
                                <Link
                                  to="/profile?section=address"
                                  className="btn btn-outline-info btn-sm"
                                >
                                  Edit/Delete Address
                                </Link>
                                <Link
                                  to="/profile?section=address"
                                  className="btn btn-outline-info btn-sm"
                                >
                                  Add New Address
                                </Link>
                              </div>
                            ) : (
                              ""
                            )}
                          </>
                        ) : (
                          <Link
                            to="/profile?section=address"
                            className="btn btn-outline-info btn-sm"
                          >
                            Add New Address
                          </Link>
                        )}
                      </div>

                      {selectedAddressIndex !== null &&
                        selectedAddressForCheckout && (
                          <p>
                            <span className="fw-bold">Deliever To:</span> <br />
                            {selectedAddressForCheckout.firstName}{" "}
                            {selectedAddressForCheckout.lastName},{" "}
                            {selectedAddressForCheckout.address},{" "}
                            {selectedAddressForCheckout.address2 &&
                              `, ${selectedAddressForCheckout.address2}`}{" "}
                            , {selectedAddressForCheckout.city},{" "}
                            {selectedAddressForCheckout.state} -{" "}
                            {selectedAddressForCheckout.zip}
                          </p>
                        )}

                      <div className="d-grid">
                        {selectedAddressIndex === null ? (
                          <button className="btn btn-info" disabled>
                            Place Order
                          </button>
                        ) : (
                          <Link
                            className="btn btn-info"
                            to="/profile?section=orders"
                            onClick={handlePlaceOrder}
                          >
                            Place Order
                          </Link>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
