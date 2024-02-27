import React, { useState, useEffect } from 'react';
import { useNavigate, Link, NavLink } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import DateTime from '../components/DateTime';  
import { Authorization } from '../components/Authorization';
import '../styles/products.css';

export const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [loggedInUser, setLoggedInUser] = useState('');
  const [sortedProducts, setSortedProducts] = useState([]);
  const [sortByPrice, setSortByPrice] = useState(false);
  const navigate = useNavigate();

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:3002/api/products/getProducts');
      setProducts(response.data.products);
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    console.log(localStorage.getItem('token'));
    if (token) {
      axios.get('http://localhost:3002/api/auth/current', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(response => {
        setLoggedInUser(response.data.user);
      })
      .catch(error => {
        console.error('Token verification error:', error.message, token);
      });
    }
      fetchProducts();
  }, [loggedInUser]);

  useEffect(() => {
    if (sortByPrice) {
      const sorted = [...products].sort((a, b) => a.price - b.price);
      setSortedProducts(sorted);
    } else {
      setSortedProducts([]);
    }
  }, [products, sortByPrice]);

  const handleDeleteProduct = async (id) => {
    try {
      await axios.delete(`http://localhost:3002/api/products/delete/${id}`);
      // fetchProducts();
    } catch (error) {
      console.error('Error deleting product:', error.message);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setLoggedInUser('');
    window.location.reload();
  };

  const handleSortByPrice = () => {
    setSortByPrice(prevState => !prevState);
  };

  return (
    <div className="products-container">
      {loggedInUser && <p className="welcome">Аккаунт: <b>{loggedInUser.fullName}</b></p>}
      <Authorization isAuthenticated={!!loggedInUser} onLogout={handleLogout}/>
      <DateTime />
      <h2>Список товаров</h2>
      {loggedInUser&&<NavLink to={'/new-product'} className="btn">Добавить товар</NavLink>}
      <button className="btn space" onClick={handleSortByPrice}>Сортировка по цене</button>
      <ul>
      {(sortByPrice ? sortedProducts : products).map((product) => (
          <li key={product._id}>
            <p className="title">{product.title}</p>
            <p className="price">Цена: {product.price}</p>
            <div className="links-container">
              <Link className="link" to={`/product-details/${product._id}`}>Details</Link>
              {loggedInUser&&<Link className="link" to={`/edit-product/${product._id}`}> | Update</Link>}
              {loggedInUser&&<button className="link" onClick={() => handleDeleteProduct(product._id)}> | Delete</button>}
            </div>
          </li>
        ))}
      </ul>
    </div> 
  );
}
