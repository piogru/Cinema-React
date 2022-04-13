import { useEffect, useState } from 'react';
import { Table, Form, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { useParams, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';


function EditShowing({editShowing, showingsList, moviesList, roomsList}) {
  const params = useParams(); //do routingu
  let navigate = useNavigate();
  const [showing, setShowing] = useState({})
  const [date, setDate] = useState({})

  useEffect(() => {
    if (params?.id) {
      console.log("EditShowing", editShowing, showingsList, moviesList, roomsList);
      let showing = showingsList.find((showing) => {
        return showing.id == params?.id
      });
      setShowing(showing);

      let temp = new Date(showing.date).toISOString();
      let valueDate = temp.substring(0, temp.length - 8);
      setDate(valueDate);
    }
  }, [params?.id])

  function onDateChange(e) {
    let newDate = new Date(e.target.value);
    console.log("new date", newDate)

    let date = new Date(newDate);
    var coeff = 1000 * 60 * 15;
    var rounded_date = new Date(Math.round(date.getTime() / coeff) * coeff)

    console.log("new date rounded", rounded_date)
    console.log("new date GMT", rounded_date.toGMTString())
    newDate.setHours(newDate.getHours() - newDate.getTimezoneOffset() / 60);
    let temp = newDate.toISOString();
    let valueDate = temp.substring(0, temp.length - 8);
    setDate(valueDate);
    console.log("new date ISO trim", valueDate)

    rounded_date.setHours(rounded_date.getHours() - rounded_date.getTimezoneOffset() / 60);
    console.log("new date GMT", rounded_date.toGMTString())
    setShowing({
      ...showing,
      date: rounded_date.toGMTString()
    })
  }

  function onMovieIdChange(e) {
    setShowing({
      ...showing,
      movieId: e.target.value
    })
  }

  function onRoomIdChange(e) {
    setShowing({
      ...showing,
      roomId: e.target.value
    })
  }

  function submitShowingThing() {
    editShowing(showing)
    navigate("/showings");
  }

  return (

    <div className="d-flex justify-content-center">
      <div>
        <h1 className="mb-2">Edytuj seans</h1>
        <div className="mb-3">
          <Form.Label>Data i godzina (GMT)</Form.Label>
          <Form.Control type="datetime-local" value={date} onChange={onDateChange}/>
        </div>
        <div className="mb-3">
          <Form.Label>Film</Form.Label>
          <Form.Select id="movieId" onChange={onMovieIdChange} value={showing.movieId}>
            {
              moviesList.map((movie, key) => {
              return (
              <option value={movie.id} key={movie.id}> {movie.title} </option> );
              })
            }
          </Form.Select>
        </div>
        <div className="mb-3">
          <Form.Label>Sala</Form.Label>
          <Form.Select id="roomId" onChange={onRoomIdChange} value={showing.roomId}>
            {
              roomsList.map((room, key) => {
              return (
              <option value={room.id} key={room.id}  > Sala nr: {room.id} Miejsc: {room.capacity} </option> );
                })
            }
          </Form.Select>
        </div>
        <Button onClick={submitShowingThing}>Edytuj</Button>
      </div>
    </div>
  )
}

EditShowing.propTypes = {
  editShowing: PropTypes.func,
  showingsList: PropTypes.array,
  moviesList: PropTypes.array,
  roomsList: PropTypes.array,
}

export default EditShowing
