import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../services/api";
import { useCart } from "../context/CartContext";

function ProductDetails() {

    const { id } = useParams();

    const [product, setProduct] = useState(null);

    const { addToCart } = useCart();

    useEffect(() => {

        const fetchProduct = async () => {

            try {

                const response =
                    await API.get(`/products/${id}`);

                setProduct(response.data);

            } catch (error) {

                console.log(error);

            }
        };

        fetchProduct();

    }, [id]);

    if (!product) {
        return (
            <h2 className="center">
                Loading...
            </h2>
        );
    }

    return (

        <div className="product-details">

            <img
                src={product.image}
                alt={product.name}
            />

            <div className="details">

                <h1>{product.name}</h1>

                <h2>
                    ₹{product.price}
                </h2>

                <p>
                    {product.description}
                </p>

                <p>
                    Category: {product.category}
                </p>

                <p>
                    Stock: {product.stock}
                </p>

                <button
                    onClick={() => addToCart(product)}
                >
                    Add to Cart
                </button>

            </div>

        </div>
    );
}

export default ProductDetails;