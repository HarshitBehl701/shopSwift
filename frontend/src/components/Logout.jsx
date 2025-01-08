import React, { useEffect } from 'react';
import { handleSuccess } from '../utils/toastContainerHelperfn';
import { ToastContainer } from 'react-toastify';
import  {removeLocalStorageVariables}  from  "../utils/commonHelper";
import { useNavigate } from 'react-router-dom';

function Logout() {
  const navigate =  useNavigate();

  useEffect(() => {   

    removeLocalStorageVariables('all');

    handleSuccess('Redirecting  you to  the  home page');

    setTimeout(() => {
      navigate('/home');
    }, 1000);


  }, []);

  return <ToastContainer />;
}

export default Logout;
