export default function ShowingReducer(
  state = {
    showingsList: [],
    loaded: false,
  },
  action
)
{
  let new_state;
  switch (action.type) {
    case 'GET_SHOWINGS':
      console.log ("showing reducer action", action)
      new_state=Object.assign({}, state);
      new_state.showingsList=action.showings || [];
      if(new_state.showingsList instanceof Error){
        new_state.showingsList = [];
      }
      new_state.loaded=true;
      return new_state;
    // case 'GET_SHOWING':
    //   console.log('showing reducer action', action);
    //   new_state=Object.assign({}, state);
    //   console.log('details', action.id);
    //   const det = getDetails(action.id);
    //   console.log(det);
      // return { ...state, details: det };
    case 'ADD_SHOWING':
      console.log('showing reducer action', action);
      return { ...state, showingsList: [...state.showingsList, action.new_obj] };
    case "EDIT_SHOWING":
      console.log('showing reducer action', action);
      new_state = Object.assign({}, state);
      new_state.showingsList.forEach((el, index,tab)=>{
        if(el.id===action.updated_obj.data.id) tab[index]=action.updated_obj.data;
        return el;
      });
      return new_state;
    case 'DELETE_SHOWING':
      console.log('showing reducer delete', action);
      new_state = Object.assign({}, state);
      let id=-1;
      new_state.showingsList.forEach((el, index)=>{
        if(el.id===action.id) id=index;
        return id;
      });
      new_state.showingsList.splice(id,1);
      return new_state;
    default:
      return state;
  }
}
