import { NavLink } from "react-router-dom";
import useProductContext from "../contexts/useContext";

export default function Nav() {
  const { addedProductIds, wishListProductIds, searchProduct, searchInput } =
    useProductContext();

  function searchHandler(event) {
    const value = event.target.value;
    searchProduct(value);
  }

  return (
    <div className="bg-info mb-4 text-white">
      <nav className="navbar navbar-expand-lg navbar-dark py-3">
        <div className="container">
          <NavLink to="/" className="navbar-brand fw-bold fs-4 text-white">
            Earthcraft
          </NavLink>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarContent"
            aria-controls="navbarContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarContent">
            <form className="d-flex ms-lg-auto my-2 my-lg-0" role="search">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search by Category or Name"
                aria-label="Search"
                value={searchInput}
                onChange={searchHandler}
                style={{ width: "250px" }}
              />
            </form>

            <ul className="navbar-nav ms-auto d-flex flex-row flex-lg-row gap-3 align-items-center mt-3 mt-lg-0">
              <li className="nav-item">
                <NavLink
                  to="/profile"
                  className="text-white text-decoration-none"
                >
                  <div className="d-flex flex-column align-items-center">
                    <i className="bi bi-person-circle fs-4"></i>
                    <p className="mb-0">Profile</p>
                  </div>
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink
                  to="/wishlist"
                  className="text-white text-decoration-none"
                >
                  <div className="d-flex flex-column align-items-center">
                    <i className="bi bi-suit-heart fs-4"></i>
                    <p className="mb-0">
                      Wishlist ({wishListProductIds.length})
                    </p>
                  </div>
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink to="/cart" className="text-white text-decoration-none">
                  <div className="d-flex flex-column align-items-center">
                    <i className="bi bi-cart fs-4"></i>
                    <p className="mb-0">Cart ({addedProductIds.length})</p>
                  </div>
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}
