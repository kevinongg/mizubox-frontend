import useQuery from "../../api/useQuery";
import { Link } from "react-router";

const Orders = () => {
  const { data: orders, loading, error } = useQuery("/orders", "orders");
  console.log(orders);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Failed to load orders</p>;

  const emptyOrder = !orders || orders.length === 0;

  const formatDateLocal = (isoString) => {
    // took from AI, have 0 clue what the code is doing
    // Uses the browser's locale + timezone automatically
    return new Intl.DateTimeFormat(undefined, { dateStyle: "medium" }).format(
      new Date(isoString)
    );
  };

  return (
    <div className="orders-container">
      <h1>Orders</h1>
      <p>
        <Link to="/account">Click here</Link> to edit your account profile
      </p>
      <ul className="orders-list">
        <p>Welcome to your dashboard! Here are your current orders:</p>

        {emptyOrder ? (
          <p>You do not have any orders placed yet.</p>
        ) : (
          <ul>
            {orders.map((order) => {
              return (
                <li key={order.order_id} className="order-item">
                  <div className="order-details">
                    <span className="order-id">
                      ORDER #{order.order_number}
                    </span>
                    <span>
                      {order.total_item_count}{" "}
                      {order.total_item_count > 1 ? "items" : "item"}
                    </span>
                    <span className="order-date">
                      {formatDateLocal(order.created_at)}
                    </span>
                    <span className="order-status">{order.status}</span>
                    <Link to="/orderDetails">View order for details</Link>
                  </div>
                  <span className="order-total">${order.order_total}</span>
                </li>
              );
            })}
          </ul>
        )}
      </ul>
    </div>
  );
};

export default Orders;
