import { Link } from "react-router";
import useQuery from "../../api/useQuery";
import formatDate from "../../utils/formatDate";

const Orders = () => {
  const { data: orders } = useQuery("/orders", "orders");

  // if (loading) return <p>Loading...</p>;
  // if (error) return <p>Failed to load orders</p>;

  const emptyOrder = !orders || orders.length === 0;
  if (emptyOrder) {
    return (
      <div>
        <h1>Orders</h1>
        <p>You have not placed any orders yet!</p>
      </div>
    );
  }

  return (
    <div className="orders-container">
      <h1>Orders</h1>
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
                      ORDER # {order.order_number}
                    </span>
                    <span>
                      {order.total_item_count}{" "}
                      {order.total_item_count > 1 ? "items" : "item"}
                    </span>
                    <span className="order-date">
                      {formatDate(order.created_at)}
                      {/* {new Date(order.created_at).toLocaleDateString()} */}
                    </span>
                    <span className="order-status">{order.status}</span>
                    <Link to={`/orders/${order.public_order_id}`}>
                      View order for details
                    </Link>
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
