import { createContext, useEffect, useState } from 'react';
import Proptypes from 'prop-types';
import auth from '../firebase/firebase.config';
import { createUserWithEmailAndPassword, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signOut } from 'firebase/auth';

export const AuthContext = createContext();

const AuthProvider = ({children}) => {

    const [currentUser, setCurrentUser] = useState(null);

    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth, user => {
            setCurrentUser(user);
            console.log(user);
        })
        return () => unsubscribe();
    },[])

    const signUpEmailPassword = (email,password) => {
        return createUserWithEmailAndPassword(auth, email, password);
    }

    const loginEmailPassword = (email,password) => {
        return signInWithEmailAndPassword(auth, email, password);
    }

    const resetPassword = email => {
        return sendPasswordResetEmail(auth, email);
    }

    const logoutUser = () => {
        return signOut(auth);
    }

    const authInfo = { currentUser, signUpEmailPassword, loginEmailPassword, resetPassword, logoutUser };

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