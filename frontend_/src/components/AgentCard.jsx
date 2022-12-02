import { Link } from "react-router-dom"
import { linkedin, send, shield, } from "../assets"
import { useAuth } from "../common/auth"


const AgentCard = (props) => {
  const {setAgentDetails} = useAuth()

  return (
     <div className="max-w-[300px] min-w-[270px] bg-black-gradient rounded-[30px] rounded-tr-none hover:scale-105  cursor-pointer duration-300 pb-2">
      <div className="w-full h-60 rounded-[30px] rounded-tr-none  overflow-hidden ">
        <img
          className="w-full h-full object-cover"
          src={props.pic}
          alt="property-img"
        />
      </div>
      <div className="px-6 pb-4 pt-2">
        <div className="flex justify-between">
          <p className="">{props.name}</p>
          <div className="flex ">

            <Link className="p-1 rounded-full hover:bg-purple-900 transition-300 mr-1" to={props.linkedin}>
              <img className='w-4' src={linkedin} alt="edit"/>
            </Link>

            <Link className="p-1 rounded-full hover:bg-purple-900 transition-300 mr-1" to={props.email}>
              <img className='w-4' src={shield} alt="delte"/>
            </Link>

            <Link className="p-1 rounded-full hover:bg-purple-900 transition-300 mr-1" to={props.phonenumber}>
              <img className='w-4' src={send} alt="delete"/>
            </Link>
            <Link
              to='/agent_profile'
              className="rounded px-1 py-0 hover:bg-purple-700 transition-300"
              onClick={() => setAgentDetails(props.agentDetails)}
            >
              View
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AgentCard