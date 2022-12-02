import {NavLink } from 'react-router-dom';
import Hero from './Hero';

const UserHeroBanner  = () => {
  return (
    <Hero
      header="Welcome to your user dashboard"
      text={<>
        You can save properties in your Wishlist and access the details anytime you visit. <br/><br/>
        You can register as an agent and be able to list properties.
      </>}
      CTA={<div>
              <button >
                <NavLink to="/agentForm">Become an Agent</NavLink>
              </button>
              <button className='ml-4'>
                  <NavLink to="/agentForm">Save a property</NavLink>
              </button>
          </div> }
    />
  )
}

export default UserHeroBanner 