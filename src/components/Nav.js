import { Link } from "react-router-dom";
import useProductContext from "../contexts/useContext";

export default function Nav() {
  const { addedProductIds, wishListProductIds } = useProductContext();

  return (
    <div className="bg-info mb-4 text-white">
      <nav className="navbar navbar-expand-lg py-3">
        <div className="container">
          <Link
            to="/"
            className="navbar-brand fw-bold fs-4"
            style={{ color: "white" }}
          >
            Earthcraft
          </Link>
          <form className="d-flex" role="search">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
          </form>
          <div className="d-flex flex-row mb-3 gap-4">
            <Link to="/wishlist" className="text-white text-decoration-none">
              <div className="d-flex flex-column align-items-center">
                <i className="bi bi-suit-heart fs-4"></i>
                <p className="mb-0">
                  Wishlist ({wishListProductIds.length})
                </p>{" "}
              </div>
            </Link>
            <div>
              <Link to="/cart" className="text-white text-decoration-none">
                <div className="d-flex flex-column align-items-center">
                  <i className="bi bi-cart fs-4"></i>
                  <p className="mb-0">Cart ({addedProductIds.length})</p>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}
