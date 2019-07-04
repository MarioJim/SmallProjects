import React from 'react';
import { Link } from 'react-router-dom';

const PortfolioPage = () => (
  <div>
    <h1>My Work</h1>
    <p>Checkout the following things I&apos;ve done</p>
    <ul>
      <li><Link to="/portfolio/1">Item one</Link></li>
      <li><Link to="/portfolio/2">Item two</Link></li>
    </ul>
  </div>
);

export default PortfolioPage;
