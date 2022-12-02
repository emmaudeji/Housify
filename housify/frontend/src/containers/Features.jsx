import { useState, useEffect } from 'react';
import PropertyCard from '../components/PropertyCard';
import {houses} from '../common/Data';
import { useAuth } from "../common/auth";

const Propety = (props) => {
  const auth = useAuth();
  const [propertyDisplaylimit, setPropertyDisplayLimit] = useState(4);


  const {AllProperties, addPropertyToWishList} = useAuth()

   
  const [propertyList, setPropertyList] = useState(houses);

  useEffect(() => {
    const SlicedPropertyList = AllProperties ? AllProperties.slice(0, propertyDisplaylimit): null
   
    const updatePropertyList = (SlicedPropertyList) => {
     SlicedPropertyList ? setPropertyList(SlicedPropertyList) :  setPropertyList(houses)
    } 
    updatePropertyList(SlicedPropertyList)
    console.log('propertyList:', propertyList)
    }, [propertyDisplaylimit, AllProperties])


  const addToWishList = (property) => {
    addPropertyToWishList(property)
  }

    const slice = (x) => {
    if (x.length > 15) {
      return x.slice(0, 15) + "...";
    }
    return x;
  };

  return (
    <div className='w-full px-6 py-20 sm:px-16 lg:px-36 flex justify-center flex-col'>
        <div className='w-full flex flex-col text-center justify-center pb-6'>
          <h4 className='text-primary md:text-2xl'>{props.header}</h4>
          <p className='text-xl'>{props.text}</p>
        </div>
        <div className="w-full grid sm:grid-cols-2 md:grid-cols-4 gap-4 px-8 sm:px-0">
          {
            propertyList.map((item, index) => {
              return (
                <PropertyCard
                  key={item.id}
                  house={item.view3}
                  price={item.price}
                  propertyType={item.property_type}
                  location={slice(item.country)}
                  property={item}
                  addToWishList={
                    <div
                    className="rounded-full p-1 py-0 hover:bg-purple-900 transition-300 text-xl"
                    onClick={() => addToWishList(item)}>
                      <h4>+</h4>
                    </div>
                    }
                />
              )
            } )
          }
          
        </div>

        <div className="w-full pt-10 flex justify-center">
          {props.back}
          {(AllProperties && AllProperties.length > propertyList.length) || (houses.length > propertyList.length) ? <button className='mr-2' onClick={() => setPropertyDisplayLimit(propertyDisplaylimit + 4)}>Load More</button> : null}
          <button onClick={() => setPropertyDisplayLimit(4)}>Collapse</button>
        </div>
      
    </div>
  )
}

export default Propety