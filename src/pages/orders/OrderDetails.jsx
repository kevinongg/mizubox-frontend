import { useParams } from "react-router";
import useQuery from "../../api/useQuery";
import formatDate from "../../utils/formatDate";

const OrderDetails = () => {
  const { orderId } = useParams();
  const {
    data: order,
    loading,
    error,
  } = useQuery(`/orders/${orderId}`, "order");
  console.log(order?.created_at);
  console.log(order);

  if (error) return <p>Failed to load order details</p>;

  return (
    <div>
      <h2>Order Details</h2>
      <p>Order Placed: {formatDate(order?.created_at)}</p>
    </div>
  );
};

export default OrderDetails;
