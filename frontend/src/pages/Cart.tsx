import { useState } from "react";
import { useNavigate } from "react-router";
import { FaBasketShopping, FaArrowLeft } from "react-icons/fa6";
import { useCart } from "../hooks/useCart";

const CartPage = () => {
  const navigate = useNavigate();
  const { cartItems, updateQuantity, removeFromCart, cartTotal } = useCart();
  const [taxRate] = useState(0.08); // 8% tax

  const subtotal = cartTotal;
  const tax = subtotal * taxRate;
  const total = subtotal + tax;

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6">
        <FaBasketShopping className="text-6xl text-gray-300 mb-6" />
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Your Cart is Empty
        </h1>
        <p className="text-gray-600 text-lg mb-8">
          Add some products to get started!
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
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold mb-4"
          >
            <FaArrowLeft /> Back
          </button>
          <h1 className="text-4xl font-bold text-gray-900">Shopping Cart</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Items List */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item) => (
              <div
                key={item.index}
                className="bg-white rounded-xl shadow-md hover:shadow-lg transition p-6 flex gap-6"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-24 h-24 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900">
                    {item.name}
                  </h3>
                  <p className="text-blue-600 font-bold text-lg mb-4">
                    ${item.price}
                  </p>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() =>
                          updateQuantity(item.index, item.quantity - 1)
                        }
                        className="px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded-lg transition font-bold"
                      >
                        −
                      </button>
                      <span className="w-8 text-center font-semibold">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateQuantity(item.index, item.quantity + 1)
                        }
                        className="px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded-lg transition font-bold"
                      >
                        +
                      </button>
                    </div>
                    <p className="text-gray-600">
                      Subtotal:{" "}
                      <span className="font-bold">
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => removeFromCart(item.index)}
                  className="text-red-600 hover:text-red-700 hover:bg-red-50 px-4 py-2 rounded-lg transition font-semibold"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-8 sticky top-24">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Order Summary
              </h2>

              <div className="space-y-4 mb-6 border-b border-gray-200 pb-6">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal:</span>
                  <span className="font-semibold">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Tax ({(taxRate * 100).toFixed(0)}%):</span>
                  <span className="font-semibold">${tax.toFixed(2)}</span>
                </div>
              </div>

              <div className="flex justify-between text-xl font-bold text-gray-900 mb-8">
                <span>Total:</span>
                <span className="text-blue-600">${total.toFixed(2)}</span>
              </div>

              <button
                onClick={() => navigate("/checkout")}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition mb-4"
              >
                Proceed to Checkout
              </button>
              <button
                onClick={() => navigate("/our-products")}
                className="w-full bg-gray-200 hover:bg-gray-300 text-gray-900 font-bold py-3 rounded-lg transition"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
