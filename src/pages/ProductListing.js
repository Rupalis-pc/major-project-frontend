import { useParams } from "react-router-dom";
import useProductContext from "../contexts/useContext";
import { Link } from "react-router-dom";
import { useState } from "react";
import useFetch from "../useFetch";
import Loader from "../components/Loader";
import { toast } from "react-toastify";

export default function ProductListing() {
  const [rating, setRating] = useState("all");
  const [theme, setTheme] = useState("all");
  const [sortBy, setSortBy] = useState("sortById");
  const {
    data: products,
    loading,
    error,
  } = useFetch("https://major-project-backend-liart.vercel.app/products", []);

  const {
    addToCart,
    addToWishlist,
    wishListProductIds,
    deleteFromWishList,
    searchInput,
  } = useProductContext();

  const selectedCategory = useParams();
  const { data } = useFetch(
    `https://major-project-backend-liart.vercel.app/category/${selectedCategory.categoryId}`,
    {}
  );

  const selectedCategoryProducts = products.filter(
    (product) => product.categoryId == selectedCategory.categoryId
  );

  // const selectedFurniture = furnitureItems.find(
  //   (item) => item.categoryId == selectedCategory.categoryId
  // );

  const selectedFurniture = data;

  const addToCartHandler = (product) => {
    addToCart(product.productId);
    toast.info(`${product.productName} added to Cart!`);
  };

  const wishlistHandler = (product) => {
    if (wishListProductIds.find((id) => id === product.productId)) {
      deleteFromWishList(product.productId);
      toast.info(`${product.productName} removed from wishlist`);
    } else {
      addToWishlist(product.productId);
      toast.info(`${product.productName} added to Wishlist!`);
    }
  };

  const showProducts = searchInput
    ? selectedCategoryProducts.filter((product) =>
        product.productName.toLowerCase().includes(searchInput.toLowerCase())
      )
    : selectedCategoryProducts;

  // console.log(showProducts);

  const filteredProducts = showProducts.filter((product) => {
    const ratingMatch =
      rating === "all" || product.productRating >= parseInt(rating);

    const themeMatch = theme === "all" || product.theme === theme;

    return ratingMatch && themeMatch;
  });

  // console.log(typeof parseInt(rating), filteredProducts);

  let finalProducts = filteredProducts;
  // console.log(parseInt(rating), filteredProducts, theme);

  if (sortBy === "sortLowToHighPrice") {
    finalProducts = [...filteredProducts].sort(
      (a, b) => a.productPrice - b.productPrice
    );
  } else if (sortBy === "sortHighToLowPrice") {
    finalProducts = [...finalProducts].sort(
      (a, b) => b.productPrice - a.productPrice
    );
  } else {
    finalProducts = [...finalProducts];
  }

  return (
    <main className="px-4">
      <div className="text-center">
        <h2 className="mb-0">{selectedFurniture?.type}</h2>
        <span className="text-secondary">({showProducts.length} Products)</span>
        <p>
          {selectedFurniture?.type} - {selectedFurniture?.description}
        </p>
        <hr />
      </div>

      <div className="row py-4">
        {/* Filters */}
        <div className="col-md-3 mb-4">
          <div className="card p-3 shadow-sm border-0">
            <div className="d-flex justify-content-between">
              <h5 className="mb-3">Filters</h5>
              {rating !== "all" || theme !== "all" || sortBy !== "sortById" ? (
                <span
                  className="text-danger d-flex align-items-center mb-3"
                  style={{ fontSize: "0.7rem" }}
                  onClick={() => {
                    setRating("all");
                    setTheme("all");
                    setSortBy("sortById");
                  }}
                >
                  CLEAR ALL
                </span>
              ) : (
                ""
              )}
            </div>

            <div className="mb-3">
              <label
                htmlFor="ratingDropdown"
                className="form-label fw-semibold"
              >
                Rating
              </label>
              <select
                className="form-select"
                id="ratingDropdown"
                value={rating}
                onChange={(event) => setRating(event.target.value)}
              >
                <option value="all">All Ratings</option>
                <option value="4">4★ & above</option>
                <option value="3">3★ & above</option>
                <option value="2">2★ & above</option>
                <option value="1">1★ & above</option>
              </select>
            </div>

            <div className="mb-3">
              <label htmlFor="themeDropdown" className="form-label fw-semibold">
                Theme
              </label>
              <select
                className="form-select"
                id="themeDropdown"
                value={theme}
                onChange={(event) => setTheme(event.target.value)}
              >
                <option value="all">All Themes</option>
                <option value="modern">Modern</option>
                <option value="classic">Classic</option>
                <option value="bohi">Boho</option>
              </select>
            </div>

            <div>
              <p className="fw-semibold mb-2">Sort By</p>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="sortPrice"
                  id="sortLowToHigh"
                  checked={sortBy === "sortLowToHighPrice"}
                />
                <label
                  className="form-check-label"
                  htmlFor="sortLowToHigh"
                  onClick={() => setSortBy("sortLowToHighPrice")}
                >
                  Price: Low to High
                </label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="sortPrice"
                  id="sortHighToLow"
                  checked={sortBy === "sortHighToLowPrice"}
                />
                <label
                  className="form-check-label"
                  htmlFor="sortHighToLow"
                  onClick={() => setSortBy("sortHighToLowPrice")}
                >
                  Price: High to Low
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* listing */}
        <div className="col-md-9 row">
          {loading ? (
            <Loader />
          ) : (
            finalProducts?.map((product) => (
              <div className="col-md-4 mb-5" key={product.productId}>
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
            ))
          )}
        </div>
      </div>
    </main>
  );
}
