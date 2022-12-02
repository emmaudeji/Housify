import { clientTestimony } from "../common/Data"
import ClientCard from "../components/ClientCard"

const Testimonial = (props) => {
  return (
    <div className='w-full flex px-6 ss:px-16 sm:px-28 lg:px-36  flex-col py-20 justify-between'>

      <div className='w-full flex flex-col text-center justify-center pb-6'>
        <h4 className='text-primary md:text-2xl'>{props.header}</h4>
          <p className='text-xl'>{props.text}</p>
      </div>

      <div className="w-full grid  md:grid-cols-3 gap-4 ">
        {
          clientTestimony.map(item => (
            <ClientCard
              id = {item.id}
              comment = {item.comment}
              link = {item.link}
              clientPic = {item.clientPic}
              name = {item.name}
            />
          ))
        }
        
      </div>
      
    </div>
  )
}

export default Testimonial