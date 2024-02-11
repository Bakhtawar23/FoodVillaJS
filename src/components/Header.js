import { useState } from "react";
import { Link } from "react-router-dom";

const Title = () => (
    <a href='/'>
    <img
    className="h-28 pl-2"
    alt="logo" 
    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR7dxyk4_uUW3vKfn0-ll5Tk11hIL2pUxhpvA&usqp=CAU"
    />
    </a>
);

const Header = () => {

    const[isLoggedInUser, setisLoggedInUser] = useState(false);

    return(
        <div className='flex space-x-80 space-y-10 justify-between bg-zinc-50 shadow-md'>
        <Title/>
        <div className='nav-items'>
            <ul className='flex py-2'>               
                <li className="px-3">
                <Link to='/' className="hover:text-orange-500">Home</Link>
                </li>
                <li className="px-3">
                  <Link to='/about'className="hover:text-orange-500">About Us</Link>
                </li>
                <li className="px-3">
                  <Link to='/contact' className="hover:text-orange-500">Contact Us</Link>
                </li>
                <li className="px-3">Cart</li>
            </ul>
        </div>
        {isLoggedInUser ? <button onClick={() => setisLoggedInUser(false)} className="py-2">Logout</button> : 
        <button onClick={() => setisLoggedInUser(true)} className="log">Login</button>}
        </div>
    );
};

export default Header;