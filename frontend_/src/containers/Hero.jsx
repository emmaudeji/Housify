
import {house1,
  house2,
  house3,
  house4} from '../assets'

const Hero = ({header, text, CTA}) => {
  return (
    <div className="w-full flex px-6 sm:px-16 lg:px-48 flex-col md:flex-row md:pt-14 lg:pt-20 md:pb-6 ">
      
      <div className="flex flex-1 flex-col  text-center md:text-start pt-8 sm:pt-16 md:pt-0"> 

        <h1 className="leading-[42px] text-4xl sm:text-5xl sm:leading-[66px] pb-4 md:pt-10">{header}</h1>

        <p className="px-8 md:px-0 pb-4 sm:text-3xl md:text-2xl lg:text-xl sm:py-6" >{text}</p>
        <div>
          {CTA}
        </div>
        

      </div>

      <div className="flex flex-1 flex-col md:ml-24 py-12 md:py-0 relative sm:pt-20 md:pt-0 ">
        <div className=" rounded-[80px] rounded-tr-none h-[65vh] w-full overflow-hidden ">
          <img src={house1} alt="featured home" className="w-full h-full object-cover"/>
        </div>
        <button className="px-6 sm:px-10 py-2 sm:py-4 bg-primary rounded-full rounded-tr-none absolute top-[74%] lg:top-[74%] left-[-16px] text-2xl">Texas LA Usa</button>
      </div>
    </div>
  )
}

export default Hero