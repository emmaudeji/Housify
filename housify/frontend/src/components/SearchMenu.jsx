import {useState, useEffect, useRef,} from 'react'
import axios from 'axios'
import { useAuth } from '../common/auth'
import {FaSearch} from 'react-icons/fa'
import {AiOutlineClose} from 'react-icons/ai'
import {useDebounce} from '../Hooks/debounceHook'
import { baseUrl } from '../common/baseUrl'
import {houses} from '../common/Data'

const SearchMenu = (props) => {
  const inputRef = useRef()
  const {AllProperties, expandSearch, setExpandSearch, searchResultRef, isClickedOutside, searchList, setSearchList, setIsLoading, setIsEmpty, setNoResults } = useAuth()
  
  const [searchQuery, setSearchQuery] = useState('')

  const [cityList, setCityList] = useState([])
  const [dataList, setDataList] = useState([])

  useEffect(() => {
    const getCityList =  (AllProperties) => {
      AllProperties && AllProperties.map(item => {
        setCityList(list => [...list, item.country])
      })
      console.log('city ', cityList);
      setCityList([])
    }
      getCityList(houses)
       getCityList(houses)
  }, [houses])

  useEffect(() => {
    
  }, [])


  

  const changeHandler = (event) => {
    event.preventDefault()
    setSearchQuery(event.target.value)
  } 

  useEffect(() => {
    isClickedOutside && setExpandSearch(false)
    setSearchQuery('') 
    setIsLoading(false)
    setSearchList([])
    setIsEmpty(false)
    setNoResults(false)
    setDataList([])
  }, [isClickedOutside])

  const clearSearch = () => {
    setExpandSearch(false)
    setSearchQuery('') 
    setIsLoading(false)
    setSearchList([])
    setIsEmpty(false)
    setNoResults(false)

    const datasearch = houses => {
      houses.map(item => {
        let a = Object.keys(item)
        setDataList(list => [...list, a])
      })
      console.log('datasearch ', dataList)
    }
    datasearch(houses);
  }
  
  const prepareQueryUrl = (query) => {
    const url = `https://api.tvmaze.com/search/shows?q=${query}`
    return encodeURI(url)
    // alert(o)
  }


const search =  () => {
    if(!searchQuery || searchQuery.trim() === '') return;

    // setIsLoading(true)
    // const query = prepareQueryUrl(searchQuery)

    const getCityList = (AllProperties) => {
      const newList = AllProperties.filter(item => item.country !== searchQuery)
      setCityList(list => [...list, newList])
    }

    getCityList(AllProperties)
    
    console.log('cityuuu ', cityList);
  }

  const searches =  () => {
    const indices = [];
    const array = cityList;
    const element = searchQuery;
    let idx = array.indexOf(element);
    while (idx !== -1) {
      indices.push(idx);
      idx = array.indexOf(element, idx + 1);
    }
    console.log('index ', indices);
  }

  const searchPropertyList = async () => {
    if(!searchQuery || searchQuery.trim() === '') return;

    setIsLoading(true)
    const URL = prepareQueryUrl(searchQuery)
    
    const response = await axios.get(URL)
      if(response) {
        if(response.data && response.data.length === 0)
          setNoResults(true)
        setSearchList(response.data)
        console.log('setSearchList: ', searchList)
          setIsEmpty(false)
        
      }
    setIsEmpty(false)
    setIsLoading(false)
  }

  if(searchQuery === "" && searchList.length === 0) 
          setIsEmpty(true)
  if(searchQuery === "") 
          setNoResults(false)

  useDebounce(searchQuery, 3000, searches);

  return (
    <div className="flex items-center justify-between rounded-full bg-zinc-300 relative self-center md:self-start w-[80%] overflow-hidden"
    ref={searchResultRef} >
          <div className='flex justify-center text-xl text-zinc-400 px-2 hover:text-zinc-600 duration-300'>
            <FaSearch/>
          </div>
          <div className='flex-1'>
            <input
              ref={inputRef}
              className="w-full px-1 bg-transparent text-black h-12 focus:bg-zinc-200"
              placeholder="Enter city"
              type='text'
              value={searchQuery}
              name='location'
              onChange={changeHandler}
              onFocus={() => setExpandSearch(value => !value)}
              />
          </div>
          {expandSearch && <div className='text-2xl px-2 text-zinc-400 font-bold hover:text-zinc-600 duration-300'
          onClick={() => clearSearch()}>
            <AiOutlineClose/>
          </div>}
        </div>
  )
}

export default SearchMenu