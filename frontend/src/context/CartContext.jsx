import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {

    const [cart, setCart] = useState(
        JSON.parse(localStorage.getItem("cart")) || []
    );

    const saveCart = (newCart) => {
        setCart(newCart);
        localStorage.setItem("cart", JSON.stringify(newCart));
    };

    const addToCart = (product) => {

        const existing = cart.find(
            item => item._id === product._id
        );

        let newCart;

        if (existing) {

            newCart = cart.map(item =>
                item._id === product._id
                    ? {
                        ...item,
                        quantity: item.quantity + 1
                    }
                    : item
            );

        } else {

            newCart = [
                ...cart,
                {
                    ...product,
                    quantity: 1
                }
            ];
        }

        saveCart(newCart);
    };

    const removeFromCart = (id) => {

        const newCart = cart.filter(
            item => item._id !== id
        );

        saveCart(newCart);
    };

    const increaseQuantity = (id) => {

        const newCart = cart.map(item =>
            item._id === id
                ? {
                    ...item,
                    quantity: item.quantity + 1
                }
                : item
        );

        saveCart(newCart);
    };

    const decreaseQuantity = (id) => {

        const newCart = cart.map(item =>
            item._id === id && item.quantity > 1
                ? {
                    ...item,
                    quantity: item.quantity - 1
                }
                : item
        );

        saveCart(newCart);
    };

    const clearCart = () => {
        saveCart([]);
    };

    const getCartTotal = () => {
        return cart.reduce(
            (total, item) =>
                total + item.price * item.quantity,
            0
        );
    };

    return (
        <CartContext.Provider
            value={{
                cart,
                addToCart,
                removeFromCart,
                increaseQuantity,
                decreaseQuantity,
                clearCart,
                getCartTotal
            }}
        >
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);