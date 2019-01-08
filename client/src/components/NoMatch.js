import React from 'react';
import { Link, } from 'react-router-dom';

const NoMatch = () => (
  <h1>
    Page not found return
    <Link to="/"> Home</Link>
  </h1>
)

export default NoMatch;