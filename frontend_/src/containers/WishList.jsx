import axios from 'axios';

import { baseUrl } from '../common/baseUrl';
import PropertyCard from '../components/PropertyCard';
import { useAuth } from "../common/auth";
import { close } from '../assets';

const WishList = (props) => {
  const {WishList, setWishList, user} = useAuth()
  

  const deleteProperty = async (property) => {
    const data = await axios.delete(
      `${baseUrl}/wishlist/${property.id}/deleted`
    );
    const { success, feedback } = data.data;
    if (success) {
      console.log(`Deleted wishlist: ${data}`);

      const updatedWishlist = WishList.filter(
        (item) => item.id !== property.id
      )
      await setWishList(updatedWishlist)
    } else {
      console.log("Could not delete");
    }
  };

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
          
           { WishList.map((item) => {
              return (
                <PropertyCard
                  key={item.id}
                  house={item.view3}
                  price={item.price}
                  propertyType={item.property_type}
                  location={slice(item.country)}
                  property={item}
                  deleteButton={
                    <div className="p-1 rounded-full hover:bg-purple-900 transition-300 mr-1"  onClick={() => deleteProperty(item)}>
                      <img className='w-4' src={close} alt="delete"/>
                    </div>
                  }
                />
              )
            } )
          }
          
        </div>  
        
        {/* <div className="flex justify-center w-full"><p>You have not saved a property.</p> {props.CTA}

        </div>  */}
        
        <div className="w-full pt-10 flex justify-center">
          {props.back}
          {WishList && <button>Load More</button>}
        </div>
        
        
    </div>
  )
}

export default WishList