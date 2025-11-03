"use client";
import { useCart } from "../context/CartContext";
import Nav from "../Components/Nav";

export default function CartPage() {
  const { cartItems, removeFromCart, updateQuantity } = useCart();

  const handleCheckout = async () => {
    const res = await fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items: cartItems }),
    });

    const data = await res.json();
    window.location.href = data.url;
  };

  // Calculate the total price
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div>
      <div>
        <Nav />
      </div>
      <div className="w-10/12">

     
    
    <div className="p-10 text-white bg-[#f5d3e4] mx-auto">
      <h1 className="text-3xl font-bold mb-6">Your Cart</h1>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          <ul>
            {cartItems.map((item, index) => (
              <li key={index} className="mb-4">
                <div className="flex justify-between">
                  <span>{item.name}</span>
                  <span>${item.price}</span>
                </div>

                {/* Quantity Control */}
                <div className="flex items-center space-x-4 mt-2">
                  <button
                    onClick={() =>
                      updateQuantity(index, Math.max(item.quantity - 1, 1))
                    }
                    className="px-3 py-1 bg-gray-600 rounded-full text-lg"
                  >
                    -
                  </button>
                  <span className="text-xl">{item.quantity}</span>
                  <button
                    onClick={() =>
                      updateQuantity(index, item.quantity + 1)
                    }
                    className="px-3 py-1 bg-gray-600 rounded-full text-lg"
                  >
                    +
                  </button>
                </div>

                {/* Remove Item Button */}
                <div className="mt-2">
                  <button
                    onClick={() => removeFromCart(index)}
                    className="text-red-500 hover:text-red-700"
                  >
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>

          {/* Total Price */}
          <div className="mt-6 text-2xl font-bold">
            Total: ${totalPrice.toFixed(2)}
          </div>

          {/* Checkout Button */}
          <button
            onClick={handleCheckout}
            className="mt-6 p-4 bg-[#f5d3e4] rounded-lg font-bold"
          >
            Checkout with Stripe
          </button>
        </div>
      )}
    </div>
    </div>
  </div>
  );
}
