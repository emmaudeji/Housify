import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../common/auth";
import { baseUrl } from "../common/baseUrl";


const RegisterAgent = () => {
  const navigate = useNavigate();
  const auth = useAuth();
  const { editAgent } = auth;

  const [profilePic, setProfilePic] = useState(null);
  const [inputs, setInputs] = useState({
    fullname: "",
    address: "",
    country: "",
    phonenumber: "",
    linkedin: "",
    profilePic: "",
    email: "",
    bio: "",
    twitter: "",
  });

  useEffect(() => {
    if (editAgent) {
      setProfilePic(editAgent.profilePic);
      setInputs({
        fullname: editAgent.fullname,
        address: editAgent.address,
        country: editAgent.country,
        phonenumber: editAgent.phonenumber,
        linkedin: editAgent.linkedin,
        email: editAgent.email,
        bio: editAgent.bio,
        twitter: editAgent.twitter,
      });
      console.log(editAgent);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editAgent) {
      const data = await axios.put(`${baseUrl}/edit_agent/${editAgent.id}`, {
        fullname: inputs.fullname,
        address: inputs.address,
        country: inputs.country,
        phonenumber: inputs.phonenumber,
        linkedin: inputs.linkedin,
        profilePic: profilePic,
        email: inputs.email,
        bio: inputs.bio,
        twitter: inputs.twitter,
      });
      const success = data.data.success;
      console.log("editedAgentDATA: ", data.data.agent);

      if (success) {
        const count = Math.random();
        await auth.addAgent(count);
        navigate("/profile", { replace: true });

        setInputs({
          fullname: "",
          address: "",
          country: "",
          phonenumber: "",
          linkedin: "",
          email: "",
          bio: "",
          twitter: "",
        });
        setProfilePic(null);
      } else {
        alert("Something went wrong. Try again");
        setInputs({
          fullname: inputs.fullname,
          address: inputs.address,
          country: inputs.country,
          phonenumber: inputs.phonenumber,
          linkedin: inputs.linkedin,
          email: inputs.email,
          bio: inputs.bio,
          twitter: inputs.twitter,
        });
        setProfilePic(profilePic);
      }
    } else {
      const data = await axios.post(`${baseUrl}/create_agent/${auth.user.id}`, {
        fullname: inputs.fullname,
        address: inputs.address,
        country: inputs.country,
        phonenumber: inputs.phonenumber,
        linkedin: inputs.linkedin,
        profilePic: profilePic,
        email: inputs.email,
        bio: inputs.bio,
        twitter: inputs.twitter,
      });
      const success = data.data.success;
      console.log("registeredAgentDATA: ", data.data.agent);

      if (success) {
        const count = Math.random();
        await auth.addAgent(count);
        navigate("/profile", { replace: true });

        setInputs({
          fullname: "",
          address: "",
          country: "",
          phonenumber: "",
          linkedin: "",
          email: "",
          bio: "",
          twitter: "",
        });
        setProfilePic(null);
      } else {
        alert("Something went wrong. Try again");
        setInputs({
          fullname: inputs.fullname,
          address: inputs.address,
          country: inputs.country,
          phonenumber: inputs.phonenumber,
          linkedin: inputs.linkedin,
          email: inputs.email,
          bio: inputs.bio,
          twitter: inputs.twitter,
        });
        setProfilePic(profilePic);
      }
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

  const handleImageUpload = async (e) => {
    const convertToBase64 = (file) => {
      return new Promise((resolve, reject) => {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(file);
        fileReader.onload = () => {
          resolve(fileReader.result);
        };
        fileReader.onerror = (error) => {
          reject(error);
        };
      });
    };

    const file = e.target.files[0];
    const base64 = await convertToBase64(file);
    setProfilePic(base64);
  };

  return (
    <div className='w-full flex  justify-center mx-auto'>

        <div className='w-full text-center'>
            <h3 className="py-8 bg-darker">
              Register as Agent and be able to host properties.
            </h3>
            <div className="bg-dark py-10 px-6 sm:px-16 md:px-64 mb-10">

              <form onSubmit={handleSubmit}>
                <div className=" md:grid grid-cols-2 gap-10 text-l text-left">
                  <div>
                    <h2 className="font-thin text-left pb-4 text-4xl">
                      Personal Details
                    </h2>
                    <div>
                      <label className="">Full Name</label>
                      <input
                        className="formInput"
                        type="text"
                        name="fullname"
                        onChange={handleInputChange}
                        value={inputs.fullname}
                        placeholder="Enter full name"
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
                      <label>Address</label>
                      <input
                        className="formInput"
                        type="text"
                        name="address"
                        onChange={handleInputChange}
                        placeholder="Enter your address"
                        value={inputs.address}
                        required
                      />
                    </div>

                    <div>
                      <label>Country and City</label>
                      <input
                        className="formInput"
                        type="text"
                        name="country"
                        onChange={handleInputChange}
                        placeholder="Abuja, Nigeria"
                        value={inputs.country}
                        required
                      />
                    </div>
                    <div>
                      <label>Phone number</label>
                      <input
                        className="formInput"
                        type="number"
                        name="phonenumber"
                        onChange={handleInputChange}
                        placeholder="+2348032787601"
                        value={inputs.phonenumber}
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <h2 className="font-thin text-left pb-4 text-4xl">
                      Professional Details
                    </h2>
                    <div>
                      <label>Bio: State Your Professional Summary</label>
                      <input
                        className="formInput min-h-[135px]"
                        type="text"
                        name="bio"
                        onChange={handleInputChange}
                        placeholder=""
                        value={inputs.bio}
                        required
                      />
                    </div>

                    <div className="relative">
                      <label>Profile Picture </label>
                      <div className="flex">
                        <input
                          className="formInput"
                          type="file"
                          name="profilePic"
                          onChange={handleImageUpload}
                          placeholder=""
                          accept=".jpeg, .png, .jpg"
                          required
                        />
                        <div
                          className="h-20 w-28 overflow-hidden p-1 bg-zinc-800  
                          absolute top-0 right-0 rounded border-purple-700"
                        >
                          <img
                            src={profilePic}
                            alt="imageUrl"
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <label>LinkedIn Address</label>
                      <input
                        className="formInput"
                        type="text"
                        name="linkedin"
                        onChange={handleInputChange}
                        placeholder="Enter Linkedin address"
                        value={inputs.linkedin}
                        required
                      />
                    </div>
                    <div>
                      <label>twitter</label>
                      <input
                        className="formInput"
                        type="text"
                        name="twitter"
                        onChange={handleInputChange}
                        placeholder="@twiter"
                        value={inputs.twitter}
                      />
                    </div>
                  </div>
                </div>

                <div className="mx-auto text-center">
                  <button type="submit" className="px-14 py-6 button">
                    Submit
                  </button>
                  <Link to="/profile">
                    <button type="submit" className="px-14 py-6 ml-6 button">
                      Cancel
                    </button>
                  </Link>
                </div>
              </form>
            </div>
        </div>
      
    </div>
  )
}

export default RegisterAgent