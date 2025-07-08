import { furnitureItems } from "./array";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <main className="container">
      <div className="text-center mb-4 ">
        <h4>Explore Our Furniture Range</h4>
        <small>Impressive Collection for your Dream Home</small>
      </div>
      <div className="row">
        {furnitureItems.map((item) => {
          return (
            <div className="col-md-2" key={item.type}>
              <Link to={"/" + item.categoryId} className="text-decoration-none">
                <div
                  className="card border-0 text-center mb-2 align-items-center"
                  style={{ padding: "1rem" }}
                >
                  <img
                    src={item.imgUrl}
                    alt={"img_" + item.type}
                    className="card-img-top border rounded-circle"
                    style={{
                      width: "150px",
                      height: "150px",
                      objectFit: "cover",
                      borderRadius: "10px",
                    }}
                  />
                  <p className="mt-2 fw-semibold">{item.type}</p>
                </div>
              </Link>
            </div>
          );
        })}
      </div>
      <div className="text-center py-4 bg-body-tertiary">
        <h3>Presenting the new collection</h3>
        <div style={{ maxWidth: "650px" }} className="mx-auto">
          <small className="text-secondary">
            Rooted in nature’s calm rhythm, this collection brings a sense of
            stillness to your space. Thoughtfully crafted with soft textures and
            natural finishes, each piece reflects a quiet beauty—where design
            feels effortless and comfort comes naturally.
          </small>
        </div>
        <div className="py-4">
          <img
            src="https://plus.unsplash.com/premium_photo-1684338795288-097525d127f0?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fGZ1cm5pdHVyZXxlbnwwfHwwfHx8MA%3D%3D"
            style={{ height: "450px", width: "900px" }}
            className="img-fluid"
          />
        </div>
        <button className="btn btn-info">Explore Now</button>
      </div>
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
              <button className="btn btn-info">Explore Now</button>
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
              <button className="btn btn-info">Explore Now</button>
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
              <p className="mt-2 fw-semibold">LIVING ROOM</p>
              <button className="btn btn-info">Explore Now</button>
            </div>
          </div>
        </div>
      </div>
      <div className="py-4">
        <h4>
          Buy Furniture Online at Earthcraft – India's One-Stop Solution for All
          Your Needs
        </h4>
        <p>
          A home is the most relaxing place in our life, and the furniture
          brings comfort to our home. Whether you want to furnish your new home
          or give your existing decor a new makeover, get every type of wooden
          furniture online in India that perfectly blends with your home decor
          with Earthcraft. At Earthcraft, we provide a vast collection of
          ready-made and customized solid wood furniture online.
        </p>
      </div>
    </main>
  );
}
