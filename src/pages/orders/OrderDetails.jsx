import { useParams } from "react-router";
import useQuery from "../../api/useQuery";

const OrderDetails = () => {
  const { orderId } = useParams();
  const {
    data: order,
    loading,
    error,
  } = useQuery(`/orders/${orderId}`, "order");
  console.log(orderId);
  console.log(order);

  return <div>OrderDetails</div>;
};

export default OrderDetails;
