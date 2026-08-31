import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

function Cart() {

    const {
        cart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        getCartTotal
    } = useCart();

    if (cart.length === 0) {

        return (

            <div className="empty-cart">

                <h1>Your Cart is Empty</h1>

                <Link to="/products">
                    Continue Shopping
                </Link>

            </div>
        );
    }

    return (

        <div className="cart-page">

            <h1>Shopping Cart</h1>

            {cart.map(item => (

                <div
                    className="cart-item"
                    key={item._id}
                >

                    <img
                        src={item.image}
                        alt={item.name}
                    />

                    <div>
                        <h3>{item.name}</h3>

                        <p>
                            ₹{item.price}
                        </p>
                    </div>

                    <div className="quantity">

                        <button
                            onClick={() =>
                                decreaseQuantity(
                                    item._id
                                )
                            }
                        >
                            -
                        </button>

                        <span>
                            {item.quantity}
                        </span>

                        <button
                            onClick={() =>
                                increaseQuantity(
                                    item._id
                                )
                            }
                        >
                            +
                        </button>

                    </div>

                    <p>
                        ₹
                        {item.price *
                            item.quantity}
                    </p>

                    <button
                        onClick={() =>
                            removeFromCart(
                                item._id
                            )
                        }
                    >
                        Remove
                    </button>

                </div>

            ))}

            <div className="cart-summary">

                <h2>
                    Total: ₹{getCartTotal()}
                </h2>

                <Link
                    to="/checkout"
                    className="checkout-btn"
                >
                    Proceed to Checkout
                </Link>

            </div>

        </div>
    );
}

export default Cart;