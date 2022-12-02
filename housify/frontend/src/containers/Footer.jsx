
import {housify} from "../assets";
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { useState } from "react";

function Footer() {

  const [input, setInput] = useState("")
  const handleSubmit = () => {
    
    alert(input)
  }

  return (
    <div>
    

      <div className="footer w-full rounded-t-[20px] md:rounded-t-[90px] lg:rounded-t-[120px] bg-primary ">


        <div className="w-full mx-auto pt-10 px-6 md:px-20 pb-5  text-center md:text-left md:pt-20  md:grid grid-cols-4 gap-20">

          {/* footer header */}
          <div className="col-span-2 pt-10 md:pt-0">
            <h2 className="font-medium">
              Let's make your vacation memorable?
            </h2>
            <p className="py-6 md:pr-10">
              Receive discount rates, updates, expert services, payment details,
              tutorials sent direct to your inbox.
            </p>

            <div className="md:pr-10">
              <form
               onSubmit={handleSubmit}
               className="relative pb-4" method="Post" action="">
                <input
                onChange={(event) => setInput(event.value)}
                  type={"email"}
                  name='input'
                  value={input}
                  className="email rounded-full py-3 h-12 px-6 w-full text-black outline-0"
                  placeholder="Enter email"
                />
                <button              
                className="absolute right-0 rounded-full h-12  rounded-l-none py-3 px-6 bg-secondary font-semibold hover:bg-purple-700">
                  Subscribe
                </button>
              </form>
            </div>

            <div className="flex flex-row  justify-between items-center py-6">

              <div className="">
                <NavLink className="" to="/">
                  <img className="w-70" src={housify} alt="Housify Logo" />
                </NavLink>
              </div>

              {/* media icons */}
              <div className="flex flex-row  md:py-0 text-[24px] md:pr-10">
                <div className="pr-3 hover:scale-110 duration-300">
                  <FaFacebook className="" />
                </div>
                <div className="pr-3 hover:scale-110 duration-300">
                  <FaInstagram />
                </div>
                <div className="pr-3 hover:scale-110 duration-300">
                  <FaLinkedin />
                </div>
                <div className="hover:scale-110 duration-300">
                  <FaTwitter />
                </div>
              </div>
            </div>
          </div>

          <div className="col-span-2 grid grid-cols-2 lg:pl-10 gap-10">

            {/* footer links */}
          <div className="py-4 text-start">
            <div className="">
              <h3 className="pb-2">Links</h3>
                <div className="flex flex-col text-xl" >
                  <NavLink className="" to="/">Home</NavLink>

                <NavLink className="pt-2 " to="/about">
                  Learn More
                </NavLink>

                <NavLink className="pt-2 " to="/property">
                  Properties
                </NavLink>

                <NavLink className="pt-2" to="/agent">
                  Find An Agent
                </NavLink>

                <NavLink className="pt-2" to="/contact">
                  Contact us </NavLink>
                </div>
              </div>
            </div>
            {/* Blog */}
            <div className="">
              <h3 className="">Blog</h3>
            </div>
          </div>
        </div>

        <div className="text-center py-6 text-black text-sm">
          <p>Copyright Housify 2022</p>
        </div>
      </div>
    </div>
  );
}

export default Footer;
