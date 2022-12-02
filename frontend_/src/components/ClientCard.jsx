
import {Link} from 'react-router-dom'

const ClientCard = (props) => {
  return (
    

          <div className=" flex flex-row items-center">

              <div className=" flex w-16 h-16  justify-center overflow-hidden rounded-full mb-2 mr-3">
                <img src={props.clientPic} alt="box-icon" className=''/>
              </div>
              <div className='flex flex-1 flex-col'>
                  <p className="">
                  {props.comment}           
                </p>
                <Link className="text-secondary cursor-pointer" to={props.link}>
                  {props.name}
                </Link>
              </div>
          </div>

  )
}

export default ClientCard