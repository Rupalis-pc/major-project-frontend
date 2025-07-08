import { Link } from "react-router-dom";
import useProductContext from "../contexts/useContext";
import { products } from "./array";

export default function Cart() {
  const { addedProductIds, addToWishlist, deleteFromCart } =
    useProductContext();

  const addedProducts = products.filter((product) =>
    addedProductIds.includes(product.productId)
  );

  function addToWishlistHandler(product) {
    addToWishlist(product.productId);
    deleteFromCart(product.productId);
  }

  function removeFromCartHandler(product) {
    deleteFromCart(product.productId);
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
                          <img
                            src={product.productImage}
                            className="img-fluid rounded"
                            style={{
                              height: "170px",
                              width: "100%",
                              objectFit: "cover",
                            }}
                            alt={product.productName}
                          />
                        </div>
                        <div className="col-md-7">
                          <div>
                            <h5 className="mb-0">{product.productName}</h5>
                            <p>({product.categoryType})</p>
                            <div className="d-flex gap-2 align-items-center mb-4">
                              <p>Qty: </p>
                              <div className="btn-group" role="group">
                                <button className="btn btn-outline-info">
                                  -
                                </button>
                                <button className="btn btn-outline-info">
                                  1
                                </button>
                                <button className="btn btn-outline-info">
                                  +
                                </button>
                              </div>

                              <p>Rs. {product.productPrice}</p>
                            </div>
                            <div className="d-grid gap-2 col-10 ml-0">
                              <button
                                onClick={() => removeFromCartHandler(product)}
                                className="btn btn-info"
                                type="button"
                              >
                                Remove From Cart
                              </button>
                              <button
                                onClick={() => addToWishlistHandler(product)}
                                className="btn btn-info"
                                type="button"
                              >
                                Add To Wishlist
                              </button>
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
                        <p>Rs. </p>
                      </div>
                      <div className="d-flex justify-content-between">
                        <p>Discount </p>
                        <p>- Rs. </p>
                      </div>
                      <div className="d-flex justify-content-between">
                        <p>Delivery Charges</p>
                        <p>Rs. </p>
                      </div>
                      <hr />
                      <div className="d-flex justify-content-between fw-bold mb-0">
                        <p>TOTAL AMOUNT</p>
                        <p>Rs. </p>
                      </div>
                      <hr />
                      <p>You will save Rs. on this order</p>
                      <div className="d-grid">
                        <button
                          className="btn btn-info"
                          onClick={() => alert("Your order is placed")}
                        >
                          Place Order
                        </button>
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
