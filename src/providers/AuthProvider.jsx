import { createContext } from 'react';
import Proptypes from 'prop-types';
import auth from '../firebase/firebase.config';
import { createUserWithEmailAndPassword } from 'firebase/auth';

export const AuthContext = createContext();

const AuthProvider = ({children}) => {

    const signUpEmailPassword = (email,password) => {
        return createUserWithEmailAndPassword(auth, email, password);
    }
    const authInfo = {signUpEmailPassword}

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