import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';


export const ProductPage = () => {
  const [product, setProduct] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:3002/api/products/${id}`);
        setProduct(response.data);
      } catch (error) {
        console.error('Ошибка при загрузке деталей:', error.message);
      }
    };

    fetchProductDetails();
  }, [id]);

  if (!product) {
    return <p>Загрузка...</p>;
  }

  return (
    <div >
      <h2>Информация о товаре</h2>
      <div>

      <p>Название: {product.title}</p>
      <p>Описание: {product.description}</p>
      <p>Цена: {product.price}</p>
      </div>
    </div>
  );
};