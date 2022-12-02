

const Service = (props) => {
  return (
    <div className='w-full flex px-6 sm:px-16 lg:px-36 flex-col lg:flex-row py-20 justify-between items-center'>

            <div className=" flex-1 lg:text-left ">
              
              <h2 className="lg:max-w-[70%]  text-4xl">
                {props.header}
              </h2>
              <p className="text-xl mt-4"> {props.text} </p>
              
                <button className="my-8">Get Started</button>
             
            </div>
           
          
          <div className="flex-1 lg:ml-8 grid grid-cols-2 gap-4 lg:gap-x-8 text-left">

            <div className="bg-black-gradient p-4 md:p-8 rounded-[25px] rounded-tr-none bg-zinc-800 hover:border hover:border-zinc-300 duration-500">
              <h4>Buy Property</h4>
              <p>
                With our vast search tool, you can find your dream home from
                anywhere in the world.
              </p>
            </div>

            <div className="bg-black-gradient p-4 md:p-8  rounded-[25px] rounded-tr-none bg-zinc-800 hover:border hover:border-zinc-300 duration-500">
              <h4>Sell Property</h4>
              <p>
                Host a property of your choice from any where and make it accessible from anywhere.
              </p>
            </div>

            <div className=" bg-black-gradient p-4 md:p-8  rounded-[25px] rounded-tr-none bg-zinc-800 hover:border hover:border-zinc-300 duration-500">
              <h4>Rent Property</h4>
              <p>
                Access adequate information to find and access a property to that meets your needs. 
              </p>
            </div>

            <div className="bg-black-gradient p-4 md:p-8 rounded-[25px] rounded-tr-none bg-zinc-800 hover:bg-[bg-black] duration-500">
              <h4>Property Agent</h4>
              <p>
                Find the rigth agent that will guide you to making the right choices and investment.
              </p>
            </div>
          </div>
    </div>
   
  )
}

export default Service