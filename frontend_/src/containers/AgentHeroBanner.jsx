import React from 'react'

const AgentHeroBanner = (props) => {
  return (
    <div className="w-full flex px-6 sm:px-16 lg:px-48 flex-col md:flex-row md:py-14 lg:py-20 items-center">
      
      <div className="flex flex-1 flex-col  text-center md:text-start pt-8 sm:pt-16 md:pt-0"> 

        <h1 className="leading-[42px] text-4xl sm:text-5xl  ">{props.header}</h1>

        <p className="px-8 md:px-0 py-4 sm:text-3xl md:text-2xl lg:text-xl " >{props.text}</p>

        <div className="md:grid grid-cols-2 justify-between w-full text-left">
                <div>
                  <h5 className="inline-block mr-4">address</h5>
                  <p>{props.address}</p>
                  <h5 className="inline-block mr-4"> phonenumber </h5>
                  <p>{props.phonenumber}</p>
                  <h5 className="inline-block mr-4">email</h5>
                  <p>{props.email} </p>
                </div>
                <div className="">
                  <h5 className="inline-block mr-4">linkedin</h5>
                  <p>{props.linkedin}</p>
                  <h5 className="inline-block mr-4">twitter</h5>
                  <p> {props.twitter}</p>
                </div>

                {props.editProfileBtn}
              </div>
        

      </div>

      <div className="flex flex-1 flex-col md:ml-24 py-12 md:py-0 relative sm:pt-20 md:pt-0 ">
        <div className=" rounded-[80px] rounded-tr-none h-[65vh] w-full overflow-hidden ">
          <img src={props.profilePic} alt="featured home" className="w-full h-full object-cover"/>
        </div>
        <button className="px-6 sm:px-10 py-2 sm:py-4 bg-primary rounded-full rounded-tr-none absolute top-[74%] lg:top-[74%] left-[-16px] text-2xl">{props.listPropertyBtn}</button>
      </div>
    </div>
  )
}

export default AgentHeroBanner