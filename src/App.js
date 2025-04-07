import { useEffect, useState } from 'react';

import MovieCard from './MovieCard.jsx';
import './App.css';
import SearchIcon from './search.svg';

const API_URL = 'http://www.omdbapi.com?apikey=47bbcc21';

const movie1 ={
  "Title": "The Batman",
  "Year": "2022",
  "imdbID": "tt1877830",
  "Type": "movie",
  "Poster": "https://m.media-amazon.com/images/M/MV5BMmU5NGJlMzAtMGNmOC00YjJjLTgyMzUtNjAyYmE4Njg5YWMyXkEyXkFqcGc@._V1_SX300.jpg"
}

const App= () => {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');


  const searchMovies = async (title)=>{
    const response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json();

    setMovies(data.Search);
  }

  useEffect(()=>{
    searchMovies('Batman');
  },[]);


  return (
    <div className="app">
      <h1>Movie Gallery</h1>


      <div className='search'>
        <input 
         placeholder='Search for movies'
         value={searchTerm}
         onChange={(e) => setSearchTerm(e.target.value)}
        />
        <img
         src={SearchIcon}
         alt='search'
         onClick={()=>searchMovies(searchTerm)}/>
      </div>
    
      {
        movies?.length > 0
         ?(
         <div className="container">
          {movies.map((movie) => (
            <MovieCard movie={movie}/>
          ))}
        </div>
      )
     :(
        <div className='empty'>
          <h2>No movies found</h2>
        </div>
      )}
      
    </div>
  );
}

export default App;
