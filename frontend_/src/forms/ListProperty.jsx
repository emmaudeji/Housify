import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import { useAuth } from "../common/auth";
import {baseUrl} from "../common/baseUrl";

const ListProperty = () => {

 const navigate = useNavigate();
  const auth = useAuth();
  const { editProperty } = auth;

  const [propertyView, setPropertyView] = useState({
    view1: "",
    view2: "",
    view3: "",
    view4: "",
  });

  const [inputs, setInputs] = useState({
    address: "",
    country: "",
    propertyType: "",
    bedroom: "",
    description: "",
    price: "",
    secondPrice: "",
  });

  useEffect(() => {
    if (editProperty) {
      console.log(editProperty);
      setPropertyView({
        view1: editProperty.view1,
        view2: editProperty.view2,
        view3: editProperty.view3,
        view4: editProperty.view4,
      });
      
      setInputs({
        address: editProperty.address,
        country: editProperty.country,
        propertyType: editProperty.property_type,
        bedroom: editProperty.bedroom,
        description: editProperty.description,
        price: editProperty.price,
        secondPrice: editProperty.secondPrice,
      });
    }
  }, []);

  const handleSubmit = async (event) => {
    if (event) {
      event.preventDefault();
      if (editProperty) {
      // edit a property
        const data = await axios.put(
          `${baseUrl}/edit_property/${editProperty.id}`, {
          address: inputs.address,
          country: inputs.country,
          propertyType: inputs.propertyType,
          bedroom: inputs.bedroom,
          view1: propertyView.view1,
          view2: propertyView.view2,
          view3: propertyView.view3,
          view4: propertyView.view4,
          description: inputs.description,
          price: inputs.price,
        }
        );

        const { success, feedback } = data.data;
        if (success) {
          const count = Math.random();
          console.log("ListedProperty", data.data);
          auth.addProperty(count);
          auth.addShowPropertyForm(null);
          console.log(count);
          navigate("/profile", { replace: true });
          setInputs({
            address: "",
            country: "",
            propertyType: "",
            bedroom: "",
            view1: "",
            view2: "",
            view3: "",
            view4: "",
            description: "",
            price: "",
          });
          // alert(`Property Listed!`);
        } else {
          alert(`Error occured, try again`);
          console.log(feedback);
          setInputs({
            address: inputs.address,
            country: inputs.country,
            propertyType: inputs.propertyType,
            bedroom: inputs.bedroom,
            view1: propertyView.view1,
            view2: propertyView.view2,
            view3: propertyView.view3,
            view4: propertyView.view4,
            description: inputs.description,
            price: inputs.price,
          });
        }
      } else {
        // create a new property
        const data = await axios.post(`${baseUrl}/property/${auth.agent.id}`, {
          address: inputs.address,
          country: inputs.country,
          propertyType: inputs.propertyType,
          bedroom: inputs.bedroom,
          view1: propertyView.view1,
          view2: propertyView.view2,
          view3: propertyView.view3,
          view4: propertyView.view4,
          description: inputs.description,
          price: inputs.price,
        });

        const { success, feedback } = data.data;
        if (success) {
          const count = Math.random();
          console.log("ListedProperty", data.data);
          auth.addProperty(count);
          
          console.log(count);
          navigate("/profile", { replace: true });
          setInputs({
            address: "",
            country: "",
            propertyType: "",
            bedroom: "",
            view1: "",
            view2: "",
            view3: "",
            view4: "",
            description: "",
            price: "",
          });
        } else {
          alert(`Error occured, try again`);
          console.log(feedback);
          setInputs({
            address: inputs.address,
            country: inputs.country,
            propertyType: inputs.propertyType,
            bedroom: inputs.bedroom,
            view1: propertyView.view1,
            view2: propertyView.view2,
            view3: propertyView.view3,
            view4: propertyView.view4,
            description: inputs.description,
            price: inputs.price,
          });
        }
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
    e.persist();
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
    const { name } = e.target;
    setPropertyView((prevInputs) => ({
      ...prevInputs,
      [name]: base64,
    }));
    console.log("base", propertyView);
  };


  return (
    <div className='w-full flex  justify-center mx-auto'>

        <div className='w-full text-center'>
            <h3 className="py-8 bg-darker">
             List a property for sale or rent 
            </h3>
            <div className="bg-dark py-10 px-6 sm:px-16 md:px-64 mb-10">
              <form onSubmit={handleSubmit}>
                <div className=" md:mx-[100px] md:grid grid-cols-2 gap-10  text-xl text-left pb-10">
                  <div>
                    <h2 className="font-thin text-left pb-4 text-3xl">
                      Property Details
                    </h2>
                    <div>
                      <label className="">Address</label>
                      <input
                        className="formInput"
                        type="text"
                        name="address"
                        onChange={handleInputChange}
                        value={inputs.address}
                        placeholder="Enter Address"
                      />
                    </div>

                    <div>
                      <label>Country</label>
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
                      <label>Select Property Type</label>

                      <input
                        className="formInput"
                        type="text"
                        name="propertyType"
                        onChange={handleInputChange}
                        placeholder="Enter property type"
                        value={inputs.propertyType}
                      />
                    </div>
                    <div>
                      <label>Bedrooms</label>
                      <input
                        className="formInput"
                        type="text"
                        name="bedroom"
                        onChange={handleInputChange}
                        placeholder="Enter number of rooms available"
                        value={inputs.bedroom}
                      />
                    </div>

                    <div>
                      <h2 className="font-thin text-left pb-2 text-3xl">
                        Property Description
                      </h2>
                      <div>
                        <label>Describe nature of the Property</label>
                        <input
                          className="formInput"
                          type="text"
                          name="description"
                          onChange={handleInputChange}
                          placeholder=""
                          value={inputs.description}
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <h2 className="font-thin text-left pb-2 text-3xl">
                      Property Images
                    </h2>

                    <div className="relative">
                      <label>Property image 1</label>
                      <div className="flex">
                        <input
                          className="formInput"
                          type="file"
                          name="view1"
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
                            src={
                              propertyView.view1 ? propertyView.view1 : "Insert Image"
                            }
                            alt="imageUrl"
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="relative">
                      <label>Property image 2</label>
                      <div className="flex">
                        <input
                          className="formInput"
                          type="file"
                          name="view2"
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
                            src={
                              propertyView.view2 ? propertyView.view2 : "Insert Image"
                            }
                            alt="imageUrl"
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="relative">
                      <label>Property image 3</label>
                      <div className="flex">
                        <input
                          className="formInput"
                          type="file"
                          name="view3"
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
                            src={
                              propertyView.view3 ? propertyView.view3 : "Insert Image"
                            }
                            alt="imageUrl"
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="relative">
                      <label>Property image 4</label>
                      <div className="flex">
                        <input
                          className="formInput"
                          type="file"
                          name="view4"
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
                            src={
                              propertyView.view4 ? propertyView.view4 : "Insert Image"
                            }
                            alt="imageUrl"
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <h2 className="font-thin text-left pb-2 text-3xl">
                        Property Evaluation
                      </h2>
                      <div className="flex justify-between">
                        <div className="pr-4">
                          <label>First Price</label>
                          <input
                            className="formInput"
                            type="number"
                            name="price"
                            onChange={handleInputChange}
                            placeholder=""
                            value={inputs.price}
                            required
                          />
                        </div>
                        <div>
                          <label>Second Price</label>
                          <input
                            className="formInput"
                            type="number"
                            name="secondPrice"
                            onChange={handleInputChange}
                            placeholder=""
                            value={inputs.secondPrice}
                            required
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mx-auto text-center text-2xl">
                  <button type="submit button" className="px-14 py-6">
                    Submit
                  </button>
                  <Link to="/profile">
                    <button type="submit button" className="px-14 py-6 ml-6">
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

export default ListProperty