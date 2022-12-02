import { useAuth } from "../common/auth";
import { Link } from "react-router-dom";

const PropertyCard = (props) => {
  const {addPropertyToView} = useAuth()

  

  const viewProperty= (property) => {
    addPropertyToView(property)
  }

  return (
    <div className="bg-black-gradient rounded-[30px] rounded-tr-none hover:scale-105  cursor-pointer duration-300 pb-2">
      <div className="w-full h-60 rounded-[30px] rounded-tr-none  overflow-hidden ">
        <img
          className="w-full h-full object-cover"
          src={props.house}
          alt="property-img"
        />
      </div>
      <div className="px-6 pb-4 pt-2">
        <div className="flex justify-between">
          <p className="">{props.price}</p>
          <div className="flex ">
            
            {props.addToWishList}
            {props.editButton}
            {props.deleteButton}
            <Link
            to="/view_property"
              className="rounded px-1 py-0 hover:bg-purple-700 transition-300"
              onClick={() => viewProperty(props.property)}
            >
              View
            </Link>
          </div>
        </div>
        <div className="flex justify-between ">
          <p>{props.location}</p>
          <p>{props.propertyType}</p>
        </div>
      </div>
    </div>
  );
};
export default PropertyCard;
