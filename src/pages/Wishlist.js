import { useEffect } from "react";
import useProductContext from "../contexts/useContext";
import { products } from "./array";

export default function Wishlist() {
  const { wishListProductIds } = useProductContext();

  const wishlistProducts = products.filter((product) =>
    wishListProductIds.includes(product.productId)
  );
  console.log(wishlistProducts);

  return (
    <main className="container">
      <div className="text-center">
        <span className="text-secondary">
          ({wishlistProducts.length} Products)
        </span>
        <hr />
      </div>
      <div className="row py-4">
        {wishlistProducts.map((product) => (
          <div className="col-md-3 mb-5" key={product.productId}>
            <div className="card h-100 shadow-sm border-0">
              <div className="position-relative">
                <img
                  src={product.productImage}
                  alt={product.productName}
                  className="card-img-top object-fit-cover"
                  style={{
                    height: "200px",
                    objectFit: "cover",
                  }}
                />
                <div className="position-absolute top-0 end-0 m-2">
                  <button
                    className="rounded-circle p-2"
                    style={{
                      backgroundColor: "rgba(0,0,0,0.4)",
                      border: "none",
                      width: "40px",
                      height: "40px",
                    }}
                    onClick={() => console.log("addToWishlistHandler")}
                  >
                    <i className="bi bi-suit-heart text-white fs-5"></i>
                  </button>
                </div>
              </div>
              <div className="card-body text-center">
                <h5 className="card-title mb-2 fw-semibold">
                  {product.productName}
                </h5>
                <p className="text-muted mb-3">₹ {product.productPrice}</p>
                <button
                  className="btn btn-info w-100"
                  onClick={() => console.log("redirect to cart")}
                >
                  Move to cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
