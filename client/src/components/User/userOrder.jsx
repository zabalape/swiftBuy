import { useState } from "react";

const OrderHistoryCard = ({ title, orders, icon: Icon }) => {
  const [expanded, setExpanded] = useState(false);

  const [expandedOrder, setExpandedOrder] = useState(null);

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  return (
    <div className="w-[360px] p-2.5 bg-white rounded-[5px] border border-red-500 border-opacity-60 mb-4">
      <div
        className="flex items-center cursor-pointer"
        onClick={toggleExpanded}
      >
        {Icon && Icon}
        <div className="w-full text-black text-[13px] font-normal leading-snug">
          {title}
        </div>
      </div>

      {expanded && (
        <div>
          {orders.map((order, i) => (
            <div
              key={i}
              className={`p-4 mt-2 rounded shadow ${
                expandedOrder === order.id ? "bg-blue-100" : "bg-white"
              }`}
              onClick={() =>
                setExpandedOrder(expandedOrder === order.id ? null : order.id)
              }
            >
              <div className="grid grid-cols-2">
                <p className="text-sm">
                  Order ID: {order.id} - {order.date}
                </p>
                <p
                  className={`font-bold text-sm ${
                    order.status === "success"
                      ? "text-green-500"
                      : "text-red-600"
                  }`}
                >
                  {order.status === "success"
                    ? "Pago completado"
                    : "Pago en espera"}
                </p>
              </div>
              {expandedOrder === order.id && (
                <div className="w-full mt-2">
                  <ul>
                    {order.products.map((product) => (
                      <div
                        className="grid grid-cols-3 mx-auto w-full border border-gray-400"
                        key={product.id}
                      >
                        <div className="border p-2">
                          <p className="text-xs">ID: {product.id}</p>
                        </div>
                        <div className="border p-2 whitespace-nowrap">
                          <p className="text-xs truncate">{product.title}</p>
                        </div>
                        <div className="border p-2">
                          <p className="text-xs">Price: {product.unit_price}</p>
                        </div>
                      </div>
                    ))}
                  </ul>
                  <p className="text-sm mt-2 ml-2 text-left">
                    Total: {order.total}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderHistoryCard;
