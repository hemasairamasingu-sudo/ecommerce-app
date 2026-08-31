import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

function ProductCard({ product }) {

    const { addToCart } = useCart();

    return (
        <div className="product-card">

            <img
                src={product.image}
                alt={product.name}
            />

            <h3>{product.name}</h3>

            <p className="price">
                ₹{product.price}
            </p>

            <p>
                {product.category}
            </p>

            <div className="product-actions">

                <Link
                    to={`/products/${product._id}`}
                    className="details-btn"
                >
                    View Details
                </Link>

                <button
                    onClick={() => addToCart(product)}
                >
                    Add to Cart
                </button>

            </div>

        </div>
    );
}

export default ProductCard;