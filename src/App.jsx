import { useEffect, useState, useRef } from 'react';
import './App.css';
import Gallery from './Components/Gallery';
import SearchBar from './Components/SearchBar';
import { DataContext } from './Context/DataContext'
import { SearchContext } from './Context/SearchContext';

function App() {
  const [data, setData] = useState([])
  const [message, setMessage] = useState("Search for Music!")
  let searchInput = useRef('')

  const API_URL = 'https://itunes.apple.com/search?term='

  const handleSearch = (e, term) => {
    e.preventDefault()
    const fetchData = async () => {
      document.title = `${term} Music`
      const response = await fetch(API_URL + term)
      const resData = await response.json()
      if (resData.results.length > 0) {
        setData(resData.results)
        setMessage('')
      } else {
        setMessage('Artist not found!')
      }
    }
    fetchData()
  }

  return (
    <div className="App">
      <SearchContext.Provider value={{
        term: searchInput,
        handleSearch: handleSearch
      }}>
          <SearchBar />
      </SearchContext.Provider>
      {message}
      <DataContext.Provider value={data} >
        <Gallery />
      </DataContext.Provider>
    </div>
  );
}

export default App;
