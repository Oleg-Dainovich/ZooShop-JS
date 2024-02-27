import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import '../styles/btn.css';
import '../styles/coupons.css';

export const CouponsPage = () => {
  const [coupons, setCoupons] = useState([]);
  const [loggedInUser, setLoggedInUser] = useState('');
  const navigate = useNavigate();

  const fetchCoupons = async () => {
    try {
      const response = await axios.get('http://localhost:3002/api/coupons/getCoupons');
      setCoupons(response.data.coupons);
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    fetchCoupons();
  });

  if (!coupons.length) {
    <div>Купоны недоступны.</div>
  }

  return (
    <div coupons-container>
      <h2>Список купонов</h2>
      <ul>
        {coupons.map((coupon) => (
          <li>
            <p className="title">{coupon.title}</p>
            <p>{coupon.description}</p>
            <p><b>Скидка:</b>{coupon.discount}$</p>
          </li>
        ))}
      </ul>
     <Link className="btn space" to={'/create-coupon'}>Create</Link>
    </div> 
  );
}