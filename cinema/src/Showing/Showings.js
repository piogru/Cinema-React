import { Table } from "react-bootstrap";
import Showing from './Showing';
import DeleteShowingForm from "./DeleteShowingForm";
import "react-confirm-alert/src/react-confirm-alert.css";
import { confirmAlert } from 'react-confirm-alert';
import PropTypes from 'prop-types';

function Showings({showingsList, moviesList, deleteShowing}) {
  function showDeleteForm (id){
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <DeleteShowingForm index={id} onClose={onClose} deleteShowing={deleteShowing} />
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
              <th>Data</th>
              <th>Film</th>
              <th>Sala</th>
              <th>Bilety sprzedane</th>
              <th>Bilety dostępne</th>
              <th>Zajęte miejsca</th>
              <th>Akcje</th>
            </tr>
          </thead>
          <tbody>
            {
              showingsList.map((showing, index, key) => {
                return (
                  <Showing
                    id={showing.id}
                    date={showing.date}
                    movieTitle={moviesList.find(element => element.id == showing.movieId).title}
                    roomId={showing.roomId}
                    ticketsSold={showing.ticketsSold}
                    ticketsAvailable={showing.ticketsAvailable}
                    takenSeats={showing.takenSeats}
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

Showings.propTypes = {
  showingsList: PropTypes.array,
  moviesList: PropTypes.array,
  deleteShowing: PropTypes.func,
}

export default Showings
