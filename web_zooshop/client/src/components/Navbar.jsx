import React from 'react';
import {Link, NavLink} from 'react-router-dom';
import '../styles/header.css';

export function Navbar() {
  return (
    <div className="header">
      <div className="header-row">
        <nav>
          <div class="logo">ЗооМагазин</div>
          <ul>
            <li>
              <Link class="nav-bar-link" to="/api" href="/">API</Link>
            </li>
            <li>
              <Link class="nav-bar-link" to="/products" href="/">Товары</Link>
            </li>
            <li>
              <Link class="nav-bar-link" to="/providers" href="/">Поставщики</Link>
            </li>
            <li>
              <Link class="nav-bar-link" to="/coupons" href="/">Купоны</Link>
            </li>
          </ul>
        </nav>
        <section class="sec1"></section>
        <section class="content"><p></p></section>
      </div>
    </div>
  );
}

