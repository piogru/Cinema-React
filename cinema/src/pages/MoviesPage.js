import React from 'react';
import Movies from '../Movie/Movies';
import AddMovie from '../Movie/AddMovie'
import PropTypes from 'prop-types';

function MoviesPage({moviesList, addMovie, deleteMovie}) {
  return (
    <div>
      <h1>Filmy</h1>
      <div>
        <Movies moviesList={moviesList} deleteMovie = {deleteMovie} />
      </div>
      <h1 className="mt-2">Dodaj film</h1>
      <div className="d-flex justify-content-center">
        <AddMovie addMovie = {addMovie} />
      </div>
    </div>
  );
};

MoviesPage.propTypes = {
  moviesList: PropTypes.array,
  addMovie: PropTypes.func,
  deleteMovie: PropTypes.func,
}

export default MoviesPage;
