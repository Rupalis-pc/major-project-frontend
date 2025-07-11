import { NavLink } from "react-router-dom";
import useProductContext from "../contexts/useContext";

export default function Nav() {
  const { addedProductIds, wishListProductIds, searchProduct, searchInput } =
    useProductContext();

  function searchHandler(event) {
    const value = event.target.value;
    searchProduct(value);
  }

  // console.log(searchInput);

  return (
    <div className="bg-info mb-4 text-white">
      <nav className="navbar navbar-expand-lg py-3">
        <div className="container">
          <NavLink
            to="/"
            className="navbar-brand fw-bold fs-4"
            style={{ color: "white" }}
          >
            Earthcraft
          </NavLink>
          <form className="d-flex" role="search">
            <input
              className="form-control  me-2"
              type="search"
              placeholder="Search by Category or Name"
              aria-label="Search"
              value={searchInput}
              onChange={searchHandler}
              style={{ width: "250px" }}
            />
          </form>
          <div className="d-flex flex-row mb-3 gap-4">
            <NavLink to="/wishlist" className="text-white text-decoration-none">
              <div className="d-flex flex-column align-items-center">
                <i className="bi bi-suit-heart fs-4"></i>
                <p className="mb-0">
                  Wishlist ({wishListProductIds.length})
                </p>{" "}
              </div>
            </NavLink>
            <div>
              <NavLink to="/cart" className="text-white text-decoration-none">
                <div className="d-flex flex-column align-items-center">
                  <i className="bi bi-cart fs-4"></i>
                  <p className="mb-0">Cart ({addedProductIds.length})</p>
                </div>
              </NavLink>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}
