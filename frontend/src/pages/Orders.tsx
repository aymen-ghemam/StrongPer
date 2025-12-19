import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { FaArrowLeft, FaBox } from "react-icons/fa6";

interface OrderItem {
  index: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

interface Order {
  orderId: string;
  date: string;
  items: OrderItem[];
  subtotal: number;
  tax: number;
  total: number;
  shippingAddress: {
    firstName: string;
    lastName: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
  };
  status: string;
}

const OrdersPage = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const savedOrders = localStorage.getItem("orders");
    if (savedOrders) {
      try {
        setOrders(JSON.parse(savedOrders));
      } catch {
        setOrders([]);
      }
    }
  }, []);

  if (orders.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6">
        <FaBox className="text-6xl text-gray-300 mb-6" />
        <h1 className="text-4xl font-bold text-gray-900 mb-4">No Orders Yet</h1>
        <p className="text-gray-600 text-lg mb-8">
          Start shopping to see your orders here!
        </p>
        <button
          onClick={() => navigate("/our-products")}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg transition"
        >
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold mb-4"
          >
            <FaArrowLeft /> Back to Home
          </button>
          <h1 className="text-4xl font-bold text-gray-900">Order History</h1>
          <p className="text-gray-600 mt-2">
            You have {orders.length} order(s)
          </p>
        </div>

        {/* Orders List */}
        <div className="space-y-6">
          {orders.map((order) => (
            <div
              key={order.orderId}
              className="bg-white rounded-xl shadow-md hover:shadow-lg transition p-8"
            >
              {/* Order Header */}
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 pb-6 border-b border-gray-200">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    {order.orderId}
                  </h2>
                  <p className="text-gray-600 mt-2">
                    {new Date(order.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
                <div className="mt-4 md:mt-0 text-right">
                  <div className="inline-block bg-blue-100 text-blue-700 px-4 py-2 rounded-full font-semibold mb-2">
                    {order.status.charAt(0).toUpperCase() +
                      order.status.slice(1)}
                  </div>
                  <p className="text-2xl font-bold text-gray-900">
                    ${order.total.toFixed(2)}
                  </p>
                </div>
              </div>

              {/* Items */}
              <div className="mb-6">
                <h3 className="font-semibold text-gray-900 mb-4">
                  Items Ordered:
                </h3>
                <div className="space-y-3">
                  {order.items.map((item) => (
                    <div
                      key={item.index}
                      className="flex justify-between text-gray-700"
                    >
                      <span>
                        {item.name}{" "}
                        <span className="text-gray-500">
                          (x{item.quantity})
                        </span>
                      </span>
                      <span className="font-semibold">
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Summary */}
              <div className="mb-6 pb-6 border-t border-gray-200 pt-6">
                <div className="space-y-2 text-gray-600">
                  <div className="flex justify-between">
                    <span>Subtotal:</span>
                    <span>${order.subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tax:</span>
                    <span>${order.tax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-lg font-bold text-gray-900">
                    <span>Total:</span>
                    <span className="text-blue-600">
                      ${order.total.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Shipping Address */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">
                  Shipping Address:
                </h3>
                <div className="bg-gray-50 p-4 rounded-lg text-gray-700">
                  <p>
                    {order.shippingAddress.firstName}{" "}
                    {order.shippingAddress.lastName}
                  </p>
                  <p>{order.shippingAddress.address}</p>
                  <p>
                    {order.shippingAddress.city}, {order.shippingAddress.state}{" "}
                    {order.shippingAddress.zipCode}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Continue Shopping */}
        <div className="mt-12 text-center">
          <button
            onClick={() => navigate("/our-products")}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg transition"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrdersPage;
