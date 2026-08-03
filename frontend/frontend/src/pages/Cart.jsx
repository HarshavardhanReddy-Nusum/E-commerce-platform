import axios from 'axios'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Cart = () => {

    const navigate = useNavigate()

    const [cart, setCart] = useState([])
    const [selectItem, setSelectItem] = useState(null)

    const fetchCart = async () => {

        try {
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/product/cartItems`, {
                withCredentials: true
            })

            setCart(response.data.cart)
        } catch (error) {
            console.log(error.response?.data)
        }
    }

    const selectProduct = (item) => {
        setSelectItem(item)
    }

    useEffect(() => {

        fetchCart();

    }, [])

    const removeItem = async (id) => {
        try {
            const response = await axios.delete(`${import.meta.env.VITE_API_URL}/api/product/cart/${id}`, {
                withCredentials: true
            })

            fetchCart();
            setSelectItem(null)

        } catch (error) {
            console.log(error.response?.data)
        }
    }

    return (
        <>
            <div className='home-container'>
                {cart.length === 0 ? (
                    <h2 style={{ textAlign: "center", marginTop: "50px" }}>
                        🛒 Your cart is empty
                    </h2>
                ) : (!selectItem && cart.map((item) => (
                    <div className='card' key={item.product._id}>
                        <img onClick={() => selectProduct(item)} src={item.product.imageUri} alt="test_image1" />
                        <h3>{item.product.title}</h3>
                        <p className='desc' style={{ fontSize: "large" }}>{item.product.description}</p>
                        <div className='price'>
                            <p style={{ fontSize: "x-large" }}>{item.product.discountedPrice}</p>
                            <p style={{ textDecoration: "line-through" }}>{item.product.price}</p>
                        </div>
                        <p className='desc'>Brand Name: {item.product.brand}</p>
                        <div>
                            Seller: {item.product.seller.username}
                        </div>
                        <div className='buttons'>
                            <button className='green' onClick={() => navigate(`/buy-now/${item.product._id}`, {
                                state: {
                                    productId: item.product._id,
                                    quantity: item.quantity,
                                    cartId: item._id
                                }
                            })}>Buy {item.quantity}</button>
                            <button onClick={() => removeItem(item._id)} className='red'>Remove</button>
                        </div>
                    </div>
                )))}
                {
                    selectItem && (
                        <div className="single-product">

                            <button className='close-btn' onClick={() => setSelectItem(null)}>
                                ❌
                            </button>

                            <img
                                src={selectItem.product.imageUri}
                                alt={selectItem.product.title}
                            />
                            <div className='product-details'>
                                <h2>{selectItem.product.title}</h2>

                                <p>{selectItem.product.description}</p>

                                <h3>₹{selectItem.product.discountedPrice}</h3>

                                <p>
                                    <del>₹{selectItem.product.price}</del>
                                </p>

                                <p>Brand: {selectItem.product.brand}</p>

                                <p>
                                    Seller: {selectItem.product.seller.username}
                                </p>
                                <div className='product-buttons'>
                                    <button className='buy-btn' onClick={() => navigate(`/buy-now/${selectItem.product._id}`, {
                                        state: {
                                            productId: selectItem.product._id,
                                            quantity: selectItem.quantity,
                                            cartId: selectItem._id
                                        }
                                    })}>Buy Now</button>
                                    <button onClick={() => removeItem(selectItem._id)} className='red'>Remove</button>
                                </div>
                            </div>
                        </div>
                    )
                }

            </div >
        </>
    )
}

export default Cart