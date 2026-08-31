import { Link } from "react-router-dom";

function Home() {

    return (
        <div>

            <section className="hero">

                <div>

                    <h1>
                        Welcome to ShopKart
                    </h1>

                    <p>
                        Find the best products
                        at affordable prices.
                    </p>

                    <Link
                        to="/products"
                        className="shop-btn"
                    >
                        Shop Now
                    </Link>

                </div>

            </section>

            <section className="features">

                <div>
                    <h3>Quality Products</h3>
                    <p>
                        Carefully selected products.
                    </p>
                </div>

                <div>
                    <h3>Fast Delivery</h3>
                    <p>
                        Quick and reliable delivery.
                    </p>
                </div>

                <div>
                    <h3>Secure Shopping</h3>
                    <p>
                        Safe and secure checkout.
                    </p>
                </div>

            </section>

        </div>
    );
}

export default Home;