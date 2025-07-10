import { Link } from "react-router-dom";

export default function NewCollection() {
  return (
    <main className="container">
      <div className="text-center py-4 bg-body-tertiary">
        <h3>Presenting the new collection</h3>
        <div className="py-4">
          <img
            src="https://plus.unsplash.com/premium_photo-1684338795288-097525d127f0?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fGZ1cm5pdHVyZXxlbnwwfHwwfHx8MA%3D%3D"
            style={{ height: "450px", width: "900px" }}
            className="img-fluid"
          />
        </div>
        <div style={{ maxWidth: "850px" }} className="mx-auto">
          <small className="text-secondary">
            Discover the perfect blend of style, comfort, and sustainability
            with EarthCraft’s latest furniture collection. Whether you're
            revamping your living room, upgrading your workspace, or adding
            warmth to your bedroom — our new arrivals are crafted to elevate
            your space.
          </small>
        </div>
      </div>
      <div className="text-center">
        <h2>Craftsmanship that embraces the beauty of nature</h2>
        <small className="text-secondary">
          From sleek sofas and cozy beds to stylish dining sets and smart
          storage, this collection is all about making your home feel truly
          yours.
        </small>
        <div className="row py-4">
          <div className="col-md-4">
            <div className="card border-0">
              <div className="text-center align-items-center">
                <img
                  src="https://images.unsplash.com/photo-1615874959474-d609969a20ed?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YmVkcm9vbXxlbnwwfHwwfHx8MA%3D%3D"
                  className=" object-fit-cover"
                  style={{ height: "380px", width: "350px" }}
                />
                <p className="mt-2 fw-semibold">BEDROOM</p>
                <Link type="button" to="/2" className="btn btn-info">
                  Explore Now
                </Link>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card border-0">
              <div className="text-center align-items-center">
                <img
                  src="https://images.unsplash.com/photo-1505409628601-edc9af17fda6?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZGluaW5nJTIwcm9vbXxlbnwwfHwwfHx8MA%3D%3D"
                  className=" object-fit-cover"
                  style={{ height: "380px", width: "350px" }}
                />
                <p className="mt-2 fw-semibold">DINING ROOM</p>
                <Link type="button" to="/3" className="btn btn-info">
                  Explore Now
                </Link>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card border-0">
              <div className="text-center align-items-center">
                <img
                  src="https://images.unsplash.com/photo-1554995207-c18c203602cb?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8bGl2aW5nJTIwcm9vbXxlbnwwfHwwfHx8MA%3D%3D"
                  className=" object-fit-cover"
                  style={{ height: "380px", width: "350px" }}
                />
                <p className="mt-2 fw-semibold">DRESSING ROOM</p>
                <Link type="button" to="/12" className="btn btn-info">
                  Explore Now
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="d-flex justify-content-center py-4">
        <div className="rounded-5 text-center border border-info bg-light px-5 py-2">
          <Link to="/" className="text-decoration-none">
            <h5 className="text-info mb-0">
              Discover All EarthCraft Products{" "}
              <i className="bi bi-arrow-right-circle fs-5 text-info"></i>
            </h5>
          </Link>
        </div>
      </div>
    </main>
  );
}
