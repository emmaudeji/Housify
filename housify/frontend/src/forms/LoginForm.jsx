import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from '../common/auth';
import { baseUrl } from "../common/baseUrl";

const LoginForm = () => {
  const auth = useAuth();
  const navigate = useNavigate();

  const [inputs, setInputs] = useState({
    password: "",
    email: "",
  });

  const handleSubmit = async (event) => {
    if (event) {
      event.preventDefault();

      const data = await axios.post(`${baseUrl}/login`, {
        password: inputs.password,
        email: inputs.email,
      });
      console.log("DATA", data.data);
      const { isLogin, feedback } = data.data;

      if (isLogin) {
        auth.login(feedback);
        auth.addAgent(feedback.isAgent);
        navigate("/", { replace: true });
        // alert(`welcome ${feedback.username}`);
      } else {
        alert(feedback);
      }
      setInputs({
        password: "",
        email: "",
      });
    }
  };

  const handleInputChange = async (event) => {
    event.persist();
    const { name, value } = event.target;

    setInputs((prevInputs) => ({
      ...prevInputs,
      [name]: value,
    }));
  };

  return (
    <div className="Property">

      <form onSubmit={handleSubmit}>
        <div className="flex  text-left py-20 bg-dark h-[500px] mb-10 justify-center align-middle text-xl ">
          <div className="w-[400px] ">
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
                className="formInput"
                type="password"
                name="password"
                onChange={handleInputChange}
                placeholder="Enter Password"
                value={inputs.password}
              />
            </div>

            <div className="mx-auto text-left text-xl">
              <button type="submit button" className="px-10 py-4">
                Submit
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
