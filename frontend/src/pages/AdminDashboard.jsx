import { useEffect, useState } from "react";
import API from "../services/api";

function AdminDashboard() {

    const [products, setProducts] =
        useState([]);

    const [orders, setOrders] =
        useState([]);

    const [product, setProduct] =
        useState({
            name: "",
            description: "",
            price: "",
            category: "",
            image: "",
            stock: ""
        });

    const fetchData = async () => {

        try {

            const productResponse =
                await API.get("/products");

            const orderResponse =
                await API.get("/orders");

            setProducts(
                productResponse.data
            );

            setOrders(
                orderResponse.data
            );

        } catch (error) {

            console.log(error);

        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleChange = (e) => {

        setProduct({
            ...product,
            [e.target.name]: e.target.value
        });
    };

    const addProduct = async (e) => {

        e.preventDefault();

        try {

            await API.post(
                "/products",
                {
                    ...product,
                    price: Number(product.price),
                    stock: Number(product.stock)
                }
            );

            alert(
                "Product added successfully"
            );

            setProduct({
                name: "",
                description: "",
                price: "",
                category: "",
                image: "",
                stock: ""
            });

            fetchData();

        } catch (error) {

            alert(
                error.response?.data?.message ||
                "Failed to add product"
            );
        }
    };

    const deleteProduct = async (id) => {

        if (!window.confirm(
            "Delete this product?"
        )) {
            return;
        }

        try {

            await API.delete(
                `/products/${id}`
            );

            fetchData();

        } catch (error) {

            console.log(error);

        }
    };

    const updateOrder = async (
        id,
        status
    ) => {

        try {

            await API.put(
                `/orders/${id}/status`,
                { status }
            );

            fetchData();

        } catch (error) {

            console.log(error);

        }
    };

    return (

        <div className="admin-page">

            <h1>Admin Dashboard</h1>

            <section>

                <h2>Add Product</h2>

                <form
                    className="product-form"
                    onSubmit={addProduct}
                >

                    <input
                        name="name"
                        placeholder="Product Name"
                        value={product.name}
                        onChange={handleChange}
                        required
                    />

                    <textarea
                        name="description"
                        placeholder="Description"
                        value={product.description}
                        onChange={handleChange}
                        required
                    />

                    <input
                        name="price"
                        type="number"
                        placeholder="Price"
                        value={product.price}
                        onChange={handleChange}
                        required
                    />

                    <input
                        name="category"
                        placeholder="Category"
                        value={product.category}
                        onChange={handleChange}
                        required
                    />

                    <input
                        name="image"
                        placeholder="Image URL"
                        value={product.image}
                        onChange={handleChange}
                        required
                    />

                    <input
                        name="stock"
                        type="number"
                        placeholder="Stock"
                        value={product.stock}
                        onChange={handleChange}
                        required
                    />

                    <button type="submit">
                        Add Product
                    </button>

                </form>

            </section>

            <section>

                <h2>Products</h2>

                <div className="admin-products">

                    {products.map(product => (

                        <div
                            className="admin-product"
                            key={product._id}
                        >

                            <img
                                src={product.image}
                                alt={product.name}
                            />

                            <h3>
                                {product.name}
                            </h3>

                            <p>
                                ₹{product.price}
                            </p>

                            <p>
                                Stock:
                                {product.stock}
                            </p>

                            <button
                                onClick={() =>
                                    deleteProduct(
                                        product._id
                                    )
                                }
                            >
                                Delete
                            </button>

                        </div>

                    ))}

                </div>

            </section>

            <section>

                <h2>Manage Orders</h2>

                {orders.map(order => (

                    <div
                        className="admin-order"
                        key={order._id}
                    >

                        <p>
                            Order:
                            {order._id}
                        </p>

                        <p>
                            Amount:
                            ₹{order.totalAmount}
                        </p>

                        <select
                            value={order.status}
                            onChange={(e) =>
                                updateOrder(
                                    order._id,
                                    e.target.value
                                )
                            }
                        >

                            <option>
                                Pending
                            </option>

                            <option>
                                Processing
                            </option>

                            <option>
                                Shipped
                            </option>

                            <option>
                                Delivered
                            </option>

                            <option>
                                Cancelled
                            </option>

                        </select>

                    </div>

                ))}

            </section>

        </div>
    );
}

export default AdminDashboard;