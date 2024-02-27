import React, { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import '../styles/btn.css';

export const CreateCouponPage = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [discount, setDiscount] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      const data = new FormData();
      data.append('title', title);
      data.append('description', description);
      data.append('discount', discount);

      const response = await axios.post('http://localhost:3002/api/coupons/create', {title, description, discount});
      
      console.log(response.data);
      toast.success(response.data.message);
      setTitle('');
      setDescription('');
      setDiscount('');
      navigate('/coupons');
      } catch (error) {
        toast.error(error.response.data.message);
        navigate('/create-coupon');
        console.log(error);
      }
    };

    const handleCancel = () => {
      setTitle('');
      setDescription('');
      setDiscount('');
    };

  return (
    <form onSubmit={(e) => e.preventDefault()}>
        <h1>Создать купон</h1>
        <label>
            Название:
            <input type="text" placeholder="Введите название"
            value={title} onChange={e => setTitle(e.target.value)}/>
        </label>
        <br />
        <label>
            Описание:
            <textarea placeholder="Введите описание"
            value={description} onChange={e => setDescription(e.target.value)}/>
        </label>
        <br />
        <label>
            Скидка:
            <input type="number" min="1" step="1" placeholder="Введите скидку" 
            value={discount} onChange={e => setDiscount(e.target.value)}/>
        </label>
        <br />
        <div>
          <button className="btn space" type="submit" onClick={handleSubmit}>Add</button>
          <button className="btn space" type="submit" onClick={handleCancel}>Cancel</button>
        </div>  
    </form>
  )
}
