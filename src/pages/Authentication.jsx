import { Outlet } from "react-router-dom";
import { BsFacebook } from "react-icons/bs";
import { FcGoogle} from "react-icons/fc";

const Authentication = () => {
    return (
        <div className="min-h-screen pt-28 pb-10 flex flex-col justify-center items-center">
            <Outlet></Outlet>
            <div className="max-w-full w-[400px]">
                <div className="flex items-center gap-2 my-6">
                    <hr className="border-[1px] border-[#C5C5C5] w-full" />
                    <p className="text-black font-medium">Or</p>
                    <hr className="border-[1px] border-[#C5C5C5] w-full" />
                </div>
                <div>
                    <button className='px-5 py-2 text-black active:scale-95 transition-transform w-full font-medium mb-3 flex items-center border border-[#C5C5C5] rounded-full'><BsFacebook className="text-blue-400 text-2xl" /><p className="mx-auto">Continue with Facebook</p></button>
                    <button className='px-5 py-2 text-black active:scale-95 transition-transform w-full font-medium mb-3 flex items-center border border-[#C5C5C5] rounded-full'><FcGoogle className="text-2xl" /><p className="mx-auto">Continue with Google</p></button>
                </div>
            </div>
        </div>
    );
};

export default Authentication;