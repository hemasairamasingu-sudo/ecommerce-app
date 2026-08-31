import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

function Navbar() {

    const { user, logout } = useAuth();
    const { cart } = useCart();

    return (
        <nav className="navbar">

            <Link to="/" className="logo">
                ShopKart
            </Link>

            <div className="nav-links">

                <Link to="/">Home</Link>

                <Link to="/products">
                    Products
                </Link>

                <Link to="/cart">
                    Cart ({cart.length})
                </Link>

                {user && (
                    <Link to="/orders">
                        My Orders
                    </Link>
                )}

                {user?.role === "admin" && (
                    <Link to="/admin">
                        Admin
                    </Link>
                )}

                {!user ? (
                    <>
                        <Link to="/login">
                            Login
                        </Link>

                        <Link to="/register">
                            Register
                        </Link>
                    </>
                ) : (
                    <>
                        <span>
                            Hi, {user.name}
                        </span>

                        <button
                            onClick={logout}
                            className="logout-btn"
                        >
                            Logout
                        </button>
                    </>
                )}

            </div>

        </nav>
    );
}

export default Navbar;