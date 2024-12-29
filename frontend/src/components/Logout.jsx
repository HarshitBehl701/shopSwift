import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { handleSuccess, handleError } from '../utils';
import { ToastContainer } from 'react-toastify';

function Logout() {
  const navigate = useNavigate();

  useEffect(() => {   
    const token = localStorage.getItem('token');
    localStorage.removeItem('token');

    handleSuccess('Redirecting  you to  the  home page');

    setTimeout(() => {
      navigate('/home');
    }, 1000);


  }, [navigate]);

  return <ToastContainer />;
}

export default Logout;
