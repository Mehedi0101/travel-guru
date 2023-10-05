import { createContext, useEffect, useState } from 'react';
import Proptypes from 'prop-types';
import auth from '../firebase/firebase.config';
import { createUserWithEmailAndPassword, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signOut } from 'firebase/auth';

export const AuthContext = createContext();

const AuthProvider = ({children}) => {

    const [currentUser, setCurrentUser] = useState(null);
    const [ loading, setLoading ] = useState(true);

    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth, user => {
            setCurrentUser(user);
            setLoading(false);
        })
        return () => unsubscribe();

    },[])

    const signUpEmailPassword = (email,password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }

    const loginEmailPassword = (email,password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }

    const resetPassword = email => {
        setLoading(true);
        return sendPasswordResetEmail(auth, email);
    }

    const logoutUser = () => {
        setLoading(true);
        return signOut(auth);
    }

    const authInfo = { currentUser, signUpEmailPassword, loginEmailPassword, resetPassword, logoutUser, loading };

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

AuthProvider.propTypes = {
    children: Proptypes.node.isRequired
}

export default AuthProvider;