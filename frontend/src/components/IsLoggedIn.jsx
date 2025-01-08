import React from 'react'
import { Navigate } from 'react-router-dom';
import {getLocalStorageVariables} from  "../utils/commonHelper";

function IsLoggedIn({children}) {

    const token    = getLocalStorageVariables('token');
    if(token) return <Navigate to="/home" />

  return children
}

export default IsLoggedIn