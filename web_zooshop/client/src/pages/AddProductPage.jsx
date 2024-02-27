import React, { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import '../styles/btn.css';

export const AddProductPage = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      const data = new FormData();
      data.append('title', title);
      data.append('description', description);
      data.append('price', price);
      data.append('image', image);

      const response = await axios.post('http://localhost:3002/api/products/create', data);
      
      console.log(response.data);
      toast.success(response.data.message);
      setTitle('');
      setDescription('');
      setPrice('');
      setImage('');
      navigate('/products');
      } catch (error) {
        toast.error(error.response.data.message);
        navigate('/new-product');
        console.log(error);
      }
    };

    const handleCancel = () => {
      setTitle('');
      setDescription('');
      setPrice('');
      setImage('');
    };

  return (
    <form onSubmit={(e) => e.preventDefault()}>
        <h1>Создать товар</h1>
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
            Цена:
            <input type="number" min="1" step="1" placeholder="Установите цену" 
            value={price} onChange={e => setPrice(e.target.value)}/>
        </label>
        <br />

        <div>
          <button className="btn space" type="submit" onClick={handleSubmit}>Add</button>
          <button className="btn space" type="submit" onClick={handleCancel}>Cancel</button>
        </div>  
    </form>
  )
}
