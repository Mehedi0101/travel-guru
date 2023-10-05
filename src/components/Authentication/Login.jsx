import { Link } from "react-router-dom";

const Login = () => {
    const handleLogin = e => {
        e.preventDefault();
        
        const form = new FormData(e.currentTarget);
        const email = form.get('email');
        const password = form.get('password');

        

    }
    return (
        <form onSubmit={handleLogin} className="text-black xl:p-14 lg:p-12 md:p-10 p-8 border border-[#C5C5C5] rounded text-sm md:text-base max-w-[90%] mx-auto">
            <h2 className="font-bold text-xl md:text-2xl mb-10">Login</h2>
            <input className="outline-none border-b-2 border-[#C5C5C5] font-medium placeholder:text-black placeholder:font-medium py-1 max-w-full w-[400px] mb-8" type="email" name="email" id="email" placeholder="Username or Email" required/>
            <br />
            <input className="outline-none border-b-2 border-[#C5C5C5] font-medium placeholder:text-black placeholder:font-medium py-1 max-w-full w-[400px] mb-5" type="password" name="password" id="password" placeholder="Password" required/>
            <div className="font-medium flex justify-between gap-2 flex-wrap mb-10">
                <div>
                    <input className="mr-1 cursor-pointer" type="checkbox" name="remember" id="remember" />
                    <label htmlFor="remember">Remember Me</label>
                </div>
                <Link className="text-primary underline">Forgot Password?</Link>      
            </div>
            <button className='px-5 py-2 bg-primary rounded text-black active:scale-95 transition-transform w-full font-medium mb-3'>Login</button>
            <div className="flex justify-center gap-1 text-sm font-medium">
                <p>Don&apos;t have an account?</p>
                <Link className="text-primary underline" to='/authentication/register'>Create an account</Link>
            </div>
        </form>
    );
};

export default Login;