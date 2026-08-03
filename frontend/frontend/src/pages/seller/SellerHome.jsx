import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import './sellerHome.css'

const SellerHome = () => {
  const [showForm, setShowForm] = useState(false);
  const [showEdit, setShowEdit] = useState(null);
  const [getProducts, setGetProducts] = useState([])
  const [selectedProduct, setSelectedProduct] = useState(null)

  const [uploadProduct, setUploadProduct] = useState({
    title: "",
    product: null,
    description: "",
    price: "",
    discountedPrice: "",
    brand: "",
  });




  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "product") {
      setUploadProduct((prev) => ({
        ...prev,
        product: files[0],
      }));
    } else {
      setUploadProduct((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("title", uploadProduct.title);
    if (uploadProduct.product) {
      formData.append("product", uploadProduct.product);
    }
    formData.append("description", uploadProduct.description);
    formData.append("price", uploadProduct.price);
    formData.append("discountedPrice", uploadProduct.discountedPrice);
    formData.append("brand", uploadProduct.brand);

    try {
      let response;
      if (showEdit) {
        response = await axios.patch(`http://localhost:3000/api/product/${showEdit}`, formData, {
          withCredentials: true
        })
        setShowForm(false)
        getSellerProducts();
      } else {

        response = await axios.post(
          "http://localhost:3000/api/product/upload",
          formData,
          {
            withCredentials: true,
          }
        );
      }

      alert(response.data.message);
      getSellerProducts();

      setUploadProduct({
        title: "",
        product: null,
        description: "",
        price: "",
        discountedPrice: "",
        brand: "",
      });

      setShowForm(false);
    } catch (error) {

      console.log(error);
      console.log(error.response);
      console.log(error.response?.data);

      alert(error.response?.data?.message || "Upload Failed");

    }
  };

  const getSellerProducts = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/product/seller", {
        withCredentials: true
      })
      setGetProducts(response.data.products)
    } catch (error) {
      console.log(error.response?.message)
    }
  }

  const getProductById = async (id) => {
    console.log("Button clicked.", id)
    try {
      const response = await axios.get(`http://localhost:3000/api/product/${id}`, {
        withCredentials: true
      })
      console.log(response.data.product)
      setSelectedProduct(response.data.product)
    } catch (error) {
      console.log(error.response?.data)
    }

  }

  const editForm = async (product) => {
    setShowEdit(product._id)
    setUploadProduct({
      title: product.title,
      description: product.description,
      price: product.price,
      discountedPrice: product.discountedPrice,
      brand: product.brand,
      product: null
    })
    setShowForm(true)
  }

  const removeProduct = async (id) => {
      try {
        const response = await axios.delete(`http://localhost:3000/api/product/${id}`, {
          withCredentials: true
        })
        setSelectedProduct(null)
        getSellerProducts();
      } catch (error) {
        console.log(error.response?.data)
      }
  }

  useEffect(() => {
    getSellerProducts();
    setShowEdit(null)
  }, [])

  return (
    <>
      <div className="seller-home">
        {/* Upload Section */}
        <div className="upload-section">
          <h2>Seller Dashboard</h2>

          <button
            onClick={() => {
              setShowEdit(null);

              setUploadProduct({
                title: "",
                product: null,
                description: "",
                price: "",
                discountedPrice: "",
                brand: "",
              });

              setShowForm(true);
            }}
          >
            Upload Product
          </button>
        </div>

        {/* Upload Form */}
        {showForm && (
          <div className="upload-form">


            <button
              className="close-btn"
              onClick={() => setShowForm(false)}
            >
              ✖
            </button>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="title"
                placeholder="Product Title"
                value={uploadProduct.title}
                onChange={handleChange}
                required
              />

              <textarea
                name="description"
                placeholder="Description"
                value={uploadProduct.description}
                onChange={handleChange}
                required
              />

              <input
                type="number"
                name="price"
                placeholder="Price"
                value={uploadProduct.price}
                onChange={handleChange}
                required
              />

              <input
                type="number"
                name="discountedPrice"
                placeholder="Discounted Price"
                value={uploadProduct.discountedPrice}
                onChange={handleChange}
              />

              <input
                type="text"
                name="brand"
                placeholder="Brand"
                value={uploadProduct.brand}
                onChange={handleChange}
                required
              />

              <input
                type="file"
                name="product"
                accept="image/*"
                onChange={handleChange}
                required={!showEdit}
              />

              <button type="submit">
                {showEdit ? "Update Product" : "Upload Product"}
              </button>
            </form>
          </div>
        )}

        <h2 style={{ marginLeft: "35px" }}>My Uploaded Products</h2><br />
        <div className="products-section">

          {getProducts.length === 0 ? (
            <div>
              <h2>You dont have any products</h2><br />
            </div>
          ) : (
            !selectedProduct && getProducts.map((product) => (
              <div className='card' key={product._id}>
                <img onClick={() => getProductById(product._id)} src={product.imageUri} alt="test_image1" />
                <h3>{product.title}</h3>
                <p className="desc" style={{ fontSize: "large" }}>{product.description}</p>
                <div className='price'>
                  <p style={{ fontSize: "x-large" }}>₹{product.discountedPrice}</p>
                  <p style={{ textDecoration: "line-through" }}>₹{product.price}</p>
                </div>
                <p className="desc">Brand Name: {product.brand}</p>
                <div className='buttons'>
                  <button onClick={() => editForm(product)}>Edit</button>
                  <button onClick={() => removeProduct(product._id)}>Remove</button>
                </div>
              </div>
            ))
          )}

          {
            selectedProduct && (
              <div className="single-product">

                <button
                  className="close-btn"
                  onClick={() => setSelectedProduct(null)}
                >
                  ❌
                </button>

                <img
                  src={selectedProduct.imageUri}
                  alt={selectedProduct.title}
                />

                <div className="product-details">

                  <h2>{selectedProduct.title}</h2>

                  <p>{selectedProduct.description}</p>

                  <h3>₹{selectedProduct.discountedPrice}</h3>

                  <p><del>₹{selectedProduct.price}</del></p>

                  <p><b>Brand:</b> {selectedProduct.brand}</p>

                  <p><b>Seller:</b> {selectedProduct?.seller?.username}</p>

                  <div className='buttons'>
                    <button onClick={() => editForm(selectedProduct)}>Edit</button>
                    <button onClick={() => removeProduct(selectedProduct._id)}>Remove</button>
                  </div>
                </div>

              </div>
            )
          }
        </div>

      </div>

    </>
  );
};

export default SellerHome;