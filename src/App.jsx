import { useEffect, useState, useRef, Fragment } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Gallery from './Components/Gallery';
import SearchBar from './Components/SearchBar';
import { DataContext } from './Context/DataContext'
import { SearchContext } from './Context/SearchContext';
import AlbumView from './Components/AlbumView';
import ArtistView from './Components/ArtistView';

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
  <div>
    {message}
    <Router>
      <Routes>
        <Route path='/' element={
          <Fragment>
            <SearchContext.Provider value={{
              term: searchInput,
              handleSearch: handleSearch
            }}>
                <SearchBar />
            </SearchContext.Provider>
            <DataContext.Provider value={data} >
              <Gallery />
            </DataContext.Provider>
          </Fragment>
        } />
        <Route path='/album/:id' element={<AlbumView />} />
        <Route path='/artist/:id' element={<ArtistView />} />
      </Routes>
    </Router>
  </div>
)
}

export default App;
