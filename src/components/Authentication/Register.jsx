import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";
import { sendEmailVerification, updateProfile } from "firebase/auth";
import auth from "../../firebase/firebase.config";
import { Store } from "react-notifications-component";
import { AiOutlineEyeInvisible } from "react-icons/ai";
import { AiOutlineEye } from "react-icons/ai";

const Register = () => {
    document.title = 'Register';
    const { signUpEmailPassword } = useContext(AuthContext);
    const navigate = useNavigate();
    const [passwordError, setPasswordError] = useState('');
    const [confirmationError, setConfirmationError] = useState(false);
    const [alreadyExistError, setAlreadyExistError] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmation, setShowConfirmation] = useState(false);

    const handleRegister = e => {
        e.preventDefault();
        setPasswordError('');
        setConfirmationError(false);
        setAlreadyExistError(false);

        const form = new FormData(e.currentTarget);
        const name = `${form.get('firstName')} ${form.get('lastName')}`;
        const email = form.get('email');
        const password = form.get('password');
        const confirmation = form.get('confirmPassword');

        if (password.length < 6) {
            setPasswordError('password should contain at least 6 characters');
            return;
        }

        if (!/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).+/.test(password)) {
            setPasswordError('password should contain at least an uppercase, a lowercase and a number');
            return;
        }

        if (password !== confirmation) {
            setConfirmationError(true);
            return;
        }

        signUpEmailPassword(email, password)
            .then(() => {
                sendEmailVerification(auth.currentUser)
                    .then(() => {
                        Store.addNotification({
                            title: "One more step",
                            message: "A verification message has been sent to you email",
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
                    })
                    .catch(() => { })

                updateProfile(auth.currentUser, { displayName: name, photoURL: "" })
                    .then(() => { })
                    .catch(() => { })

                navigate('/authentication/login');
            })
            .catch(error => {
                error.code === 'auth/email-already-in-use' && setAlreadyExistError(true);
            })
    }
    return (
        <form onSubmit={handleRegister} className="text-black xl:p-14 lg:p-12 md:p-10 p-8 border border-[#C5C5C5] rounded text-sm md:text-base max-w-[90%] mx-auto">
            <h2 className="font-bold text-xl md:text-2xl mb-10">Create an account</h2>
            <input className="outline-none border-b-2 border-[#C5C5C5] font-medium placeholder:text-black placeholder:font-medium py-1 max-w-full w-[400px] mb-8" type="text" name="firstName" id="firstName" placeholder="First Name" required />
            <br />
            <input className="outline-none border-b-2 border-[#C5C5C5] font-medium placeholder:text-black placeholder:font-medium py-1 max-w-full w-[400px] mb-8" type="text" name="lastName" id="lastName" placeholder="Last Name" required />
            <br />
            <input className="outline-none border-b-2 border-[#C5C5C5] font-medium placeholder:text-black placeholder:font-medium py-1 max-w-full w-[400px] mb-8" type="email" name="email" id="email" placeholder="Email" required />
            {
                alreadyExistError && <p className="text-red-500 text-xs -mt-8 max-w-full w-[400px]">Email is already in use</p>
            }
            <div className="mb-8 relative">
                <input className="outline-none border-b-2 border-[#C5C5C5] font-medium placeholder:text-black placeholder:font-medium py-1 max-w-full w-[400px]" type={showPassword ? "text" : "password"} name="password" id="password" placeholder="Password" required />
                {
                    showPassword ? <AiOutlineEyeInvisible onClick={() => setShowPassword(!showPassword)} className="absolute top-[20%] right-2 text-2xl cursor-pointer" /> : <AiOutlineEye onClick={() => setShowPassword(!showPassword)} className="absolute top-[20%] right-2 text-2xl cursor-pointer" />
                }
            </div>
            {
                passwordError && <p className="text-red-500 text-xs -mt-8 max-w-full w-[400px]">*{passwordError}</p>
            }
            <div className="mb-5 relative">
                <input className="outline-none border-b-2 border-[#C5C5C5] font-medium placeholder:text-black placeholder:font-medium py-1 max-w-full w-[400px]" type={showConfirmation ? 'text' : 'password'} name="confirmPassword" id="confirmPassword" placeholder="Confirm password" required />
                {
                    showConfirmation ? <AiOutlineEyeInvisible onClick={() => setShowConfirmation(!showConfirmation)} className="absolute top-[20%] right-2 text-2xl cursor-pointer" /> : <AiOutlineEye onClick={() => setShowConfirmation(!showConfirmation)} className="absolute top-[20%] right-2 text-2xl cursor-pointer" />
                }
            </div>
            {
                confirmationError && <p className="text-red-500 text-xs -mt-5 max-w-full w-[400px]">*passwords don&apos;t match</p>
            }
            <button className='px-5 py-2 bg-primary rounded text-black active:scale-95 transition-transform w-full font-medium mb-3'>Create an account</button>
            <div className="flex justify-center gap-1 text-sm font-medium">
                <p>Already have an account?</p>
                <Link className="text-primary underline" to='/authentication/login'>Login</Link>
            </div>
        </form>
    );
};

export default Register;