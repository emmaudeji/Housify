import { useAuth } from "../common/auth"
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { baseUrl } from "../common/baseUrl";

const ViewProperty = () => {
  const {PropertyToView, addEditProperty, agent, agentProperties, setAgentProperties} = useAuth();

  const navigate = useNavigate();

  const editProperty = async (property) => {
    addEditProperty(property);
    navigate("/listProperty");
  };

  const deleteProperty = async (property) => {
    const data = await axios.delete(
      `${baseUrl}/property/${property.id}/deleted`
    );
    const { success, feedback } = data.data;
    if (success) {
      console.log(`Deleted: ${data}`);
      const updatedAgentProperty = agentProperties.filter(
        (item) => item.id !== property.id
      );
      await setAgentProperties(updatedAgentProperty);
      navigate(-1)
    } else {
      console.log("Could not delete");
    }
  };


  return (
    <div className="flex justify-center md:h-[100vh] w-[100vw] items-center ">
      <div className="flex flex-col md:flex-row justify-center ">
            <div className="flex justify-center items-center md:pr-8 mb-4">
              <button className="" onClick={() => navigate(-1)}
              > Back </button>
            </div>

          <div className="flex flex-col md:flex-row bg-black-gradient p-4 w-[70vw] h-[85vh] md:h-[70vh] mb-4">
            <div className="view1 md:w-[40%] pb-2 md:pb-0 md:pr-2 h-[40%] md:h-full">
              <img
                className="w-full h-full object-cover"
                src={PropertyToView.view1}
                alt="property-img"
              />
            </div>
            <div className="flex flex-row md:flex-col md:w-[30%] md:pr-4 h-[30%] md:h-[100%] md:pb-0 pb-2">
              <div className="view2 w-full md:h-[40%] md:pb-2">
                <img
                  className="w-full h-full object-cover"
                  src={PropertyToView.view2}
                  alt=" property-img"
                />
              </div>
              <div className="view3 w-full md:h-[30%] md:pb-2 ">
                <img
                  className="w-full h-full object-cover"
                  src={PropertyToView.view3}
                  alt=" property-img"
                />
              </div>
              <div className="view4 w-full md:h-[30%]">
                <img
                  className="w-full h-full object-cover"
                  src={PropertyToView.view4}
                  alt=" property-img"
                />
              </div>
            </div>

            <div className="md:w-[30%] h-[20%] md:h-full grid">

              <div className="flex flex-col ">
                <p className="description pb-2">
                  Description: <br /> {PropertyToView.description}
                </p>

              <div className="flex justify-between md:flex-col md:gap-4">
                <p className="price">
                  Price: <br /> {PropertyToView.price}
                </p>
                <p className="location">
                  Location: <br />
                  {PropertyToView.country}
                </p>
                <p className="type">
                  Type: <br />
                  {PropertyToView.property_type}
                </p>
              </div>
                
              </div>

                {agent && agent.id === PropertyToView.agent_id ? (
                <div className="md:self-end">
                  <button className="h-11 mr-4" onClick={() => editProperty(PropertyToView)}>Edit</button>
                  <button className="h-11" onClick={() => deleteProperty(PropertyToView)}>Delete</button>
                </div>
              ) : null}

            </div>
          </div>
      </div>
    </div>
  )
}

export default ViewProperty