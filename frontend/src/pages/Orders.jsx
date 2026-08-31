import { useEffect, useState } from "react";
import API from "../services/api";

function Orders() {

    const [orders, setOrders] =
        useState([]);

    const [loading, setLoading] =
        useState(true);

    useEffect(() => {

        const fetchOrders = async () => {

            try {

                const response =
                    await API.get(
                        "/orders/myorders"
                    );

                setOrders(response.data);

            } catch (error) {

                console.log(error);

            } finally {

                setLoading(false);

            }
        };

        fetchOrders();

    }, []);

    if (loading) {
        return (
            <h2 className="center">
                Loading orders...
            </h2>
        );
    }

    return (

        <div className="orders-page">

            <h1>My Orders</h1>

            {orders.length === 0 ? (

                <p>
                    You haven't placed
                    any orders yet.
                </p>

            ) : (

                orders.map(order => (

                    <div
                        className="order-card"
                        key={order._id}
                    >

                        <h3>
                            Order ID:
                            {order._id}
                        </h3>

                        <p>
                            Total:
                            ₹{order.totalAmount}
                        </p>

                        <p>
                            Address:
                            {order.shippingAddress}
                        </p>

                        <h3>
                            Status:
                            {order.status}
                        </h3>

                        <div className="order-tracking">

                            <span>
                                {order.status ===
                                "Pending"
                                    ? "✓"
                                    : "✓"}{" "}
                                Ordered
                            </span>

                            <span>
                                {[
                                    "Processing",
                                    "Shipped",
                                    "Delivered"
                                ].includes(
                                    order.status
                                )
                                    ? "✓"
                                    : "○"}{" "}
                                Processing
                            </span>

                            <span>
                                {[
                                    "Shipped",
                                    "Delivered"
                                ].includes(
                                    order.status
                                )
                                    ? "✓"
                                    : "○"}{" "}
                                Shipped
                            </span>

                            <span>
                                {order.status ===
                                "Delivered"
                                    ? "✓"
                                    : "○"}{" "}
                                Delivered
                            </span>

                        </div>

                    </div>

                ))

            )}

        </div>
    );
}

export default Orders;