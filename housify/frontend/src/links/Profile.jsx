import { useNavigate, Outlet } from 'react-router-dom'
import { useState } from 'react';
import { Expert, AgentHeroBanner, UserHeroBanner, WishList, Features } from '../containers'
import {agents} from "../common/Data"
import { useAuth } from '../common/auth'

const Profile = () => {
  const navigate = useNavigate()
  const staticagent = agents[1]
  const auth = useAuth()
  const {user, agent} = useAuth()

  const [displayProperties, setDisplayProperties] = useState(false)


  const editAgent = async (agent) => {
    await auth.addEditAgent(agent);
    navigate("/agentForm");
  };

  return (
    <div className="Agent">
      
      {!agent ? (
        <UserHeroBanner />
      ) : (
        <AgentHeroBanner
          header={agent && agent.fullname}
          text={agent && agent.bio}
          address={agent && agent.address}
          phonenumber={agent && agent.phonenumber}
          email={agent && agent.email}
          linkedin={agent && agent.linkedin}
          twitter={agent && agent.twitter}
          profilePic={agent && agent.profilePic}

          editProfileBtn={
            <button
              className="mt-6  text-xl"
              onClick={() => editAgent(agent && agent)}
            >
              Edit Profile
            </button>
          }

          listPropertyBtn={
            <div
              className="px-8"
              onClick={() => navigate("listProperty")}
            >
              List Properties
            </div>
          }
        />
      )}
   
       {agent ? <Outlet /> : null}

      <WishList
        header="Wishlist"
        text= {`Saved property by ${user && user.username}`} 
        CTA= {<div className="ml-2 text-secondary hover:scale-105"
        onClick={() =>  setDisplayProperties(prevValue => !prevValue)}> {!displayProperties ? "List a property" : "Back" }</div> }
        back= {<button className='mr-2' onClick={() => setDisplayProperties(prevValue => !prevValue)}>{!displayProperties ? "Add property to wishlist" : "Back"}</button>}      
      />

     {displayProperties && <Features
        back={<button className='mr-2' onClick={() => setDisplayProperties(false)}>Back</button>}/>}
     

      <Expert
        header="Meet Expert Agents"
        text="We have certified experts ready to attend to you"
      />
      
    </div>
  )
}

export default Profile