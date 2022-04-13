import React from 'react';
import Rooms from '../Room/Rooms';
import PropTypes from 'prop-types';

function RoomsPage({roomsList}) {
  return (
    <div>
      <h1>Sale</h1>
      <div>
        <Rooms roomsList={roomsList}/>
      </div>
    </div>
  );
};

RoomsPage.propTypes = {
  roomsList: PropTypes.array,
}

export default RoomsPage;
