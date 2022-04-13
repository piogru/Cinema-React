export default function MovieReducer(
  state = {
    moviesList: [],
    loaded: false,
  },
  action
)
{
  let new_state;

  switch (action.type) {
    case 'GET_MOVIES':
      console.log('movie reducer action', action);
      new_state = Object.assign({}, state);
      new_state.moviesList=action.movies || [];
      if(new_state.moviesList instanceof Error){
        new_state.moviesList = [];
      }
      new_state.loaded=true;
      return new_state;
    // case 'GET_MOVIE':
    //   console.log('movie reducer action', action);
    //   new_state = Object.assign({}, state);
      // const details = getMovie(action.id);
      // console.log(details);
      // return { ...state, details: details };
      // return new_state;
    case 'ADD_MOVIE':
      console.log('movie reducer action', action);
      return { ...state, moviesList: [...state.moviesList, action.new_obj] };
    case "EDIT_MOVIE":
      console.log('movie reducer action', action);
      new_state = Object.assign({}, state);
      new_state.moviesList.forEach((el, index, tab)=>{
        if(el.id===action.updated_obj.id) tab[index]=action.updated_obj;
        return el;
      });
      return new_state;
    case 'DELETE_MOVIE':
      console.log('movie reducer action', action);
      new_state = Object.assign({}, state);
      let id=-1;
      new_state.moviesList.forEach((el, index)=>{
        if(el.id===action.id) id=index;
        return id;
      });
      new_state.moviesList.splice(id, 1);
      return new_state;
    default:
      return state;
  }
}
