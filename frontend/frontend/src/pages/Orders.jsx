import axios from "axios";
import React, { useEffect, useState } from "react";

const Orders = () => {
  const [getOrders, setGetOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const orders = await axios.get(
        "http://localhost:3000/api/order/getOrders",
        {
          withCredentials: true,
        }
      );

      setGetOrders(orders.data.orders);
    } catch (error) {
      console.log(error.message);
    }
  };

  const removeOrders = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:3000/api/order/${id}`,{
        withCredentials: true
      })
      fetchOrders();
    } catch (error) {
      console.log(error.message)
    }
  }

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="orders-container">
      {getOrders.length > 0 ? (
        getOrders.map((item) => (
          <div className="order-card" key={item._id}>
            <img
              src={item.product?.imageUri}
              alt={item.product?.title}
              className="order-image"
            />

            {item.orderStatus == "Delivered" ? <span className="user-status">{item.orderStatus}</span> :

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

                <span className="user-status">{item.orderStatus}</span> <span onClick={() => removeOrders(item._id)} className="cancel">Cancel</span>
              </div>
            }
          </div>
        ))
      ) : (
        <h1 className="empty-orders">You don't have any orders</h1>
      )}
    </div>
  );
};

export default Orders;