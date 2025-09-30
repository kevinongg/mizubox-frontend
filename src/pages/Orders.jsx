import useQuery from "../api/useQuery";

const Dashboard = () => {
  const { data: orders, loading, error } = useQuery("/orders", "orders");
  console.log(orders);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Failed to load orders</p>;

  const emptyOrder = !orders || orders.length === 0;

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
      <li key={order.id} className="order-item">
        <div className="order-details"> 
                <span className="order-id">{order.id}</span>
               <span className="order-date">{order.created_at}</span>
          <span className="order-status">{order.status}</span>
        </div>
         <span className="order-total">{order.total_price}</span>    
              </li>
            );
          })}
        </ul>
      )}
      </ul>
    </div>
  );
};

export default Dashboard;
