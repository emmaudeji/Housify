import MoonLoader from 'react-spinners/MoonLoader'
import { useAuth } from '../common/auth'
import { SearchResultCard } from '../components'


const SearchProperty = () => {
  const {isLoading, searchList, isEmpty, noResults} = useAuth()

  return (
    <div className="w-full min-h-[400px] flex justify-center items-center px-6 sm:px-16 lg:px-48 flex-col md:flex-row py-6 bg-dark">

      <div className='MoonLoader'>
        {/* {isLoading && <MoonLoader loading size={20} color="white"/>}

        {!isLoading && noResults && <p>Your search was not found</p>
        }
        
        {!isLoading && isEmpty && <p>Start typing to search</p> } */}
      </div>

       {(searchList.length !== 0) && 
          <div className="w-full grid sm:grid-cols-2 md:grid-cols-4 gap-4 px-8 sm:px-0">
            { searchList.map(item => (
            <SearchResultCard
              // key={item.show.id}
              key={item.id}
              // thumbnail={item.show.image.medium}
              thumbnail={item.views}
              // description={item.show.name}
              description={item.country}

          />
          ))  }
      </div>}

     
    </div>
  )
}

export default SearchProperty