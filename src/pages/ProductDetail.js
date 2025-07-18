import { useParams } from "react-router-dom";
import useProductContext from "../contexts/useContext";
import { Link } from "react-router-dom";
import useFetch from "../useFetch";
import Loader from "../components/Loader";
import { toast } from "react-toastify";

export default function ProductDetail() {
  const {
    addToWishlist,
    addToCart,
    wishListProductIds,
    increaseQuantity,
    getProductQuantity,
    decreaseQuantity,
  } = useProductContext();

  const { productId } = useParams();
  const { data, loading, error } = useFetch(
    `https://major-project-backend-liart.vercel.app/product/${productId}`,
    {}
  );

  // const product = products.find((product) => product.productId === productId);
  const product = data;

  if (loading) {
    return <Loader />;
  }

  return (
    <main className="container my-5">
      <div
        className="bg-white p-4 rounded shadow-sm mx-auto"
        style={{ maxWidth: "90%" }}
      >
        <div className="row">
          <div className="col-md-5 mb-4">
            <img
              src={product.productImage}
              alt={product.productName}
              className="img-fluid rounded"
              style={{ objectFit: "cover", height: "450px", width: "100%" }}
            />
          </div>

          <div className="col-md-7">
            <h4>{product.productName}</h4>
            <p className="text-muted">{product.description}</p>

            <div className="mb-4">
              <span>Rating {product.productRating}</span>
            </div>

            <div className="mb-4">
              <h4 className="d-inline me-3">₹{product.productPrice}</h4>
              <span className="text-decoration-line-through text-muted">
                ₹{product.mrp}
              </span>
              <span className="text-danger ms-2">{product.discount} off</span>
            </div>

            <div className="d-flex align-items-center mb-4">
              <strong className="me-2">Quantity:</strong>
              <div className="btn-group" role="group">
                <button
                  className="btn btn-outline-info btn-sm"
                  onClick={() => decreaseQuantity(product.productId)}
                >
                  -
                </button>
                <button className="btn btn-outline-info btn-sm disabled">
                  {getProductQuantity(product.productId)}
                </button>
                <button
                  className="btn btn-outline-info btn-sm"
                  onClick={() => increaseQuantity(product.productId)}
                >
                  +
                </button>
              </div>
            </div>

            <div className="d-grid gap-2 col-6">
              {wishListProductIds.find((id) => id === product.productId) ? (
                <Link
                  to="/wishlist"
                  type="button"
                  className="btn btn-info"
                  onClick={() =>
                    toast.info(`${product.productName} added to Wishlist!`)
                  }
                >
                  Move to Wishlist
                </Link>
              ) : (
                <button
                  className="btn btn-info"
                  onClick={() => {
                    addToWishlist(product.productId);
                    toast.info(`${product.productName} added to Wishlist!`);
                  }}
                >
                  Add to Wishlist
                </button>
              )}

              <button
                className="btn btn-info"
                onClick={() => {
                  addToCart(product.productId);
                  toast.info(`${product.productName} added to Cart!`);
                }}
              >
                Add to Cart
              </button>
            </div>

            <div className="d-flex mt-4 gap-4 text-center">
              <div>
                <i className="bi bi-arrow-counterclockwise fs-4"></i>
                <p className="small mb-0">10 days return</p>
              </div>
              <div>
                <i className="bi bi-truck fs-4"></i>
                <p className="small mb-0">Free Delivery</p>
              </div>
              <div>
                <i className="bi bi-shield-lock fs-4"></i>
                <p className="small mb-0">Secure Payment</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
