import { useNavigate, Link} from 'react-router-dom'
import { Expert, AgentHeroBanner, AgentProperty } from '../containers'

import { useAuth } from '../common/auth'
import { agents } from '../common/Data'

const Profile = () => {
  const navigate = useNavigate()
 
  const {AgentDetails, agent, user} = useAuth()


  return (
    <div className="Agent">
      
      {!AgentDetails ? (
        console.log('Agent was not captured')
      ) : (
        <AgentHeroBanner
          header={AgentDetails && AgentDetails.fullname}
          text={AgentDetails && AgentDetails.bio}
          address={AgentDetails && AgentDetails.address}
          phonenumber={AgentDetails && AgentDetails.phonenumber}
          email={AgentDetails && AgentDetails.email}
          linkedin={AgentDetails && AgentDetails.linkedin}
          twitter={AgentDetails && AgentDetails.twitter}
          profilePic={AgentDetails && AgentDetails.profilePic}

          

          listPropertyBtn={
            <div
              className="px-8"
            >  {AgentDetails.fullname}
            </div>
          }
        />
      )}
   
       <AgentProperty />
      
      <Expert
        header="Meet Expert Agents"
        text="We have certified experts ready to attend to you"
      />
      
    </div>
  )
}

export default Profile