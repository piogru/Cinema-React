import React from "react";
import PropTypes from "prop-types";
import * as Icon from "react-bootstrap-icons";
import { Link, useLocation } from "react-router-dom";

const Showing = props => {
  let location = useLocation();

  return (
    <tr className="align-middle">
      <td>{props.date}</td>
      <td>{props.movieTitle}</td>
      <td>{props.roomId}</td>
      <td>{props.ticketsSold}</td>
      <td>{props.ticketsAvailable - props.ticketsSold}</td>
      <td>
        {
          props.takenSeats.map((seat, index, key) => {
            return (
              seat + ", "
            );
          })
        }
      </td>
      { location.pathname == "/showings" &&
        <td>
          <div>
            <Icon.Cash size={30} color="black"/>
            <Link to={'/showings/' + props.id}>Kup bilet</Link>
          </div>
          <div>
            <Icon.Pencil size={30} color="black"/>
            <Link to={'/showings/' + props.id + '/edit'}>Edytuj</Link>
          </div>
          <div onClick={() => props.showDeleteForm(props.id)}>
            <Icon.Trash size={30} color="black" className="Item" />
            <i>Usuń</i>
          </div>
        </td>
      }
    </tr>
  );
}

Showing.propTypes = {
  id: PropTypes.number,
  date: PropTypes.string,
  movieTitle: PropTypes.string,
  roomId: PropTypes.number,
  ticketsSold: PropTypes.number,
  ticketsAvailable: PropTypes.number,
  takenSeats: PropTypes.array,
  showDeleteForm: PropTypes.func,
};

export default Showing;
