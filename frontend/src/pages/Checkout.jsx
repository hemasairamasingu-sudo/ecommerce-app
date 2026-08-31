import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

function Checkout() {

    const navigate = useNavigate();

    const { cart, getCartTotal, clearCart } =
        useCart();

    const { user } = useAuth();

    const [address, setAddress] =
        useState("");

    const [loading, setLoading] =
        useState(false);

    const placeOrder = async (e) => {

        e.preventDefault();

        if (cart.length === 0) {
            return;
        }

        setLoading(true);

        try {

            const orderData = {

                items: cart.map(item => ({
                    product: item._id,
                    name: item.name,
                    quantity: item.quantity,
                    price: item.price
                })),

                totalAmount: getCartTotal(),

                shippingAddress: address,

                paymentMethod: "COD"
            };

            await API.post(
                "/orders",
                orderData
            );

            clearCart();

            alert(
                "Order placed successfully!"
            );

            navigate("/orders");

        } catch (error) {

            alert(
                error.response?.data?.message ||
                "Order failed"
            );

        } finally {

            setLoading(false);

        }
    };

    if (!user) {
        return null;
    }

    return (

        <div className="checkout-page">

            <h1>Checkout</h1>

            <form onSubmit={placeOrder}>

                <h2>Shipping Information</h2>

                <input
                    type="text"
                    value={user.name}
                    readOnly
                />

                <input
                    type="email"
                    value={user.email}
                    readOnly
                />

                <textarea
                    placeholder="Enter shipping address"
                    value={address}
                    onChange={(e) =>
                        setAddress(e.target.value)
                    }
                    required
                />

                <h3>
                    Payment Method
                </h3>

                <p>
                    Cash on Delivery
                </p>

                <h2>
                    Total: ₹{getCartTotal()}
                </h2>

                <button
                    type="submit"
                    disabled={loading}
                >
                    {loading
                        ? "Placing Order..."
                        : "Place Order"}
                </button>

            </form>

        </div>
    );
}

export default Checkout;