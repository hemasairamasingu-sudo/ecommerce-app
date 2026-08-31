import { useEffect, useState } from "react";
import API from "../services/api";
import ProductCard from "../components/ProductCard";

function Products() {

    const [products, setProducts] = useState([]);
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("All");
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const fetchProducts = async () => {

            try {

                const response =
                    await API.get("/products");

                setProducts(response.data);

            } catch (error) {

                console.log(error);

            } finally {

                setLoading(false);

            }
        };

        fetchProducts();

    }, []);

    const filteredProducts = products.filter(product => {

        const matchesSearch =
            product.name
                .toLowerCase()
                .includes(search.toLowerCase());

        const matchesCategory =
            category === "All" ||
            product.category === category;

        return matchesSearch && matchesCategory;
    });

    if (loading) {
        return <h2 className="center">Loading...</h2>;
    }

    return (

        <div className="products-page">

            <h1>Products</h1>

            <div className="filters">

                <input
                    type="text"
                    placeholder="Search products..."
                    value={search}
                    onChange={(e) =>
                        setSearch(e.target.value)
                    }
                />

                <select
                    value={category}
                    onChange={(e) =>
                        setCategory(e.target.value)
                    }
                >
                    <option value="All">
                        All Categories
                    </option>

                    <option value="Electronics">
                        Electronics
                    </option>

                    <option value="Fashion">
                        Fashion
                    </option>

                    <option value="Books">
                        Books
                    </option>

                    <option value="Shoes">
                        Shoes
                    </option>
                </select>

            </div>

            <div className="product-grid">

                {filteredProducts.map(product => (

                    <ProductCard
                        key={product._id}
                        product={product}
                    />

                ))}

            </div>

        </div>
    );
}

export default Products;