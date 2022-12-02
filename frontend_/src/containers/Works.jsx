import React from 'react'
import { worksInfo } from '../common/Constants'
import WorksCard from '../components/WorksCard'

const Works = (props) => {
  return (
    <div className='w-full flex px-6 ss:px-16 sm:px-28 lg:px-36  flex-col py-20 justify-between'>

      <div className='w-full flex flex-col text-center justify-center pb-6'>
        <h4 className='text-primary md:text-2xl'>{props.header}</h4>
          <p className='text-xl'>{props.text}</p>
      </div>

      <div className="w-full grid  md:grid-cols-3 gap-4 sm:gap-8 px-14 md:px-16 lg:px-20 ">
        {
          worksInfo.map(item => (
            <WorksCard
              id = {item.id}
              header = {item.header}
              text = {item.text}
              link = {item.link}
              icon = {item.icon}
              CTA = {item.CTA}
            />
          ))
        }
        
      </div>
      
    </div>
  )
}

export default Works