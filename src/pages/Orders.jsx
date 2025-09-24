import useQuery from "../api/useQuery";

const Dashboard = () => {
  const { data: orders, loading, error } = useQuery("/orders", "orders");
  console.log(orders);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>No orders found</p>;

  return (
    <div>
      <h1>Orders</h1>
      <p>Welcome to your dashboard! Here are your current orders:</p>

      {!orders || !orders.length === 0 ? (
        <p>You do not have any orders placed yet.</p>
      ) : (
        <div>
          {orders.map((order) => {
            return (
              <li key={order.id}>
                <div>{order.id}</div>
                <div>{order.created_at}</div>
                <div>{order.total_price}</div>
                <div>{order.status}</div>
              </li>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
