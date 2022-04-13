import { Table } from "react-bootstrap";
import Movie from './Movie';
import DeleteMovieForm from "./DeleteMovieForm";
import "react-confirm-alert/src/react-confirm-alert.css";
import { confirmAlert } from 'react-confirm-alert';
import PropTypes from 'prop-types';

function Movies({moviesList, deleteMovie}) {
  function showDeleteForm (id){
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <DeleteMovieForm index={id} onClose={onClose} deleteMovie={deleteMovie} />
        );
      }
   });
  }

  return (
    <div className="container">
      <div className="row">
        <Table bordered striped className="col-10">
          <thead>
            <tr>
              <th>Tytuł</th>
              <th>Czas trwania</th>
              <th>Akcje</th>
            </tr>
          </thead>
          <tbody>
            {
              moviesList.map((movie, index, key) => {
                return (
                  <Movie
                    key={movie.id}
                    id={movie.id}
                    title={movie.title}
                    length={movie.length}
                    showDeleteForm={showDeleteForm}
                  />
                );
              })
            }
          </tbody>
        </Table>
      </div>
    </div>
  );
}

Movies.propTypes = {
  moviesList: PropTypes.array,
  deleteMovie: PropTypes.func,
}

export default Movies
