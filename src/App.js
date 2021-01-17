import React, { useState, useEffect } from "react";
import "./assets/scss/App.scss";
import Header from "./components/header/Header";
import MovieCard from "./components/movie-card/MovieCard";
import NominationCard from "./components/nomination-card/NominationCard";
import Search from './components/search/Search'

function App() {
  const [mobileSidebar, toggleMobileSidebar] = useState(false);
  const [movies, setMovies] = useState([]);
  const [nominations, setNominations] = useState([]);
  const [wordToSearch, setWordToSearch] = useState("");
  const [limit, setLimit] = useState(5);

  useEffect(() => {
    fetch(
      `https://www.omdbapi.com/?s=${wordToSearch || 'brave'}&page=1-10&apikey=dee16f2c`
    )
      .then((res) => res.json())
      .then((data) => setMovies(data.Search || []));

    const storedNominations = localStorage.getItem("movieNominations");

    // fetch nominations from local storage
    storedNominations !== null
      ? setNominations(JSON.parse(storedNominations))
      : localStorage.setItem(
          "movieNominations",
          JSON.stringify(nominations)
        );

    // fetch limit from local storage
    const storedLimit = localStorage.getItem("nominationLimit");

    storedLimit === null
      ? localStorage.setItem("nominationLimit", 5)
      : setLimit(Number(storedLimit));

  }, []);

  const handleSearch = (e) => {
    e.preventDefault();

    setWordToSearch(e.target.value);

    if (e.target.value.length >= 3) {
      fetch(
        `https://www.omdbapi.com/?s=${e.target.value}&page=1-10&apikey=dee16f2c`
      )
        .then((res) => res.json())
        .then((data) => setMovies(data.Search || []));
    } else {
      setMovies([]);
    }
  };

  const nominateMovie = (movie) => {
    const newMoviesArray = [movie, ...nominations];
    setNominations(newMoviesArray);

    // add movie to loacalstorage
    localStorage.setItem("movieNominations", JSON.stringify(newMoviesArray));

    // update limit
    setLimit(limit - 1);

    // update local storage limit
    localStorage.setItem("nominationLimit", limit - 1);
  };

  const undoNomination = (movie) => {
    const currentNominations = nominations.filter(
      (item) => item.imdbID !== movie.imdbID
    );

    // update local storage
    setNominations(currentNominations);
    localStorage.setItem(
      "movieNominations",
      JSON.stringify(currentNominations)
    );

    // update limit
    setLimit(limit + 1);

    // update local storage limit
    localStorage.setItem("nominationLimit", limit + 1);
  };

  nominations.length === 5 &&
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });

  return (
    <div className='App' id={mobileSidebar ? "no-scroll" : ""}>
      <Header
        mobileSidebar={mobileSidebar}
        toggleMobileSidebar={toggleMobileSidebar}
        limit={limit}
        wordToSearch={wordToSearch}
        handleSearch={handleSearch}
      />
      <Search className='mobile-search' wordToSearch={wordToSearch} handleSearch={handleSearch} />
      <div className='main-wrapper'>
        <div className='main-wrapper__inner'>
          <main>
            {nominations.length === 5 && (
              <div className='banner' role='banner'>
                <i className='fas fa-exclamation-circle'></i>
                <p>
                  You've used up your nominations, Thanks!
                </p>
              </div>
            )}
            {movies.length > 0 && (
              <div className='stats'>
                <p>
                  Showing <span>{movies.length}</span> results for keyword{" "}
                  <span>'{wordToSearch}'</span>
                </p>
              </div>
            )}

            <div className='movies__listing'>
              {movies.map((movie) => (
                <MovieCard
                  key={movie.imdbID}
                  movieData={movie}
                  nominateMovie={nominateMovie}
                  nominations={nominations}
                  limit={limit}
                />
              ))}
            </div>
          </main>

          <aside
            className={`nominations ${
              mobileSidebar ? "show-sidebar" : "hide-sidebar"
            }`}
          >
            <h3 className='nominations__heading'>Your Nominations</h3>

            {nominations.length === 0 && (
              <div className='nominations__empty'>
                <i className="fas fa-folder-open"></i>
                <p>Empty!</p>
              </div>
            )}

            <div className='nominations__listing'>
              {nominations.map((movie) => (
                <NominationCard
                  key={movie.imdbID}
                  movieData={movie}
                  undoNomination={undoNomination}
                />
              ))}
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

export default App;