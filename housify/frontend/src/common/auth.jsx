import { useEffect, useState, useContext, createContext } from "react";
import axios from "axios";
import {baseUrl} from "./baseUrl";
import { useNavigate } from "react-router-dom";
import {useClickOutside} from 'react-click-outside-hook'

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate()

  const [user, setUser] = useState(null)
  const [agent, setAgent] = useState(null);
  const [allAgents, setallAgents] = useState(null)
  const [AllProperties, setAllProperties] = useState(null)
  const [agentProperties, setAgentProperties] = useState([])
  
  const [isAgent, setIsAgent] = useState(null)
  const [editAgent, setEditAgent] = useState(null);

  const [editProperty, setEditProperty] = useState(null);
  const [isProperty, setIsProperty] = useState(null);

  const [agentId, setAgentId] = useState(null);
  const [PropertyToView, setPropertyToView] = useState(null)
  const [PropertyToWishList, setPropertyToWishList] = useState(null)
  const [fetchWishlist, setFetchWishlist] = useState(null);
  const [WishList, setWishList] = useState([])
  const [AgentDetails, setAgentDetails] = useState(null)

  // < search bar variables >
  const [expandSearch, setExpandSearch] = useState(false)
  const [searchResultRef, isClickedOutside] = useClickOutside()
  const [isLoading, setIsLoading] = useState(false)
  const [searchList, setSearchList] = useState([])
  const [isEmpty, setIsEmpty] = useState(false)
  const [noResults, setNoResults] = useState(false)
  
  // < search bar variables/>



  const login = (param) => {
    setUser(param)};

  const logout = () => {
    setUser(null)
    setAgent(null)
    setIsAgent(null)
    setAgentId(null)
    setEditAgent(null)
    setEditProperty(null)
    setAgentId(null)
    setFetchWishlist(null)
    setPropertyToWishList(null)
    setPropertyToView(null)
    setAgentDetails(null)
    navigate('/')
  };


// trigers fetchAgent after editing agent details
  const addAgent = (count) => {
    setIsAgent(count);
  };
// updates agent details for editting agent profile
  const addEditAgent = (agentDetails) => {
    setEditAgent(agentDetails);
  };
// updates property details for editting agent property
const addEditProperty = (propertyDetails) => {
  setEditProperty(propertyDetails)
}

const updateWishlist = list => {
  setWishList(list)
}

const updatefetchWishlist = updatedpropertyList => {
  setFetchWishlist(updatedpropertyList)
}

// trigers agent property updates after creating or editing a property
const addProperty = (count) => {
    setIsProperty(count);
  };



const addPropertyToWishList = (property) => {
  setPropertyToWishList(property)
}

const addPropertyToView = (property) => {
  setPropertyToView(property)
}


// add a property to user wishlist using user id
  useEffect(() => {
    const addWishlist = async (saveProperty) => {
      if (user) {
        const data = await axios.post(`${baseUrl}/create_wishlist/${user.id}`, {
          address: saveProperty.address,
          country: saveProperty.country,
          propertyType: saveProperty.property_type,
          bedroom: saveProperty.bedroom,
          view1: saveProperty.view1,
          view2: saveProperty.view2,
          view3: saveProperty.view3,
          view4: saveProperty.view4,
          description: saveProperty.description,
          price: saveProperty.price,
          propertyId: saveProperty.id,
          agentId: saveProperty.agent_id,
        });
        const { success, feedback } = data.data;
        if (success) {
          updatefetchWishlist(feedback);
          console.log("NewSavedProperty ", feedback);
        } else {
          console.log("savePropertyError: ", feedback);
        }
      }
    };
    addWishlist(PropertyToWishList);
  }, [PropertyToWishList]);


// fetch user wishlist by userId if it exist in wishlist.
  useEffect(() => {
    const fetchUserWishlist = async () => {
      if (user) {
        const data = await axios.get(
          `${baseUrl}/wishlist/${user.id}/properties`
        );
        const { success, feedback } = data.data;
        if (success) {
          setWishList(feedback);
          console.log("userWishlist: ", feedback);
        } else {
          console.log(feedback, success);
        }
      }
    };
    fetchUserWishlist();
  }, [user, fetchWishlist]);

// fetch all agents properties
useEffect(() => {
    // fetch user agent properties and update auth.agentProperties if agent has properties
    const fetchAgentProperties = async () => {
      if (user) {
        const agentProperty = await axios.get(
          `${baseUrl}/agent/${agentId}/properties`
        );
        const { success, feedback } = agentProperty.data;
        if (success) {
          setAgentProperties(prevList => prevList = feedback);
          console.log("AgentPROPERTY", agentProperty.data);
        } else {
          console.log("Error occured");
        }
      } else {
        console.log("you have not listed any property");
      }
    };
    fetchAgentProperties();
  }, [agentId, isProperty]);


  
// fetchAgent if user isAgent
  useEffect(() => {
    const fetchAgentDetails = async () => {
      if (user) {
        const userAgentData = await axios.get(`${baseUrl}/agent/${user.id}`);
        const { success, feedback } = userAgentData.data;
        if (success) {
          setAgent(feedback);
          setAgentId(feedback.id);
          console.log("AgentDATA", userAgentData.data, success, feedback);
        } else {
          console.log(feedback);
        }
      } else {
        console.log("you are not an agent");
      }
    };
    fetchAgentDetails();
  }, [isAgent]);

  // fetch all agents on refresh
  useEffect(() => {
    const fetchAllAgents = async () => {
      const data = await axios.get(`${baseUrl}/agents`);
      const { success, feedback, syserr } = data.data;
      if (success) {
        setallAgents(feedback);
        console.log(`All agents ${feedback}`);
      } else {
        console.log(`Error Agents:  ${feedback} systemError: ${syserr}`);
      }
    };
    fetchAllAgents();
  }, []);

  // fetch all properties
  useEffect(() => {
    const fetchAllProperties = async () => {
      const data = await axios.get(`${baseUrl}/properties`);
      const { success, feedback, syserr } = data.data;

      if (success) {
        setAllProperties(feedback);
        console.log(`All properties:  ${feedback}`);
      } else {
        console.log(`Error properties: ${feedback} systemError: ${syserr}`);
      }
    };
    fetchAllProperties();
  }, []);

  console.log('Auth:', {
  User: user,
  agent: agent,
  isAgent: isAgent,
  allAgents: allAgents,
  agentProperty: agentProperties,
   PropertyToView: PropertyToView,
        WishList: WishList,
  AllProperties: AllProperties,
  PropertyToView: PropertyToView,
  AgentDetails: AgentDetails,

  })

  return (
    <AuthContext.Provider
      value={{
        user,
        agent,
        login,
        logout,
        addAgent,
        editAgent, 
        addEditAgent,
        allAgents,
        addEditProperty,
        editProperty,
        addProperty,
        agentProperties,
        setAgentProperties,
        addPropertyToWishList, 
        addPropertyToView,
        PropertyToView,
        WishList,
        updatefetchWishlist,
        AllProperties,
        updateWishlist,
        setWishList,
        AgentDetails, 
        setAgentDetails,

        // searchbar components
        expandSearch, setExpandSearch, 
        searchResultRef, isClickedOutside,
        isLoading, setIsLoading,
        searchList, setSearchList,
        isEmpty, setIsEmpty,
        noResults, setNoResults,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};


export const useAuth = () => {
  return useContext(AuthContext);
};
