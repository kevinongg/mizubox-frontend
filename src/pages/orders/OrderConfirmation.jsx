import { useParams } from "react-router";
import useQuery from "../../api/useQuery";
import formatDate from "../../utils/formatDate";

const OrderConfirmation = () => {
  const { publicOrderId } = useParams();
  const {
    data: order,
    loading,
    error,
  } = useQuery(`/orders/${publicOrderId}`, "");
  console.log(order);

  if (error) return <p>Failed to load order confirmation page</p>;

  return (
    <div>
      <h1>Thank you for your order!</h1>
      <p>Your order number is: {order?.order_number}</p>
      <p>Placed on: {formatDate(order?.created_at)}</p>
      <p>Total: {order?.total_price}</p>

      <h2>
        Order Summary ({order?.total_item_count}{" "}
        {order?.total_item_count > 1 ? "items" : "item"})
      </h2>
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
            <li key={item.order_item_id}>
              <p>
                {" "}
                {isPreMadeBox
                  ? `Pre-Made Box: ${item.box_details.name}`
                  : "Custom Omakase Box"}{" "}
                (×
                {boxQuantity})
              </p>

              {isPreMadeBox && (
                <div>
                  {nigiriLength > 0 && (
                    <p>
                      Nigiris:{" "}
                      {item.box_details.nigiris
                        .map((nigiri) => `${nigiri.name} (×${nigiri.quantity})`)
                        .join(`, `)}
                    </p>
                  )}
                </div>
              )}

              {isCustomBox && (
                <div>
                  <p>
                    {" "}
                    Nigiris:{" "}
                    {nigiriLength > 0
                      ? item.box_details.nigiris
                          .map(
                            (nigiri) => `${nigiri.name} (×${nigiri.quantity})`
                          )
                          .join(`, `)
                      : "None"}
                  </p>

                  <p>
                    Sauces:{" "}
                    {sauceLength > 0
                      ? item.box_details.sauces
                          .map((sauce) => `${sauce.name} (×${sauce.quantity})`)
                          .join(`, `)
                      : "None"}
                  </p>

                  <p>
                    Extras:{" "}
                    {extraLength > 0
                      ? item.box_details.extras
                          .map((extra) => `${extra.name} (×${extra.quantity})`)
                          .join(`, `)
                      : "None"}
                  </p>
                </div>
              )}
            </li>
          );
        })}
      </ul>

      <ul>
        {order?.sauces.length > 0 && (
          <li>
            Sauce:{" "}
            {order?.sauces
              .map((sauce) => `${sauce.sauce.name} (×${sauce.quantity})`)
              .join(", ")}
          </li>
        )}
      </ul>

      <ul>
        {order?.extras.length > 0 && (
          <li>
            Extra:{" "}
            {order?.extras
              .map((extra) => `${extra.extra.name} (×${extra.quantity})`)
              .join(", ")}
          </li>
        )}
      </ul>
    </div>
  );
};

export default OrderConfirmation;

//  Thank you for your order, Kevin!

// Your order number is: MZ-3FA9C2D1
// Placed on: Feb 1, 2025
// Total: $89.95

// ───────────────────────────────
// Order Summary (3 items)

// - Custom Omakase Box × 1
//   Nigiris: 14 pcs
//   Sauces: Wasabi Mayo, Spicy Soy
//   Extras: None

// - Pre-Made Box: Salmon Lover × 2
//   Nigiris: Salmon, Salmon Avocado
//   Sauces: None
//   Extras: Extra Ginger

// - Extra: Wasabi Mayo × 1
// ───────────────────────────────

// We’re preparing your order now.
// You’ll receive an email confirmation shortly.

// [ View Full Order Details ]   [ Continue Shopping ]
