import { useContext } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import { Store } from "react-notifications-component";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
    const { resetPassword } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleResetPassword = e => {
        e.preventDefault();
        const form = new FormData(e.currentTarget);
        const email = form.get('email');

        resetPassword(email)
        .then(()=>{
            Store.addNotification({
                title: "Check you email",
                message: "A link has been sent to your email",
                type: "info",
                insert: "top",
                container: "top-center",
                animationIn: ["animate__animated", "animate__fadeIn"],
                animationOut: ["animate__animated", "animate__fadeOut"],
                dismiss: {
                    duration: 5000,
                    onScreen: true
                }
            });
            navigate('/authentication/login');
        })
        .catch(()=>{
            Store.addNotification({
                title: "Something went wrong",
                message: "Try again later",
                type: "error",
                insert: "top",
                container: "top-center",
                animationIn: ["animate__animated", "animate__fadeIn"],
                animationOut: ["animate__animated", "animate__fadeOut"],
                dismiss: {
                    duration: 5000,
                    onScreen: true
                }
            });
        })
    }

    return (
        <form onSubmit={handleResetPassword} className="text-black xl:p-14 lg:p-12 md:p-10 p-8 border border-[#C5C5C5] rounded text-sm md:text-base max-w-[90%] mx-auto">
            <input className="outline-none border-b-2 border-[#C5C5C5] font-medium placeholder:text-black placeholder:font-medium py-1 max-w-full w-[400px] mb-8" type="email" name="email" id="email" placeholder="Email" required />
            <br />
            <button className='px-5 py-2 bg-primary rounded text-black active:scale-95 transition-transform w-full font-medium mb-3'>Reset Password</button>
        </form>
    );
};

export default ForgotPassword;