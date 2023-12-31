import { BiSearch } from 'react-icons/bi';
import { FiMenu } from 'react-icons/fi';
import logoBlack from '../../assets/logo.png';
import logoWhite from '../../assets/logo-white.png';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import { AuthContext } from '../../providers/AuthProvider';
import { Store } from 'react-notifications-component';

const Navbar = () => {
    const { currentUser, logoutUser } = useContext(AuthContext);

    const [showMenuStatus, setShowMenuStatus] = useState(false);
    const currentLocation = useLocation();
    const lightTheme = currentLocation.pathname === '/' || currentLocation.pathname.includes('/destination-details') ? true : false;
    const theme = lightTheme ? { color: 'white' } : { color: 'black' };

    const showSearchBar = currentLocation.pathname.includes('/authentication') || currentLocation.pathname.includes('/hotels') ? false : true;
    const showUserName = currentLocation.pathname.includes('/hotels') ? true : false;

    const links = <>
        <li className='cursor-pointer' onClick={()=>setShowMenuStatus(false)}>News</li>
        <li className='cursor-pointer' onClick={()=>setShowMenuStatus(false)}>Destination</li>
        <li className='cursor-pointer' onClick={()=>setShowMenuStatus(false)}>Blog</li>
        <li className='cursor-pointer' onClick={()=>setShowMenuStatus(false)}>Contact</li>
    </>;

    const navigate = useNavigate();

    const handleLogin = () => {
        navigate('/authentication/login');
    }

    const handleLogout = () => {
        logoutUser()
        .then(()=>{
            Store.addNotification({
                title: "Logged out successfully",
                type: "info",
                insert: "top",
                container: "top-center",
                animationIn: ["animate__animated", "animate__fadeIn"],
                animationOut: ["animate__animated", "animate__fadeOut"],
                dismiss: {
                    duration: 5000,
                    onScreen: true
                }
            })
            navigate('/authentication/login');
        })
    }

    return (
        <>
            {/* large devices */}

            <div style={theme} className='xl:flex gap-10 justify-between items-center font-medium absolute w-full max-w-screen-2xl px-20 top-3 hidden'>
                <div>
                    <Link to='/'><img className='w-40' src={lightTheme ? logoWhite : logoBlack} alt="" /></Link>
                </div>
                <div className={`relative ${!showSearchBar && 'invisible'}`}>
                    <BiSearch className='absolute top-2 text-xl left-2' />
                    <input className='w-full py-1 pl-8 pr-3 rounded bg-[#ffffff33] outline-none border border-white placeholder:text-white' type="text" placeholder='Search Your Destination...' />
                </div>
                <div className='list-none flex-1 flex justify-around'>
                    {links}
                </div>
                <div>
                    {
                        showUserName 
                        ?
                        <button className='px-5 py-2 rounded text-black transition-transform font-bold cursor-default'>{currentUser?.displayName}</button>
                        :
                        currentUser?.emailVerified
                        ?
                        <button onClick={handleLogout} className='px-5 py-2 bg-primary rounded text-black active:scale-95 transition-transform'>Logout</button>
                        :
                        <button onClick={handleLogin} className='px-5 py-2 bg-primary rounded text-black active:scale-95 transition-transform'>Login</button>
                    }
                </div>
            </div>

            {/* medium devices */}
            <div style={theme} className='xl:hidden lg:block hidden font-medium'>
                <div className='flex gap-10 justify-between items-center font-medium absolute w-full top-3 px-14'>
                    <div className='flex items-center gap-5'>
                        <FiMenu onClick={()=>setShowMenuStatus(!showMenuStatus)} className='text-2xl cursor-pointer' />
                        <Link to='/'><img className='w-28' src={lightTheme ? logoWhite : logoBlack} alt="" /></Link>
                    </div>
                    <div className='flex items-center gap-10'>
                        <div className={`relative ${!showSearchBar && 'hidden'}`}>
                            <BiSearch className='absolute top-2 text-xl left-2' />
                            <input className='w-full py-1 pl-8 pr-3 rounded bg-[#ffffff33] outline-none border border-white placeholder:text-white' type="text" placeholder='Search Your Destination...' />
                        </div>
                        <div>
                            {
                                showUserName 
                                ?
                                <button className='px-5 py-2 rounded text-black transition-transform font-bold cursor-default'>{currentUser?.displayName}</button>
                                :
                                currentUser?.emailVerified
                                ?
                                <button onClick={handleLogout} className='px-5 py-2 bg-primary rounded text-black active:scale-95 transition-transform'>Logout</button>
                                :
                                <button onClick={handleLogin} className='px-5 py-2 bg-primary rounded text-black active:scale-95 transition-transform'>Login</button>
                            }
                        </div>
                    </div>
                </div>
                <div className={`absolute list-none p-5 top-[70px] left-[60px] rounded w-fit bg-[#000000BB] text-white ${showMenuStatus ? 'block' : 'hidden'}`}>
                    {links}
                </div>
            </div>


            {/* small devices */}
            <div style={theme} className='lg:hidden font-medium text-sm'>
                <div className='flex items-center gap-5 absolute w-full top-3 md:px-8 px-4'>
                    <FiMenu onClick={()=>setShowMenuStatus(!showMenuStatus)} className='text-2xl cursor-pointer' />
                    <Link to='/'><img className='w-28 mx-auto' src={lightTheme ? logoWhite : logoBlack} alt="" /></Link>
                </div>
                <div className={`absolute list-none p-5 top-[70px] md:left-[35px] left-[20px] rounded w-fit mr-10 bg-[#000000BB] space-y-3 text-white ${showMenuStatus ? 'block' : 'hidden'}`}>
                    {links}
                    <div className={`relative ${!showSearchBar && 'hidden'}`}>
                        <BiSearch className='absolute top-2 text-xl left-2' />
                        <input className='w-full py-1 pl-8 pr-3 rounded bg-[#ffffff33] outline-none border border-white placeholder:text-white' type="text" placeholder='Search Your Destination...' />
                    </div>
                    <div>
                        {
                            showUserName 
                            ?
                            <button onClick={()=>{setShowMenuStatus(false);} } className='px-5 py-2 rounded text-white transition-transform font-bold cursor-default'>{currentUser?.displayName}</button>
                            :
                            currentUser?.emailVerified 
                            ? 
                            <button onClick={()=>{setShowMenuStatus(false); handleLogout();} } className='px-5 py-2 bg-primary rounded text-black active:scale-95 transition-transform'>Logout</button>
                            :
                            <button onClick={()=>{setShowMenuStatus(false); handleLogin();} } className='px-5 py-2 bg-primary rounded text-black active:scale-95 transition-transform'>Login</button>
                        }
                    </div>
                </div>
            </div>
        </>
    );
};

export default Navbar;