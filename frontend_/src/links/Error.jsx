import { useNavigate } from "react-router-dom"

const Error = () => {
  const navigate = useNavigate()
  return (
    <div className='w-full h-[57vh] grid place-content-center'>
      <div>
        <div className='text-center text-6xl'>This page was not found
        <p onClick={() => navigate(-1)} className="text-2xl text-secondary pt-10 cursor-pointer">Back</p>
        </div>  
        
      </div>
    </div>
  )
}

export default Error