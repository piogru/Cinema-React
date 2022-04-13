import * as MoviesApi from '../Api/MoviesApi'
export const GET_MOVIES ='GET_MOVIES'
export const GET_MOVIE ='GET_MOVIE'
export const ADD_MOVIE='ADD_MOVIE'
export const EDIT_MOVIE='EDIT_MOVIE'
export const DELETE_MOVIE='DELETE_MOVIE'

export const getMovies=()=>(dispatch)=>{
  MoviesApi.getAllMovies().then(data => {
    // console.log("actions data", data)
      dispatch(getMoviesAction(data));
    }).catch(error => {
      throw(error);
    });
};

export const getMoviesAction=(data)=>(
  {
    type: GET_MOVIES,
    movies: data
  }
);

export const getMovie=(id)=>(dispatch)=>{
  MoviesApi.getMovie(id).then(data => {
    // console.log("actions data", data)
      dispatch(getMovieAction(data));
    }).catch(error => {
      throw(error);
    });
};

export const getMovieAction=(data)=>(
  {
    type: GET_MOVIES,
    movie: data
  }
);

export const addMovie=(new_obj)=>(dispatch)=> {
  MoviesApi.addMovie(new_obj).then(response =>{
    // console.log("MovieActions add movie", response);
    dispatch(addMovieAction(response.data));
  }).catch(error => {
    throw(error);
  });
};

export const addMovieAction=(new_obj)=> (
  {
    type: ADD_MOVIE,
    new_obj
  }
);

export const editMovie=(updated_obj)=> (dispatch)=> {
  // console.log("MovieActions edit movie", updated_obj);
  MoviesApi.editMovie(updated_obj.id, updated_obj).then(data =>{
      // console.log("MovieActions edit movie",data);
      dispatch(editMovieAction(updated_obj));
  }).catch(error => {
      throw(error);
  });
};

export const editMovieAction =(updated_obj => (
  {
    type: EDIT_MOVIE,
    updated_obj
  }
));

export const deleteMovie = (id) => (dispatch) => {
  console.log("MovieActions delete", id);
  MoviesApi.deleteMovie(id).then(data => {
    if (data.status === 204)
      dispatch(deleteMovieAction(id));
  }).catch(error => {
      throw (error);
  });
};

export const deleteMovieAction = (id) => (
  {
    type: DELETE_MOVIE,
    id
  }
);
