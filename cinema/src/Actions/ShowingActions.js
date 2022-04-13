import * as ShowingsApi from '../Api/ShowingsApi'
export const GET_SHOWINGS ='GET_SHOWINGS'
export const GET_SHOWING ='GET_SHOWING'
export const ADD_SHOWING='ADD_SHOWING'
export const EDIT_SHOWING='EDIT_SHOWING'
export const DELETE_SHOWING='DELETE_SHOWING'

export const getShowings=()=>(dispatch)=>{
  ShowingsApi.getShowings().then(data => {
    // console.log("actions data", data)
      dispatch(getShowingsAction(data));
    }).catch(error => {
      throw(error);
    });
};

export const getShowingsAction=(data)=>(
  {
    type: GET_SHOWINGS,
    showings: data
  }
);

export const getShowing=()=>(dispatch)=>{
  ShowingsApi.getShowing().then(data => {
    // console.log("actions data", data)
      dispatch(getShowingAction(data));
    }).catch(error => {
      throw(error);
    });
};

export const getShowingAction=(data)=>(
  {
    type: GET_SHOWING,
    showing: data
  }
);

export const addShowing=(new_obj)=>(dispatch)=> {
  console.log("ShowingActions add showing", new_obj);
  ShowingsApi.addShowing(new_obj).then(response =>{
    // console.log("ShowingActions add showing", response.data);
    dispatch(addShowingAction(response.data));
  }).catch(error => {
    throw(error);
  });
};

export const addShowingAction=(new_obj)=> (
  {
    type: ADD_SHOWING,
    new_obj
  }
);

export const editShowing=(updated_obj)=> (dispatch)=> {
  // console.log(updated_obj)
  ShowingsApi.editShowing(updated_obj.id, updated_obj).then(response =>{
      // console.log("data ",data.data);
      dispatch(editShowingAction(response));
  }).catch(error => {
      throw(error);
  });
};

export const editShowingAction =(updated_obj => (
  {
    type: EDIT_SHOWING,
    updated_obj
  }
));

export const deleteShowing = (id) => (dispatch) => {
  console.log("ShowingActions delete", id)
  ShowingsApi.deleteShowing(id).then(data => {
    if (data.status === 204) {
      dispatch(deleteShowingAction(id));
    }

  }).catch(error => {
      throw (error);
  });
};

export const deleteShowingAction = (id) => (
  {
    type: DELETE_SHOWING,
    id
  }
);
