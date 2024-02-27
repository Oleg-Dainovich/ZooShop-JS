import React, { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import '../styles/btn.css';

export const CreateProviderPage = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [deliveryTime, setDeliveryTime] = useState('');
  const [image, setImage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      const data = new FormData();
      data.append('title', title);
      data.append('description', description);
      data.append('deliveryTime', deliveryTime);
      data.append('image', image);

      const response = await axios.post('http://localhost:3002/api/providers/create', data);
      
      console.log(response.data);
      toast.success(response.data.message);
      setTitle('');
      setDescription('');
      setDeliveryTime('');
      setImage('');
      navigate('/providers');
      } catch (error) {
        toast.error(error.response.data.message);
        navigate('/create-provider');
        console.log(error);
      }
    };

    const handleCancel = () => {
      setTitle('');
      setDescription('');
      setDeliveryTime('');
      setImage('');
    };

  return (
    <form onSubmit={(e) => e.preventDefault()}>
        <h1>Создать поставщика</h1>
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
            Время доставки:
            <input type="number" min="1" step="1" placeholder="Введите время доставки" 
            value={deliveryTime} onChange={e => setDeliveryTime(e.target.value)}/>
        </label>
        <br />
        <div>
          <button button className="btn space" type="submit" onClick={handleSubmit}>Add</button>
          <button button className="btn space" type="submit" onClick={handleCancel}>Cancel</button>
        </div>  
    </form>
  )
}
