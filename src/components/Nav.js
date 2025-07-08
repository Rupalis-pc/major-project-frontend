import { Link } from "react-router-dom";

export default function Nav() {
  return (
    <div className="bg-info mb-4">
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
            <button className="btn btn btn-light" type="submit">
              Search
            </button>
          </form>
          <div class="d-flex flex-row mb-3 gap-4">
            <button className="btn btn-outline-light">Login</button>

            <i className="bi bi-suit-heart text-white fs-4"></i>
            <div>
              <i class="bi bi-cart text-white fs-4"></i>
              <span className="text-white">Cart</span>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}
