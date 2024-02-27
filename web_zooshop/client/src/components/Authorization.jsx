import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/auth.css';

export const Authorization = ({ isAuthenticated, onLogout }) => {
  const handleLogout = () => {
    console.log('Logout clicked');
    onLogout();
  };

  return (
<div>
      <ul>
        {!isAuthenticated ? (
          <>
            <div className='registration'>
              <li>
                <Link to="/signin">
                  <button className="btn space">Войти</button>
                </Link>
              </li>

              <li>
                <Link to="/register">
                  <button className="btn space">Регистрация</button>
                </Link>
              </li>
            </div>

          </>
        ) : (
          <li>
            <button className="btn space" onClick={handleLogout}>Выйти</button>
          </li>
        )}
      </ul>
    </div>
  );
};