import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Home = () => {

  const navigate = useNavigate()

  const [products, setProducts] = useState([])
  const [quantities, setQuantities] = useState({});
  const [selectProduct, setSelectProduct] = useState(null)
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  


  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/product?page=${currentPage}`, {
        withCredentials: true
      })
      setProducts(response.data.products);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.log(error.response.data)
    }
  }

  useEffect(() => {
    fetchProducts()
  }, [currentPage])

  const getProductById = async (id) => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/product/${id}`, {
        withCredentials: true
      })
      setSelectProduct(response.data.product)
    } catch (error) {
      console.log(error.response?.data)
    }

  }

  const increase = (productId) => {
    setQuantities((prev) => ({
      ...prev,
      [productId]: (prev[productId] || 0) + 1,
    }));
  };

  const decrease = (productId) => {
    setQuantities((prev) => ({
      ...prev,
      [productId]: Math.max((prev[productId] || 0) - 1, 0),
    }));
  };

  const addToCart = async (productId, quantity) => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/product/cart`, {
        productId,
        quantity
      }, {
        withCredentials: true
      })
      alert("Item added to cart")
      navigate('/cart')
    } catch (error) {
      console.log(error.response?.data)
    }
  }


  return (
    <>
      <div className='home-container'>
        {!selectProduct && products.map((product) => (
          <div className='card' key={product._id}>
            <img onClick={() => getProductById(product._id)} src={product.imageUri} alt="test_image1" />
            <h3>{product.title}</h3>
            <p className='desc' style={{ fontSize: "large" }}>{product.description}</p>
            <div className='price'>
              <p style={{ fontSize: "x-large", color: "green" }}>₹{product.discountedPrice}</p>
              <p style={{ textDecoration: "line-through" }}>₹{product.price}</p>
            </div>
            <p className='desc'>Brand Name: {product.brand}</p>
            <div className='.seller'>
              Seller: {product.seller.username}
            </div>
            <div className='buttons'>
              <button className='green' onClick={() => navigate(`/buy-now/${product._id}`)}>Buy</button>
              <span onClick={() => decrease(product._id)} className='minus'>-</span><button onClick={() => addToCart(product._id, quantities[product._id] || 1)} className='blue'>Add To Cart {quantities[product._id] || ""}</button><span onClick={() => increase(product._id)} className='plus'>+</span>
            </div>
          </div>
        ))}

        <div className="pagination">

          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
          >
            ◀ Previous
          </button>

          <span>
            Page {currentPage} of {totalPages}
          </span>

          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(currentPage + 1)}
          >
            Next ▶
          </button>

        </div>

        {
          selectProduct && (
            <div className="single-product">

              <button
                className="close-btn"
                onClick={() => setSelectProduct(null)}
              >
                ❌
              </button>

              <img
                src={selectProduct.imageUri}
                alt={selectProduct.title}
              />

              <div className="product-details">

                <h2>{selectProduct.title}</h2>

                <p>{selectProduct.description}</p>

                <h3>₹{selectProduct.discountedPrice}</h3>

                <p><del>₹{selectProduct.price}</del></p>

                <p><b>Brand:</b> {selectProduct.brand}</p>

                <p><b>Seller:</b> {selectProduct?.seller?.username}</p>

                <div className="product-buttons">

                  <button className="buy-btn" onClick={() => navigate(`/buy-now/${selectProduct._id}`)}>
                    Buy Now
                  </button>

                  <span
                    className="minus"
                    onClick={() => decrease(selectProduct._id)}
                  >
                    -
                  </span>

                  <button
                    className="cart-btn"
                    onClick={() =>
                      addToCart(
                        selectProduct._id,
                        quantities[selectProduct._id] || 1
                      )
                    }
                  >
                    Add To Cart ({quantities[selectProduct._id] || 1})
                  </button>

                  <span
                    className="plus"
                    onClick={() => increase(selectProduct._id)}
                  >
                    +
                  </span>

                </div>

              </div>

            </div>
          )
        }

      </div>
    </>
  )
}

export default Home