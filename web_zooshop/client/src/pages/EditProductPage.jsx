import React, { useState, useCallback, useEffect } from 'react';
import { useNavigate, useParams} from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import '../styles/products_edit.css';

export const EditProductPage = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [oldImage, setOldImage] = useState('');
  const [newImage, setNewImage] = useState('');
  const { id } = useParams();
  const navigate = useNavigate();

  const fetchProduct = useCallback(async () => {
    const { data } = await axios.get(`http://localhost:3002/api/products/${id}`);
    setTitle(data.title);
    setDescription(data.description);
    setPrice(data.price);
    setOldImage(data.imgUrl);
  }, [id])

  const handleSubmit = async () => {
    try {
      const updateData = new FormData();
      updateData.append('title', title);
      updateData.append('description', description);
      updateData.append('price', price);
      updateData.append('id', id);
      updateData.append('image', newImage);

      const response = await axios.put(`http://localhost:3002/api/products/update/${id}`, updateData);
      
      console.log(response.data);
      setTitle('');
      setDescription('');
      setPrice('');
      setNewImage('');
      setOldImage('');
      navigate('/products')
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
      setNewImage('');
      setOldImage('');
    };

    useEffect(() => {
      fetchProduct()
  }, [fetchProduct])

  return (
    <form onSubmit={(e) => e.preventDefault()}>
        <h1>Изменить товар</h1>
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
        <div className = "btnsedit">
          <button type="submit" className="btn space" onClick={handleSubmit}>Update</button>
          <button type="submit" className="btn space" onClick={handleCancel}>Cancel</button>
        </div>  
    </form>
  )
}
