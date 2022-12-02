import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { housify, close, menu  } from '../assets/index'
import { navLinks } from "../common/Constants";
import {NavLink} from 'react-router-dom';
import { useAuth } from "../common/auth";

const Navbar = () => {
  const navigate = useNavigate();
  const auth = useAuth();

  const [active, setActive] = useState("Home");
  const [toggle, setToggle] = useState(false);

  const handleLogout =  () => {
    auth.logout()
    
  }

  return (
    <nav className="bg-darker  flex w-full px-6  sm:px-16  lg:px-36 xl:px-48 mx-auto my-0 py-4 sticky top-[-4px] justify-between items-center navbar z-20">
      <img src={housify} alt="housify logo" className="w-[96px]" />

      <ul className="list-none md:flex hidden justify-end items-center ">
        {navLinks.map((nav, index) => (
          <li
            key={nav.id}
            className={`font-poppins font-normal cursor-pointer text-[16px] ${(navLinks.length - 1) === index ? "mr-0" : "mr-8"}
              hover:text-[var(--color-secondary)] duration-300`}
            onClick={() => setActive(nav.title)}
          >
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? "text-[var(--color-secondary)]"
                  : ""
              } to={`${nav.id}`}>{nav.title}</NavLink>
          </li>
        ))}
        
      </ul>

      <div className="flex">

        {!auth.user ? (
              <NavLink className="flex justify-end items-center mr-4 md:mr-0" to='/signupForm' >
                <button  >Get Started</button>
              </NavLink>
            ) : (
              <NavLink to="/profile">
                <button >{auth.user ? auth.user.username : "Profile"}</button>
              </NavLink>
            )}

            {auth.user ? (
              <NavLink className="flex justify-end items-center mx-4 md:ml-4 cursor-pointer"
                onClick={handleLogout} to='/'
              >
                Logout
              </NavLink>
            ) : null}

        <div className="md:hidden flex justify-end items-center">
          <img
            src={toggle ? close : menu}
            alt="menu"
            className="w-[20px] object-contain"
            onClick={() => setToggle(!toggle)}
          />

          <div
            className={`${
              !toggle ? "hidden" : "flex"
            } p-6 bg-black-gradient absolute top-12 right-0 mx-4 my-2 min-w-[140px] rounded-xl sidebar`}
          >
            <ul className="list-none flex justify-end items-start flex-1 flex-col">
              {navLinks.map((nav, index) => (
                <li
                  key={nav.id}
                  className={`font-poppins font-medium cursor-pointer text-[16px] ${
                    active === nav.title ? "text-white" : "text-dimWhite"
                  } ${index === navLinks.length - 1 ? "mb-0" : "mb-4"}`}
                  onClick={() => setActive(nav.title)}
                >
                  <NavLink to={`${nav.id}`}>{nav.title}</NavLink>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
