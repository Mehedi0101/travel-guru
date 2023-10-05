import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { Navigate } from "react-router-dom";
import FadeLoader from "react-spinners/FadeLoader";
import Proptypes from "prop-types";

const PrivateRoute = ({children}) => {
    const { currentUser, loading } = useContext(AuthContext);

    if(loading){
        return <div className="h-screen flex justify-center items-center"><FadeLoader color="#F9A51A" /></div>;
    }

    if(!currentUser) {
        return <Navigate to="/authentication/login"/>;
    } 
        
    return children;
};

PrivateRoute.propTypes = {
    children: Proptypes.node.isRequired
}

export default PrivateRoute;