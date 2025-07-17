import useProductContext from "../contexts/useContext";

import { Link } from "react-router-dom";
import useFetch from "../useFetch";
import Loader from "../components/Loader";

export default function Home() {
  const { searchInput } = useProductContext();
  const { data, loading, error } = useFetch(
    "https://major-project-backend-liart.vercel.app/categories",
    []
  );
  // console.log(data);

  const furnitureItems = data;

  const showFurniture = searchInput
    ? furnitureItems.filter((item) =>
        item.type.toLowerCase().includes(searchInput.toLowerCase())
      )
    : furnitureItems;

  if (loading) {
    return <Loader />;
  }

  return (
    <main className="container">
      <div className="text-center mb-4 ">
        <h4>Explore Our Furniture Range</h4>
        <small>Impressive Collection for your Dream Home</small>
      </div>

      <div className="row">
        {showFurniture.map((item) => {
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
        <Link to="/newCollection" type="button" className="btn btn-info">
          Explore Now
        </Link>
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
