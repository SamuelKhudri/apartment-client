import React, { createContext,useState } from 'react';
import useFirebase from '../hooks/useFirebase';

export const AuthContext = createContext();

const AuthProvider = ({children}) => {
    const allContext = useFirebase();
    const [selectedProperty,setSelectedProperty] = useState({});
    const value = {
        allContext,
        selectedProperty,
        setSelectedProperty
    }
    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;