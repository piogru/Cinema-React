export default function RoomReducer(
  state = {
    roomsList: [],
    loaded: false,
  },
  action
)
{
  let new_state;
  switch (action.type) {
    case 'GET_ROOMS':
      console.log ("room reducer action", action)
      new_state=Object.assign({}, state);
      new_state.roomsList=action.rooms || [];
      if(new_state.roomsList instanceof Error){
        new_state.roomsList = [];
      }
      new_state.loaded=true;
      return new_state;
    // case 'GET_ROOM':
    //   console.log('details', action.id);
    //   const det = getDetails(action.id);
    //   console.log(det);
    //   return { ...state, details: det };
    default:
      return state;
  }
}
