// import { CircularProgress } from '@mui/material';
import React from 'react';
import { Navigate, useLocation } from 'react-router';
import useAuth from '../../hooks/useAuth';

const PrivateRoute = ({ children }) => {
   let location = useLocation();
	const { user } = useAuth();
	// if(!user?.email){
	// 	return (
	// 		<CircularProgress></CircularProgress>
	// 	)
	// }
	// if(user.email){
	// 	return children
	// }
	return user.email ? children :  <Navigate to="/login" state={{ from: location }} />
};

export default PrivateRoute;