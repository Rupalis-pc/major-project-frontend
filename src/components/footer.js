import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-info py-3">
      <div
        className="container d-flex justify-content-between"
        style={{ color: "white" }}
      >
        <div>
          <Link to="/" className="navbar-brand fw-bold fs-4">
            Earthcraft
          </Link>
          <p>&copy; 2015-2025 Earthcraft.com. All rights reserved. </p>
        </div>
        <div>
          <strong>Registered Office:</strong> <br />
          The Earthcraft Furniture's Pvt.Ltd.-101-104, Abc Tower, ad Marg, C
          Scheme, Mumbai-702001. <br />
          Corporate Identity Number: UXXXXXXXXXXXXXXXX5
        </div>
      </div>
    </footer>
  );
}
