
import { SearchMenu } from '../components'
import { Expert, Hero, Features, Services, Testimonials, Work, Partners, SearchProperty } from '../containers'
import { useAuth } from '../common/auth';


const Home = () => {
  const {expandSearch, searchResultRef} = useAuth()

  return (
    <div>
      <Hero
        header='We Provide the Suitable place for you to live'
        text='Find the next perfect place to live'
        CTA = {
          <SearchMenu />
        } />
        {expandSearch && <SearchProperty 
          className=""
          // ref={searchResultRef}
        />}
      <Services
        header="We Provide The Best Property For You"
        text="With our vast search tool, you can find yourr dream home from any location in the world. All we do is help you find the place, meet the agents, and seal the deal. There's no extra commission for our service."
      />
      
      <Features
        header='Featured Homes'
        text='Most saved properties in our list'
      />

      <Work 
        header="How it Works" 
        text="Confidence in Collaboration" 
      />
      <Expert
        header="Expert Realtors"
        text="Get investment advice from experts"
      />
      <Partners
        header="Our Partners"
        text="We have strong partnership with renowned agencies and organizations"
      />
      <Testimonials
        header="Satisfied Clients"
        text="Our credibility is in their story"
      />
      
</div>
)
 
}

export default Home