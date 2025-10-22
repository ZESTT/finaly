import React, { useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import logo from'../assets/lo.png';
import { useCart } from '../context/CartContext'; 
import { BsCart3 } from 'react-icons/bs'; 
import { userContext } from '../context/UserContext';
export default function Navbar() {
    let {userLogin,SetUserLogin}= useContext(userContext)
    const { cartCount } = useCart(); 
    let navigate =useNavigate()
    function logout() {
        SetUserLogin(null)
        navigate("/")
        
    }

    return (
        <>
            <nav className='bg-gray-100 fixed top-0 right-0 left-0 z-10'> 
                <div className='container mx-auto py-2 justify-between flex flex-col lg:flex-row items-center'>
                    
                    <div className='flex flex-col lg:flex-row items-center'>
                        <img src={logo} width={50} alt="Logo" />
                        <ul className='flex flex-col lg:flex-row items-center' >
                            {userLogin !== null ? <>
                            <li><NavLink to="/" className="mx-2 py-2 text-lg text-slate-900 font-normal">Home</NavLink></li>
                            <li><NavLink className="mx-2 py-2 text-lg text-slate-900 font-normal">About</NavLink></li>
                            <li><NavLink className="mx-2 py-2 text-lg text-slate-900 font-normal">Brands</NavLink></li>
                            <li><NavLink className="mx-2 py-2 text-lg text-slate-900 font-normal">Category</NavLink></li></>:null}
                    
                        </ul>
                    </div>

                    <div className='flex items-center'>
                        <ul className='flex flex-col lg:flex-row items-center' >
                          {userLogin == null ? <>
                          <li><NavLink to='login' className="mx-2 py-2 text-lg text-slate-900 font-normal">Login</NavLink></li>
                            <li><NavLink to="regester" className="mx-2 py-2 text-lg text-slate-900 font-normal">Regester</NavLink></li>
                          </>: <li onClick={logout}><span  className="mx-2 cursor-pointer py-2 text-lg text-slate-900 font-normal">Logout</span></li>
}
                            
                        
                            
                            
                              <li className='mx-2'>
                                <NavLink 
                                    to="/cart" 
                                    className="relative flex items-center text-slate-900 hover:text-blue-600 transition"
                                >
                                    <BsCart3 className='w-6 h-6' />
                                    {cartCount > 0 && (
                                        <span className='absolute top-[-10px] right-[-10px] bg-red-600 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center'>
                                            {cartCount}
                                        </span>
                                    )}
                                </NavLink>
                            </li>
                        </ul>


                        
                    </div>
                </div>
            </nav>
        </>
    );
}