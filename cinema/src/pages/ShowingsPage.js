import React from 'react';
import Showings from '../Showing/Showings';
import AddShowing from '../Showing/AddShowing';
import PropTypes from "prop-types";

function ShowingsPage({showingsList, moviesList, roomsList, addShowing, deleteShowing}) {
  return (
    <div>
      <h1>Seanse</h1>
      <div>
        <Showings showingsList={showingsList} moviesList={moviesList} deleteShowing = {deleteShowing}/>
      </div>
      <h1 className="mt-2">Utwórz seans</h1>
      <div className="d-flex justify-content-center">
        <AddShowing  roomsList={roomsList} moviesList={moviesList}  addShowing = {addShowing}/>
      </div>
    </div>
  );
};

ShowingsPage.propTypes = {
  showingsList: PropTypes.array,
  moviesList: PropTypes.array,
  roomsList: PropTypes.array,
  addShowing: PropTypes.func,
  deleteShowing: PropTypes.func,
}

export default ShowingsPage;
