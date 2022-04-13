import { Table } from "react-bootstrap";
import Room from './Room';
import PropTypes from 'prop-types';

function Rooms({roomsList}) {
  return (
    <div className="container">
      <div className="row">
        <Table bordered striped className="col-6">
          <thead>
            <tr>
              <th>Numer</th>
              <th>Ilość miejsc</th>
            </tr>
          </thead>
          <tbody>
            {
              roomsList.map((room, index, key) => {
                return (
                  <Room
                    key={room.id}
                    id={room.id}
                    capacity={room.capacity}
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

Rooms.propTypes = {
  roomsList: PropTypes.array,
}

export default Rooms
