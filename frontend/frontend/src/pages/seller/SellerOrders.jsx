import axios from 'axios'
import React, { useEffect, useState } from 'react'

const SellerOrders = () => {

    const [sellerOrders, setSellerOrders] = useState([])

    const fetchSellerOrders = async () => {
        try {
            const sellerOrders = await axios.get(`${import.meta.env.VITE_API_URL}/api/order/getSellerOrders`, {
                withCredentials: true
            })
            setSellerOrders(sellerOrders.data.orders)
        } catch (error) {
            console.log(error.message)
        }
    }

    const updateSellerOrder = async (id, status) => {
        try {
            const updateOrder = await axios.patch(
                `${import.meta.env.VITE_API_URL}/api/order/${id}`,
                {
                    orderStatus: status
                },
                {
                    withCredentials: true
                }
            )
            console.log(updateOrder)
            fetchSellerOrders()
        } catch (error) {
            console.log(error.message)
        }
    }

    useEffect(() => {
        fetchSellerOrders()
    }, [])

    return (
        <>
            <div className="orders-container">
                {sellerOrders.length > 0 ? (
                    sellerOrders.map((item) => (
                        <div className="order-card" key={item._id}>
                            <img
                                src={item.product?.imageUri}
                                alt={item.product?.title}
                                className="order-image"
                            />

                            <div className="order-details">
                                <h2>{item.product?.title}</h2>

                                <p>
                                    <strong>Brand:</strong> {item.product?.brand}
                                </p>

                                <p>
                                    <strong>Quantity:</strong> {item.quantity}
                                </p>

                                <p>
                                    <strong>Total:</strong> ₹{item.totalPrice}
                                </p>

                                <div className="status">
                                    {item.orderStatus === "Delivered" ? (
                                        <span className="delivered">
                                            Delivered
                                        </span>
                                    ) : (
                                        <select className={item.orderStatus.replace(/\s+/g, "-")}
                                            value={item.orderStatus}
                                            onChange={(e) =>
                                                updateSellerOrder(item._id, e.target.value)
                                            }
                                        >
                                            <option value="Placed">Placed</option>
                                            <option value="Packed">Packed</option>
                                            <option value="Shipped">Shipped</option>
                                            <option value="Out for Delivery">
                                                Out for Delivery
                                            </option>
                                            <option value="Delivered">
                                                Delivered
                                            </option>
                                        </select>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <h1 className="empty-orders">
                        You don't have any orders
                    </h1>
                )}
            </div>
        </>
    )
}

export default SellerOrders