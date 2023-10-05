import { useContext, useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";
import { Store } from "react-notifications-component";

const Login = () => {
    document.title = 'Login';
    const [showPassword, setShowPassword] = useState(false);
    const {loginEmailPassword} = useContext(AuthContext);
    const [verificationError, setVerificationError] = useState(false);
    const [credentialsError, setCredentialsError] = useState(false);
    const navigate = useNavigate();
    const {state} = useLocation();

    const handleLogin = e => {
        e.preventDefault();
        setShowPassword(false);
        setVerificationError(false);
        setCredentialsError(false);

        const form = new FormData(e.currentTarget);
        const email = form.get('email');
        const password = form.get('password');

        loginEmailPassword(email,password)
        .then((userCredentials) => {
            if(userCredentials?.user?.emailVerified === false){
                setVerificationError(true);
                return;
            }
            navigate(state || '/');
            Store.addNotification({
                title: "Logged in successfully",
                type: "success",
                insert: "top",
                container: "top-center",
                animationIn: ["animate__animated", "animate__fadeIn"],
                animationOut: ["animate__animated", "animate__fadeOut"],
                dismiss: {
                    duration: 5000,
                    onScreen: true
                }
            })
        })
        .catch(()=>{
            setCredentialsError(true);
        })

    }
    return (
        <form onSubmit={handleLogin} className="text-black xl:p-14 lg:p-12 md:p-10 p-8 border border-[#C5C5C5] rounded text-sm md:text-base max-w-[90%] mx-auto">
            <h2 className="font-bold text-xl md:text-2xl mb-10">Login</h2>
            <input className="outline-none border-b-2 border-[#C5C5C5] font-medium placeholder:text-black placeholder:font-medium py-1 max-w-full w-[400px] mb-8" type="email" name="email" id="email" placeholder="Username or Email" required />
            {
                verificationError && <p className="text-red-500 text-xs -mt-8 max-w-full w-[400px]">*Email is not verified</p>
            }
            <br />
            <div className="mb-8 relative">
                <input className="outline-none border-b-2 border-[#C5C5C5] font-medium placeholder:text-black placeholder:font-medium py-1 max-w-full w-[400px]" type={showPassword ? "text" : "password"} name="password" id="password" placeholder="Password" required />
                {
                    showPassword ? <AiOutlineEyeInvisible onClick={() => setShowPassword(!showPassword)} className="absolute top-[20%] right-2 text-2xl cursor-pointer" /> : <AiOutlineEye onClick={() => setShowPassword(!showPassword)} className="absolute top-[20%] right-2 text-2xl cursor-pointer" />
                }
            </div>
            <div className="font-medium flex justify-between gap-2 flex-wrap mb-10">
                <div>
                    <input className="mr-1 cursor-pointer" type="checkbox" name="remember" id="remember" />
                    <label htmlFor="remember">Remember Me</label>
                </div>
                <Link to='/authentication/forgot-password' className="text-primary underline">Forgot Password?</Link>
            </div>
            <button className='px-5 py-2 bg-primary rounded text-black active:scale-95 transition-transform w-full font-medium mb-3'>Login</button>
            {
                credentialsError && <p className="text-red-500 text-xs -mt-3 mb-3 max-w-full w-[400px]">*Invalid email and password</p>
            }
            <div className="flex justify-center gap-1 text-sm font-medium">
                <p>Don&apos;t have an account?</p>
                <Link className="text-primary underline" to='/authentication/register'>Create an account</Link>
            </div>
        </form>
    );
};

export default Login;