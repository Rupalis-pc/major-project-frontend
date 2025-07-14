import { useParams } from "react-router-dom";
import { products } from "./array";
import { furnitureItems } from "./array";
import useProductContext from "../contexts/useContext";
import { Link } from "react-router-dom";
import HorizontalFilter from "./HorizontalFilter";

export default function ProductListing() {
  const {
    addToCart,
    addToWishlist,
    wishListProductIds,
    deleteFromWishList,
    searchInput,
  } = useProductContext();

  const selectedCategory = useParams();

  const selectedCategoryProducts = products.filter(
    (product) => product.categoryId == selectedCategory.categoryId
  );
  // console.log(selectedCategory);

  const selectedFurniture = furnitureItems.find(
    (item) => item.categoryId == selectedCategory.categoryId
  );

  const addToCartHandler = (product) => {
    addToCart(product.productId);
  };

  const wishlistHandler = (product) => {
    if (wishListProductIds.find((id) => id === product.productId)) {
      deleteFromWishList(product.productId);
    } else {
      addToWishlist(product.productId);
    }
  };

  const showProducts = searchInput
    ? selectedCategoryProducts.filter((product) =>
        product.productName.toLowerCase().includes(searchInput.toLowerCase())
      )
    : selectedCategoryProducts;

  // console.log(showProducts);

  return (
    <main className="container">
      <div className="text-center">
        <h2 className="mb-0">{selectedFurniture?.type}</h2>
        <span className="text-secondary">({showProducts.length} Products)</span>
        <p>
          {selectedFurniture?.type} - {selectedFurniture?.description}
        </p>
        <hr />
      </div>

      <HorizontalFilter />

      <div className="row py-4">
        {showProducts?.map((product) => (
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
                    onClick={() => wishlistHandler(product)}
                  >
                    {wishListProductIds.find(
                      (id) => id === product.productId
                    ) ? (
                      <i className="bi bi-suit-heart-fill text-danger fs-5"></i>
                    ) : (
                      <i className="bi bi-suit-heart text-white fs-5"></i>
                    )}
                  </button>
                </div>
              </div>

              <div className="d-flex justify-content-between">
                <small className="text-secondary ms-2">
                  Rating: {product.productRating}{" "}
                  <i class="bi bi-star-fill"></i>
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
                <p className="mb-3">
                  ₹ {product.productPrice}{" "}
                  <span className="text-danger small">
                    <i className="bi bi-arrow-down small me-1"></i>
                    {product.discount} Off
                  </span>
                </p>
                <button
                  className="btn btn-info w-100"
                  onClick={() => addToCartHandler(product)}
                >
                  Add To Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
