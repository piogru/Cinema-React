import { useEffect, useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { useParams, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

function ShowingTickets({buyShowingTicket, showingsList, moviesList}) {
  const params = useParams(); //do routingu
  let navigate = useNavigate();
  const [showing, setShowing] = useState({})
  const [title, setTitle] = useState("")
  const [seats, setSeats] = useState(false)
  const [choice, setChoice] = useState(-1)


  useEffect(() => {
    if (params?.id) {
      console.log("ShowingTickets", buyShowingTicket, showingsList, moviesList);
      let showing = showingsList.find((showing) => {
        return showing.id == params?.id
      });
      showing.ticketsSold += 1; //ticketsSold wont be updated if validations fail
      setShowing(showing);
      console.log("Tickets", showing)

      let tempTitle = moviesList.find(element => element.id == showing.movieId).title;
      setTitle(tempTitle);

      let temp = Array.from({length: showing.ticketsAvailable}, (_, i) => i + 1);
      temp = temp.filter(element => !showing.takenSeats.includes(element)); //remove takenSeats
      setSeats(temp);
      console.log("Tickets", temp)
    }
  }, [params?.id])

  function onChoiceChange(e) {
    setChoice(e.target.value);
    console.log("Ticket choice", choice)
  }

  function submitTicket() {
    let temp = showing.takenSeats;

    if(choice != -1){
      console.log("Submit ticket", temp, showing)

      buyShowingTicket(showing, choice)
      navigate("/showings");
    }
  }

  return (
    <div className="d-flex justify-content-center">
      <div >
        <h1 className="mb-2">Kup bilet</h1>
        <div className="mb-3">
          { title &&
            <h3>{title}</h3>
          }
          <div>
            <div className="fw-bold">Data</div>
            <p>{showing.date}</p>
          </div>
          <div>
            <div className="fw-bold">Numer sali</div>
            {showing.roomId}
          </div>
        </div>

        <div className="mb-3">
          <Form.Label className="fw-bold">Miejsce</Form.Label>
          { seats &&
            <Form.Select id="takenSeats" onChange={onChoiceChange} >
              <option value="-1">Wybierz fotel</option>
              {
                seats.map((element, key) => {

                return (
                  <option value={element} key={element}> Fotel {element} </option> );
                })
              }
            </Form.Select>
          }
        </div>

        <Button onClick={submitTicket}>Kup</Button>
      </div>
    </div>

  )
}

ShowingTickets.propTypes = {
  buyShowingTicket: PropTypes.func,
  showingsList: PropTypes.array,
  moviesList: PropTypes.array,
};

export default ShowingTickets;
