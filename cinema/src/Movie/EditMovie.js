import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Table, Form, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-confirm-alert/src/react-confirm-alert.css';
import PropTypes from 'prop-types';

function EditMovie({editMovie, moviesList}) {
  const params = useParams(); //do
  let navigate = useNavigate();
  const [movie, setMovie] = useState({})

  useEffect(() => {
    if (params?.id) {
      console.log("EditMovie", editMovie, moviesList);
      let movie = moviesList.find((movie) => {
        console.log(movie.id == params?.id)
        return movie.id == params?.id
      });
      // console.log("EditMovie", movie)
      setMovie(movie);
    }
  }, [params?.id])

  function onLengthChange(e) {
    setMovie({
      ...movie,
      length: e.target.value
    })
  }

  function onTitleChange(e) {
    setMovie({
      ...movie,
      title: e.target.value
    })
  }

  function submitMovieThing() {
    editMovie(movie)
    navigate("/movies");
  }

  return (
    <div className="d-flex justify-content-center">
      <div>
        <h1 className="mb-2">Edytuj film</h1>
        <div className="mb-3">
          <Form.Label className="fw-bold">Tytuł</Form.Label>
          <Form.Control type="text" placeholder="Tytuł filmu" id="title" onChange={onTitleChange} value={movie.title} />
        </div>
        <div className="mb-3">
          <Form.Label className="fw-bold">Czas trwania</Form.Label>
          <Form.Control type="text" placeholder="Czas trwania filmu" id="length" onChange={onLengthChange} value={movie.length} />
        </div>
        <Button onClick={submitMovieThing}>Edytuj</Button>
      </div>
    </div>
  )
}

EditMovie.propTypes = {
  editMovie: PropTypes.func,
  moviesList: PropTypes.array,

}

export default EditMovie
