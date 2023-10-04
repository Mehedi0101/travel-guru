import { BiSearch } from 'react-icons/bi';
import { FiMenu } from 'react-icons/fi';
import logoBlack from '../../assets/logo.png';
import logoWhite from '../../assets/logo-white.png';
import { useLocation } from 'react-router-dom';
import { useState } from 'react';

const Navbar = () => {

    const [showMenuStatus, setShowMenuStatus] = useState(false);
    const currentLocation = useLocation();
    const lightTheme = currentLocation.pathname === '/' ? true : false;
    const theme = lightTheme ? { color: 'white' } : { color: 'black' };
    const links = <>
        <li onClick={()=>setShowMenuStatus(false)}>News</li>
        <li onClick={()=>setShowMenuStatus(false)}>Destination</li>
        <li onClick={()=>setShowMenuStatus(false)}>Blog</li>
        <li onClick={()=>setShowMenuStatus(false)}>Contact</li>
    </>;

    return (
        <>
            {/* large devices */}

            <div style={theme} className='xl:flex gap-10 justify-between items-center font-medium absolute w-full max-w-screen-2xl px-20 top-3 hidden'>
                <div>
                    <img className='w-40' src={lightTheme ? logoWhite : logoBlack} alt="" />
                </div>
                <div className='relative'>
                    <BiSearch className='absolute top-2 text-xl left-2' />
                    <input className='w-full py-1 pl-8 pr-3 rounded bg-[#ffffff33] outline-none border border-white placeholder:text-white' type="text" placeholder='Search Your Destination...' />
                </div>
                <div className='list-none flex-1 flex justify-around'>
                    {links}
                </div>
                <div>
                    <button className='px-5 py-2 bg-primary rounded text-black active:scale-95 transition-transform'>Login</button>
                </div>
            </div>

            {/* medium devices */}
            <div style={theme} className='xl:hidden lg:block hidden font-medium'>
                <div className='flex gap-10 justify-between items-center font-medium absolute w-full top-3 px-14'>
                    <div className='flex items-center gap-5'>
                        <FiMenu onClick={()=>setShowMenuStatus(!showMenuStatus)} className='text-2xl' />
                        <img className='w-28' src={lightTheme ? logoWhite : logoBlack} alt="" />
                    </div>
                    <div className='flex items-center gap-10'>
                        <div className='relative'>
                            <BiSearch className='absolute top-2 text-xl left-2' />
                            <input className='w-full py-1 pl-8 pr-3 rounded bg-[#ffffff33] outline-none border border-white placeholder:text-white' type="text" placeholder='Search Your Destination...' />
                        </div>
                        <div>
                            <button className='px-5 py-2 bg-primary rounded text-black active:scale-95 transition-transform'>Login</button>
                        </div>
                    </div>
                </div>
                <div className={`absolute list-none p-5 top-[70px] left-[60px] rounded w-fit bg-[#00000080] ${showMenuStatus ? 'block' : 'hidden'}`}>
                    {links}
                </div>
            </div>


            {/* small devices */}
            <div style={theme} className='lg:hidden font-medium text-sm'>
                <div className='flex items-center gap-5 absolute w-full top-3 md:px-8 px-4'>
                    <FiMenu onClick={()=>setShowMenuStatus(!showMenuStatus)} className='text-2xl' />
                    <img className='w-28 mx-auto' src={lightTheme ? logoWhite : logoBlack} alt="" />
                </div>
                <div className={`absolute list-none p-5 top-[70px] md:left-[35px] left-[20px] rounded w-fit mr-10 bg-[#00000080] ${showMenuStatus ? 'block' : 'hidden'}`}>
                    {links}
                    <div className='relative mt-2'>
                        <BiSearch className='absolute top-2 text-xl left-2' />
                        <input className='w-full py-1 pl-8 pr-3 rounded bg-[#ffffff33] outline-none border border-white placeholder:text-white' type="text" placeholder='Search Your Destination...' />
                    </div>
                    <div className='mt-2'>
                        <button onClick={()=>setShowMenuStatus(false)} className='px-5 py-2 bg-primary rounded text-black active:scale-95 transition-transform'>Login</button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Navbar;