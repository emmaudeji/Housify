import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useLocation, useNavigate } from "react-router-dom";

import {PropertyCard} from "../components";
// import ViewProperty from "./ViewProperty";
import {baseUrl} from "../common/baseUrl";
import {close, } from "../assets"
import { useAuth } from "../common/auth";



const AgentProperty = () => {

  const navigate = useNavigate();
  const location = useLocation()
  const [state, setState] = useState(location.pathname)

  
  
  const {agentProperties, agent, AgentDetails, AllProperties, addEditProperty} = useAuth()

  const filterPropertyList = () => {
    if(state === "/agent_profile"){
      const list = AllProperties.filter(item => item.agent_id === AgentDetails.id
      )
      console.log('newlist:', list)
      return list;
    }else {
      return null
    }
  }

  const [propertyList, setPropertyList] = useState(null);

  useEffect(() => {
    const updateAgentPropertyList = (agentProperties) => {
     agentProperties ? setPropertyList(agentProperties) :  setPropertyList(null)
    } 
    const list = filterPropertyList();
    updateAgentPropertyList(list ? list : agentProperties)
    console.log('propertyList:', propertyList)

    }, [agentProperties, AgentDetails])

  const editProperty = async (property) => {
    await addEditProperty(property);
    navigate("listProperty");
  };

  const deleteProperty = async (property) => {
    const data = await axios.delete(
      `${baseUrl}/property/${property.id}/deleted`
    );
    const { success, feedback } = data.data;
    if (success) {
      console.log(`Deleted: ${data}`);
      const updatedAgentProperty = propertyList.filter(
        (item) => item.id !== property.id
      );
      setPropertyList(updatedAgentProperty);
    } else {
      console.log("Could not delete");
    }
  };

  const slice = (x) => {
    if (x.length > 15) {
      return x.slice(0, 15) + "...";
    }
    return x;
  };

  return (
    <div className='w-full px-6 py-20 sm:px-16 lg:px-36 flex justify-center flex-col'>
        <div className='w-full flex flex-col text-center justify-center pb-6'>
          <h4 className='text-primary md:text-2xl'>Properties</h4>
          <p className='text-xl'>Listed Properties By {(agent ? agent.fullname : null) || (AgentDetails && AgentDetails.fullname)}</p>
        </div>
        { propertyList ? <div className="w-full grid sm:grid-cols-2 md:grid-cols-4 gap-4 px-8 sm:px-0">
          
            {propertyList.map((item, index) => {
              return (
                <PropertyCard
                  key={item.id}
                  house={item.view3}
                  price={item.price}
                  propertyType={item.property_type}
                  location={slice(item.country)}
                  property={item}
                  editButton ={
                    <div className="p-1 rounded-full hover:bg-purple-900 transition-300 mr-1" onClick={() => editProperty(item)} >
                      <img className='w-4' src={close} alt="edit"/>
                    </div>
                  }
                  deleteButton = {
                    <div className="p-1 rounded-full hover:bg-purple-900 transition-300 mr-1"  onClick={() => deleteProperty(item)}>
                      <img className='w-4' src={close} alt="delete"/>
                    </div>
                  }
                />
                )
              } ) 
            }
          
          </div> : <div className="flex justify-center w-full"><p>You have not listed a property.</p> <Link to="listProperty" className="ml-2 text-secondary hover:scale-105">List a property</Link> </div> 
        }

        <div className="w-full pt-10 flex justify-center">
          
          <button>Load More</button>
        </div>
      
    </div>
  )
}

export default AgentProperty