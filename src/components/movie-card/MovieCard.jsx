import React from "react";
import "./MovieCard.scss";

function MovieCard({ movieData, nominateMovie, nominations, limit }) {
  const checkNominationStatus = () => {
    const isNominated = nominations.filter(
      (movie) => movie.imdbID === movieData.imdbID
    );

    return isNominated.length > 0;
  };

  const getButtonClass = () => {
    const check = checkNominationStatus();

    if (check) {
      return "nominate-button movie-btn disabled";
    } else if (limit === 0) {
      return "nominate-button movie-btn disabled limit-maxed";
    } else {
      return "nominate-button movie-btn";
    }
  };

  return (
    <article className='movie-card'>
      <div class="content-overlay"></div>
      <div class="content-details fadeIn-bottom">
      <button
        aria-label='Nominate movie'
        disabled={checkNominationStatus()}
        className={getButtonClass()}
        onClick={() => nominateMovie(movieData)}
      >
        {checkNominationStatus() ? (
          <React.Fragment>
            Nominated <i className='far fa-check-circle'></i>
          </React.Fragment>
        ) : limit === 0 ? (
          <React.Fragment>Limit Reached</React.Fragment>
        ) : (
          <React.Fragment>Nominate</React.Fragment>
        )}
      </button>
      </div>
      <div className='movie-card__image'>
        <img
          src={
            movieData.Poster === "N/A"
              ? `https://via.placeholder.com/300x424?text=${movieData.Title}`
              : movieData.Poster
          }
          alt={`Poster for ${movieData.Title}`}
        />
      </div>
      <div className='movie-card__details__lg'>
        <h4 className='movie-card__details__title'> {movieData.Title} </h4>
        <p className='movie-card__details__release-year'>
          <span>Released:</span> <em>{movieData.Year} </em>
        </p>
      </div>
    </article>
  );
}

export default MovieCard;
