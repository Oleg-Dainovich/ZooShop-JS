import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import '../styles/btn.css';
import '../styles/providers.css';

export const ProvidersPage = () => {
  const [providers, setProviders] = useState([]);

  const fetchProviders = async () => {
    try {
      const response = await axios.get('http://localhost:3002/api/providers/getProviders');
      setProviders(response.data.providers);;
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    fetchProviders();
  }, []);

  return (
    <div className="providers-container">
      <h2>Список поставщиков</h2>
      <ul>
        {providers.map((provider) => (
          <li key={provider.id}>
            <p className="title">{provider.title}</p>
            <p>{provider.description}</p>
            
            <p>
              <b>Время доставки:</b> {provider.deliveryTime}
            </p>
          </li>
        ))}
      </ul>
      <Link className="btn space" to={'/create-provider'}>
        Create
      </Link>
    </div>
  );
};