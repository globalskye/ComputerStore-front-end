import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { useState, useEffect } from 'react';
import { RouterProvider } from 'react-router-dom';
import './App.css';
import router from './router';

const App: React.FC = () => {
  return <RouterProvider router={router}></RouterProvider>;
};

export default App;
