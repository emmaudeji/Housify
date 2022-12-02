import {send} from '../assets'
import {Link} from 'react-router-dom'
import { worksInfo } from '../common/Constants'

const WorksCard = (props) => {
  return (
    <div className="bg-black-gradient rounded-[30px] rounded-tr-none hover:scale-105  cursor-pointer duration-300 p-6 ">
          <div className=" flex flex-col text-center">
            <div className=" flex justify-center mb-2">
              <img src={props.icon} alt="box-icon" className='w-6'/>
            </div>
            <h5>{props.header}</h5>
            <p className="">
              {props.text}           
            </p>
            <Link className="text-secondary" to={props.link}>
              {props.CTA}
            </Link>
      </div>
      
    </div>
  )
}

export default WorksCard