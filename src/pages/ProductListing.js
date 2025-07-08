import { useParams } from "react-router-dom";
import { products } from "./array";
import { furnitureItems } from "./array";
import useProductContext from "../contexts/useContext";

export default function ProductListing() {
  const { setAddedProduct } = useProductContext();

  const selectedCategory = useParams();

  const selectedCategoryProducts = products.filter(
    (product) => product.categoryId == selectedCategory.categoryId
  );
  console.log(selectedCategory);

  const selectedFurniture = furnitureItems.find(
    (item) => item.categoryId == selectedCategory.categoryId
  );

  const addToCartHandler = (event, index) => {
    console.log(index);
  };

  return (
    <main className="container">
      <div className="text-center">
        <h2 className="mb-0">{selectedFurniture.type}</h2>
        <span className="text-secondary">
          ({selectedCategoryProducts.length} Products)
        </span>
        <p>
          {selectedFurniture.type} - {selectedFurniture.description}
        </p>
        <hr />
      </div>
      <div className="row py-4">
        {selectedCategoryProducts.map((product) => (
          <div className="col-md-3 mb-4">
            <div className="card h-100 shadow-sm border-0">
              <div class="position-relative">
                <img
                  src={product.productImage}
                  alt={product.productName}
                  className="card-img-top object-fit-cover"
                  style={{
                    height: "200px",
                    objectFit: "cover",
                  }}
                />
                <div class="position-absolute top-0 end-0 m-2">
                  <button
                    className="rounded-circle p-2"
                    style={{
                      backgroundColor: "rgba(0,0,0,0.4)",
                      border: "none",
                      width: "40px",
                      height: "40px",
                    }}
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
                  onClick={addToCartHandler}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
