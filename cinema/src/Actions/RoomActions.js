import * as RoomsApi from '../Api/RoomsApi'
export const GET_ROOMS ='GET_ROOMS'
export const GET_ROOM ='GET_ROOM'
export const ADD_ROOM='ADD_ROOM'
export const EDIT_ROOM='EDIT_ROOM'
export const DELETE_ROOM='DELETE_ROOM'

export const getRooms=()=>(dispatch)=>{
  RoomsApi.getAllRooms().then(data => {
    // console.log("room actions data", data)
      dispatch(getRoomsAction(data));
    }).catch(error => {
      throw(error);
    });
};

export const getRoomsAction=(data)=>(
  {
    type: GET_ROOMS,
    rooms: data
  }
);

export const getRoom=(id)=>(dispatch)=>{
  RoomsApi.getRoom(id).then(data => {
    // console.log("actions data", data)
      dispatch(getRoomAction(data));
    }).catch(error => {
      throw(error);
    });
};

export const getRoomAction=(data)=>(
  {
    type: GET_ROOM,
    room: data
  }
);
