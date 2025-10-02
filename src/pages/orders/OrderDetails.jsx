import { useParams } from "react-router";
import useQuery from "../../api/useQuery";
import formatDate from "../../utils/formatDate";

const OrderDetails = () => {
  const { publicOrderId } = useParams();
  const { data: order, error } = useQuery(`/orders/${publicOrderId}`, "order");
  console.log(order);

  if (error) return <p>Failed to load order details</p>;

  return (
    <div>
      <h1>Order Details</h1>
      <p>Order # {order?.order_number}</p>
      <p>Placed on: {formatDate(order?.created_at)}</p>
      <p>Total: ${order?.total_price}</p>

      <h2>Items in this Order</h2>
      <ul>
        {order?.items.map((item) => {
          const orderId = item.order_item_id;
          const isPreMadeBox = item.boxType === "pre-made";
          const isCustomBox = item.boxType === "custom";
          const boxQuantity = item.quantity;
          const nigiriLength = item.box_details.nigiris?.length;
          const sauceLength = item.box_details.sauces?.length;
          const extraLength = item.box_details.extras?.length;

          return (
            <li key={orderId}>
              <h3>
                {isPreMadeBox ? item.box_details.name : "Custom Box"} (×
                {boxQuantity})
              </h3>

              {isPreMadeBox && (
                <div>
                  <h5>Nigiris</h5>
                  <ul>
                    {item.box_details.nigiris.map((nigiri) => {
                      return (
                        <li key={nigiri.pre_made_box_content_id}>
                          <p>
                            {nigiri.name} (×{nigiri.quantity})
                          </p>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              )}

              {isCustomBox && (
                <div>
                  {nigiriLength > 0 && (
                    <div>
                      <h5>Nigiris</h5>
                      <ul>
                        {item.box_details.nigiris.map((nigiri) => {
                          return (
                            <li key={nigiri.user_custom_box_content_id}>
                              <p>
                                {nigiri.name} (×{nigiri.quantity})
                              </p>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  )}

                  {sauceLength > 0 && (
                    <div>
                      <h5>Sauces</h5>
                      <ul>
                        {item.box_details.sauces.map((sauce) => {
                          return (
                            <li key={sauce.user_custom_box_sauce_id}>
                              <p>
                                {sauce.name} (×{sauce.quantity})
                              </p>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  )}

                  {extraLength > 0 && (
                    <div>
                      <h5>Extras</h5>
                      <ul>
                        {item.box_details.extras.map((extra) => {
                          return (
                            <li key={extra.user_custom_box_extra_id}>
                              <p>{extra.name}</p>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  )}
                </div>
              )}
            </li>
          );
        })}
      </ul>

      {(order?.sauces.length > 0 || order?.extras.length > 0) && <h3>Sides</h3>}
      {order?.sauces.length > 0 && (
        <div>
          <h5>Sauces</h5>
          <ul>
            {order.sauces.map((sauce) => {
              return (
                <li key={sauce.order_item_sauce_id}>
                  <p>
                    {sauce.sauce.name} (×{sauce.quantity})
                  </p>
                </li>
              );
            })}
          </ul>
        </div>
      )}

      {order?.extras.length > 0 && (
        <div>
          <h5>Extras</h5>
          <ul>
            {order.extras.map((extra) => {
              return (
                <li key={extra.order_item_extra_id}>
                  <p>
                    {extra.extra.name} (×{extra.quantity})
                  </p>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
};

export default OrderDetails;
