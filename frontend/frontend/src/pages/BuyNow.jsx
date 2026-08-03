import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

const BuyNow = () => {

    const navigate = useNavigate();
    const location = useLocation();
    const { id } = useParams();

    const productId = location.state?.productId || id;
    const cartId = location.state?.cartId;
    const quantity = location.state?.quantity || 1;

    const [addresses, setAddresses] = useState([])
    const [selectedAddress, setSelectedAddress] = useState("")
    const [showForm, setShowForm] = useState(false)
    const [showEdit, setShowEdit] = useState(null)

    const [address, setAddress] = useState({
        fullname: "",
        mobile: "",
        houseNo: "",
        street: "",
        city: "",
        state: "",
        pincode: "",
        landmark: "",
        addressType: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setAddress((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const fetchAddress = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/address/getAddress`, {
                withCredentials: true
            })
            console.log(response.data.address)
            setAddresses(response.data.address)
            if (response.data.address.length > 0) {
                setSelectedAddress(response.data.address[0]._id);
            }
        } catch (error) {
            console.log(error.message)
        }
    }

    const placeOrder = async () => {
        try {

            await axios.post(
                `${import.meta.env.VITE_API_URL}/api/order/addOrder`,
                {
                    productId,
                    addressId: selectedAddress,
                    quantity,
                    paymentMethod: "COD"
                },
                {
                    withCredentials: true
                }
            );

            if (cartId) {
                await axios.delete(
                    `${import.meta.env.VITE_API_URL}/api/product/cart/${cartId}`,
                    {
                        withCredentials: true
                    }
                );
            }

            navigate("/orders");

        } catch (error) {
            console.log(error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = {
            fullname: address.fullname,
            mobile: address.mobile,
            houseNo: address.houseNo,
            street: address.street,
            city: address.city,
            state: address.state,
            pincode: address.pincode,
            landmark: address.landmark,
            addressType: address.addressType,
        };


        try {
            let response;
            if (showEdit) {
                console.log(showEdit);

                response = await axios.patch(`${import.meta.env.VITE_API_URL}/api/address/${showEdit}`, data, {
                    withCredentials: true
                })
                setShowForm(false)
                fetchAddress()
            } else {
                response = await axios.post(
                    `${import.meta.env.VITE_API_URL}/api/address/addAddress`,
                    data,
                    {
                        withCredentials: true
                    }
                );
            }
            fetchAddress();
            setShowForm(false)
        } catch (error) {
            console.log(error.response?.data);
            console.log(error.response?.status);
            console.log(error.message);
        }
    };

    const editAddress = async (item) => {
        setShowEdit(item._id)
        setAddress({
            fullname: item.fullname,
            mobile: item.mobile,
            houseNo: item.houseNo,
            street: item.street,
            city: item.city,
            state: item.state,
            pincode: item.pincode,
            landmark: item.landmark,
            addressType: item.addressType,
        })
        setShowForm(true)
    }

    const removeAddress = async (item) => {
        try {
            const response = await axios.delete(`${import.meta.env.VITE_API_URL}/api/address/${item}`, {
                withCredentials:true
            })
            fetchAddress();
        } catch (error) {
            console.log(error.response?.data)
        }
    }

    useEffect(() => {
        fetchAddress()
    }, [])

    return (
        <>
            <div className="saved-addresses">

                {!showForm && <h2>Select Delivery Address</h2>}

                {addresses.length === 0 ? (

                    <p>No saved addresses found.</p>

                ) : (

                    !showForm && addresses.map((item) => (
                        <div className="bn-address-card" key={item._id}>

                            <div className="bn-address-left">

                                <input
                                    type="radio"
                                    name="selectedAddress"
                                    value={item._id}
                                    checked={selectedAddress === item._id}
                                    onChange={() => setSelectedAddress(item._id)}
                                />

                            </div>

                            <div className="bn-address-details">

                                <h3>{item.fullname}</h3>

                                <p>
                                    <strong>Mobile:</strong> {item.mobile}
                                </p>

                                <p>
                                    {item.houseNo}, {item.street}
                                </p>

                                <p>
                                    {item.city}, {item.state} - {item.pincode}
                                </p>

                                {item.landmark && (
                                    <p>
                                        <strong>Landmark:</strong> {item.landmark}
                                    </p>
                                )}

                                <p>
                                    <strong>Address Type:</strong> {item.addressType}
                                </p>

                            </div>

                            <div className="bn-address-actions">

                                <button
                                    type="button"
                                    className="bn-edit-btn"
                                    onClick={() => editAddress(item)}
                                >
                                    Edit
                                </button>

                                <button
                                    type="button"
                                    className="bn-delete-btn"
                                    onClick={() => removeAddress(item._id)}
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))
                )}
                {!showForm && <div className='bn-place-order-add-address'>
                    <button type='button' onClick={() => setShowForm(true)}>Add Address</button>
                </div>}
                {!showForm && <div className="bn-place-order-container">
                    <button
                        type="button"
                        className="bn-place-order-btn"
                        onClick={placeOrder}
                        disabled={!selectedAddress}
                    >
                        Place Order
                    </button>
                </div>}
            </div >
            {showForm && <div className="buy-now-container">
                <form className="buy-now-form" onSubmit={handleSubmit}>

                    <h2>Delivery Address</h2>

                    <div className="form-group">
                        <label>Full Name</label>
                        <input
                            type="text"
                            name="fullname"
                            placeholder="Enter your full name"
                            value={address.fullname}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Mobile Number</label>
                        <input
                            type="text"
                            name="mobile"
                            placeholder="Enter your mobile number"
                            value={address.mobile}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>House No</label>
                        <input
                            type="text"
                            name="houseNo"
                            placeholder="Enter house number"
                            value={address.houseNo}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Street</label>
                        <input
                            type="text"
                            name="street"
                            placeholder="Enter street"
                            value={address.street}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>City</label>
                        <input
                            type="text"
                            name="city"
                            placeholder="Enter city"
                            value={address.city}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>State</label>
                        <input
                            type="text"
                            name="state"
                            placeholder="Enter state"
                            value={address.state}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Pincode</label>
                        <input
                            type="text"
                            name="pincode"
                            placeholder="Enter pincode"
                            value={address.pincode}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Landmark</label>
                        <input
                            type="text"
                            name="landmark"
                            placeholder="Enter landmark"
                            value={address.landmark}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-group">
                        <label>Address Type</label>
                        <select
                            name="addressType"
                            value={address.addressType}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Select Address Type</option>
                            <option value="Home">Home</option>
                            <option value="Office">Office</option>
                        </select>
                    </div>

                    <button type="submit" className="place-order-btn">
                        {showEdit ? "Update Address" : "Add Address"}
                    </button>

                </form>
            </div>
            }
        </>
    );
};

export default BuyNow;