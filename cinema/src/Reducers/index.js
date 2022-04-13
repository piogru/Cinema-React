import { combineReducers } from 'redux';
import movies  from './MovieReducer';
import rooms  from './RoomReducer';
import showings  from './ShowingReducer';

export default combineReducers({
  movies,
  rooms,
  showings,
});
