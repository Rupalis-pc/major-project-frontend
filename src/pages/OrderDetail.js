import { Link, useParams } from "react-router-dom";
import useProductContext from "../contexts/useContext";

export default function OrderDetail() {
  const id = useParams();
  const { placedOrders } = useProductContext();

  const orderToShow = placedOrders.find((order) => order.orderId == id.orderId);

  if (!orderToShow) {
    return (
      <div className="container text-center py-5">
        <h5>Order not found!</h5>
        <Link
          to="/profile?section=orders"
          className="btn btn-outline-info mt-3"
        >
          Go Back to Orders
        </Link>
      </div>
    );
  }

  return (
    <main className="container py-4">
      <div className="card shadow-sm">
        <div className="card-header">
          <h5 className="mb-0">Order #{orderToShow.orderId}</h5>
          <small className="text-muted">Placed on: {orderToShow.date}</small>
        </div>
        <div className="card-body">
          <h6 className="fw-semibold mb-3">Delivery Address:</h6>
          <p>
            {orderToShow.address.firstName} {orderToShow.address.lastName},
            <br />
            {orderToShow.address.address}
            {orderToShow.address.address2 &&
              `, ${orderToShow.address.address2}`}
            <br />
            {orderToShow.address.city}, {orderToShow.address.state} -{" "}
            {orderToShow.address.zip}
          </p>

          <hr />

          <h6 className="fw-semibold mb-3">Ordered Products:</h6>
          <ul className="list-group mb-3">
            {orderToShow.items.map((item, idx) => (
              <li
                className="list-group-item d-flex justify-content-between"
                key={idx}
              >
                <div>
                  <strong>{item.productName}</strong> <br />
                  Qty: {item.quantity}
                </div>
                <div>
                  ₹{item.mrp} × {item.quantity} = ₹{item.mrp * item.quantity}
                </div>
              </li>
            ))}
          </ul>

          <div className="d-flex justify-content-between fw-bold">
            <p>Total Amount Paid:</p>
            <p>₹{orderToShow.total}</p>
          </div>

          <Link
            to="/profile?section=orders"
            className="btn btn-outline-info mt-3"
          >
            Back to Orders
          </Link>
        </div>
      </div>
    </main>
  );
}
