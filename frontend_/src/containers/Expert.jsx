import { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../common/auth'
import { agents } from '../common/Data'
import {close} from '../assets'
// import {swipper} from '../Hooks/useSwipper'
import AgentCard from '../components/AgentCard'

const Expert = (props) => {
  const {allAgents} = useAuth();
  const scrollRef = useRef(null);
  const [Agents, setAgents] = useState(agents)

  useEffect(() => {
    const updateAgents = (allAgents) => {
    allAgents ? setAgents(allAgents) :  setAgents(agents)
    } 
    updateAgents(allAgents)
    }, allAgents)

  const swipper = (direction) => {
    const { current } = scrollRef;

    if (direction === "left") {
      current.scrollLeft -= 300;
    } else {
      current.scrollLeft += 300;
    }
  };


  return (
    <div className='w-full px-6 py-20 sm:px-16 lg:px-36 flex justify-center flex-col'>

        <div className='w-full flex flex-col text-center justify-center pb-6 '>
          <h4 className='text-primary md:text-2xl'>{props.header}</h4>
          <p className='text-xl'>{props.text}</p>
        </div>

        <div className='relative'>
           <div className='px-8 rounded-[50%]'>
            <div className="w-full flex  gap-4 scroll " ref={scrollRef}>
              {
                Agents.map(item => {
                  return (
                      <AgentCard 
                      name={item.fullname}
                      pic={item.profilePic}
                      linkedin={item.linkedin}
                      phonenumber={item.phonenumber}
                      email={item.email}
                      agentDetails={item}
                    />
                  )
                })
              }
          </div>
           </div>
          <div className="scrollbar_arrows">

            <div className='hover:bg-purple-700 py-2 pr-3 rounded cursor-pointer'
             onClick={() => swipper('left')}>
              <img src={close} className="w-[14px] hover:scale-110" />
            </div>
            <div className='cursor-pointer rounded hover:bg-purple-700 py-2 pl-3 '
            onClick={() => swipper('right')}>
              <img src={close}  className="w-[14px] hover:scale-120" />
            </div>
          </div>

      </div>
       

      <div className="w-full pt-10 flex justify-center">
        <Link to='/agent'>
           <button>Load More</button>
        </Link>
          
        </div>

    </div>
  )
}

export default Expert