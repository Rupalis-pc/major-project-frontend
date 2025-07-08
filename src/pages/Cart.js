import useProductContext from "../contexts/useContext";
import { products } from "./array";

export default function Cart() {
  const { addedProductIds } = useProductContext();

  const addedProducts = products.filter((product) =>
    addedProductIds.includes(product.productId)
  );

  console.log(addedProducts);

  return (
    <main className="container">
      <div className="col-md-8">
        <h4>My Cart ({addedProductIds.length})</h4>

        <ul className="list-group">
          {addedProducts.map((product) => (
            <li className="list-group-item" key={product.productId}>
              <div className="row g-4" style={{ "max-width": "540px" }}>
                <div className="col-md-4">
                  <img
                    src={product.productImage}
                    className="img-fluid rounded-start"
                    alt={product.productName}
                  />
                </div>
                <div className="col-md-8">
                  <div>
                    <h5 className="mb-0">{product.productName}</h5>
                    <p>({product.categoryType})</p>
                    <p>
                      Qty:{" "}
                      <div className="btn-group" role="group">
                        <button type="button" class="btn btn-outline-info">
                          -
                        </button>
                        <button type="button" class="btn btn-outline-info">
                          1
                        </button>
                        <button type="button" class="btn btn-outline-info">
                          +
                        </button>
                      </div>
                    </p>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className="col-md-4"></div>
    </main>
  );
}
