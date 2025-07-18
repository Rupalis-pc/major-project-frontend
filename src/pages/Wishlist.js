import { Link } from "react-router-dom";
import useProductContext from "../contexts/useContext";
import useFetch from "../useFetch";
import Loader from "../components/Loader";
import { toast } from "react-toastify";

export default function Wishlist() {
  const { wishListProductIds, addToCart, deleteFromWishList } =
    useProductContext();
  const {
    data: products,
    loading,
    error,
  } = useFetch("https://major-project-backend-liart.vercel.app/products", []);

  const wishlistProducts = products.filter((product) =>
    wishListProductIds.includes(product.productId)
  );

  function MoveToCartHandler(product) {
    addToCart(product.productId);
    deleteFromWishList(product.productId);
    toast.info(`"${product.productName}" moved to cart successfully!`);
  }
  // console.log(wishListProductIds);

  if (loading) {
    return <Loader />;
  }

  return (
    <main className="container">
      <h4 className="text-center">My Wishlist ({wishListProductIds.length})</h4>
      {wishlistProducts.length === 0 ? (
        <div className="text-center py-4" style={{ height: "200px" }}>
          <p className="">Your wishlist is empty!</p>
          <Link to="/" className="btn btn-info">
            Explore Products
          </Link>
        </div>
      ) : (
        <div className="row py-4">
          {wishlistProducts.map((product) => (
            <div className="col-md-3 mb-5" key={product.productId}>
              <div className="card h-100 shadow-sm border-0">
                <div className="position-relative">
                  <Link
                    to={"/product/" + product.productId}
                    style={{ textDecoration: "none" }}
                  >
                    <img
                      src={product.productImage}
                      alt={product.productName}
                      className="card-img-top object-fit-cover"
                      style={{
                        height: "200px",
                        objectFit: "cover",
                      }}
                    />
                  </Link>
                  <div className="position-absolute top-0 end-0 m-2">
                    <button
                      className="rounded-circle p-2"
                      style={{
                        backgroundColor: "rgba(0,0,0,0.4)",
                        border: "none",
                        width: "40px",
                        height: "40px",
                      }}
                      onClick={() => {
                        deleteFromWishList(product.productId);
                        toast.info(
                          `${product.productName} removed from Wishlist!`
                        );
                      }}
                    >
                      <i className="bi bi-suit-heart-fill text-danger fs-5"></i>
                    </button>
                  </div>
                </div>

                <div className="d-flex justify-content-between">
                  <small className="text-secondary ms-2">
                    Rating: {product.productRating}{" "}
                    <i className="bi bi-star-fill"></i>
                  </small>
                  <small className="text-secondary me-2">
                    MRP: ₹ {product.mrp}
                  </small>
                </div>

                <div className="card-body text-center">
                  <Link
                    to={"/product/" + product.productId}
                    style={{ textDecoration: "none", color: "black" }}
                  >
                    <h5 className="card-title mb-2 fw-semibold">
                      {product.productName}
                    </h5>
                  </Link>
                  <p className="text-muted mb-3">
                    ₹ {product.productPrice}{" "}
                    <span className="text-danger small">
                      <i className="bi bi-arrow-down small me-1"></i>
                      {product.discount} Off
                    </span>
                  </p>
                  <button
                    className="btn btn-info w-100"
                    onClick={() => MoveToCartHandler(product)}
                  >
                    Move to cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
