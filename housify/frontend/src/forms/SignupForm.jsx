import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { baseUrl } from "../common/baseUrl";

const SignupForm = () => {
  const navigate = useNavigate();

  const [inputs, setInputs] = useState({
    username: "",
    password: "",
    email: "",
    repeatPassword: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (inputs.password === inputs.repeatPassword) {
      const data = await axios.post(`${baseUrl}/signup`, {
        username: inputs.username,
        email: inputs.email,
        password: inputs.password,
      });
      const success = data.data.success;
      console.log("DATA: ", data.data.success);

      success ? navigate("/loginForm", { replace: true }) : alert("Try again");
    } else {
      alert("password does not match");
      setInputs({
        username: inputs.username,
        email: inputs.email,
        password: "",
        rePassword: "",
      });
    }
  };

  const handleInputChange = (event) => {
    event.persist();
    const { name, value } = event.target;

    setInputs((prevInputs) => ({
      ...prevInputs,
      [name]: value,
    }));
  };

  return (
    <div className="">
      <form onSubmit={handleSubmit}>
        <div className="flex  text-left py-10 bg-dark mb-10 justify-center align-middle text-xl ">
          <div className="w-[400px]">
            <div className="grid grid-cols-2  mb-4 align-middle">
              <div
                className="bg-darker flex justify-center align-middle py-4 cursor-pointer hover:scale-105 duration-300"
                onClick={() => navigate("/signupForm")}
              >
                Sign up
              </div>

              <div
                className="bg-black flex justify-center align-middle py-4 cursor-pointer hover:scale-105 duration-300"
                onClick={() => navigate("/loginForm")}
              >
               Login
              </div>
            </div>

            <div>
              <label>Username</label>
              <input
                className="formInput"
                type="text"
                name="username"
                onChange={handleInputChange}
                value={inputs.username}
                placeholder="user"
                required
              />
            </div>

            <div>
              <label>Email Address</label>
              <input
                className="formInput"
                type="email"
                name="email"
                onChange={handleInputChange}
                value={inputs.email}
                placeholder="email@email.com"
                required
              />
            </div>

            <div>
              <label>Password</label>
              <input
                className="formInput "
                type="password"
                name="password"
                onChange={handleInputChange}
                placeholder="Enter Password"
                value={inputs.password}
              />
            </div>

            <div>
              <label>Renter Password</label>
              <input
                className="formInput"
                type="password"
                name="repeatPassword"
                onChange={handleInputChange}
                placeholder="Renter Password"
                value={inputs.repeatPassword}
              />
            </div>
            <div className="mx-auto text-left text-xl">
              <button>Submit</button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SignupForm;
