import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import '../styles/btn.css';

export const SignInPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  
  const handleSubmit = async () => {
    try {
      const response = await axios.post('http://localhost:3002/api/auth/signin', { email, password });
      localStorage.setItem('token', response.data.token);
      console.log('Set token to local storage');
      console.log(response.data.token);
      
      console.log(response.data);
      toast.success(response.data.message);
      setEmail('');
      setPassword('');
      navigate('/products');
      } catch (error) {
        toast.error(error.response.data.message);
        navigate('/signin');
        console.log(error);
      }
    };

  return (
    <form onSubmit={e => e.preventDefault()}>
      <h1>Войти</h1>
       <label>
          Email:
          <input type="text" placeholder="Введите email"
          value={email} onChange={e => setEmail(e.target.value)}/>
        </label>
        <br />
        <label>
          Пароль:
          <input type="password" placeholder="Введите пароль"
          value={password} onChange={e => setPassword(e.target.value)}/>
        </label>
        <br />
        <div>
          <button className="btn space" type="submit" onClick={handleSubmit}>Войти</button>
          <Link className="btn space" to={'/register'}>Ещё нет аккаунта</Link>
        </div>
    </form>
  )
}
